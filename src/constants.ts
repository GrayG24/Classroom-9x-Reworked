import { User, Zap, Ghost, Cat, Crown, Bot, ZapOff, Award, Star, Heart, Layers, Target, Palette, PanelsTopLeft, Binary, Activity, ShieldCheck, Rocket, Trophy } from 'lucide-react';

export const CATEGORIES = [
  { id: 'action', name: 'Action', icon: 'Sword' },
  { id: 'driving', name: 'Driving', icon: 'Car' },
  { id: 'puzzle', name: 'Puzzle', icon: 'BrainCircuit' },
  { id: 'sports', name: 'Sports', icon: 'Target' },
  { id: 'classic', name: 'Classics', icon: 'Gamepad2' },
  { id: 'casual', name: 'Casual', icon: 'Zap' },
];

export const CHARACTERS = [
  { id: 'agent-x', name: 'Agent X', level: 1, desc: 'Standard operative. Reliable and versatile.', icon: User },
  { id: 'viper', name: 'Viper', level: 15, desc: 'Speed specialist. Strikes before detection.', icon: Zap },
  { id: 'ghost', name: 'Ghost', level: 30, desc: 'Stealth expert. Infiltrates restricted sectors.', icon: Ghost },
  { id: 'phantom', name: 'Phantom', level: 50, desc: 'Ethereal presence. Moves between dimensions.', icon: ZapOff },
  { id: 'titan', name: 'Titan', level: 75, desc: 'Heavy combat unit. Unstoppable force.', icon: ShieldCheck },
  { id: 'nova', name: 'Nova', level: 90, desc: 'Stellar energy core. Radiant power.', icon: Star },
  { id: 'overlord', name: 'Overlord', level: 100, desc: 'System administrator. Total control.', icon: Crown },
  { id: 'spongebob', name: 'SpongeBob SquarePants', isCode: true, desc: 'Who lives in a pineapple under the sea? SPONGEBOB SQUAREPANTS!', img: 'https://i.pinimg.com/236x/2f/04/58/2f04582f337a1909f55340b30412f20d.jpg', icon: Star },
  { id: 'stark', name: 'Jarvis', isCode: true, desc: 'Advanced AI assistant. Integrated system intelligence.', img: 'https://i.pinimg.com/originals/60/98/2e/60982ea675870ee7b9703e29ab94ce55.jpg', icon: Bot },
  { id: 'kanye', name: 'Ye', isCode: true, desc: 'I am a genius. I am a god.', img: 'https://i.pinimg.com/originals/1b/d8/38/1bd838c7669dbb652d03ec21d0dc9573.jpg', icon: Star },
  { id: 'glitch', name: 'Glitch', isCode: true, desc: 'An anomaly in the system. Unpredictable.', icon: ZapOff },
  { id: 'doge-king', name: 'Doge King', isCode: true, desc: 'Exclusive quest reward. Much royalty. Very wow.', img: 'https://wallpapercave.com/wp/wp6956389.jpg', icon: Crown },
];

export const BADGES = [
  { id: 'first-contact', name: 'First Contact', requirement: 'Launch 1 Game', icon: Zap, color: '#94a3b8', rarity: 'Common' },
  { id: 'sentinel', name: 'Sentinel', requirement: 'Reach Level 10', icon: Award, color: '#22c55e', rarity: 'Uncommon' },
  { id: 'elite-squad', name: 'Elite Squad', requirement: 'Reach Level 50', icon: Star, color: '#3b82f6', rarity: 'Rare' },
  { id: 'overlord-badge', name: 'Overlord', requirement: 'Reach Level 100', icon: Crown, color: '#eab308', rarity: 'Legendary' },
  { id: 'archivist', name: 'Archivist', requirement: '5 Favorites', icon: Heart, color: '#22c55e', rarity: 'Uncommon' },
  { id: 'data-hoarder', name: 'Data Hoarder', requirement: '10 Favorites', icon: Layers, color: '#3b82f6', rarity: 'Rare' },
  { id: 'warlord', name: 'Warlord', requirement: '50 Games Played', icon: Target, color: '#3b82f6', rarity: 'Rare' },
  { id: 'chameleon', name: 'Chameleon', requirement: '8 Themes Unlocked', icon: Palette, color: '#ef4444', rarity: 'Epic' },
  { id: 'aesthetician', name: 'Aesthetician', requirement: '4 Frames Unlocked', icon: PanelsTopLeft, color: '#ef4444', rarity: 'Epic' },
  { id: 'recruiter', name: 'Recruiter', requirement: '4 Avatars Unlocked', icon: User, color: '#ef4444', rarity: 'Epic' },
  { id: 'the-glitch', name: 'The Glitch', requirement: 'Secret Module Found', icon: Binary, color: 'rainbow', rarity: 'Mythic' },
  { id: 'endurance', name: 'Endurance', requirement: '100 Games Played', icon: Activity, color: '#eab308', rarity: 'Legendary' },
  { id: 'owner-badge', name: 'Secret Owner', requirement: 'System Administrator Access', icon: Crown, color: '#facc15', rarity: 'Mythic' },
  { id: 'tester-badge', name: 'Early Access', requirement: 'Redeem TESTER9832', icon: Trophy, color: 'rainbow', rarity: 'Mythic' },
];

