import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Search, FileText, Globe, GraduationCap, Calendar, Bell, User, Layout, LogOut } from 'lucide-react';

export const EducationalCloak = ({ onToggleCloak }) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#f0f2f5] text-[#1c1e21] font-sans overflow-auto selection:bg-[#1877f2]/20">
      {/* Top Navigation */}
      <nav className="bg-[#ffffff] border-b border-[#dddfe2] px-6 py-3 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-[#1877f2]">
            <GraduationCap size={32} fill="currentColor" />
            <span className="text-xl font-bold tracking-tight">EduPortal</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#65676b]">
            <a href="#" className="text-[#1877f2] border-b-2 border-[#1877f2] pb-4 -mb-4">Dashboard</a>
            <a href="#" className="hover:text-[#1c1e21] transition-colors">My Courses</a>
            <a href="#" className="hover:text-[#1c1e21] transition-colors">Assignments</a>
            <a href="#" className="hover:text-[#1c1e21] transition-colors">Grades</a>
            <a href="#" className="hover:text-[#1c1e21] transition-colors">Library</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="bg-[#f0f2f5] border-none rounded-full px-10 py-2 text-sm w-64 focus:ring-2 focus:ring-[#1877f2]/20 outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#65676b]" size={16} />
          </div>
          <button className="p-2 hover:bg-[#f0f2f5] rounded-full text-[#65676b] transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-[#dddfe2]">
            <div className="w-8 h-8 bg-[#1877f2] rounded-full flex items-center justify-center text-white text-xs font-bold">
              JD
            </div>
            <button onClick={onToggleCloak} className="text-[#65676b] hover:text-[#1c1e21]">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#dddfe2]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                <User size={24} />
              </div>
              <div>
                <h2 className="font-bold">John Doe</h2>
                <p className="text-xs text-[#65676b]">Student ID: 20260402</p>
              </div>
            </div>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 bg-[#1877f2]/10 text-[#1877f2] rounded-lg font-semibold text-sm">
                <Layout size={18} /> Overview
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-[#65676b] hover:bg-[#f0f2f5] rounded-lg font-semibold text-sm transition-colors">
                <Calendar size={18} /> Schedule
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-[#65676b] hover:bg-[#f0f2f5] rounded-lg font-semibold text-sm transition-colors">
                <FileText size={18} /> Documents
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#dddfe2]">
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-[#65676b]">Upcoming Deadlines</h3>
            <div className="space-y-4">
              {[
                { title: "Advanced Calculus Quiz", date: "Today, 11:59 PM", color: "bg-red-500" },
                { title: "Physics Lab Report", date: "Tomorrow, 5:00 PM", color: "bg-amber-500" },
                { title: "History Essay", date: "Friday, 11:59 PM", color: "bg-blue-500" }
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`w-1 h-10 rounded-full ${item.color}`}></div>
                  <div>
                    <p className="text-sm font-bold leading-tight">{item.title}</p>
                    <p className="text-[11px] text-[#65676b] mt-1">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Current Courses</h2>
              <button className="text-[#1877f2] text-sm font-semibold hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Introduction to Computer Science", code: "CS101", instructor: "Dr. Alan Turing", progress: 75, color: "bg-[#1877f2]" },
                { title: "Modern World History", code: "HIST202", instructor: "Prof. Diana Prince", progress: 40, color: "bg-emerald-500" },
                { title: "Advanced Mathematics", code: "MATH301", instructor: "Dr. Katherine Johnson", progress: 90, color: "bg-purple-500" },
                { title: "Quantum Physics", code: "PHYS404", instructor: "Dr. Richard Feynman", progress: 15, color: "bg-amber-500" }
              ].map((course, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#dddfe2] group cursor-pointer hover:shadow-md transition-shadow">
                  <div className={`h-24 ${course.color} p-6 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform">
                      <BookOpen size={64} />
                    </div>
                    <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                      {course.code}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-[#1877f2] transition-colors">{course.title}</h3>
                    <p className="text-sm text-[#65676b] mb-6">{course.instructor}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold text-[#65676b] uppercase tracking-widest">
                        <span>Course Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-[#f0f2f5] rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${course.color}`} 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-sm border border-[#dddfe2]">
            <h2 className="text-xl font-bold mb-6">Recent Announcements</h2>
            <div className="space-y-6">
              {[
                { title: "Campus Library Hours Update", date: "2 hours ago", content: "Starting next week, the main library will be open 24/7 for the final exam period. Please ensure you have your student ID for entry after 10 PM." },
                { title: "New Research Grants Available", date: "Yesterday", content: "The Department of Science is now accepting applications for the Summer 2026 Research Fellowship. Deadline for submission is April 15th." }
              ].map((ann, i) => (
                <div key={i} className="pb-6 border-b border-[#f0f2f5] last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-[#1877f2] hover:underline cursor-pointer">{ann.title}</h4>
                    <span className="text-xs text-[#65676b]">{ann.date}</span>
                  </div>
                  <p className="text-sm text-[#65676b] leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <footer className="bg-[#ffffff] border-t border-[#dddfe2] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#65676b]">
          <div className="flex items-center gap-2">
            <GraduationCap size={20} className="text-[#1877f2]" />
            <span className="font-bold text-[#1c1e21]">EduPortal</span>
            <span className="mx-2">|</span>
            <span>© 2026 University System</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Help Center</a>
            <a href="#" className="hover:underline">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
