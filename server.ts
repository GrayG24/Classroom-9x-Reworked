import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db_sqlite = new Database('leaderboard.db');
db_sqlite.exec(`
  CREATE TABLE IF NOT EXISTS leaderboard (
    username TEXT PRIMARY KEY,
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

const PORT = 3000;

async function startServer() {
  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ server });
  const clients = new Set<WebSocket>();

  app.use(cors());
  app.use(express.json());

  // Logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // --- API ROUTES ---
  // Global Leaderboard (In-memory storage for now)
  let leaderboardData: any[] = [];
  try {
    const rows = db_sqlite.prepare('SELECT * FROM leaderboard ORDER BY score DESC').all();
    leaderboardData = rows.map((row: any) => ({
      ...row,
      unlockedBadges: row.unlockedBadges ? JSON.parse(row.unlockedBadges) : []
    }));
    console.log(`Loaded ${leaderboardData.length} entries from SQLite`);
  } catch (err) {
    console.error('Failed to load leaderboard from SQLite:', err);
  }

  let isMaintenanceMode = false;
  let totalMessages = 0;
  let totalGamesPlayed = 0;

  const apiRouter = express.Router();

  apiRouter.get('/ping', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  apiRouter.get('/check-username', (req, res) => {
    const { username } = req.query;
    if (!username) return res.status(400).json({ error: 'Username required' });
    const exists = leaderboardData.some(e => e.username.toLowerCase() === (username as string).toLowerCase());
    res.json({ exists });
  });

  apiRouter.get('/leaderboard', (req, res) => {
    console.log('Fetching leaderboard data...');
    try {
      if (!Array.isArray(leaderboardData)) {
        console.error('leaderboardData is not an array, resetting:', leaderboardData);
        leaderboardData = [];
      }
      const sorted = [...leaderboardData]
        .filter(e => e && typeof e.score === 'number')
        .sort((a, b) => b.score - a.score)
        .slice(0, 50); // Return more than 10 for better experience
      
      console.log(`Returning ${sorted.length} leaderboard entries`);
      res.json(sorted);
    } catch (err) {
      console.error('Error in /api/leaderboard:', err);
      res.status(500).json({ error: 'Internal Server Error', message: err instanceof Error ? err.message : String(err) });
    }
  });

  apiRouter.get('/system/status', (req, res) => {
    const totalScore = leaderboardData.reduce((acc, curr) => acc + (curr.score || 0), 0);
    const totalGames = leaderboardData.reduce((acc, curr) => acc + (curr.gamesPlayed || 0), 0);
    
    res.json({ 
      maintenance: isMaintenanceMode,
      uptime: process.uptime(),
      activeUsers: clients.size,
      totalPlayers: leaderboardData.length,
      totalScore,
      totalGames: totalGames || totalGamesPlayed,
      totalMessages
    });
  });

  apiRouter.post('/admin/maintenance', (req, res) => {
    const { enabled } = req.body;
    isMaintenanceMode = enabled !== undefined ? enabled : !isMaintenanceMode;
    
    const payload = JSON.stringify({
      type: 'SYSTEM_MAINTENANCE',
      enabled: isMaintenanceMode,
      timestamp: new Date().toISOString()
    });

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
    res.json({ success: true, enabled: isMaintenanceMode });
  });

  apiRouter.post('/admin/clear-chat', (req, res) => {
    const payload = JSON.stringify({
      type: 'CLEAR_CHAT',
      timestamp: new Date().toISOString()
    });

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
    res.json({ success: true });
  });

  apiRouter.post('/leaderboard/update', (req, res) => {
    const { username, level, score, characterId, featuredBadgeId, gamesPlayed, frameId, unlockedBadges, currentTheme } = req.body;
    if (!username) return res.status(400).json({ error: 'Valid username required' });

    const index = leaderboardData.findIndex(e => e.username === username);
    const entry = { 
      username, 
      level, 
      score: index !== -1 ? Math.max(leaderboardData[index].score, score) : score,
      characterId: characterId || (index !== -1 ? leaderboardData[index].characterId : 'agent-x'),
      featuredBadgeId: featuredBadgeId || (index !== -1 ? leaderboardData[index].featuredBadgeId : null),
      gamesPlayed: gamesPlayed || (index !== -1 ? leaderboardData[index].gamesPlayed : 0),
      frameId: frameId || (index !== -1 ? leaderboardData[index].frameId : 'obsidian'),
      unlockedBadges: unlockedBadges || (index !== -1 ? leaderboardData[index].unlockedBadges : []),
      currentTheme: currentTheme || (index !== -1 ? leaderboardData[index].currentTheme : 'cyan')
    };

    if (index !== -1) {
      leaderboardData[index] = entry;
    } else {
      leaderboardData.push(entry);
    }

    // Persist to SQLite
    try {
      const stmt = db_sqlite.prepare(`
        INSERT INTO leaderboard (username, level, score, characterId, featuredBadgeId, gamesPlayed, frameId, unlockedBadges, currentTheme)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(username) DO UPDATE SET
          level = excluded.level,
          score = MAX(leaderboard.score, excluded.score),
          characterId = excluded.characterId,
          featuredBadgeId = excluded.featuredBadgeId,
          gamesPlayed = excluded.gamesPlayed,
          frameId = excluded.frameId,
          unlockedBadges = excluded.unlockedBadges,
          currentTheme = excluded.currentTheme,
          updated_at = CURRENT_TIMESTAMP
      `);
      stmt.run(
        entry.username, 
        entry.level, 
        entry.score, 
        entry.characterId, 
        entry.featuredBadgeId, 
        entry.gamesPlayed, 
        entry.frameId, 
        JSON.stringify(entry.unlockedBadges), 
        entry.currentTheme
      );
    } catch (err) {
      console.error('Failed to persist to SQLite:', err);
    }

    res.json({ success: true });
  });

  apiRouter.post('/admin/clear-leaderboard', (req, res) => {
    leaderboardData = [];
    totalMessages = 0;
    totalGamesPlayed = 0;
    try {
      db_sqlite.prepare('DELETE FROM leaderboard').run();
    } catch (err) {
      console.error('Failed to clear SQLite leaderboard:', err);
    }

    const payload = JSON.stringify({
      type: 'LEADERBOARD_WIPED',
      timestamp: new Date().toISOString()
    });

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });

    res.json({ success: true });
  });

  apiRouter.post('/admin/remove-player', (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username required' });
    leaderboardData = leaderboardData.filter(e => e.username !== username);
    try {
      db_sqlite.prepare('DELETE FROM leaderboard WHERE username = ?').run(username);
    } catch (err) {
      console.error('Failed to remove player from SQLite:', err);
    }
    res.json({ success: true });
  });

  apiRouter.post('/admin/reset-stats', (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username required' });
    const index = leaderboardData.findIndex(e => e.username === username);
    if (index !== -1) {
      leaderboardData[index].score = 0;
      leaderboardData[index].level = 1;
      leaderboardData[index].gamesPlayed = 0;
      try {
        db_sqlite.prepare('UPDATE leaderboard SET score = 0, level = 1, gamesPlayed = 0 WHERE username = ?').run(username);
      } catch (err) {
        console.error('Failed to reset stats in SQLite:', err);
      }
    }
    res.json({ success: true });
  });

  apiRouter.post('/admin/ban-player', (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username required' });
    
    // In a real app, we'd have a banned_users table
    // For now, just remove them from leaderboard and broadcast a ban event
    leaderboardData = leaderboardData.filter(e => e.username !== username);
    try {
      db_sqlite.prepare('DELETE FROM leaderboard WHERE username = ?').run(username);
    } catch (err) {
      console.error('Failed to ban player in SQLite:', err);
    }

    const payload = JSON.stringify({
      type: 'PLAYER_BANNED',
      username,
      timestamp: new Date().toISOString()
    });

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });

    res.json({ success: true });
  });

  apiRouter.post('/admin/abuse', (req, res) => {
    const { type, target, amount, sender } = req.body;
    if (!type) return res.status(400).json({ error: 'Event type required' });

    const payload = JSON.stringify({
      type: 'ADMIN_ACTION',
      actionType: target === 'GLOBAL' ? 'ADMIN_ABUSE' : type,
      target: target || 'GLOBAL',
      abuseType: target === 'GLOBAL' ? type : undefined,
      amount: amount || 0,
      sender: sender || { username: 'SYSTEM', characterId: 'agent-x', frameId: 'obsidian' },
      timestamp: new Date().toISOString()
    });

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });

    res.json({ success: true });
  });

  apiRouter.post('/admin/game-of-the-week', (req, res) => {
    const { gameId, gameName } = req.body;
    if (!gameId) return res.status(400).json({ error: 'Game ID required' });

    const payload = JSON.stringify({
      type: 'GAME_OF_THE_WEEK',
      gameId,
      gameName,
      timestamp: new Date().toISOString()
    });

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });

    res.json({ success: true });
  });

  apiRouter.post('/admin/announce', (req, res) => {
    const { text, sender } = req.body;
    if (!text) return res.status(400).json({ error: 'Announcement text required' });
    
    const announcementPayload = JSON.stringify({
      type: 'ADMIN_ANNOUNCEMENT',
      text,
      sender: sender || { username: 'System', characterId: 'agent-x', frameId: 'obsidian' },
      timestamp: new Date().toISOString()
    });

    const chatPayload = JSON.stringify({
      type: 'CHAT_MESSAGE',
      id: 'announcement-' + Date.now(),
      username: (sender?.username || 'System').toUpperCase(),
      text: text.toUpperCase(),
      character: sender?.characterId || 'agent-x',
      frame: sender?.frameId || 'obsidian',
      isAdmin: true,
      isBoss: true,
      timestamp: new Date().toISOString()
    });

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(announcementPayload);
        client.send(chatPayload);
      }
    });
    res.json({ success: true });
  });

  apiRouter.post('/admin/action', (req, res) => {
    const { type, target } = req.body;
    if (!type || !target) return res.status(400).json({ error: 'Action type and target required' });

    const payload = JSON.stringify({
      ...req.body,
      type: 'ADMIN_ACTION',
      actionType: type, // for backward compatibility if needed
      timestamp: new Date().toISOString()
    });

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
    res.json({ success: true });
  });

  // Mount the API router
  app.use('/api', apiRouter);

  // --- API CATCH-ALL ---
  app.all('/api/*', (req, res) => {
    console.warn(`API route not found: ${req.method} ${req.url}`);
    res.status(404).json({ error: 'API route not found', method: req.method, path: req.url });
  });

  // --- WEBSOCKET CHAT ---
  wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('New client connected');

    ws.on('message', (data) => {
      const message = JSON.parse(data.toString());
      
      let payload;
      if (message.type === 'DELETE_MESSAGE') {
        payload = JSON.stringify({
          type: 'DELETE_MESSAGE',
          messageId: message.messageId
        });
      } else if (message.type === 'ADMIN_ANNOUNCEMENT') {
        payload = JSON.stringify({
          type: 'ADMIN_ANNOUNCEMENT',
          text: message.text,
          timestamp: new Date().toISOString()
        });
      } else if (message.type === 'GAME_START' || message.type === 'GAME_END') {
        totalGamesPlayed++;
        return; // Don't broadcast game events for now
      } else {
        totalMessages++;
        // Broadcast to all clients
        payload = JSON.stringify({
          type: 'CHAT_MESSAGE',
          ...message,
          timestamp: new Date().toISOString()
        });
      }

      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(payload);
        }
      });
    });

    ws.on('close', () => {
      clients.delete(ws);
      console.log('Client disconnected');
    });
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
