import React, { useState } from 'react';
import { Building2, Heart, CheckCircle, Target, ArrowRight, ShieldCheck, Users, Sparkles, Calendar, MapPin, X, Clock, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';
import { DistrictProject } from '../types';

interface ProjectsSectionProps {
  openDonateModal: (defaultCause?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ openDonateModal }) => {
  const { projects } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<DistrictProject | null>(null);

  const categories = [
    'All',
    'Literacy & Education',
    'Disease Prevention & Health',
    'Youth Empowerment',
    'Environmental Sustainability',
    'Maternal & Child Health',
    'Peace & Conflict Resolution',
    'Economic Development'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <section className="py-20 bg-slate-50 text-slate-900 relative border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-widest mb-3">
            <Building2 className="w-4 h-4 text-amber-600" />
            <span>District Humanitarian Initiatives</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#061329] tracking-tight">
            Our Featured Service Projects
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Transforming lives across Bayelsa, Delta, Edo, and Rivers States through sustainable community intervention.
          </p>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center sm:justify-center gap-2 mb-10 overflow-x-auto pb-3 sm:pb-0 no-scrollbar sm:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 min-h-[40px] ${
                selectedCategory === cat
                  ? 'bg-[#0B1E3D] text-amber-400 border border-amber-500/40 shadow-md'
                  : 'bg-white text-slate-700 hover:text-[#061329] border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Pet Project Spotlight: BRED Literacy Project */}
        <div className="mb-16 bg-[#0B1E3D] text-white border-2 border-amber-500/50 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-xs px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider flex items-center gap-1.5 shadow">
            <Sparkles className="w-3.5 h-3.5" />
            <span>District Governor Pet Project 2026–2027</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 lg:pt-0">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                <span>Literacy & Education Priority</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                THE "BRED" LITERACY PROJECT
              </h3>
              <p className="text-amber-300 font-bold text-sm sm:text-base">
                "Ensuring No Child Sits on the Bare Floor to Learn in District 9141"
              </p>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Spearheaded by District Governor Rotarian Chibueze Anthony Olikagu, Ph.D., FCA, KSM, the <strong>BRED Literacy Project</strong> (Book, Reading, Equipment & Desk Initiative) targets under-resourced primary and secondary schools in Bayelsa, Delta, Edo, and Rivers States.
              </p>

              {/* Progress Bar */}
              <div className="p-4 bg-[#061329] rounded-2xl border border-[#162C52] space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">Funding Progress:</span>
                  <span className="text-amber-400">
                    {formatNaira(32500000)} of {formatNaira(50000000)} Goal
                  </span>
                </div>
                <div className="w-full h-3 bg-[#162C52] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                    style={{ width: `${(32500000 / 50000000) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                  <span>65% Raised</span>
                  <span>25,000 School Children Target</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => openDonateModal('BRED Literacy Project')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:from-amber-400 hover:to-yellow-400 flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
                >
                  <Heart className="w-4 h-4 fill-slate-950" />
                  <span>Sponsor School Desks & Books</span>
                </button>

                {projects.find(p => p.id === 'proj-bred-1') && (
                  <button
                    onClick={() => setSelectedProject(projects.find(p => p.id === 'proj-bred-1') || null)}
                    className="px-4 py-3 rounded-xl bg-[#061329] border border-amber-500/40 text-amber-300 font-bold text-xs hover:bg-[#162C52] transition-all flex items-center gap-2"
                  >
                    <span>View Field Updates ({projects.find(p => p.id === 'proj-bred-1')?.updates?.length || 0})</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-amber-500/30 bg-[#061329] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80"
                  alt="BRED Literacy Project Classroom"
                  className="w-full h-64 sm:h-72 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 space-y-2 bg-[#061329]">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Key Deliverables:</span>
                  <ul className="text-xs text-slate-200 space-y-1.5">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>10,000 Ergonomic Dual Desks & Chairs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>School Library & Book Corner Setups</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Endorsed by Bayelsa State House of Assembly</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const percentage = Math.min(100, Math.round((project.raisedFund / project.targetFund) * 100));

            return (
              <div
                key={project.id}
                className="bg-white border border-slate-200 hover:border-amber-500/40 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition-all group hover:shadow-2xl"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-[#0B1E3D]/90 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 text-[11px] font-bold text-amber-300">
                      {project.category}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded text-[10px] font-black uppercase shadow">
                      {project.status}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-black text-[#061329] group-hover:text-amber-600 transition-colors leading-snug">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {project.shortDescription}
                    </p>

                    {/* Key Pillars */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-200">
                      <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">Key Pillars:</span>
                      {project.keyPillars.slice(0, 3).map((pillar, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="truncate">{pillar}</span>
                        </div>
                      ))}
                    </div>

                    {project.updates && project.updates.length > 0 && (
                      <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200/60 text-[11px] text-amber-900 flex items-center justify-between">
                        <span className="font-bold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          Latest Field Dispatch ({project.updates[0].date})
                        </span>
                        <span className="text-amber-700 underline font-semibold cursor-pointer" onClick={() => setSelectedProject(project)}>
                          Read
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Funding Progress & Action */}
                <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
                  <div className="space-y-2">
                    {/* Visual Progress Bar with Percentage Badge */}
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-600 flex items-center gap-1">
                        <Target className="w-3.5 h-3.5 text-amber-600" />
                        <span>Funding Progress</span>
                      </span>
                      <span className="text-[#0B1E3D] font-mono bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded text-[11px] font-bold">
                        {percentage}% Completed
                      </span>
                    </div>

                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden border border-slate-300/60">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-full transition-all duration-700"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    {/* 3 Explicit Metrics: Goal, Raised, Remaining */}
                    <div className="grid grid-cols-3 gap-1.5 text-center pt-1.5">
                      <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                        <span className="text-[9px] uppercase font-bold text-slate-500 block">Goal</span>
                        <span className="text-[11px] font-black text-slate-800 font-mono block truncate">
                          {formatNaira(project.targetFund)}
                        </span>
                      </div>
                      <div className="bg-amber-50/70 p-1.5 rounded-lg border border-amber-200">
                        <span className="text-[9px] uppercase font-bold text-amber-700 block">Raised</span>
                        <span className="text-[11px] font-black text-amber-800 font-mono block truncate">
                          {formatNaira(project.raisedFund)}
                        </span>
                      </div>
                      <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                        <span className="text-[9px] uppercase font-bold text-slate-500 block">Remaining</span>
                        <span className="text-[11px] font-black text-slate-700 font-mono block truncate">
                          {formatNaira(Math.max(0, project.targetFund - project.raisedFund))}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 py-2.5 rounded-xl bg-white border border-slate-300 text-[#061329] hover:bg-slate-100 font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-1"
                    >
                      <span>Field Updates</span>
                    </button>
                    <button
                      onClick={() => openDonateModal(project.title)}
                      className="flex-1 py-2.5 rounded-xl bg-[#0B1E3D] text-amber-400 hover:bg-amber-500 hover:text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md hover:shadow-amber-500/20"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>Donate Now</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Modal: Project Details & Field Updates */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 bg-[#061329]/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-amber-500/40 space-y-6 relative text-slate-900">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#0B1E3D] text-amber-400 font-bold text-xs border border-amber-500/30">
                    {selectedProject.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    {selectedProject.status}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-black text-[#061329]">
                  {selectedProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedProject.shortDescription}
                </p>

                {/* Progress bar */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Funds Mobilized: {formatNaira(selectedProject.raisedFund)}</span>
                    <span className="text-amber-700">Target: {formatNaira(selectedProject.targetFund)}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${Math.min(100, Math.round((selectedProject.raisedFund / selectedProject.targetFund) * 100))}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                    <span>{Math.min(100, Math.round((selectedProject.raisedFund / selectedProject.targetFund) * 100))}% Completed</span>
                    <span>Target Impact: {selectedProject.beneficiariesCount.toLocaleString()} Citizens</span>
                  </div>
                </div>

                {/* Field Updates Section */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-black text-[#061329] uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Project Field Dispatches & Live Updates ({selectedProject.updates?.length || 0})</span>
                  </h4>

                  {selectedProject.updates && selectedProject.updates.length > 0 ? (
                    <div className="space-y-3">
                      {selectedProject.updates.map((update) => (
                        <div
                          key={update.id}
                          className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2"
                        >
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-[#061329] font-black text-sm">{update.title}</span>
                            <span className="text-slate-500 flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-amber-600" />
                              {update.date}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {update.description}
                          </p>
                          {update.imageUrl && (
                            <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 max-h-48">
                              <img
                                src={update.imageUrl}
                                alt={update.title}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          )}
                          <div className="text-[11px] text-amber-700 font-semibold pt-1 border-t border-slate-100 flex items-center gap-1">
                            <span>Author: {update.author}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl">
                      No field updates posted yet. Rotary Project Committee updates will appear here.
                    </p>
                  )}
                </div>

              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    const title = selectedProject.title;
                    setSelectedProject(null);
                    openDonateModal(title);
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <Heart className="w-4 h-4 fill-slate-950" />
                  <span>Support / Donate to this Project</span>
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
