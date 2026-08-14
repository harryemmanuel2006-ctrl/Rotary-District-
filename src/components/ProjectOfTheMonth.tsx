import React from 'react';
import { Star, Heart, MapPin, Users, Target, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';

interface ProjectOfTheMonthProps {
  openDonateModal: (defaultCause?: string) => void;
  onSelectProject?: (projectId: string) => void;
}

export const ProjectOfTheMonth: React.FC<ProjectOfTheMonthProps> = ({
  openDonateModal,
  onSelectProject,
}) => {
  const { districtInfo, projects } = useData();

  // Find featured project by ID or fallback to first project marked featured
  const featuredProject =
    projects.find((p) => p.id === districtInfo.featuredProjectId) ||
    projects.find((p) => p.featured) ||
    projects[0];

  if (!featuredProject) return null;

  const targetFund = featuredProject.targetFund || 1;
  const raisedFund = featuredProject.raisedFund || 0;
  const remainingFund = Math.max(0, targetFund - raisedFund);
  const percentage = Math.min(100, Math.round((raisedFund / targetFund) * 100));

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section id="project-of-the-month" className="py-14 sm:py-20 bg-gradient-to-b from-[#0B1E3D] to-[#061329] text-white relative overflow-hidden border-b border-amber-500/30">
      {/* Background Accent Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading Tag */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-500/20 border border-amber-400 text-amber-300 text-xs font-black uppercase tracking-widest mb-3 shadow-lg shadow-amber-500/10">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Featured Project of the Month</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Flagship Humanitarian Priority
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Selected by District Governor Rotarian Chibueze Anthony Olikagu for accelerated intervention and strategic funding.
          </p>
        </div>

        {/* Featured Project Showcase Card */}
        <div className="bg-[#0B1E3D]/95 border-2 border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left / Top: High Quality Image & Badges */}
          <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto min-h-[320px] sm:min-h-[420px] overflow-hidden bg-slate-900">
            <img
              src={featuredProject.image}
              alt={featuredProject.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061329] via-transparent to-black/40 lg:hidden" />
            
            {/* Top Ribbon */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>Project of the Month</span>
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#061329]/90 border border-amber-500/30 text-amber-300 text-xs font-bold backdrop-blur-md">
                {featuredProject.category}
              </span>
            </div>

            {/* Location & Beneficiaries Overlay Badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-semibold text-slate-200">
              <div className="bg-[#061329]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{featuredProject.location}</span>
              </div>
              <div className="bg-[#061329]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>{featuredProject.beneficiariesCount.toLocaleString()}+ Target Beneficiaries</span>
              </div>
            </div>
          </div>

          {/* Right / Bottom: Detailed Progress & Information */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Rotary District 9141 Official Initiative</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {featuredProject.title}
              </h3>

              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                {featuredProject.fullDescription || featuredProject.shortDescription}
              </p>

              {/* Key Pillars */}
              {featuredProject.keyPillars && featuredProject.keyPillars.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {featuredProject.keyPillars.map((pillar, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#061329] border border-amber-500/20 text-slate-200 text-xs font-medium flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>{pillar}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Comprehensive Progress Tracker Section */}
            <div className="bg-[#061329]/90 p-5 rounded-2xl border border-amber-500/30 space-y-4">
              
              {/* Progress Percentage & Bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <Target className="w-3.5 h-3.5" /> Funding Progress
                  </span>
                  <span className="text-white font-mono text-sm bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                    {percentage}% Completed
                  </span>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-3.5 overflow-hidden border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-400 h-full rounded-full transition-all duration-1000 relative"
                    style={{ width: `${percentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* 4 Crucial Financial Progress Metrics */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center pt-2 border-t border-slate-800">
                <div className="bg-[#0B1E3D] p-2.5 rounded-xl border border-slate-700">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Project Goal</span>
                  <span className="text-xs sm:text-sm font-black text-white font-mono block mt-0.5">
                    {formatNaira(targetFund)}
                  </span>
                </div>

                <div className="bg-[#0B1E3D] p-2.5 rounded-xl border border-amber-500/30">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block">Amount Raised</span>
                  <span className="text-xs sm:text-sm font-black text-amber-400 font-mono block mt-0.5">
                    {formatNaira(raisedFund)}
                  </span>
                </div>

                <div className="bg-[#0B1E3D] p-2.5 rounded-xl border border-slate-700">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Amount Remaining</span>
                  <span className="text-xs sm:text-sm font-black text-slate-200 font-mono block mt-0.5">
                    {formatNaira(remainingFund)}
                  </span>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => openDonateModal(featuredProject.title)}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>Donate to Project of the Month</span>
              </button>

              {onSelectProject && (
                <button
                  onClick={() => onSelectProject(featuredProject.id)}
                  className="py-3.5 px-5 rounded-2xl bg-[#061329] hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Project Details</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
