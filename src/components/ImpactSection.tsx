import React, { useState } from 'react';
import { Award, Users, Heart, BookOpen, TreePine, ShieldCheck, ArrowRight, Activity, MapPin, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import { ImpactStory } from '../types';

interface ImpactSectionProps {
  openDonateModal: (defaultCause?: string) => void;
}

export const ImpactSection: React.FC<ImpactSectionProps> = ({ openDonateModal }) => {
  const { impactStories } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedStory, setSelectedStory] = useState<ImpactStory | null>(null);

  const categories = [
    { id: 'all', label: 'All Stories' },
    { id: 'literacy', label: 'BRED Literacy' },
    { id: 'health', label: 'Health & Pediatrics' },
    { id: 'youth', label: 'Youth Mentorship' },
    { id: 'environment', label: 'Eco-Preservation' },
    { id: 'relief', label: 'Family Relief' },
  ];

  const filteredStories = activeCategory === 'all'
    ? impactStories
    : impactStories.filter((s) => s.category === activeCategory);

  return (
    <section id="impact" className="py-20 bg-gradient-to-b from-white to-slate-50 text-slate-900 relative border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-widest mb-3">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Real Lives Transformed • District 9141</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#061329] tracking-tight">
            Our Humanitarian Impact
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Witness how Rotarians, Rotaractors, and partners are creating lasting, generational impact across Bayelsa, Delta, Edo, and Rivers States.
          </p>
        </div>

        {/* Major Impact Numerical Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className="bg-[#0B1E3D] text-white p-6 rounded-3xl border border-amber-500/30 shadow-xl relative overflow-hidden group hover:border-amber-400 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all" />
            <div className="p-3 bg-[#061329] rounded-2xl w-fit text-amber-400 mb-3 border border-[#162C52]">
              <Activity className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-400">35,989+</div>
            <div className="text-xs font-bold text-white mt-1">Children Screened</div>
            <p className="text-[11px] text-slate-300 mt-1 leading-snug">Malnutrition & malaria clinics with free treatment across riverine settlements.</p>
          </div>

          <div className="bg-[#0B1E3D] text-white p-6 rounded-3xl border border-amber-500/30 shadow-xl relative overflow-hidden group hover:border-amber-400 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all" />
            <div className="p-3 bg-[#061329] rounded-2xl w-fit text-amber-400 mb-3 border border-[#162C52]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-400">10,000+</div>
            <div className="text-xs font-bold text-white mt-1">School Desks Built</div>
            <p className="text-[11px] text-slate-300 mt-1 leading-snug">BRED Project eradicating bare-floor learning for 25,000+ primary pupils.</p>
          </div>

          <div className="bg-[#0B1E3D] text-white p-6 rounded-3xl border border-amber-500/30 shadow-xl relative overflow-hidden group hover:border-amber-400 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all" />
            <div className="p-3 bg-[#061329] rounded-2xl w-fit text-amber-400 mb-3 border border-[#162C52]">
              <TreePine className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-400">100,000</div>
            <div className="text-xs font-bold text-white mt-1">Trees & Mangroves</div>
            <p className="text-[11px] text-slate-300 mt-1 leading-snug">Restoring Niger Delta waterways and creating school green zones.</p>
          </div>

          <div className="bg-[#0B1E3D] text-white p-6 rounded-3xl border border-amber-500/30 shadow-xl relative overflow-hidden group hover:border-amber-400 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all" />
            <div className="p-3 bg-[#061329] rounded-2xl w-fit text-amber-400 mb-3 border border-[#162C52]">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-400">5,200+</div>
            <div className="text-xs font-bold text-white mt-1">Youth Mentored</div>
            <p className="text-[11px] text-slate-300 mt-1 leading-snug">RYLA retreats, tech bootcamps, and career leadership apprenticeships.</p>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center sm:justify-center gap-2 mb-10 overflow-x-auto pb-3 sm:pb-0 no-scrollbar sm:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 min-h-[40px] ${
                activeCategory === cat.id
                  ? 'bg-[#0B1E3D] text-amber-400 border border-amber-500/40 shadow-md'
                  : 'bg-white text-slate-700 hover:text-[#061329] border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Impact Stories Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:border-amber-500/40"
            >
              <div>
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                  <img
                    src={story.imageUrl}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B1E3D]/90 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{story.tag}</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#061329]/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-[10px] font-semibold text-slate-200 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{story.stateLocation}</span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
                    {story.subtitle}
                  </span>
                  <h3 className="text-lg font-black text-[#061329] group-hover:text-amber-600 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {story.description}
                  </p>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] font-bold">
                  {story.impactStats}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedStory(story)}
                    className="flex-1 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 hover:text-[#061329] hover:bg-slate-100 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                  </button>
                  <button
                    onClick={() => openDonateModal(story.title)}
                    className="px-3.5 py-2.5 rounded-xl bg-[#0B1E3D] text-amber-400 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs transition-colors flex items-center justify-center shadow"
                    title="Support this cause"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Full Story Reader */}
        {selectedStory && (
          <div className="fixed inset-0 z-50 bg-[#061329]/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-amber-500/40 space-y-6 relative">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200">
                <img
                  src={selectedStory.imageUrl}
                  alt={selectedStory.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-amber-700">
                  <span>{selectedStory.tag}</span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    {selectedStory.stateLocation}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-[#061329]">
                  {selectedStory.title}
                </h3>
                <p className="text-sm font-semibold text-amber-800">
                  {selectedStory.subtitle}
                </p>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs font-bold">
                  Documented Impact: {selectedStory.impactStats}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line pt-2 border-t border-slate-200">
                  {selectedStory.description}
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    const cause = selectedStory.title;
                    setSelectedStory(null);
                    openDonateModal(cause);
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#0B1E3D] text-amber-400 hover:bg-amber-500 hover:text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Sponsor or Support This Initiative</span>
                </button>
                <button
                  onClick={() => setSelectedStory(null)}
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
