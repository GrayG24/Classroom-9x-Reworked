import React, { useState, useEffect } from 'react';
import { BookOpen, Calculator as CalcIcon, Globe, Atom, GraduationCap, Search, Menu, Bell, User, ChevronRight, Star, Clock, CheckCircle2, RotateCcw, Equal, Plus, Minus, X as CloseIcon, Divide, Percent } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CalculatorTool = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num) => {
    setDisplay(prev => prev === '0' ? String(num) : prev + num);
  };

  const handleOperator = (op) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
    } catch (e) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-md mx-auto">
      <div className="mb-6 text-right">
        <div className="text-slate-400 text-sm h-6 mb-1">{equation}</div>
        <div className="text-4xl font-bold text-slate-800 overflow-hidden">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <button onClick={clear} className="p-4 bg-slate-100 hover:bg-slate-200 rounded-2xl font-bold text-slate-600 transition-colors">AC</button>
        <button onClick={() => setDisplay(prev => String(parseFloat(prev) * -1))} className="p-4 bg-slate-100 hover:bg-slate-200 rounded-2xl font-bold text-slate-600 transition-colors">+/-</button>
        <button onClick={() => setDisplay(prev => String(parseFloat(prev) / 100))} className="p-4 bg-slate-100 hover:bg-slate-200 rounded-2xl font-bold text-slate-600 transition-colors">%</button>
        <button onClick={() => handleOperator('/')} className="p-4 bg-blue-500 hover:bg-blue-600 rounded-2xl font-bold text-white transition-colors flex items-center justify-center"><Divide size={20} /></button>
        
        {[7, 8, 9].map(n => <button key={n} onClick={() => handleNumber(n)} className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl font-bold text-slate-800 transition-colors">{n}</button>)}
        <button onClick={() => handleOperator('*')} className="p-4 bg-blue-500 hover:bg-blue-600 rounded-2xl font-bold text-white transition-colors flex items-center justify-center"><CloseIcon size={20} /></button>
        
        {[4, 5, 6].map(n => <button key={n} onClick={() => handleNumber(n)} className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl font-bold text-slate-800 transition-colors">{n}</button>)}
        <button onClick={() => handleOperator('-')} className="p-4 bg-blue-500 hover:bg-blue-600 rounded-2xl font-bold text-white transition-colors flex items-center justify-center"><Minus size={20} /></button>
        
        {[1, 2, 3].map(n => <button key={n} onClick={() => handleNumber(n)} className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl font-bold text-slate-800 transition-colors">{n}</button>)}
        <button onClick={() => handleOperator('+')} className="p-4 bg-blue-500 hover:bg-blue-600 rounded-2xl font-bold text-white transition-colors flex items-center justify-center"><Plus size={20} /></button>
        
        <button onClick={() => handleNumber(0)} className="col-span-2 p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl font-bold text-slate-800 transition-colors">0</button>
        <button onClick={() => setDisplay(prev => prev.includes('.') ? prev : prev + '.')} className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl font-bold text-slate-800 transition-colors">.</button>
        <button onClick={calculate} className="p-4 bg-emerald-500 hover:bg-emerald-600 rounded-2xl font-bold text-white transition-colors flex items-center justify-center"><Equal size={20} /></button>
      </div>
    </div>
  );
};

const UnitConverter = () => {
  const [value, setValue] = useState('1');
  const [type, setType] = useState('length'); // length, weight, temp
  const [from, setFrom] = useState('m');
  const [to, setTo] = useState('ft');
  const [result, setResult] = useState('3.28');

  const units = {
    length: { m: 1, ft: 3.28084, in: 39.3701, km: 0.001, mi: 0.000621371 },
    weight: { kg: 1, lb: 2.20462, oz: 35.274, g: 1000 },
    temp: { c: 'c', f: 'f', k: 'k' }
  };

  useEffect(() => {
    if (type === 'temp') {
      let v = parseFloat(value);
      if (isNaN(v)) return setResult('0');
      let celsius;
      if (from === 'c') celsius = v;
      else if (from === 'f') celsius = (v - 32) * 5/9;
      else celsius = v - 273.15;

      let res;
      if (to === 'c') res = celsius;
      else if (to === 'f') res = (celsius * 9/5) + 32;
      else res = celsius + 273.15;
      setResult(res.toFixed(2));
    } else {
      let v = parseFloat(value);
      if (isNaN(v)) return setResult('0');
      const res = (v / units[type][from]) * units[type][to];
      setResult(res.toFixed(4));
    }
  }, [value, from, to, type]);

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-2xl mx-auto">
      <div className="flex gap-4 mb-8">
        {['length', 'weight', 'temp'].map(t => (
          <button 
            key={t}
            onClick={() => { setType(t); setFrom(Object.keys(units[t])[0]); setTo(Object.keys(units[t])[1]); }}
            className={`px-4 py-2 rounded-xl font-bold text-sm capitalize transition-all ${type === t ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">From</label>
          <div className="flex gap-2">
            <input 
              type="number" 
              value={value} 
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all font-bold text-xl"
            />
            <select 
              value={from} 
              onChange={(e) => setFrom(e.target.value)}
              className="p-4 bg-slate-100 border-transparent rounded-2xl font-bold text-slate-700"
            >
              {Object.keys(units[type]).map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">To</label>
          <div className="flex gap-2">
            <div className="w-full p-4 bg-blue-50 border-transparent rounded-2xl font-bold text-xl text-blue-700">
              {result}
            </div>
            <select 
              value={to} 
              onChange={(e) => setTo(e.target.value)}
              className="p-4 bg-slate-100 border-transparent rounded-2xl font-bold text-slate-700"
            >
              {Object.keys(units[type]).map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScienceTool = () => {
  const elements = [
    { symbol: 'H', name: 'Hydrogen', mass: 1.008, group: 'nonmetal', pos: [1, 1] },
    { symbol: 'He', name: 'Helium', mass: 4.0026, group: 'noble', pos: [1, 18] },
    { symbol: 'Li', name: 'Lithium', mass: 6.94, group: 'alkali', pos: [2, 1] },
    { symbol: 'Be', name: 'Beryllium', mass: 9.0122, group: 'alkaline', pos: [2, 2] },
    { symbol: 'B', name: 'Boron', mass: 10.81, group: 'metalloid', pos: [2, 13] },
    { symbol: 'C', name: 'Carbon', mass: 12.011, group: 'nonmetal', pos: [2, 14] },
    { symbol: 'N', name: 'Nitrogen', mass: 14.007, group: 'nonmetal', pos: [2, 15] },
    { symbol: 'O', name: 'Oxygen', mass: 15.999, group: 'nonmetal', pos: [2, 16] },
    { symbol: 'F', name: 'Fluorine', mass: 18.998, group: 'halogen', pos: [2, 17] },
    { symbol: 'Ne', name: 'Neon', mass: 20.180, group: 'noble', pos: [2, 18] },
    { symbol: 'Na', name: 'Sodium', mass: 22.990, group: 'alkali', pos: [3, 1] },
    { symbol: 'Mg', name: 'Magnesium', mass: 24.305, group: 'alkaline', pos: [3, 2] },
    { symbol: 'Al', name: 'Aluminum', mass: 26.982, group: 'post-transition', pos: [3, 13] },
    { symbol: 'Si', name: 'Silicon', mass: 28.085, group: 'metalloid', pos: [3, 14] },
    { symbol: 'P', name: 'Phosphorus', mass: 30.974, group: 'nonmetal', pos: [3, 15] },
    { symbol: 'S', name: 'Sulfur', mass: 32.06, group: 'nonmetal', pos: [3, 16] },
    { symbol: 'Cl', name: 'Chlorine', mass: 35.45, group: 'halogen', pos: [3, 17] },
    { symbol: 'Ar', name: 'Argon', mass: 39.948, group: 'noble', pos: [3, 18] },
    { symbol: 'K', name: 'Potassium', mass: 39.098, group: 'alkali', pos: [4, 1] },
    { symbol: 'Ca', name: 'Calcium', mass: 40.078, group: 'alkaline', pos: [4, 2] },
    { symbol: 'Sc', name: 'Scandium', mass: 44.956, group: 'transition', pos: [4, 3] },
    { symbol: 'Ti', name: 'Titanium', mass: 47.867, group: 'transition', pos: [4, 4] },
    { symbol: 'V', name: 'Vanadium', mass: 50.942, group: 'transition', pos: [4, 5] },
    { symbol: 'Cr', name: 'Chromium', mass: 51.996, group: 'transition', pos: [4, 6] },
    { symbol: 'Mn', name: 'Manganese', mass: 54.938, group: 'transition', pos: [4, 7] },
    { symbol: 'Fe', name: 'Iron', mass: 55.845, group: 'transition', pos: [4, 8] },
    { symbol: 'Co', name: 'Cobalt', mass: 58.933, group: 'transition', pos: [4, 9] },
    { symbol: 'Ni', name: 'Nickel', mass: 58.693, group: 'transition', pos: [4, 10] },
    { symbol: 'Cu', name: 'Copper', mass: 63.546, group: 'transition', pos: [4, 11] },
    { symbol: 'Zn', name: 'Zinc', mass: 65.38, group: 'transition', pos: [4, 12] },
    { symbol: 'Ga', name: 'Gallium', mass: 69.723, group: 'post-transition', pos: [4, 13] },
    { symbol: 'Ge', name: 'Germanium', mass: 72.63, group: 'metalloid', pos: [4, 14] },
    { symbol: 'As', name: 'Arsenic', mass: 74.922, group: 'metalloid', pos: [4, 15] },
    { symbol: 'Se', name: 'Selenium', mass: 78.971, group: 'nonmetal', pos: [4, 16] },
    { symbol: 'Br', name: 'Bromine', mass: 79.904, group: 'halogen', pos: [4, 17] },
    { symbol: 'Kr', name: 'Krypton', mass: 83.798, group: 'noble', pos: [4, 18] },
    { symbol: 'Rb', name: 'Rubidium', mass: 85.468, group: 'alkali', pos: [5, 1] },
    { symbol: 'Sr', name: 'Strontium', mass: 87.62, group: 'alkaline', pos: [5, 2] },
    { symbol: 'Y', name: 'Yttrium', mass: 88.906, group: 'transition', pos: [5, 3] },
    { symbol: 'Zr', name: 'Zirconium', mass: 91.224, group: 'transition', pos: [5, 4] },
    { symbol: 'Nb', name: 'Niobium', mass: 92.906, group: 'transition', pos: [5, 5] },
    { symbol: 'Mo', name: 'Molybdenum', mass: 95.95, group: 'transition', pos: [5, 6] },
    { symbol: 'Tc', name: 'Technetium', mass: 98, group: 'transition', pos: [5, 7] },
    { symbol: 'Ru', name: 'Ruthenium', mass: 101.07, group: 'transition', pos: [5, 8] },
    { symbol: 'Rh', name: 'Rhodium', mass: 102.91, group: 'transition', pos: [5, 9] },
    { symbol: 'Pd', name: 'Palladium', mass: 106.42, group: 'transition', pos: [5, 10] },
    { symbol: 'Ag', name: 'Silver', mass: 107.87, group: 'transition', pos: [5, 11] },
    { symbol: 'Cd', name: 'Cadmium', mass: 112.41, group: 'transition', pos: [5, 12] },
    { symbol: 'In', name: 'Indium', mass: 114.82, group: 'post-transition', pos: [5, 13] },
    { symbol: 'Sn', name: 'Tin', mass: 118.71, group: 'post-transition', pos: [5, 14] },
    { symbol: 'Sb', name: 'Antimony', mass: 121.76, group: 'metalloid', pos: [5, 15] },
    { symbol: 'Te', name: 'Tellurium', mass: 127.6, group: 'metalloid', pos: [5, 16] },
    { symbol: 'I', name: 'Iodine', mass: 126.9, group: 'halogen', pos: [5, 17] },
    { symbol: 'Xe', name: 'Xenon', mass: 131.29, group: 'noble', pos: [5, 18] },
  ];

  const [selected, setSelected] = useState(elements[0]);

  const getGroupColor = (group) => {
    switch (group) {
      case 'nonmetal': return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      case 'noble': return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'alkali': return 'bg-red-50 border-red-200 text-red-700';
      case 'alkaline': return 'bg-orange-50 border-orange-200 text-orange-700';
      case 'metalloid': return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'halogen': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'transition': return 'bg-slate-50 border-slate-200 text-slate-700';
      case 'post-transition': return 'bg-indigo-50 border-indigo-200 text-indigo-700';
      default: return 'bg-white border-slate-100';
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-5xl mx-auto overflow-x-auto">
      <div className="min-w-[800px]">
        <h3 className="text-xl font-bold text-slate-800 mb-8">Interactive Periodic Table</h3>
        <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-1 mb-12">
          {Array.from({ length: 5 }).map((_, rowIdx) => (
            Array.from({ length: 18 }).map((_, colIdx) => {
              const element = elements.find(el => el.pos[0] === rowIdx + 1 && el.pos[1] === colIdx + 1);
              if (!element) return <div key={`${rowIdx}-${colIdx}`} className="aspect-square"></div>;
              return (
                <button 
                  key={element.symbol}
                  onClick={() => setSelected(element)}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center border transition-all p-1 ${
                    selected.symbol === element.symbol ? 'ring-2 ring-blue-500 scale-110 z-10 shadow-lg' : 'hover:scale-105'
                  } ${getGroupColor(element.group)}`}
                >
                  <span className="text-[8px] font-bold opacity-60">{element.pos[0] * 10 + element.pos[1]}</span>
                  <span className="text-sm font-black">{element.symbol}</span>
                </button>
              );
            })
          ))}
        </div>
        
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-center gap-8">
          <div className={`w-32 h-32 rounded-3xl border-4 flex flex-col items-center justify-center shadow-xl ${getGroupColor(selected.group)}`}>
            <span className="text-xs font-bold opacity-60 mb-1">{selected.pos[0] * 10 + selected.pos[1]}</span>
            <span className="text-5xl font-black">{selected.symbol}</span>
          </div>
          <div className="text-center md:text-left flex-1">
            <h4 className="text-3xl font-bold text-slate-800 mb-2">{selected.name}</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Atomic Mass</p>
                <p className="text-lg font-bold text-slate-800">{selected.mass} u</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Category</p>
                <p className="text-lg font-bold text-blue-600 capitalize">{selected.group}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CalendarPlanner = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    { date: new Date(2026, 2, 4), title: 'Calculus Problem Set 4', type: 'urgent' },
    { date: new Date(2026, 2, 15), title: 'History Essay Draft', type: 'warning' },
    { date: new Date(2026, 2, 10), title: 'Chemistry Lab Report', type: 'info' },
  ]);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = daysInMonth(year, month);
  const offset = firstDayOfMonth(year, month);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-800">Calendar Planner</h2>
        <div className="flex gap-2">
          <button onClick={() => setCurrentDate(new Date(year, month - 1))} className="p-1 hover:bg-slate-100 rounded-lg transition-colors"><ChevronRight size={18} className="rotate-180" /></button>
          <span className="text-sm font-bold text-slate-600 min-w-[100px] text-center">{monthNames[month]} {year}</span>
          <button onClick={() => setCurrentDate(new Date(year, month + 1))} className="p-1 hover:bg-slate-100 rounded-lg transition-colors"><ChevronRight size={18} /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={`${d}-${i}`} className="text-[10px] font-bold text-slate-400 text-center py-1">{d}</div>
        ))}
        {Array.from({ length: offset }).map((_, i) => (
          <div key={`offset-${i}`} className="aspect-square"></div>
        ))}
        {Array.from({ length: days }).map((_, i) => {
          const day = i + 1;
          const hasEvent = events.some(e => e.date.getDate() === day && e.date.getMonth() === month && e.date.getFullYear() === year);
          const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
          
          return (
            <div 
              key={day} 
              className={`aspect-square flex items-center justify-center text-xs font-medium rounded-lg relative cursor-pointer transition-all ${
                isToday ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              {day}
              {hasEvent && !isToday && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="space-y-3 mt-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Upcoming Events</h3>
        {events.filter(e => e.date >= new Date(year, month, 1)).sort((a, b) => a.date - b.date).slice(0, 3).map((event, idx) => (
          <div key={idx} className="flex gap-3 items-center p-2 hover:bg-slate-50 rounded-xl transition-colors group">
            <div className={`w-2 h-2 rounded-full ${
              event.type === 'urgent' ? 'bg-red-500' : 
              event.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
            }`}></div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{event.title}</h4>
              <p className="text-[10px] text-slate-400">{event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-lg shadow-blue-600/20">
        Add New Event
      </button>
    </section>
  );
};

const NotesTool = () => {
  const [notes, setNotes] = useState('');
  
  useEffect(() => {
    const saved = localStorage.getItem('edu-notes');
    if (saved) setNotes(saved);
  }, []);

  const handleSave = (val) => {
    setNotes(val);
    localStorage.setItem('edu-notes', val);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-800">Quick Study Notes</h3>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Auto-saving...</span>
      </div>
      <textarea 
        value={notes}
        onChange={(e) => handleSave(e.target.value)}
        placeholder="Type your study notes here..."
        className="w-full h-96 p-6 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-700 resize-none"
      />
    </div>
  );
};

export const EducationalCloak = ({ onToggleCloak }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tools = [
    { id: 'calculator', title: 'Scientific Calculator', desc: 'Advanced math & logic', icon: <CalcIcon size={20} />, color: 'blue' },
    { id: 'units', title: 'Unit Converter', desc: 'Length, weight, & temp', icon: <RotateCcw size={20} />, color: 'purple' },
    { id: 'science', title: 'Science Tools', desc: 'Periodic table & data', icon: <Atom size={20} />, color: 'amber' },
    { id: 'notes', title: 'Study Notes', desc: 'Quick capture & save', icon: <BookOpen size={20} />, color: 'emerald' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'calculator': return <CalculatorTool />;
      case 'units': return <UnitConverter />;
      case 'science': return <ScienceTool />;
      case 'notes': return <NotesTool />;
      default: return (
        <>
          <header>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome back, Student</h1>
            <p className="text-slate-500">Your learning resources are ready. Stay productive!</p>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <BookOpen size={20} />
              </div>
              <div className="text-2xl font-bold text-slate-800">4</div>
              <div className="text-sm text-slate-500">Active Tools</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle2 size={20} />
              </div>
              <div className="text-2xl font-bold text-slate-800">100%</div>
              <div className="text-sm text-slate-500">System Status</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                <Clock size={20} />
              </div>
              <div className="text-2xl font-bold text-slate-800">24/7</div>
              <div className="text-sm text-slate-500">Availability</div>
            </div>
          </div>

          {/* Tools Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Learning Tools</h2>
              <button className="text-blue-600 text-sm font-semibold hover:underline">View all</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {tools.map((tool, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -4 }}
                  onClick={() => setActiveTab(tool.id)}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group cursor-pointer"
                >
                  <div className={`h-2 w-full bg-${tool.color}-500`}></div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg bg-${tool.color}-50 text-${tool.color}-600`}>
                        {tool.icon}
                      </div>
                      <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{tool.title}</h3>
                    </div>
                    <p className="text-sm text-slate-500 mb-4">{tool.desc}</p>
                    <div className="flex items-center text-xs font-bold text-blue-600 uppercase tracking-wider">
                      Open Tool <ChevronRight size={14} className="ml-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-blue-600">
            <GraduationCap size={28} strokeWidth={2.5} />
            <span className="font-bold text-xl tracking-tight text-slate-800">EduPortal <span className="text-blue-600">Pro</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <button onClick={() => setActiveTab('dashboard')} className={`${activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-slate-800'} h-16 flex items-center transition-all`}>Dashboard</button>
            <button onClick={() => setActiveTab('calculator')} className={`${activeTab === 'calculator' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-slate-800'} h-16 flex items-center transition-all`}>Calculator</button>
            <button onClick={() => setActiveTab('units')} className={`${activeTab === 'units' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-slate-800'} h-16 flex items-center transition-all`}>Unit Converter</button>
            <button onClick={() => setActiveTab('science')} className={`${activeTab === 'science' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-slate-800'} h-16 flex items-center transition-all`}>Science Tools</button>
            <button onClick={() => setActiveTab('notes')} className={`${activeTab === 'notes' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-slate-800'} h-16 flex items-center transition-all`}>Notes</button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search resources..." 
              className="pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64"
            />
          </div>
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
            ST
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <CalendarPlanner />
          </div>
        </div>
      </div>

      {/* Secret Toggle Button - Hidden in plain sight */}
      <footer className="mt-20 border-t border-slate-200 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 text-slate-400">
            <GraduationCap size={20} />
            <span className="text-sm font-medium">© 2026 EduPortal Learning Systems. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-slate-400 text-sm font-medium">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Contact Support</a>
            {/* The Secret Button - Looks like a math symbol in the footer */}
            <button 
              onClick={onToggleCloak}
              className="w-6 h-6 flex items-center justify-center hover:text-blue-600 transition-colors cursor-default opacity-20 hover:opacity-100"
              title="System Info"
            >
              <Atom size={14} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

