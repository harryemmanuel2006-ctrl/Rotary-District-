import React, { useState } from 'react';
import { Camera, Tag, Calendar, Image as ImageIcon, Play, Video, X, ExternalLink, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import { PhotoGalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const { gallery } = useData();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [selectedMedia, setSelectedMedia] = useState<PhotoGalleryItem | null>(null);

  const filters = ['All', 'Installation', 'Projects', 'Community Outreach', 'Polio Walk', 'Leadership', 'Rotaract & Youth'];

  const filteredGallery = selectedFilter === 'All'
    ? gallery
    : gallery.filter((item) => item.category === selectedFilter);

  return (
    <section className="py-20 bg-white text-slate-900 relative border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-widest mb-3">
            <Camera className="w-4 h-4 text-amber-600" />
            <span>District Photo & Video Archives</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#061329] tracking-tight">
            Official Photo & Video Gallery
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Official moments captured from the 10X District Governor Installation, community medical outreach, Polio eradication rallies, BRED literacy inaugurations, and youth empowerment retreats across District 9141.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center sm:justify-center gap-2 mb-10 overflow-x-auto pb-3 sm:pb-0 no-scrollbar sm:flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 min-h-[40px] ${
                selectedFilter === f
                  ? 'bg-[#0B1E3D] text-amber-400 border border-amber-500/40 shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:text-[#061329] border border-slate-200 hover:bg-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className="bg-white border border-slate-200 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-md group transition-all cursor-pointer hover:shadow-xl flex flex-col justify-between"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061329]/90 via-transparent to-transparent opacity-80" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-[#0B1E3D]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-500/30 text-[10px] font-bold text-amber-300">
                  {item.category}
                </div>

                {/* Media Type Badge */}
                {item.mediaType === 'video' && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 shadow">
                    <Play className="w-3 h-3 fill-current" />
                    <span>Video</span>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-sm font-bold text-white drop-shadow">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-200 line-clamp-2 mt-0.5">
                    {item.caption}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 font-medium">
                  <Calendar className="w-3 h-3 text-amber-600" />
                  {item.date}
                </span>
                <span className="text-amber-700 font-bold hover:underline">Click to view</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox / Media Viewer Modal */}
        {selectedMedia && (
          <div className="fixed inset-0 z-50 bg-[#061329]/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0B1E3D] border border-amber-500/40 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 text-white shadow-2xl space-y-4 relative">
              <div className="flex items-center justify-between pb-3 border-b border-[#162C52]">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                    {selectedMedia.category}
                  </span>
                  <span className="text-xs text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {selectedMedia.date}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="p-2 rounded-full bg-[#061329] text-slate-400 hover:text-white border border-[#162C52]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden bg-black/50 border border-[#162C52] flex items-center justify-center max-h-[60vh]">
                <img
                  src={selectedMedia.imageUrl}
                  alt={selectedMedia.title}
                  className="w-full max-h-[58vh] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-amber-300">
                  {selectedMedia.title}
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {selectedMedia.caption}
                </p>

                {selectedMedia.videoUrl && (
                  <div className="pt-2 flex items-center gap-3">
                    <a
                      href={selectedMedia.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Watch Full District Video Coverage</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#162C52] flex justify-end">
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="px-5 py-2 rounded-xl bg-[#061329] hover:bg-[#162C52] text-slate-300 hover:text-white font-bold text-xs border border-[#162C52]"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
