import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Search, Tag, Clock, ExternalLink, Sparkles, Bell, Ticket, Phone, Mail, Megaphone, ArrowRight, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { DistrictEvent, DistrictAnnouncement } from '../types';
import { EventCountdown } from './EventCountdown';
import { EventRegistrationModal } from './EventRegistrationModal';

export const EventsSection: React.FC = () => {
  const { events, announcements } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEventForReg, setSelectedEventForReg] = useState<DistrictEvent | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<DistrictAnnouncement | null>(null);

  const categories = ['All', 'Seminar', 'Installation', 'Conference', 'Institute', 'Youth', 'Convention'];

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.acronym && e.acronym.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredAnnouncements = announcements.filter((a) => a.isFeatured);
  const flagshipEvent = events.find((e) => e.acronym === '10X INSTALLATION' || e.isUpcoming) || events[0];

  return (
    <section className="py-20 bg-white text-slate-900 relative border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-widest mb-3">
            <CalendarIcon className="w-4 h-4 text-amber-600" />
            <span>District Events & Official Bulletins</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#061329] tracking-tight">
            Upcoming Events & Announcements
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            District governor bulletins, installation ceremonies, learning assemblies, and community project dates.
          </p>
        </div>

        {/* Featured Flagship Event & Live Countdown Hero Card */}
        {flagshipEvent && (
          <div className="mb-14 bg-[#0B1E3D] text-white border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-yellow-500 text-slate-950 text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl shadow">
              FLAGSHIP DISTRICT EVENT
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase">
                    {flagshipEvent.category} • {flagshipEvent.acronym}
                  </span>
                  <span className="text-xs text-slate-300 font-semibold">• Rotary Year 2026–2027</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {flagshipEvent.title}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-200 bg-[#061329] p-3 rounded-xl border border-[#162C52]">
                    <CalendarIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{flagshipEvent.formattedDate} ({flagshipEvent.time || '9:00 AM'})</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200 bg-[#061329] p-3 rounded-xl border border-[#162C52]">
                    <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="truncate">{flagshipEvent.location}, {flagshipEvent.city}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed">
                  {flagshipEvent.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setSelectedEventForReg(flagshipEvent)}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-slate-950 font-black text-xs hover:from-amber-400 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/20 hover:scale-105"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Register for Flagship Event</span>
                  </button>

                  <div className="text-xs text-slate-300 font-semibold px-3 py-2 bg-[#061329] rounded-xl border border-[#162C52]">
                    Fee: <strong className="text-amber-400">{flagshipEvent.eventFeeNgn ? `₦${flagshipEvent.eventFeeNgn.toLocaleString()}` : 'Free Access'}</strong>
                  </div>
                </div>
              </div>

              {/* Live Countdown Timer Widget */}
              <div className="lg:col-span-5">
                <EventCountdown
                  targetDate={flagshipEvent.date}
                  eventTitle={flagshipEvent.title}
                  eventLocation={flagshipEvent.location}
                />
              </div>
            </div>
          </div>
        )}

        {/* Featured District Announcements Ticker */}
        {featuredAnnouncements.length > 0 && (
          <div className="mb-12 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-700 text-sm font-bold uppercase tracking-wider">
                <Megaphone className="w-4 h-4 text-amber-600 animate-bounce" />
                <span>Featured District Bulletins & Official Statements</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredAnnouncements.map((ann) => (
                <div
                  key={ann.id}
                  onClick={() => setSelectedAnnouncement(ann)}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-amber-500/50 hover:shadow-md transition-all cursor-pointer group space-y-2 relative"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 font-bold uppercase border border-amber-500/20">
                      {ann.category}
                    </span>
                    <span className="text-slate-500 font-mono">{ann.publishedAt}</span>
                  </div>

                  <h4 className="text-sm font-bold text-[#061329] group-hover:text-amber-600 transition-colors line-clamp-2">
                    {ann.title}
                  </h4>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {ann.summary}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-amber-700 font-semibold border-t border-slate-200">
                    <span>By {ann.authorRole}</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Bulletin <ArrowRight className="w-3 h-3 text-amber-600" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search & Category Filter Controls */}
        <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
          
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search event, venue, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0B1E3D] text-amber-400 shadow'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className={`bg-white border rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-amber-500/50 shadow-md ${
                evt.acronym === '10X INSTALLATION'
                  ? 'border-amber-500/60 shadow-xl'
                  : 'border-slate-200'
              }`}
            >
              <div className="space-y-3">
                
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-700 text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                    {evt.category}
                  </span>
                  {evt.acronym && (
                    <span className="text-xs font-black text-amber-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                      {evt.acronym}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-[#061329] leading-snug">
                  {evt.title}
                </h3>

                <div className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <CalendarIcon className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>{evt.formattedDate}</span>
                  {evt.time && <span className="text-slate-500 font-normal">• {evt.time}</span>}
                </div>

                <div className="flex items-start gap-2 text-xs text-slate-700">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#061329] block">{evt.location}</strong>
                    <span className="text-slate-500">{evt.city}, {evt.state}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {evt.description}
                </p>

                {/* Contact info if provided */}
                {(evt.contactPerson || evt.contactPhone) && (
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                    {evt.contactPerson && <p>Contact: <strong className="text-slate-900">{evt.contactPerson}</strong></p>}
                    {evt.contactPhone && <p className="flex items-center gap-1 text-amber-700 font-mono"><Phone className="w-3 h-3 text-amber-600" /> {evt.contactPhone}</p>}
                  </div>
                )}

              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between">
                <div className="text-xs text-slate-600">
                  Fee: <strong className="text-amber-700 font-bold">{evt.eventFeeNgn ? `₦${evt.eventFeeNgn.toLocaleString()}` : 'Free'}</strong>
                </div>

                <button
                  onClick={() => setSelectedEventForReg(evt)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0B1E3D] text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs transition-all shadow-sm"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Register Pass</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12 bg-slate-50 border border-slate-200 rounded-2xl">
            <p className="text-sm text-slate-600">No events found matching your search query.</p>
          </div>
        )}

      </div>

      {/* Event Registration Modal */}
      {selectedEventForReg && (
        <EventRegistrationModal
          event={selectedEventForReg}
          onClose={() => setSelectedEventForReg(null)}
        />
      )}

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 bg-[#061329]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1E3D] border border-amber-500/40 rounded-3xl max-w-xl w-full p-6 text-white relative shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedAnnouncement(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#061329] text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase border border-amber-500/30 inline-block">
              {selectedAnnouncement.category} Bulletin
            </span>

            <h3 className="text-xl font-bold text-white">{selectedAnnouncement.title}</h3>
            
            <p className="text-xs text-slate-300 font-mono">
              Published by {selectedAnnouncement.authorRole} on {selectedAnnouncement.publishedAt}
            </p>

            <div className="bg-[#061329] p-4 rounded-2xl border border-[#162C52] text-xs text-slate-200 leading-relaxed space-y-2 whitespace-pre-line">
              {selectedAnnouncement.content}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs"
              >
                Close Bulletin
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
