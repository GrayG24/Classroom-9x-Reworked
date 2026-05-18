import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db_sqlite: any = null;
try {
  db_sqlite = new Database('leaderboard.db');
  
    db_sqlite.exec(`
      CREATE TABLE IF NOT EXISTS leaderboard (
        uid TEXT PRIMARY KEY,
        username TEXT,
        level INTEGER,
        score INTEGER,
        characterId TEXT,
        featuredBadgeId TEXT,
        gamesPlayed INTEGER,
        frameId TEXT,
        unlockedBadges TEXT,
        currentTheme TEXT,
        last_active_ms INTEGER,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Migration: Add last_active_ms if it doesn't exist (for existing databases)
    try {
      db_sqlite.prepare("SELECT last_active_ms FROM leaderboard LIMIT 1").get();
    } catch (e) {
      console.log('Adding last_active_ms column to leaderboard table...');
      db_sqlite.exec("ALTER TABLE leaderboard ADD COLUMN last_active_ms INTEGER DEFAULT 0");
    }
  console.log('Successfully connected to SQLite database');
} catch (err: any) {
  console.error('Failed to initialize SQLite database:', err);
  // If database is malformed, try to delete and recreate it
  if (err.message && err.message.includes('malformed')) {
    console.log('Database is malformed, attempting to delete and recreate...');
    try {
      if (fs.existsSync('leaderboard.db')) {
        fs.unlinkSync('leaderboard.db');
        db_sqlite = new Database('leaderboard.db');
        db_sqlite.exec(`
          CREATE TABLE IF NOT EXISTS leaderboard (
            uid TEXT PRIMARY KEY,
            username TEXT,
            level INTEGER,
            score INTEGER,
            characterId TEXT,
            featuredBadgeId TEXT,
            gamesPlayed INTEGER,
            frameId TEXT,
            unlockedBadges TEXT,
            currentTheme TEXT,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);
        console.log('Database recreated successfully');
      }
    } catch (recreateErr) {
      console.error('Failed to recreate database:', recreateErr);
    }
  }
}

const PORT = 3000;

async function startServer() {
  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ server });
  const clients = new Set<WebSocket>();

  app.use(cors());
  app.use(express.json());

  // Log requests
  app.use((req, res, next) => {
    if (!req.url.includes('node_modules') && !req.url.includes('@vite')) {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    }
    next();
  });

  // --- API ROUTES ---
  const apiRouter = express.Router();
  
  apiRouter.get('/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  apiRouter.get('/system/status', (req, res) => {
    try {
      if (db_sqlite) {
        const countRow = db_sqlite.prepare('SELECT count(*) as count FROM leaderboard').get();
        const activeCountRow = db_sqlite.prepare('SELECT count(*) as count FROM leaderboard WHERE last_active_ms > ?').get(Date.now() - 300000); // Active in last 5 mins
        
        res.json({ 
          activeUsers: Math.max(activeCountRow.count, 1),
          totalPlayers: countRow.count
        });
      } else {
        res.json({ activeUsers: 1, totalPlayers: 0 });
      }
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
  });

  apiRouter.get('/leaderboard', (req, res) => {
    try {
      if (db_sqlite) {
        const rows = db_sqlite.prepare('SELECT * FROM leaderboard ORDER BY score DESC LIMIT 50').all();
        const data = rows.map((row: any) => ({
          ...row,
          unlockedBadges: row.unlockedBadges ? JSON.parse(row.unlockedBadges) : []
        }));
        res.json(data);
      } else {
        res.json([]);
      }
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
  });

  apiRouter.post('/leaderboard/update', (req, res) => {
    const entry = req.body;
    if (!entry.uid) return res.status(400).json({ error: 'Valid UID required' });

    if (db_sqlite) {
      try {
        const stmt = db_sqlite.prepare(`
          INSERT INTO leaderboard (uid, username, level, score, characterId, featuredBadgeId, gamesPlayed, frameId, unlockedBadges, currentTheme, last_active_ms)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(uid) DO UPDATE SET
            username = excluded.username,
            level = excluded.level,
            score = MAX(leaderboard.score, excluded.score),
            characterId = excluded.characterId,
            featuredBadgeId = excluded.featuredBadgeId,
            gamesPlayed = excluded.gamesPlayed,
            frameId = excluded.frameId,
            unlockedBadges = excluded.unlockedBadges,
            currentTheme = excluded.currentTheme,
            last_active_ms = excluded.last_active_ms,
            updated_at = CURRENT_TIMESTAMP
        `);
        stmt.run(
          entry.uid,
          entry.username, 
          entry.level, 
          entry.score, 
          entry.characterId, 
          entry.featuredBadgeId, 
          entry.gamesPlayed, 
          entry.frameId, 
          JSON.stringify(entry.unlockedBadges || []), 
          entry.currentTheme,
          entry.lastActive || Date.now()
        );
        res.json({ success: true });
      } catch (err: any) {
        console.error('Failed to persist to SQLite:', err);
        res.status(500).json({ error: 'Database update failed', message: err.message });
      }
    } else {
      res.json({ success: true, warning: 'Database not initialized' });
    }
  });

  app.use('/api', apiRouter);

  // --- WEB SOCKETS ---
  wss.on('connection', (ws) => {
    clients.add(ws);
    ws.on('message', (data) => {
      const message = data.toString();
      clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
    ws.on('close', () => clients.delete(ws));
  });
  
  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
