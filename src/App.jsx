import React, { useState, useEffect, useMemo, useRef } from 'react';
import { AppRoute } from './types.js';
import { GAMES_DATA, BADGES, QUEST_POOL } from './constants.js';
import { Layout } from './components/Layout.jsx';
import { Home } from './components/Home.jsx';
import { GameModal } from './components/GameModal.jsx';
import { ProfileModal } from './components/ProfileModal.jsx';
import { CategoryPage } from './components/CategoryPage.jsx';
import { Favorites } from './components/Favorites.jsx';
import { Library } from './components/Library.jsx';
import { Settings } from './components/Settings.jsx';
import { Customization } from './components/Customization.jsx';
import { InitialNameModal } from './components/InitialNameModal.jsx';
import { Footer } from './components/Footer.jsx';
import { Bell, Star, Zap, Shield, Trophy, Palette, Layers, Bot, X, Crown, ZapOff } from 'lucide-react';

const EXP_PER_PLAY = 25;
const LEVEL_UP_BASE = 200;

const getRandomQuests = (pool, count) => {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const DEFAULT_USER = {
  username: 'Player',
  exp: 0,
  level: 1,
  gamesPlayed: 0,
  currentTheme: 'cyan',
  unlockedThemes: ['cyan'],
  currentFrame: 'obsidian',
  unlockedFrames: ['obsidian'],
  currentCharacter: 'agent-x',
  unlockedCharacters: ['agent-x'],
  unlockedCursors: ['default'],
  unlockedBadges: [],
  redeemedCodes: [],
  favorites: [],
  featuredBadgeId: null,
  score: 0,
  hasSetProfile: false,
  customTheme: {
    primary: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.6)',
    bg: '#020617'
  },
  settings: {
    customCursor: true,
    cursorStyle: 'default',
    animatedBg: true,
    notifications: true,
    homeBanner: true,
    lagNotifications: true,
    performanceMode: false
  }
};

