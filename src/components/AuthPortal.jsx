import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  auth, 
  db 
} from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInAnonymously,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { 
  Mail, 
  Lock, 
  UserPlus, 
  UserCheck, 
  ShieldAlert, 
  Chrome, 
  Compass, 
  X, 
  Loader2, 
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';

const AuthPortal = ({ isOpen, onClose, addNotification }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login', 'register', 'guest'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all core fields.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      if (activeTab === 'login') {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        if (addNotification) {
          addNotification('WELCOME BACK', `Logged in as ${userCred.user.email}`, 'success');
        }
        onClose();
      } else {
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters.');
        }
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        if (addNotification) {
          addNotification('ACCOUNT CREATED', 'Welcome to Classroom 9X!', 'success');
        }
        onClose();
      }
    } catch (err) {
      console.error('Email Auth Error:', err);
      const code = err?.code || '';
      const msg = err?.message || String(err || '');
      const fullErrorStr = `${code} ${msg}`.toLowerCase();

      let errMsg = 'An unexpected error occurred during authentication.';

      if (code === 'auth/invalid-credential' || fullErrorStr.includes('invalid-credential') || fullErrorStr.includes('user-not-found')) {
        if (activeTab === 'login') {
          errMsg = 'Incorrect email or password. Please double check your spelling, or select the "Sign Up" tab to register a new account.';
        } else {
          errMsg = 'This account credential is invalid or already in use. Try selecting the "Log In" tab above.';
        }
      } else if (fullErrorStr.includes('email-already-in-use')) {
        errMsg = 'Incorrect password. Please try again.';
      } else if (fullErrorStr.includes('invalid-email')) {
        errMsg = 'Invalid email address format. Please enter a valid email.';
      } else if (fullErrorStr.includes('weak-password')) {
        errMsg = 'The password is too weak. It must be at least 6 characters.';
      } else if (fullErrorStr.includes('operation-not-allowed')) {
        errMsg = 'Email/Password sign-ins are not enabled in this Firebase Console. Please verify with the Firebase project administrator, or try Guest/Google Sign In.';
      } else if (fullErrorStr.includes('too-many-requests')) {
        errMsg = 'Too many failed login attempts. This account has been temporarily disabled. Try again later.';
      }
      
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const userCred = await signInWithPopup(auth, provider);
      if (addNotification) {
        addNotification('GOOGLE SIGN IN', `Access granted: ${userCred.user.displayName || userCred.user.email}`, 'success');
      }
      onClose();
    } catch (err) {
      console.error('Google Popup Auth Error:', err);
      setError('Google Sign-In failed inside the sandbox. Try signing in on a new page, or create a free online account below.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAuth = async () => {
    setLoading(true);
    setError('');
    try {
      const userCred = await signInAnonymously(auth);
      if (addNotification) {
        addNotification('GUEST SEQUENCE', 'Access granted as temporary user.', 'success');
      }
      onClose();
    } catch (err) {
      console.error('Anonymous Auth Error:', err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Anonymous sign-in is not enabled in the Firebase Console. Please create an account with email or open in a new tab.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10005] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-primary/5 blur-[150px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-sm bg-zinc-950/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl"
      >
        {/* Header Section */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-sans font-black text-primary uppercase tracking-[0.2em] italic">SIGN IN</span>
            <h3 className="text-xl font-bold font-sans text-white tracking-tight mt-1">Classroom 9X</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/5 rounded-lg transition-all text-white/50 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-zinc-800">
          <button
            onClick={() => { setActiveTab('login'); setError(''); }}
            className={`flex-1 py-3 text-xs font-mono font-bold tracking-widest uppercase transition-colors relative ${
              activeTab === 'login' ? 'text-primary' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Log In
            {activeTab === 'login' && (
              <motion.div layoutId="auth-tab-bar" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => { setActiveTab('register'); setError(''); }}
            className={`flex-1 py-3 text-xs font-mono font-bold tracking-widest uppercase transition-colors relative ${
              activeTab === 'register' ? 'text-primary' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Create Account
            {activeTab === 'register' && (
              <motion.div layoutId="auth-tab-bar" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => { setActiveTab('guest'); setError(''); }}
            className={`flex-1 py-3 text-xs font-mono font-bold tracking-widest uppercase transition-colors relative ${
              activeTab === 'guest' ? 'text-primary' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Guest
            {activeTab === 'guest' && (
              <motion.div layoutId="auth-tab-bar" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>

        <div className="p-6">
          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 text-xs leading-relaxed text-red-400 overflow-hidden"
              >
                <ShieldAlert size={16} className="text-red-500 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Handling (Login & Register) */}
          {(activeTab === 'login' || activeTab === 'register') && (
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-sans font-black text-zinc-500 uppercase tracking-widest">EMAIL ADDRESS</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    placeholder="name@school.com"
                    className="w-full h-11 pl-10 pr-4 bg-zinc-900 border border-zinc-800 focus:border-primary rounded-xl text-xs font-sans text-white placeholder-zinc-600 outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-sans font-black text-zinc-500 uppercase tracking-widest">PASSWORD</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    placeholder="••••••••"
                    className="w-full h-11 pl-10 pr-4 bg-zinc-900 border border-zinc-800 focus:border-primary rounded-xl text-xs font-sans text-white placeholder-zinc-600 outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-primary text-black font-sans font-black text-xs uppercase tracking-widest rounded-xl hover:bg-opacity-90 disabled:bg-zinc-800 disabled:text-zinc-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(var(--primary-rgb),0.25)]"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin text-black" />
                ) : activeTab === 'login' ? (
                  <>
                    <UserCheck size={16} />
                    Log In
                  </>
                ) : (
                  <>
                    <UserPlus size={16} />
                    Create Account
                  </>
                )}
              </button>
            </form>
          )}

          {/* Tab: guest login */}
          {activeTab === 'guest' && (
            <div className="space-y-4 text-center">
              <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-6">
                Play as a guest. Note that your levels, game scores, and customization progress <strong className="text-amber-500">will NOT be saved</strong>. Guest sessions are temporary and all progress is lost when you refresh or leave the site.
              </p>

              <button
                onClick={handleGuestAuth}
                disabled={loading}
                className="w-full h-11 border border-zinc-700/50 hover:border-zinc-500/80 bg-zinc-900 hover:bg-zinc-800/85 text-white font-sans font-black text-xs uppercase tracking-widest rounded-xl disabled:bg-zinc-950 disabled:text-zinc-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <Sparkles size={16} className="text-zinc-400" />
                    Play as Guest
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPortal;