export const QUEST_POOL = [
  { id: 'play-50', title: 'Grand Master', description: 'Play 50 games to prove your absolute dedication.', reward: 2500, progress: 0, target: 50, isCompleted: false, rarity: 'common', type: 'exp', questType: 'play' },
  { id: 'score-25000', title: 'High Stakes', description: 'Reach a total score of 25,000.', reward: 1500, progress: 0, target: 25000, isCompleted: false, rarity: 'common', type: 'rare', questType: 'score' },
  { id: 'play-100', title: 'Centurion', description: 'Play 100 games to reach legendary status.', reward: 5000, progress: 0, target: 100, isCompleted: false, rarity: 'rare', type: 'exp', questType: 'play' },
  { id: 'fav-15', title: 'Curator', description: 'Favorite 15 different games to build your collection.', reward: 1000, progress: 0, target: 15, isCompleted: false, rarity: 'common', type: 'exp', questType: 'fav' },
  { id: 'score-50000', title: 'Millionaire Mindset', description: 'Reach a total score of 50,000.', reward: 3000, progress: 0, target: 50000, isCompleted: false, rarity: 'rare', type: 'rare', questType: 'score' },
  { id: 'play-200', title: 'Godlike', description: 'Play 200 games. Are you even human?', reward: 10000, progress: 0, target: 200, isCompleted: false, rarity: 'epic', type: 'exp', questType: 'play' },
  { 
    id: 'quest-exclusive-diamond', 
    title: 'Diamond Hands', 
    description: 'Play 500 games to unlock the exclusive "Diamond" Frame.', 
    reward: 0, 
    progress: 0, 
    target: 500, 
    isCompleted: false, 
    rarity: 'legendary',
    type: 'item',
    questType: 'play',
    rewardItem: {
      type: 'frame',
      id: 'diamond',
      name: 'Diamond Frame'
    }
  },
  { 
    id: 'quest-frame-cyberpunk', 
    title: 'Neon Runner', 
    description: 'Play 300 games to unlock the exclusive "Cyberpunk" Frame.', 
    reward: 0, 
    progress: 0, 
    target: 300, 
    isCompleted: false, 
    rarity: 'epic',
    type: 'item',
    questType: 'play',
    rewardItem: {
      type: 'frame',
      id: 'cyberpunk',
      name: 'Cyberpunk Frame'
    }
  },
  { 
    id: 'quest-theme-synthwave', 
    title: 'Outrun the Night', 
    description: 'Reach a total score of 150,000 to unlock the exclusive "Synthwave" Theme.', 
    reward: 0, 
    progress: 0, 
    target: 150000, 
    isCompleted: false, 
    rarity: 'legendary',
    type: 'item',
    questType: 'score',
    rewardItem: {
      type: 'theme',
      id: 'synthwave',
      name: 'Synthwave Theme'
    }
  },
  { 
    id: 'quest-frame-matrix', 
    title: 'The One', 
    description: 'Reach a total score of 75,000 to unlock the exclusive "Matrix" Frame.', 
    reward: 0, 
    progress: 0, 
    target: 75000, 
    isCompleted: false, 
    rarity: 'epic',
    type: 'item',
    questType: 'score',
    rewardItem: {
      type: 'frame',
      id: 'matrix',
      name: 'Matrix Frame'
    }
  },
  { 
    id: 'quest-theme-retrofuture', 
    title: 'Past Forward', 
    description: 'Play 600 games to unlock the exclusive "Retro Future" Theme.', 
    reward: 0, 
    progress: 0, 
    target: 600, 
    isCompleted: false, 
    rarity: 'legendary',
    type: 'item',
    questType: 'play',
    rewardItem: {
      type: 'theme',
      id: 'retrofuture',
      name: 'Retro Future Theme'
    }
  },
  { id: 'play-300', title: 'Eternal Gamer', description: 'Play 300 games. You are a legend.', reward: 20000, progress: 0, target: 300, isCompleted: false, rarity: 'epic', type: 'exp', questType: 'play' },
  { id: 'score-100000', title: 'System Overlord', description: 'Reach a total score of 100,000.', reward: 5000, progress: 0, target: 100000, isCompleted: false, rarity: 'legendary', type: 'rare', questType: 'score' },
  { 
    id: 'quest-avatar-dogeking', 
    title: 'Doge Royalty', 
    description: 'Play 150 games to unlock the exclusive "Doge King" Avatar.', 
    reward: 0, 
    progress: 0, 
    target: 150, 
    isCompleted: false, 
    rarity: 'rare',
    type: 'item',
    questType: 'play',
    rewardItem: {
      type: 'character',
      id: 'doge-king',
      name: 'Doge King Avatar'
    }
  }
];

