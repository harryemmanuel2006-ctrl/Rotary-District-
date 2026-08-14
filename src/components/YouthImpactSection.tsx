import React, { useState } from 'react';
import { Sparkles, Heart, Activity, Stethoscope, BookOpen, Users, Compass, ShieldCheck, CheckCircle2, ArrowRight, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';
import { YouthImpactInitiative } from '../types';

interface YouthImpactSectionProps {
  openDonateModal: (defaultCause?: string) => void;
}

export const YouthImpactSection: React.FC<YouthImpactSectionProps> = ({ openDonateModal }) => {
  const { youthInitiatives } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedInitiative, setSelectedInitiative] = useState<YouthImpactInitiative | null>(null);

  const categories = [
    { id: 'all', label: 'All Youth & Child Initiatives', icon: Sparkles },
    { id: 'health_outreach', label: "Children's Health Outreach", icon: Activity },
    { id: 'medical_checkup', label: 'Medical Check-ups', icon: Stethoscope },
    { id: 'education', label: 'Education & Desks', icon: BookOpen },
    { id: 'youth_leadership', label: 'Youth Leadership & RYLA', icon: Users },
    { id: 'mentorship', label: 'Career Mentorship', icon: Compass },
    { id: 'community_support', label: 'Community & Orphanage Care', icon: Heart },
  ];

  const filteredInitiatives = activeCategory === 'all'
    ? youthInitiatives
    : youthInitiatives.filter((i) => i.category === activeCategory);

  return (
    <section id="youth-impact" className="py-20 bg-[#061329] text-white relative overflow-hidden border-b border-amber-500/30">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400 text-amber-300 text-xs font-black uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Nurturing Tomorrow's Leaders • District 9141</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Children & Youth Impact
          </h2>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Investing in early childhood healthcare, classroom dignity, adolescent leadership, and university mentorship across the Niger Delta.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center sm:justify-center gap-2 mb-12 overflow-x-auto pb-3 sm:pb-0 no-scrollbar sm:flex-wrap">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 min-h-[42px] ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-[#0B1E3D] text-slate-300 hover:text-white border border-amber-500/20 hover:border-amber-400/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Youth Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInitiatives.map((initiative) => (
            <div
              key={initiative.id}
              className="bg-[#0B1E3D]/90 border border-amber-500/25 hover:border-amber-400/80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Category Badge */}
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-950">
                  <img
                    src={initiative.imageUrl}
                    alt={initiative.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D] via-transparent to-black/30" />
                  
                  <div className="absolute top-3 left-3 bg-[#061329]/90 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 text-[11px] font-bold text-amber-300">
                    {initiative.categoryLabel}
                  </div>

                  <div className="absolute bottom-3 right-3 bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded text-[10px] font-black uppercase shadow">
                    {initiative.beneficiariesCount}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{initiative.location}</span>
                  </div>

                  <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {initiative.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {initiative.description}
                  </p>

                  {/* Achievements Checklist */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-700/60">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                      Key Milestones:
                    </span>
                    {initiative.achievements.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 bg-[#061329] border-t border-slate-800 space-y-3">
                <button
                  onClick={() => openDonateModal(initiative.title)}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>{initiative.actionLabel || 'Support This Youth Initiative'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section Footer Callout */}
        <div className="mt-16 bg-[#0B1E3D] border border-amber-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-black text-white">
              Are you a young leader or school administrator?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Discover how to join a local Interact or Rotaract Club, or nominate a public school for BRED desks.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#membership"
              className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#061329] font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <span>Join Rotaract / Rotary</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
            </a>
            <button
              onClick={() => openDonateModal('District 9141 Youth Leadership & BRED Fund')}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow"
            >
              Donate to Youth Fund
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
