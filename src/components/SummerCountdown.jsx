import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Cloud, Waves, Palmtree, Shell, Calendar, Clock, Sparkles } from 'lucide-react';

const SummerCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // June 5th, 2026 (assuming current context is May 2026)
      const targetDate = new Date('2026-06-05T00:00:00');
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'Days', value: timeLeft.days, color: 'from-orange-400 to-amber-500' },
    { label: 'Hours', value: timeLeft.hours, color: 'from-amber-400 to-yellow-500' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'from-yellow-400 to-orange-500' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'from-orange-500 to-rose-500' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-8 bg-[#0a0500] overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-2xl shadow-orange-500/20 mb-6"
          >
            <Sun size={40} className="text-white animate-pulse" />
          </motion.div>
          
          <h1 className="text-7xl font-black text-white italic tracking-tighter uppercase">
            Summer <span className="text-orange-400">Break</span>
          </h1>
          <p className="text-white/40 font-black uppercase tracking-[0.4em] text-xs italic">
            Countdown to June 5th, 2026
          </p>
        </div>

        {/* Countdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative group h-64"
            >
              <div className="absolute inset-0 bg-white/[0.02] border border-white/5 rounded-[2.5rem] backdrop-blur-xl transition-all duration-500 group-hover:bg-white/[0.05] group-hover:border-white/10 group-hover:-translate-y-2" />
              
              <div className="relative h-full flex flex-col items-center justify-center p-8">
                <span className={`text-8xl font-black italic tracking-tighter bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {String(stat.value).padStart(2, '0')}
                </span>
                <span className="text-xs font-black text-white/30 uppercase tracking-[0.3em] italic">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-md space-y-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-400/10 flex items-center justify-center text-orange-400">
              <Calendar size={24} />
            </div>
            <div>
              <h3 className="text-white font-black italic uppercase tracking-wider mb-2">Final Day</h3>
              <p className="text-white/40 text-sm leading-relaxed">The school year officially ends on June 5th. Pack your bags and get ready for the heat!</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-8 rounded-[2rem] bg-gradient-to-br from-orange-400/10 to-rose-500/10 border border-white/10 backdrop-blur-md space-y-6 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Palmtree size={80} className="group-hover:rotate-12 transition-transform duration-700" />
            </div>
            <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 flex items-center justify-center text-yellow-400">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="text-white font-black italic uppercase tracking-wider mb-2">Summer Vibe</h3>
              <p className="text-white/40 text-sm leading-relaxed">Freedom is just around the corner. No more homework, just unlimited gaming sessions and beach days.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-md space-y-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-400/10 flex items-center justify-center text-rose-400">
              <Waves size={24} />
            </div>
            <div>
              <h3 className="text-white font-black italic uppercase tracking-wider mb-2">Vacation Mode</h3>
              <p className="text-white/40 text-sm leading-relaxed">Prepare your gear. Whether it's travel or relaxation, make this summer the most memorable one yet.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Animated Icons */}
      <FloatingIcon icon={Palmtree} delay={1} top="20%" left="10%" size={24} />
      <FloatingIcon icon={Waves} delay={2} top="15%" right="15%" size={20} />
      <FloatingIcon icon={Shell} delay={3} bottom="20%" left="5%" size={18} />
    </div>
  );
};

const FloatingIcon = ({ icon: Icon, delay, top, left, right, bottom, size }) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
      opacity: [0.1, 0.2, 0.1]
    }}
    transition={{
      duration: 5,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{ position: 'absolute', top, left, right, bottom }}
    className="text-orange-400 pointer-events-none"
  >
    <Icon size={size} />
  </motion.div>
);

export default SummerCountdown;
