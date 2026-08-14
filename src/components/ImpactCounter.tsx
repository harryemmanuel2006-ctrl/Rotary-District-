import React from 'react';
import { Award, Users, CheckCircle2, HeartHandshake, MapPin, Sparkles, TrendingUp } from 'lucide-react';
import { useData } from '../context/DataContext';

interface ImpactCounterProps {
  onOpenAdmin?: () => void;
}

export const ImpactCounter: React.FC<ImpactCounterProps> = () => {
  const { districtInfo } = useData();

  const stats = [
    {
      id: 'projects',
      label: 'Projects Completed',
      value: `${districtInfo.impactProjectsCompleted ?? 48}+`,
      sublabel: 'Across all 4 District States',
      icon: CheckCircle2,
      accent: 'from-amber-500 to-amber-600',
    },
    {
      id: 'people',
      label: 'People Reached',
      value: districtInfo.impactPeopleReached || '150,000+',
      sublabel: 'Direct humanitarian beneficiaries',
      icon: Users,
      accent: 'from-amber-400 to-yellow-500',
    },
    {
      id: 'clubs',
      label: 'Clubs Involved',
      value: `${districtInfo.impactClubsInvolved ?? 108}`,
      sublabel: 'In 46 Assistant Governor Areas',
      icon: Award,
      accent: 'from-amber-500 to-orange-500',
    },
    {
      id: 'volunteers',
      label: 'Active Volunteers',
      value: districtInfo.impactVolunteers || '3,500+',
      sublabel: 'Rotarians & Rotaractors serving',
      icon: HeartHandshake,
      accent: 'from-amber-400 to-amber-600',
    },
    {
      id: 'communities',
      label: 'Communities Served',
      value: `${districtInfo.impactCommunitiesServed ?? 240}+`,
      sublabel: 'Riverine, rural & urban settlements',
      icon: MapPin,
      accent: 'from-yellow-400 to-amber-500',
    },
  ];

  return (
    <section id="impact-counter" className="relative py-12 sm:py-16 bg-[#061329] border-y-2 border-amber-500/30 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F7A81B_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-amber-500/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Humanitarian Statistics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              District 9141 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Impact Counter</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-[#0B1E3D]/80 px-4 py-2.5 rounded-2xl border border-amber-500/30">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>Serving Bayelsa, Delta, Edo & Rivers States</span>
          </div>
        </div>

        {/* 5-Column Dynamic Metric Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className={`group bg-[#0B1E3D]/90 hover:bg-[#102A54] border border-amber-500/25 hover:border-amber-400/80 rounded-2xl p-5 sm:p-6 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-amber-500/10 flex flex-col justify-between relative overflow-hidden ${
                  idx === 4 ? 'col-span-2 md:col-span-1' : ''
                }`}
              >
                {/* Top Corner Shimmer */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:bg-amber-500/15 transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-[#061329] border border-amber-500/30 text-amber-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-amber-400/70 tracking-widest uppercase bg-amber-500/10 px-2 py-0.5 rounded-md">
                      Live
                    </span>
                  </div>

                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-mono group-hover:text-amber-300 transition-colors">
                    {stat.value}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60">
                  <div className="text-xs sm:text-sm font-bold text-slate-100">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    {stat.sublabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400">
            Real-time verified data updated by District 9141 Secretariat for Rotary Year 2026–2027 • Theme: <strong className="text-amber-400">CREATE LASTING IMPACT</strong>
          </p>
        </div>

      </div>
    </section>
  );
};