export const GAMES_DATA = [
  {
    id: 'geometry-dash-fr',
    title: 'Geometry Dash',
    description: 'Jump and fly your way through danger in this rhythm-based action platformer! Test your reflexes in this ultra-challenging original version.',
    thumbnail: 'https://geometrydash-game.ru/wp-content/uploads/2021/07/95-954583_geometry-dash.jpg',
    iframeUrl: 'https://geometrydash.fr/wp-content/uploads/games/html5/G/geometry-dash/index.html',
    category: 'action',
    isFeatured: true,
    rating: 4.9
  },
  {
    id: 'ovo-classic',
    title: 'OvO',
    description: 'Fast-paced parkour platformer! Master the art of wall jumping, sliding, and diving to overcome increasingly complex obstacles and reach the flag.',
    thumbnail: 'https://www.numuki.com/game/card/ovo-game-5037.webp',
    iframeUrl: 'https://db.duck.tinyexams.com/html/ovo/index.html',
    category: 'action',
    isFeatured: true,
    rating: 4.8
  },
  {
    id: 'basket-random',
    title: 'Basket Random',
    description: 'Experience chaotic basketball fun with pixel physics! Control your team with one button and try to score in ever-changing environments.',
    thumbnail: 'https://www.fnfgo.com/wp-content/uploads/2024/01/Basket-Random.jpeg',
    iframeUrl: 'https://db.duck.tinyexams.com/html/basket_random/index.html',
    category: 'sports',
    isFeatured: true,
    rating: 4.7
  },
  {
    id: 'soccer-random',
    title: 'Boxing Random',
    description: 'Boxing like you have never seen it before! Two-player physics-based fun where one button is all you need to jump, punch, and knockout your opponent.',
    thumbnail: 'https://play-lh.googleusercontent.com/jku-om6R4p5KuvMRlOFjH6blrRjw1EnDb5S7h7WXm1J0bFrY18LXKbmjQnv7SDUWYn8=w526-h296',
    iframeUrl: 'https://labgstore311.github.io/g20/class-825',
    category: 'sports',
    isFeatured: true,
    rating: 4.6
  },
  {
    id: 'minecraft-classic-edition',
    title: 'Minecraft',
    description: 'Explore infinite worlds and build everything from the simplest of homes to the grandest of castles. Play the legendary sandbox classic unblocked in your browser.',
    thumbnail: 'https://wallpapercave.com/wp/wp6548068.jpg',
    iframeUrl: 'https://db.duck.tinyexams.com/html/minecraft/index.html',
    category: 'classic',
    isFeatured: true,
    rating: 4.9
  },
  {
    id: 'moto-x3m-classic',
    title: 'Moto X3M',
    description: 'The ultimate bike racing game with awesome stunts and tricky obstacles. Can you finish all levels with 3 stars?',
    thumbnail: 'https://motox3mgame.org/data/image/game/moto-x3m-bike-race-game1.png',
    iframeUrl: 'https://db.duck.tinyexams.com/html/motox3m/index.html',
    category: 'driving',
    isFeatured: true,
    rating: 4.8
  },
  {
    id: 'cookie-clicker-new',
    title: 'Cookie Clicker',
    description: 'The original idle game where you bake an absurd amount of cookies. Click the giant cookie and build an empire of bakers and upgrades!',
    thumbnail: 'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/ncom/software/switch/70010000066299/432bf350e866b2544f9a5cd80de83e0c24f4efddfd7811016c4aa33e48c5df7c',
    iframeUrl: 'https://db.duck.tinyexams.com/html/cookie_clicker/index.html',
    category: 'casual',
    isFeatured: true,
    rating: 4.9
  },
  {
    id: 'idle-breakout-classic',
    title: 'Idle Breakout',
    description: 'A modern take on the classic Atari Breakout. Buy balls, upgrade them, and destroy bricks in this addictive idle game.',
    thumbnail: 'https://23azo.com/images/idle-breakout.webp',
    iframeUrl: 'https://ubg67.gitlab.io/idle-breakout/',
    category: 'casual',
    isFeatured: true,
    rating: 4.5
  },
  {
    id: 'crazy-cattle-3d',
    title: 'Crazy Cattle 3D',
    description: 'Take control of the craziest cows in the pasture! Dash through 3D environments, dodge obstacles, and cause absolute bovine chaos in this high-energy action game.',
    thumbnail: 'https://i.kym-cdn.com/entries/icons/original/000/053/836/cc3dcovergood.jpg',
    iframeUrl: 'https://db.duck.tinyexams.com/html/crazycattle3d/index.html',
    category: 'action',
    isFeatured: true,
    rating: 4.4
  },
  {
    id: 'crossy-road-classic',
    title: 'Crossy Road',
    description: 'Why did the chicken cross the road? Dodge traffic, hop across logs, and avoid the eagle in this endless hopper classic!',
    thumbnail: 'https://cdn-www.bluestacks.com/bs-images/Banner_Video_Cover.jpg',
    iframeUrl: 'https://i.gamesgo.net/uploads/game/html5/4072/',
    category: 'action',
    isFeatured: true,
    rating: 4.7
  },
  {
    id: 'dino-game-classic',
    title: 'Dino Game',
    description: 'The legendary Chrome Dino runner! Help the T-Rex jump over cacti and dodge pterodactyls in this high-speed test of reflexes.',
    thumbnail: 'https://www.coolmathgames.com/sites/default/files/DinoGame_OG-logo.jpg',
    iframeUrl: 'https://gameshost.io/HTML5GAMES/dino/',
    category: 'classic',
    isFeatured: true,
    rating: 4.9
  },
  {
    id: 'doge-miner-classic',
    title: 'Doge Miner',
    description: 'Much dogecoin! Very wow! Click the doge to mine coins, hire workers, and travel to the moon in this iconic idle clicker game.',
    thumbnail: 'https://funkypotato.com/images/2017/03/doge-miner.jpg',
    iframeUrl: 'https://db.duck.tinyexams.com/html/doge_miner/index.html',
    category: 'casual',
    isFeatured: true,
    rating: 4.8
  },
  {
    id: 'doge-miner-2',
    title: 'Doge Miner 2',
    description: 'The epic sequel! Much more dogecoin! Explore new planets, hire more shibes, and reach for the stars in this ultimate clicker adventure.',
    thumbnail: 'https://dogeminer2.com/og-image.jpg',
    iframeUrl: 'https://machita66.com/d/dgmn2',
    category: 'casual',
    isFeatured: true,
    rating: 4.9
  },
  {
    id: 'drift-boss-pro',
    title: 'Drift Boss',
    description: 'The ultimate drifting challenge! Time your drifts perfectly to stay on the track in this addictive one-button driving game.',
    thumbnail: 'https://assets.humoq.com/cdn-cgi/image/quality=78,fit=cover,f=auto,width=3840/images/h512/drift-boss.webp',
    iframeUrl: 'https://db.duck.tinyexams.com/html/drift_boss/index.html',
    category: 'driving',
    isFeatured: true,
    rating: 4.6
  },
  {
    id: 'drive-mad-original',
    title: 'Drive Mad',
    description: 'Drive your way to the finish line in this physics-based driving game! Master various vehicles across challenging levels designed to test your precision.',
    thumbnail: 'https://watchdocumentaries.com/wp-content/uploads/drive-mad-game.jpg',
    iframeUrl: 'https://db.duck.tinyexams.com/html/drive_mad/index.html',
    category: 'driving',
    isFeatured: true,
    rating: 4.8
  },
  {
    id: 'dune-surfer',
    title: 'Dune',
    description: 'Conquer the desert sands in this high-speed physics platformer. Jump, flip, and land smoothly to gain score and survive the dunes.',
    thumbnail: 'https://avatars.mds.yandex.net/get-games/3006389/2a00000182b154e646f49ea496dc06df679b/cover1',
    iframeUrl: 'https://db.duck.tinyexams.com/html/dune/index.html',
    category: 'casual',
    isFeatured: true,
    rating: 4.5
  },
  {
    id: 'flappy-bird-classic',
    title: 'Flappy Bird',
    description: 'The legendary addictive bird-flapping game. Navigate through the pipes and try to set a high score in this unblocked classic!',
    thumbnail: 'https://wallpaperaccess.com/full/4622684.jpg',
    iframeUrl: 'https://db.duck.tinyexams.com/html/flappy_bird/index.html',
    category: 'casual',
    isFeatured: true,
    rating: 4.4
  }
];
