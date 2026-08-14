import React, { useState } from 'react';
import { Building2, Search, MapPin, Phone, User, Calendar, Clock, Users, Shield } from 'lucide-react';
import { useData } from '../context/DataContext';

export const ClubsSection: React.FC = () => {
  const { clubs } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<string>('All');

  const states = ['All', 'Bayelsa', 'Delta', 'Edo', 'Rivers'];

  const filteredClubs = clubs.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.presidentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.secretaryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.assistantGovernor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesState = selectedState === 'All' || c.state === selectedState;

    return matchesSearch && matchesState;
  });

  return (
    <section className="py-20 bg-slate-50 text-slate-900 relative border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-widest mb-3">
            <Building2 className="w-4 h-4 text-amber-600" />
            <span>District Zonal Directory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#061329] tracking-tight">
            Rotary Clubs Directory
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Explore active Rotary Clubs across Bayelsa, Delta, Edo, and Rivers States. Find meeting times, venues, and club leadership.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search club, president, venue, or AG..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* State Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {states.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedState === st
                    ? 'bg-[#0B1E3D] text-amber-400 border border-amber-500/40 shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:text-[#061329] border border-slate-200 hover:bg-slate-200'
                }`}
              >
                {st === 'All' ? 'All States (4)' : `${st} State`}
              </button>
            ))}
          </div>

        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club) => (
            <div
              key={club.id}
              className="bg-white border border-slate-200 hover:border-amber-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all hover:scale-[1.01] shadow-md"
            >
              <div className="space-y-4">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-700 text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                    {club.state} State • Area {club.area}
                  </span>
                  {club.charterYear && (
                    <span className="text-[10px] text-slate-400 font-semibold">
                      Chartered {club.charterYear}
                    </span>
                  )}
                </div>

                {/* Club Name */}
                <h3 className="text-lg font-black text-[#061329] leading-snug">
                  {club.name}
                </h3>

                {/* Assistant Governor */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <p className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">Assistant Governor</p>
                  <p className="text-xs font-semibold text-[#061329]">{club.assistantGovernor}</p>
                  {club.agPhone && (
                    <p className="text-[11px] text-slate-600 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-amber-600" />
                      {club.agPhone}
                    </p>
                  )}
                </div>

                {/* Leadership Info */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="text-slate-500">President:</span>
                    <strong className="text-slate-800">{club.presidentName}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-500">Secretary:</span>
                    <span className="text-slate-700">{club.secretaryName}</span>
                  </div>
                </div>

                {/* Meeting Time & Venue */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5 font-bold text-[#061329]">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{club.meetingDay} @ {club.meetingTime}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-600 text-[11px] pt-1 border-t border-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{club.venue}</span>
                  </div>
                </div>

              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-amber-600" />
                  {club.membersCount || 30}+ Rotarians
                </span>
                <span className="text-amber-700 font-bold">Rotary District 9141</span>
              </div>

            </div>
          ))}
        </div>

        {filteredClubs.length === 0 && (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl">
            <p className="text-sm text-slate-500">No Rotary Clubs found matching your search.</p>
          </div>
        )}

      </div>
    </section>
  );
};
