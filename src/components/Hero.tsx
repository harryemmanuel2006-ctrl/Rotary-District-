import React from 'react';
import { Award, Calendar, ChevronRight, Heart, UserPlus, Sparkles, MapPin, Users, Building2, Flame, ArrowRight, HeartHandshake } from 'lucide-react';
import { useData } from '../context/DataContext';

interface HeroProps {
  setActiveTab: (tab: string) => void;
  openJoinModal: () => void;
  openDonateModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab, openJoinModal, openDonateModal }) => {
  const { districtInfo } = useData();

  return (
    <div className="bg-white text-[#0B1E3D] pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* District Theme Top Heading */}
        <div className="flex items-center justify-center gap-3 text-center">
          <div className="h-0.5 w-12 bg-amber-500" />
          <span className="text-xs font-black uppercase tracking-widest text-[#0B1E3D]">
            DISTRICT THEME 2026–2027
          </span>
          <div className="h-0.5 w-12 bg-amber-500" />
        </div>

        {/* Top 2 Featured Cards Grid (Theme Box + DG Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Theme Card: CREATE LASTING IMPACT */}
          <div className="lg:col-span-5 bg-[#0B1E3D] rounded-3xl p-6 sm:p-10 text-white flex flex-col justify-center shadow-xl relative overflow-hidden border border-amber-500/20 text-center sm:text-left">
            <span className="text-[#DAA520] font-black text-2xl sm:text-3xl leading-none">“</span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#F7A81B] tracking-tight uppercase leading-tight my-2">
              CREATE LASTING IMPACT
            </h1>
            <span className="text-[#DAA520] font-black text-2xl sm:text-3xl leading-none text-right">”</span>
          </div>

          {/* Right Governor Card */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-8 relative shadow-sm overflow-hidden flex flex-col sm:flex-row items-center gap-6">
            
            <div className="flex-1 space-y-3 w-full text-left">
              <span className="text-xs font-black uppercase tracking-wider text-amber-600 block">
                10TH DISTRICT GOVERNOR
              </span>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl border-2 border-amber-500 text-amber-600 font-black text-lg sm:text-2xl bg-white shadow-sm shrink-0">
                  10th
                </div>
                <div>
                  <h2 className="text-base sm:text-xl font-black text-[#0B1E3D] leading-snug">
                    Rotarian Chibueze Anthony Olikagu,
                  </h2>
                  <p className="text-xs font-bold text-slate-600">Ph.D., FCA, KSM</p>
                </div>
              </div>

              <p className="text-xs text-slate-700 flex items-center gap-1.5 pt-1">
                <Flame className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-semibold text-slate-500">Motto:</span>
                <strong className="text-amber-600 font-black">Positive Disruptors</strong>
              </p>
            </div>

            {/* Governor Portrait Image */}
            <div className="w-full sm:w-48 md:w-56 max-w-[260px] aspect-[4/5] rounded-2xl overflow-hidden bg-[#0B1E3D] border-2 border-amber-500/30 shrink-0 relative shadow-md">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
                alt="District Governor Rotarian Chibueze Anthony Olikagu"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-[#0B1E3D]/90 backdrop-blur-sm text-white text-[10px] p-1.5 rounded-lg text-center font-bold border border-amber-500/40">
                Rotary Year 2026–2027
              </div>
            </div>

          </div>

        </div>

        {/* Subtitle & Meet DG Button Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center pt-2">
          
          <div className="lg:col-span-8 text-slate-800 text-sm sm:text-base lg:text-lg leading-relaxed">
            Uniting <strong className="text-[#0B1E3D] font-extrabold">108 Rotary Clubs</strong> and over <strong className="text-[#0B1E3D] font-extrabold">3,200 Rotarians</strong> across <span className="text-amber-600 font-extrabold">Bayelsa, Delta, Edo, and Rivers States</span> in Nigeria to solve real community challenges through service, leadership, and humanitarian fellowship.
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <button
              onClick={() => setActiveTab('governor')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#0B1E3D] hover:bg-[#061329] text-white font-bold text-sm shadow-lg flex items-center justify-center gap-3 transition-all hover:scale-105"
            >
              <span>Meet the District Governor</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

        </div>

        {/* 4 Action Buttons Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
          
          {/* Join Rotary */}
          <button
            onClick={openJoinModal}
            className="p-3.5 sm:p-4 rounded-2xl bg-white border border-amber-500/30 shadow-sm hover:shadow-md hover:border-amber-500 transition-all flex flex-col items-center justify-center text-center gap-2 group min-h-[48px]"
          >
            <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#0B1E3D]">Join Rotary</span>
          </button>

          {/* Our Projects */}
          <button
            onClick={() => setActiveTab('projects')}
            className="p-3.5 sm:p-4 rounded-2xl bg-white border border-amber-500/30 shadow-sm hover:shadow-md hover:border-amber-500 transition-all flex flex-col items-center justify-center text-center gap-2 group min-h-[48px]"
          >
            <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#0B1E3D]">Our Projects</span>
          </button>

          {/* Upcoming Events */}
          <button
            onClick={() => setActiveTab('events')}
            className="p-3.5 sm:p-4 rounded-2xl bg-white border border-amber-500/30 shadow-sm hover:shadow-md hover:border-amber-500 transition-all flex flex-col items-center justify-center text-center gap-2 group min-h-[48px]"
          >
            <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#0B1E3D]">Upcoming Events</span>
          </button>

          {/* Donate */}
          <button
            onClick={openDonateModal}
            className="p-3.5 sm:p-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-[#0B1E3D] shadow-md transition-all flex flex-col items-center justify-center text-center gap-2 hover:scale-105 min-h-[48px]"
          >
            <div className="p-2 sm:p-2.5 rounded-xl bg-amber-600/20 text-[#0B1E3D]">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-[#0B1E3D]" />
            </div>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider">Donate</span>
          </button>

        </div>

        {/* Impact Stats Counter Banner */}
        <div className="bg-[#0B1E3D] rounded-3xl p-5 sm:p-8 text-white shadow-xl border border-amber-500/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center p-2 rounded-2xl bg-[#061329]/50 sm:bg-transparent border sm:border-0 border-amber-500/20">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 mb-1.5" />
              <span className="text-2xl sm:text-4xl font-black text-white">108</span>
              <span className="text-[11px] sm:text-xs font-bold text-amber-300 mt-0.5">Rotary Clubs</span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center p-2 rounded-2xl bg-[#061329]/50 sm:bg-transparent border sm:border-0 border-amber-500/20">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 mb-1.5" />
              <span className="text-2xl sm:text-4xl font-black text-white">3,200+</span>
              <span className="text-[11px] sm:text-xs font-bold text-amber-300 mt-0.5">Rotarians</span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center p-2 rounded-2xl bg-[#061329]/50 sm:bg-transparent border sm:border-0 border-amber-500/20">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 mb-1.5" />
              <span className="text-2xl sm:text-4xl font-black text-white">4</span>
              <span className="text-[11px] sm:text-xs font-bold text-amber-300 mt-0.5">States</span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center text-center p-2 rounded-2xl bg-[#061329]/50 sm:bg-transparent border sm:border-0 border-amber-500/20">
              <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 mb-1.5" />
              <span className="text-2xl sm:text-4xl font-black text-white">Countless</span>
              <span className="text-[11px] sm:text-xs font-bold text-amber-300 mt-0.5">Lives Impacted</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