const App = () => {
  const [currentView, setCurrentView] = useState(AppRoute.HOME);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(DEFAULT_USER);
  const [activeGame, setActiveGame] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showInitialModal, setShowInitialModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [quests, setQuests] = useState([]);
  const [boosts, setBoosts] = useState([]);
  const lastNotifiedLevel = useRef(user.level);
  const lastNotifiedThemesCount = useRef(user.unlockedThemes.length);
  const lastNotifiedFramesCount = useRef(user.unlockedFrames.length);
  const lastNotifiedCharsCount = useRef(user.unlockedCharacters.length);
  const fpsHistory = useRef([]);
  const lastLagNotification = useRef(0);

  useEffect(() => {
    if (user.settings.performanceMode) {
      document.body.classList.add('performance-mode');
    } else {
      document.body.classList.remove('performance-mode');
    }
  }, [user.settings.performanceMode]);

  useEffect(() => {
    if (!user.settings.lagNotifications) return;

    let lastTime = performance.now();
    let frameCount = 0;

    const checkLag = () => {
      const now = performance.now();
      frameCount++;

      if (now - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        fpsHistory.current.push(fps);
        if (fpsHistory.current.length > 5) fpsHistory.current.shift();

        const avgFps = fpsHistory.current.reduce((a, b) => a + b, 0) / fpsHistory.current.length;
        
        if (avgFps < 30 && Date.now() - lastLagNotification.current > 60000) {
          addNotification('Lag Detected', 'The experience could be laggy. Try closing other tabs.', 'system', <ZapOff className="text-rose-500" />);
          lastLagNotification.current = Date.now();
        }

        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(checkLag);
    };

    const animId = requestAnimationFrame(checkLag);
    return () => cancelAnimationFrame(animId);
  }, [user.settings.lagNotifications]);

  useEffect(() => {
    if (user.level > lastNotifiedLevel.current) {
      addNotification('Level Up!', `You reached Level ${user.level}`, 'level', <Zap className="text-theme" />);
      lastNotifiedLevel.current = user.level;
    }
  }, [user.level]);

  useEffect(() => {
    if (user.unlockedThemes.length > lastNotifiedThemesCount.current) {
      const newTheme = user.unlockedThemes[user.unlockedThemes.length - 1];
      addNotification('Theme Unlocked!', `New theme: ${newTheme}`, 'system', <Star className="text-theme" />);
      lastNotifiedThemesCount.current = user.unlockedThemes.length;
    }
  }, [user.unlockedThemes]);

  useEffect(() => {
    if (user.unlockedFrames.length > lastNotifiedFramesCount.current) {
      const newFrame = user.unlockedFrames[user.unlockedFrames.length - 1];
      addNotification('Frame Unlocked!', `New frame: ${newFrame}`, 'system', <Shield className="text-theme" />);
      lastNotifiedFramesCount.current = user.unlockedFrames.length;
    }
  }, [user.unlockedFrames]);

  useEffect(() => {
    const isModalOpen = isProfileModalOpen || !!activeGame || showInitialModal;
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isProfileModalOpen, activeGame, showInitialModal]);

  useEffect(() => {
    if (user.unlockedCharacters.length > lastNotifiedCharsCount.current) {
      const newChar = user.unlockedCharacters[user.unlockedCharacters.length - 1];
      addNotification('Avatar Unlocked!', `New character: ${newChar}`, 'system', <Zap className="text-theme" />);
      lastNotifiedCharsCount.current = user.unlockedCharacters.length;
    }
  }, [user.unlockedCharacters]);

  const lastCompletedQuestsCount = useRef(quests.filter(q => q.isCompleted).length);

  useEffect(() => {
    const completedQuests = quests.filter(q => q.isCompleted);
    if (completedQuests.length > lastCompletedQuestsCount.current) {
      const latestQuest = completedQuests[completedQuests.length - 1];
      addNotification('Quest Completed!', latestQuest.title, 'system', <Trophy className="text-theme" />);
      lastCompletedQuestsCount.current = completedQuests.length;
    }
  }, [quests]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setBoosts(prev => prev.filter(b => b.expiresAt > now));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedQuests = localStorage.getItem('classroom9x_quests_v1');
    const lastQuestDate = localStorage.getItem('classroom9x_quest_date');
    const today = new Date().toISOString().split('T')[0];

    if (lastQuestDate === today && savedQuests && JSON.parse(savedQuests).length > 0) {
      setQuests(JSON.parse(savedQuests));
    } else {
      const dailyQuests = getRandomQuests(QUEST_POOL, 3);
      localStorage.setItem('classroom9x_quest_date', today);
      localStorage.setItem('classroom9x_quests_v1', JSON.stringify(dailyQuests));
      setQuests(dailyQuests);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('classroom9x_quests_v1', JSON.stringify(quests));
  }, [quests]);

  const updateQuestProgress = (type, amount = 1) => {
    setQuests(prev => prev.map(q => {
      if (q.questType === type && !q.isCompleted) {
        const newProgress = Math.min(q.progress + amount, q.target);
        const isCompleted = newProgress === q.target;
        return { ...q, progress: newProgress, isCompleted };
      }
      return q;
    }));
  };

  const handleClaimQuestReward = (questId) => {
    const quest = quests.find(q => q.id === questId);
    if (quest && quest.isCompleted) {
      if (quest.type === 'exp') {
        const multiplier = boosts.reduce((acc, b) => acc + (b.multiplier - 1), 1);
        const finalReward = Math.floor(quest.reward * multiplier);
        setUser(prev => ({ ...prev, exp: prev.exp + finalReward }));
        addNotification('Reward Claimed!', `+${finalReward} EXP Added`, 'level', <Zap className="text-theme" />);
      } else if (quest.type === 'rare') {
        setUser(prev => ({ ...prev, score: prev.score + 1000 }));
        addNotification('Rare Reward!', 'Score Boost Activated', 'badge', <Star className="text-amber-400" />);
        setBoosts(prev => [...prev, { id: Math.random().toString(), name: 'Rare Boost', multiplier: 2.0, expiresAt: Date.now() + 3600000 }]);
      } else if (quest.type === 'item' && quest.rewardItem) {
        const item = quest.rewardItem;
        setUser(prev => {
          const updates = {};
          if (item.type === 'frame') updates.unlockedFrames = Array.from(new Set([...(prev.unlockedFrames || []), item.id]));
          if (item.type === 'character') updates.unlockedCharacters = Array.from(new Set([...(prev.unlockedCharacters || []), item.id]));
          if (item.type === 'theme') updates.unlockedThemes = Array.from(new Set([...(prev.unlockedThemes || []), item.id]));
          return { ...prev, ...updates };
        });
        addNotification('Item Unlocked!', item.name, 'system', <Trophy className="text-theme" />);
      }
      setQuests(prev => prev.map(q => {
        if (q.id === questId) {
          return { ...q, claimed: true };
        }
        return q;
      }));
    }
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addNotification = (title, message, type, icon, color) => {
    if (!user.settings.notifications) return;
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, title, message, type, icon, color }]);
    setTimeout(() => {
      removeNotification(id);
    }, 8000);
  };

  useEffect(() => {
    const savedStats = localStorage.getItem('classroom9x_local_profile_v4');
    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        const mergedUser = { ...DEFAULT_USER, ...parsed };
        setUser(mergedUser);
        if (!mergedUser.hasSetProfile) {
          setShowInitialModal(true);
        }
      } catch (e) {
        console.error("Failed to load profile", e);
        setShowInitialModal(true);
      }
    } else {
      setShowInitialModal(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('classroom9x_local_profile_v4', JSON.stringify(user));

    const body = document.getElementById('app-body');
    if (body) {
      body.setAttribute('data-theme', user.currentTheme);
      
      if (user.currentTheme === 'custom' && user.customTheme) {
        body.classList.add('custom-theme');
        body.style.setProperty('--primary', user.customTheme.primary);
        body.style.setProperty('--primary-glow', user.customTheme.glow);
        body.style.setProperty('--bg-dark', user.customTheme.bg);
      } else {
        body.classList.remove('custom-theme');
        body.style.removeProperty('--primary');
        body.style.removeProperty('--primary-glow');
        body.style.removeProperty('--bg-dark');
      }

      if (activeGame || isProfileModalOpen || showInitialModal) {
        body.style.overflow = 'hidden';
        body.classList.add('modal-open');
      } else {
        body.style.overflow = 'auto';
        body.classList.remove('modal-open');
      }

      const styles = ['default', 'amongus', 'star', 'crosshair', 'sword', 'neon', 'ring'];
      styles.forEach(s => body.classList.remove(`cursor-${s}`));

      if (user.settings.customCursor && !activeGame && user.currentTheme !== 'spongebob') {
        body.classList.add('custom-cursor-enabled');
        body.classList.add(`cursor-${user.settings.cursorStyle}`);
      } else {
        body.classList.remove('custom-cursor-enabled');
      }

      if (user.settings.animatedBg) {
        body.classList.add('animated-bg-enabled');
      } else {
        body.classList.remove('animated-bg-enabled');
      }
    }
  }, [user, activeGame]);

  const dailyPicks = useMemo(() => {
    const now = new Date();
    const estOffset = -5;
    const estDate = new Date(now.getTime() + (estOffset * 60 * 60 * 1000));
    const dateString = estDate.toISOString().split('T')[0];
    
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
      hash |= 0;
    }
    
    const seededRandom = () => {
      hash = Math.sin(hash) * 10000;
      return hash - Math.floor(hash);
    };

    const shuffled = [...GAMES_DATA].sort(() => seededRandom() - 0.5);
    return shuffled.slice(0, 3);
  }, []);

  useEffect(() => {
    if (!user) return;

    const checkBadge = (id) => {
      if (!user.unlockedBadges.includes(id)) {
        const badge = BADGES.find(b => b.id === id);
        if (badge) {
          setUser(prev => ({
            ...prev,
            unlockedBadges: [...prev.unlockedBadges, id]
          }));
          addNotification('Badge Unlocked!', badge.name, 'badge', <badge.icon className={badge.color === 'rainbow' ? 'mythic-rainbow-text' : ''} style={{ color: badge.color !== 'rainbow' ? badge.color : undefined }} />, badge.color);
        }
      }
    };

    if (user.gamesPlayed >= 1) checkBadge('first-contact');
    if (user.gamesPlayed >= 50) checkBadge('warlord');
    if (user.gamesPlayed >= 100) checkBadge('endurance');
    
    if (user.level >= 10) checkBadge('sentinel');
    if (user.level >= 50) checkBadge('elite-squad');
    if (user.level >= 100) checkBadge('overlord-badge');
    
    if (user.favorites.length >= 5) checkBadge('archivist');
    if (user.favorites.length >= 10) checkBadge('data-hoarder');
    
    if (user.unlockedThemes.length >= 8) checkBadge('chameleon');
    if (user.unlockedFrames.length >= 4) checkBadge('aesthetician');
    if (user.unlockedCharacters.length >= 4) checkBadge('recruiter');
    
    if (user.unlockedCharacters.includes('glitch')) checkBadge('the-glitch');
  }, [
    user?.level, 
    user?.gamesPlayed, 
    user?.favorites.length, 
    user?.unlockedThemes.length, 
    user?.unlockedFrames.length, 
    user?.unlockedCharacters.length
  ]);

  const addExpAndTrackPlay = (game) => {
    setUser(prev => {
      const multiplier = boosts.reduce((acc, b) => acc + (b.multiplier - 1), 1);
      const baseExp = 50;
      const bonusExp = Math.floor(Math.random() * 25);
      const earnedExp = Math.floor((baseExp + bonusExp) * multiplier);
      
      const newExp = prev.exp + earnedExp;
      const requiredForNext = prev.level * LEVEL_UP_BASE;
      const newGamesPlayed = (prev.gamesPlayed || 0) + 1;

      let newLevel = prev.level;
      let unlockedThemes = [...prev.unlockedThemes];
      let unlockedFrames = [...(prev.unlockedFrames || ['obsidian'])];
      let unlockedCharacters = [...(prev.unlockedCharacters || ['agent-x'])];

      if (newExp >= requiredForNext && newLevel < 999) {
        newLevel += 1;
        const themeUnlocks = {
          10: 'emerald', 15: 'violet', 20: 'cobalt', 75: 'gold', 100: 'galaxy'
        };
        if (themeUnlocks[newLevel] && !unlockedThemes.includes(themeUnlocks[newLevel])) {
          unlockedThemes.push(themeUnlocks[newLevel]);
        }

        const frameUnlocks = {
          5: 'default', 10: 'neon', 60: 'solar', 100: 'interstellar'
        };
        if (frameUnlocks[newLevel] && !unlockedFrames.includes(frameUnlocks[newLevel])) {
          unlockedFrames.push(frameUnlocks[newLevel]);
        }

        const charUnlocks = {
          15: 'viper', 30: 'ghost', 50: 'phantom', 75: 'titan', 90: 'nova', 100: 'overlord'
        };
        if (charUnlocks[newLevel] && !unlockedCharacters.includes(charUnlocks[newLevel])) {
          unlockedCharacters.push(charUnlocks[newLevel]);
        }
      }

      return { 
        ...prev, 
        exp: newLevel >= 999 ? 0 : newExp, 
        level: newLevel, 
        score: prev.score + (earnedExp * 5),
        unlockedThemes,
        unlockedFrames,
        unlockedCharacters,
        gamesPlayed: newGamesPlayed 
      };
    });
  };

  const setTheme = (theme) => setUser({ ...user, currentTheme: theme });
  const setFrame = (frame) => setUser({ ...user, currentFrame: frame });
  const setCharacter = (char) => setUser({ ...user, currentCharacter: char });

  const setFeaturedBadge = (badgeId) => {
    setUser(prev => ({ 
      ...prev, 
      featuredBadgeId: prev.featuredBadgeId === badgeId ? null : badgeId 
    }));
  };

  const updateSettings = (settings) => {
    setUser(prev => ({ ...prev, settings: { ...prev.settings, ...settings } }));
  };

  const redeemCode = (code) => {
    const cleanCode = code.trim().toLowerCase();
    const alreadyRedeemed = user.redeemedCodes?.includes(cleanCode);

    if (alreadyRedeemed && cleanCode !== 'codes211') {
      return { success: false, message: 'DECRYPTION KEY ALREADY USED' };
    }

    if (cleanCode === 'codes211') {
      setQuests(prev => prev.map(q => ({ ...q, progress: q.target, isCompleted: true })));
      addNotification('Daily Override', 'ALL DAILY OBJECTIVES COMPLETED', 'system', <Zap className="text-theme" />);
      return { success: true, message: 'OVERRIDE SUCCESSFUL: DAILY QUESTS COMPLETED' };
    }

    if (cleanCode === 'glitch') {
      setUser(prev => ({
        ...prev,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), 'glitch'])),
        unlockedFrames: Array.from(new Set([...(prev.unlockedFrames || []), 'glitch'])),
        unlockedCharacters: Array.from(new Set([...(prev.unlockedCharacters || []), 'glitch']))
      }));
      addNotification('Neural Link Established', 'PROTOCOL: GLITCH_EXPANSION_LOADED', 'system', <Zap className="text-theme" />);
      return { success: true, message: 'PROTOCOL BREACH: GLITCH CHARACTER ACQUIRED' };
    }

    if (cleanCode === 'rainbow') {
      setUser(prev => ({
        ...prev,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), 'rainbow'])),
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, 'rainbow']))
      }));
      addNotification('Neural Link Established', 'PROTOCOL: SPECTRUM_MODE_ACTIVE', 'system', <Palette className="text-theme" />);
      return { success: true, message: 'PROTOCOL INITIATED: SPECTRUM MODE UNLOCKED' };
    }

    if (cleanCode === 'spongebob') {
      setUser(prev => ({
        ...prev,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), 'spongebob'])),
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, 'spongebob'])),
        unlockedCharacters: Array.from(new Set([...(prev.unlockedCharacters || []), 'spongebob']))
      }));
      addNotification('Neural Link Established', 'PROTOCOL: BIKINI_BOTTOM_LINKED', 'system', <Star className="text-yellow-500" />);
      return { success: true, message: 'WHO LIVES IN A PINEAPPLE UNDER THE SEA? SPONGEBOB THEME & AVATAR UNLOCKED!' };
    }

    if (cleanCode === 'hologram') {
      setUser(prev => ({
        ...prev,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), 'hologram'])),
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, 'hologram'])),
        unlockedFrames: Array.from(new Set([...(prev.unlockedFrames || []), 'hologram']))
      }));
      addNotification('Neural Link Established', 'PROTOCOL: HOLO_MATRIX_SYNCED', 'system', <Layers className="text-theme" />);
      return { success: true, message: 'VIRTUAL DEPLOYMENT: HOLOGRAM MODULE & FRAME ACTIVATED' };
    }

    if (cleanCode === 'jarvis') {
      setUser(prev => ({
        ...prev,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), 'jarvis'])),
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, 'ironman'])),
        unlockedCharacters: Array.from(new Set([...(prev.unlockedCharacters || []), 'stark']))
      }));
      addNotification('Neural Link Established', 'PROTOCOL: JARVIS_ONLINE', 'system', <Bot className="text-theme" />);
      return { success: true, message: 'WELCOME HOME, SIR: STARK AVATAR UNLOCKED' };
    }

    if (cleanCode === 'merica') {
      setUser(prev => ({
        ...prev,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), 'merica'])),
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, 'usa'])),
        unlockedCharacters: Array.from(new Set([...(prev.unlockedCharacters || []), 'patriot']))
      }));
      addNotification('Neural Link Established', 'PROTOCOL: FREEDOM_SYNCED', 'system', <Zap className="text-theme" />);
      return { success: true, message: 'PROTOCOL INITIATED: USA THEME & PATRIOT AVATAR UNLOCKED' };
    }

    if (cleanCode === '9xisback') {
      const allThemes = ['cyan', 'emerald', 'violet', 'cobalt', 'gold', 'galaxy'];
      const allFrames = ['obsidian', 'default', 'neon', 'solar', 'interstellar'];
      const allChars = ['agent-x', 'viper', 'ghost', 'phantom', 'titan', 'nova', 'overlord'];
      setUser(prev => ({
        ...prev,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), '9xisback'])),
        level: prev.level + 10,
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, ...allThemes])),
        unlockedFrames: Array.from(new Set([...(prev.unlockedFrames || []), ...allFrames])),
        unlockedCharacters: Array.from(new Set([...(prev.unlockedCharacters || []), ...allChars]))
      }));
      addNotification('Code Redeemed!', 'PROFILE CLEARANCE GRANTED', 'system', <Shield className="text-theme" />);
      return { success: true, message: 'PROFILE CLEARANCE GRANTED: +10 LEVELS' };
    }

    if (cleanCode === 'admin6') {
      const allThemes = ['cyan', 'emerald', 'violet', 'cobalt', 'gold', 'galaxy', 'hologram', 'rainbow', 'ironman', 'spongebob', 'owner', 'synthwave', 'retrofuture', 'kanye', 'tester'];
      const allFrames = ['obsidian', 'default', 'neon', 'solar', 'interstellar', 'glitch', 'hologram', 'deep-sea', 'owner', 'diamond', 'cyberpunk', 'matrix', 'tester'];
      const allChars = ['agent-x', 'viper', 'ghost', 'phantom', 'titan', 'nova', 'overlord', 'spongebob', 'stark', 'glitch', 'doge-king', 'cyber-samurai', 'royal-knight', 'neon-cat', 'space-ranger', 'kanye', 'ye-mask'];
      const allBadges = BADGES.map(b => b.id);
      const allCodes = ['glitch', 'rainbow', 'spongebob', 'hologram', 'jarvis', '9xisback', 'admin6', 'imagenius', 'tester9832', 'owner', 'CODES211'];
      
      setUser(prev => ({
        ...prev,
        level: 999,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), ...allCodes])),
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, ...allThemes])),
        unlockedFrames: Array.from(new Set([...(prev.unlockedFrames || []), ...allFrames])),
        unlockedCharacters: Array.from(new Set([...(prev.unlockedCharacters || []), ...allChars])),
        unlockedBadges: Array.from(new Set([...(prev.unlockedBadges || []), ...allBadges])),
        currentTheme: 'owner',
        currentFrame: 'owner',
        score: 999999
      }));
      addNotification('ADMIN ACCESS GRANTED', 'WELCOME BACK, OWNER', 'system', <Crown className="text-theme" />);
      return { success: true, message: 'ADMIN PROTOCOL ACTIVATED: EVERYTHING UNLOCKED' };
    }

    if (cleanCode === 'imagenius') {
      const kanyeThemes = ['kanye'];
      const kanyeChars = ['kanye', 'ye-mask'];
      setUser(prev => ({
        ...prev,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), 'imagenius'])),
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, ...kanyeThemes])),
        unlockedCharacters: Array.from(new Set([...(prev.unlockedCharacters || []), ...kanyeChars])),
      }));
      addNotification('IMAGENIUS ACTIVATED', 'I AM A GOD', 'system', <Star className="text-theme" />);
      return { success: true, message: 'KANYE EXCLUSIVES UNLOCKED: GRADUATION THEME, YE, YE MASK' };
    }

    if (cleanCode === 'tester9832') {
      setUser(prev => ({
        ...prev,
        redeemedCodes: Array.from(new Set([...(prev.redeemedCodes || []), 'tester9832'])),
        unlockedThemes: Array.from(new Set([...prev.unlockedThemes, 'tester'])),
        unlockedFrames: Array.from(new Set([...(prev.unlockedFrames || []), 'tester'])),
        unlockedBadges: Array.from(new Set([...(prev.unlockedBadges || []), 'tester-badge'])),
      }));
      addNotification('Early Access Granted', 'WELCOME TESTER', 'system', <Trophy className="text-theme" />);
      return { success: true, message: 'EARLY ACCESS ITEMS UNLOCKED: TESTER THEME, TESTER FRAME, TESTER BADGE' };
    }
    return { success: false, message: 'INVALID DECRYPTION KEY' };
  };

  const toggleFavorite = (gameId) => {
    const isAdding = !user.favorites.includes(gameId);
    const newFavorites = isAdding 
      ? [...user.favorites, gameId]
      : user.favorites.filter(id => id !== gameId);
    setUser({ ...user, favorites: newFavorites });
  };

  const handleGameSelect = (game) => {
    setActiveGame(game);
    addExpAndTrackPlay(game);
    updateQuestProgress('play', 1);
    updateQuestProgress('score', 250);
  };

  const handleInitialNameSubmit = (name) => {
    setUser(prev => ({ ...prev, username: name, hasSetProfile: true }));
    setShowInitialModal(false);
  };

  const filteredGames = useMemo(() => {
    if (!searchQuery) return GAMES_DATA;
    return GAMES_DATA.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderContent = () => {
    if (searchQuery) return <Library games={filteredGames} favorites={user.favorites} onToggleFavorite={toggleFavorite} onPlayGame={handleGameSelect} />;
    switch (currentView) {
      case AppRoute.CATEGORY: return <CategoryPage categoryId={selectedCategoryId || ''} games={GAMES_DATA} favorites={user.favorites} onToggleFavorite={toggleFavorite} onPlayGame={handleGameSelect} />;
      case AppRoute.FAVORITES: return <Favorites games={GAMES_DATA} favorites={user.favorites} onToggleFavorite={toggleFavorite} onPlayGame={handleGameSelect} />;
      case AppRoute.LIBRARY: return <Library games={GAMES_DATA} favorites={user.favorites} onToggleFavorite={toggleFavorite} onPlayGame={handleGameSelect} />;
      case AppRoute.CUSTOMIZATION: return (
        <Customization 
          user={user}
          onSetTheme={setTheme}
          onSetFrame={setFrame}
          onSetCharacter={setCharacter}
          onSetBanner={(banner) => setUser(prev => ({ ...prev, currentBanner: banner }))}
          onSetCustomTheme={handleSetCustomTheme}
        />
      );
      case AppRoute.SETTINGS: return <Settings user={user} onUpdateSettings={updateSettings} onSetTheme={setTheme} onRedeemCode={redeemCode} />;
      default: return <Home user={user} games={GAMES_DATA} dailyPicks={dailyPicks} favorites={user.favorites} boosts={boosts} onToggleFavorite={toggleFavorite} onPlayGame={handleGameSelect} onSwitchToLibrary={() => setCurrentView(AppRoute.LIBRARY)} />;
    }
  };

  const handleSetCustomTheme = (config) => {
    setUser(prev => ({
      ...prev,
      customTheme: config,
      currentTheme: 'custom'
    }));
  };

  return (
    <Layout 
      user={user}
      onSearch={setSearchQuery} 
      onSetTheme={setTheme}
      currentView={currentView}
      selectedCategoryId={selectedCategoryId}
      onViewChange={(view, param) => {
        setCurrentView(view);
        setSelectedCategoryId(param || null);
        setSearchQuery('');
      }}
      onProfileClick={() => setIsProfileModalOpen(true)}
    >
      {renderContent()}
      <Footer />
      
      <div className="fixed bottom-8 left-8 z-[200] flex flex-col gap-4 pointer-events-none">
        {notifications.map(n => (
          <div 
            key={n.id} 
            className="group relative flex items-center gap-5 p-5 bg-slate-950/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-left duration-500 pointer-events-auto min-w-[320px] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className={`p-4 rounded-2xl shadow-lg ${
              n.type === 'level' ? 'bg-theme/20 text-theme shadow-theme/20' : 
              n.type === 'badge' ? 'bg-yellow-500/20 text-yellow-500 shadow-yellow-500/20' : 
              'bg-blue-500/20 text-blue-500 shadow-blue-500/20'
            }`}>
              {n.icon}
            </div>
            
            <div className="flex-1">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{n.title}</h4>
              <p className="text-sm font-bold text-white uppercase tracking-tight leading-tight">{n.message}</p>
            </div>

            <button 
              onClick={() => removeNotification(n.id)}
              className="p-2 text-slate-600 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <X size={16} />
            </button>

            <div className={`absolute bottom-0 left-0 h-1 transition-all duration-[8000ms] ease-linear ${
              n.color ? '' : (n.type === 'level' ? 'bg-theme' : n.type === 'badge' ? 'bg-yellow-500' : 'bg-blue-500')
            }`} style={{ 
              width: '100%', 
              animation: 'shrink-width 8s linear forwards',
              backgroundColor: n.color && n.color !== 'rainbow' ? n.color : undefined
            }}></div>
          </div>
        ))}
      </div>

      {activeGame && <GameModal game={activeGame} isFavorite={user.favorites.includes(activeGame.id)} onToggleFavorite={toggleFavorite} onClose={() => setActiveGame(null)} />}
      {isProfileModalOpen && (
        <ProfileModal 
          user={user} 
          quests={quests}
          onClaimQuestReward={handleClaimQuestReward}
          onSetFeaturedBadge={setFeaturedBadge}
          onClose={() => setIsProfileModalOpen(false)} 
        />
      )}
      {showInitialModal && <InitialNameModal onSubmit={handleInitialNameSubmit} />}
    </Layout>
  );
};

export default App;
