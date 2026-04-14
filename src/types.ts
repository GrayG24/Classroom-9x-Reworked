export enum AppRoute {
  HOME = 'home',
  LIBRARY = 'library',
  SETTINGS = 'settings',
  CUSTOMIZATION = 'customization',
  LEADERBOARD = 'leaderboard',
  APPS = 'apps',
  PROXY = 'proxy',
  CATEGORY = 'category',
  ADMIN = 'admin',
  FRIENDS = 'friends',
  CODES = 'codes'
}

export interface User {
  username: string;
  exp: number;
  level: number;
  gamesPlayed: number;
  currentTheme: string;
  unlockedThemes: string[];
  currentFrame: string;
  unlockedFrames: string[];
  currentCharacter: string;
  unlockedCharacters: string[];
  unlockedCursors: string[];
  unlockedBadges: string[];
  redeemedCodes: string[];
  favorites: string[];
  pinnedGames: string[];
  friends: string[];
  friendRequests: string[];
  sentRequests: string[];
  titles: string[];
  currentTitle: string;
  featuredBadgeId: string | null;
  score: number;
  uid: string;
  hasSetProfile: boolean;
  isAdmin: boolean;
  streak: number;
  lastLoginDate: string;
  customTheme: {
    primary: string;
    glow: string;
    bg: string;
  };
  settings: {
    customCursor: boolean;
    cursorStyle: string;
    animatedBg: boolean;
    uiOpacity: number;
    notifications: boolean;
    homeBanner: boolean;
    lagNotifications: boolean;
    performanceMode: boolean;
    showOnlinePlayers: boolean;
    showFPS: boolean;
    reducedMotion: boolean;
    lowQualityParticles: boolean;
    publicProfile: boolean;
    sidebarAutoHide: boolean;
    showChat: boolean;
    backgroundEffects: boolean;
    soundEnabled: boolean;
    liquidGlass: boolean;
    disableGlow: boolean;
    highContrast: boolean;
    compactMode: boolean;
    showTooltips: boolean;
    betaFeatures: {
      experimentalAnimations: boolean;
      debugOverlay: boolean;
      earlyAccessFeatures: boolean;
      aiChatAssistant: boolean;
    };
  };
}
