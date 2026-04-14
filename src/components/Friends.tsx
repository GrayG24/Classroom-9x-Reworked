import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, UserPlus, UserMinus, Check, X, User, MessageSquare, Shield, Star, Trophy, Clock, Users } from 'lucide-react';
import { User as UserType } from '../types';

interface FriendsProps {
  user: UserType;
  onUpdateUser: (updatedUser: UserType) => void;
}

export const Friends: React.FC<FriendsProps> = ({ user, onUpdateUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'search'>('friends');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  // Mock data for search results - in a real app this would be an API call
  const mockUsers = [
    { uid: 'user-1', username: 'CyberGhost', level: 42, currentCharacter: 'agent-x', gamesPlayed: 156, currentTitle: 'Elite Operative' },
    { uid: 'user-2', username: 'NeonViper', level: 28, currentCharacter: 'viper', gamesPlayed: 89, currentTitle: 'Street Racer' },
    { uid: 'user-3', username: 'VoidWalker', level: 65, currentCharacter: 'phantom', gamesPlayed: 432, currentTitle: 'Void Master' },
    { uid: 'user-4', username: 'PixelKnight', level: 12, currentCharacter: 'titan', gamesPlayed: 34, currentTitle: 'Squire' },
  ];

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const filtered = mockUsers.filter(u => 
          u.username.toLowerCase().includes(searchQuery.toLowerCase()) && 
          u.uid !== user.uid
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, user.uid]);

  const handleSendRequest = (targetUid: string) => {
    if (user.sentRequests.includes(targetUid)) return;
    onUpdateUser({
      ...user,
      sentRequests: [...user.sentRequests, targetUid]
    });
  };

  const handleAcceptRequest = (targetUid: string) => {
    onUpdateUser({
      ...user,
      friendRequests: user.friendRequests.filter(id => id !== targetUid),
      friends: [...user.friends, targetUid]
    });
  };

  const handleDeclineRequest = (targetUid: string) => {
    onUpdateUser({
      ...user,
      friendRequests: user.friendRequests.filter(id => id !== targetUid)
    });
  };

  const handleRemoveFriend = (targetUid: string) => {
    onUpdateUser({
      ...user,
      friends: user.friends.filter(id => id !== targetUid)
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic mb-8">SOCIAL HUB</h1>
          
          <div className="flex flex-col gap-2">
            {[
              { id: 'friends', label: 'Friends', count: user.friends.length },
              { id: 'requests', label: 'Requests', count: user.friendRequests.length },
              { id: 'search', label: 'Find Users' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center justify-between px-6 py-4 rounded-2xl transition-all font-black text-[11px] uppercase tracking-widest italic ${
                  activeTab === tab.id 
                    ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[9px] ${activeTab === tab.id ? 'bg-black text-white' : 'bg-white/10 text-white'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === 'search' && (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                  <input
                    type="text"
                    placeholder="SEARCH BY USERNAME..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-3xl py-6 pl-16 pr-8 text-white font-black text-sm uppercase tracking-widest focus:outline-none focus:border-white/30 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {searchResults.map((u) => (
                    <div key={u.uid} className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex items-center gap-4 hover:border-white/20 transition-all group">
                      <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-white shrink-0">
                        <User size={32} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-black uppercase tracking-tight italic truncate">{u.username}</h3>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest italic">LVL {u.level} // {u.currentTitle}</p>
                      </div>
                      <button
                        onClick={() => handleSendRequest(u.uid)}
                        disabled={user.sentRequests.includes(u.uid) || user.friends.includes(u.uid)}
                        className={`p-4 rounded-2xl transition-all ${
                          user.sentRequests.includes(u.uid) || user.friends.includes(u.uid)
                            ? 'bg-white/5 text-white/20 cursor-not-allowed'
                            : 'bg-white/10 text-white hover:bg-white hover:text-black'
                        }`}
                      >
                        {user.friends.includes(u.uid) ? <Check size={20} /> : <UserPlus size={20} />}
                      </button>
                    </div>
                  ))}
                  {searchQuery && searchResults.length === 0 && !isSearching && (
                    <div className="col-span-full py-20 text-center">
                      <p className="text-white/20 font-black uppercase tracking-[0.5em] italic">NO USERS FOUND</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'friends' && (
              <motion.div
                key="friends"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {user.friends.length === 0 ? (
                  <div className="py-40 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                    <Users size={64} className="text-white/10 mx-auto mb-6" />
                    <p className="text-white/20 font-black uppercase tracking-[0.5em] italic">NO FRIENDS YET</p>
                    <button 
                      onClick={() => setActiveTab('search')}
                      className="mt-8 px-8 py-4 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest italic transition-all"
                    >
                      FIND PLAYERS
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {user.friends.map((friendId) => {
                      // In a real app, fetch friend details from DB
                      const friend = mockUsers.find(u => u.uid === friendId) || { username: 'Unknown Player', level: 0, currentTitle: 'Offline' };
                      return (
                        <div key={friendId} className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex items-center gap-4 hover:border-white/20 transition-all group">
                          <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-white shrink-0">
                            <User size={32} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-black uppercase tracking-tight italic truncate">{friend.username}</h3>
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest italic">LVL {friend.level} // {friend.currentTitle}</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-4 rounded-2xl bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all">
                              <MessageSquare size={20} />
                            </button>
                            <button 
                              onClick={() => handleRemoveFriend(friendId)}
                              className="p-4 rounded-2xl bg-white/5 text-white/40 hover:bg-rose-500/20 hover:text-rose-500 transition-all"
                            >
                              <UserMinus size={20} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'requests' && (
              <motion.div
                key="requests"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {user.friendRequests.length === 0 ? (
                  <div className="py-40 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                    <Clock size={64} className="text-white/10 mx-auto mb-6" />
                    <p className="text-white/20 font-black uppercase tracking-[0.5em] italic">NO PENDING REQUESTS</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {user.friendRequests.map((requestId) => {
                      const requester = mockUsers.find(u => u.uid === requestId) || { username: 'Unknown Player', level: 0 };
                      return (
                        <div key={requestId} className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-white shrink-0">
                            <User size={32} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-black uppercase tracking-tight italic truncate">{requester.username}</h3>
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest italic">WANTS TO BE YOUR FRIEND</p>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleAcceptRequest(requestId)}
                              className="px-6 py-4 rounded-2xl bg-emerald-500 text-black font-black text-[10px] uppercase tracking-widest italic hover:bg-emerald-400 transition-all"
                            >
                              ACCEPT
                            </button>
                            <button 
                              onClick={() => handleDeclineRequest(requestId)}
                              className="px-6 py-4 rounded-2xl bg-white/5 text-white/40 hover:bg-white/10 hover:text-white font-black text-[10px] uppercase tracking-widest italic transition-all"
                            >
                              DECLINE
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
