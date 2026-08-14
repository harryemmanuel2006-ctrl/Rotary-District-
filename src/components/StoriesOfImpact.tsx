import React, { useState } from 'react';
import { Award, Users, Heart, ArrowRight, MapPin, Sparkles, Quote, FolderGit2, X, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { ImpactStory } from '../types';

interface StoriesOfImpactProps {
  openDonateModal: (defaultCause?: string) => void;
}

export const StoriesOfImpact: React.FC<StoriesOfImpactProps> = ({ openDonateModal }) => {
  const { impactStories } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedStory, setSelectedStory] = useState<ImpactStory | null>(null);

  const categories = [
    { id: 'all', label: 'All Impact Stories' },
    { id: 'literacy', label: 'BRED Literacy' },
    { id: 'health', label: 'Child & Maternal Health' },
    { id: 'youth', label: 'Youth Leadership' },
    { id: 'environment', label: 'Eco-Preservation' },
    { id: 'relief', label: 'Family Relief' },
  ];

  const filteredStories = activeCategory === 'all'
    ? impactStories
    : impactStories.filter((s) => s.category === activeCategory);

  return (
    <section id="stories-of-impact" className="py-20 bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 relative border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-widest mb-3">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Humanitarian Impact • District 9141</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#061329] tracking-tight">
            Stories of Impact
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Real testimonies of transformed lives, dignified classrooms, and revitalized communities across Bayelsa, Delta, Edo, and Rivers States.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center sm:justify-center gap-2 mb-10 overflow-x-auto pb-3 sm:pb-0 no-scrollbar sm:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 min-h-[42px] ${
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
                {/* Photograph with Location Badge */}
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                  <img
                    src={story.imageUrl}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B1E3D]/90 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 text-[11px] font-bold text-amber-300 flex items-center gap-1.5 shadow">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{story.tag}</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#061329]/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-[10px] font-semibold text-slate-200 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{story.stateLocation}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-3">
                  {story.projectName && (
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60 w-fit">
                      <FolderGit2 className="w-3.5 h-3.5" />
                      <span className="truncate max-w-[240px]">{story.projectName}</span>
                    </div>
                  )}

                  <h3 className="text-lg font-black text-[#061329] group-hover:text-amber-600 transition-colors leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {story.description}
                  </p>

                  {story.beneficiaryQuote && (
                    <div className="p-3 bg-slate-50 border-l-2 border-amber-500 rounded-r-xl text-[11px] italic text-slate-700">
                      {story.beneficiaryQuote}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
                <div className="p-2.5 bg-amber-50/80 rounded-xl border border-amber-200 text-amber-900 text-[11px] font-bold">
                  {story.impactStats}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedStory(story)}
                    className="flex-1 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 hover:text-[#061329] hover:bg-slate-100 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                  </button>
                  <button
                    onClick={() => openDonateModal(story.projectName || story.title)}
                    className="px-4 py-2.5 rounded-xl bg-[#0B1E3D] text-amber-400 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow"
                    title="Support this cause"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>Support</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Full Story Reader with Testimony */}
        {selectedStory && (
          <div className="fixed inset-0 z-50 bg-[#061329]/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-amber-500/40 space-y-6 relative">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
                  <Quote className="w-4 h-4 text-amber-600" />
                  <span>Story of Impact</span>
                </div>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src={selectedStory.imageUrl}
                  alt={selectedStory.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-amber-700">
                  <span className="bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    {selectedStory.tag}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    {selectedStory.stateLocation}
                  </span>
                </div>

                {selectedStory.projectName && (
                  <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Project involved: <strong className="text-slate-800">{selectedStory.projectName}</strong></span>
                  </div>
                )}

                <h3 className="text-2xl font-black text-[#061329]">
                  {selectedStory.title}
                </h3>

                <p className="text-sm font-semibold text-amber-800">
                  {selectedStory.subtitle}
                </p>

                <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Verified Impact: {selectedStory.impactStats}</span>
                </div>

                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line pt-2 space-y-3">
                  <p>{selectedStory.fullStory || selectedStory.description}</p>
                </div>

                {selectedStory.beneficiaryQuote && (
                  <div className="p-4 bg-slate-50 border-l-4 border-amber-500 rounded-r-2xl space-y-1">
                    <p className="text-xs sm:text-sm italic text-slate-800 font-medium">
                      {selectedStory.beneficiaryQuote}
                    </p>
                    {selectedStory.quoteAuthor && (
                      <p className="text-[11px] font-bold text-amber-800 text-right">
                        — {selectedStory.quoteAuthor}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    const cause = selectedStory.projectName || selectedStory.title;
                    setSelectedStory(null);
                    openDonateModal(cause);
                  }}
                  className="flex-1 py-3.5 rounded-xl bg-[#0B1E3D] text-amber-400 hover:bg-amber-500 hover:text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Donate to Support This Work</span>
                </button>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
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
