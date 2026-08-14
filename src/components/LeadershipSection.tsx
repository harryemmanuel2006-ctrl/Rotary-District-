import React, { useState } from 'react';
import { Shield, Award, Mail, Phone, ExternalLink, User } from 'lucide-react';
import { useData } from '../context/DataContext';

export const LeadershipSection: React.FC = () => {
  const { leadership } = useData();
  const [activeCategory, setActiveTab] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Leaders' },
    { id: 'ri_leadership', label: 'Rotary International Leadership' },
    { id: 'district_executive', label: 'District Executive Council' },
    { id: 'committee_chairs', label: 'Committee Chairs' },
    { id: 'state_governors', label: 'Executive State Governors' },
    { id: 'royal_patron', label: 'Royal Patrons' },
  ];

  const filteredMembers = activeCategory === 'all'
    ? leadership
    : leadership.filter((m) => m.roleCategory === activeCategory);

  return (
    <section className="py-20 bg-slate-50 text-slate-900 relative border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-widest mb-3">
            <Award className="w-4 h-4 text-amber-600" />
            <span>District 9141 Roster 2026–2027</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#061329] tracking-tight">
            Profiles of Rotary Leadership
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Dedicated leaders driving service above self across Rotary International and District 9141.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center sm:justify-center gap-2 mb-10 overflow-x-auto pb-3 sm:pb-0 no-scrollbar sm:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
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

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-slate-200 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between transition-all hover:scale-[1.02] group"
            >
              <div>
                {/* Member Image */}
                <div className="aspect-[4/5] relative bg-slate-100 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061329]/80 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-3 left-3 bg-[#0B1E3D]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-500/30 text-[10px] font-bold text-amber-300">
                    {member.roleCategory.replace('_', ' ').toUpperCase()}
                  </div>
                </div>

                {/* Member Details */}
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-black text-[#061329] group-hover:text-amber-600 transition-colors">
                    {member.name}
                  </h3>
                  
                  <p className="text-xs font-bold text-amber-700">
                    {member.title}
                  </p>

                  {member.clubOrOrg && (
                    <p className="text-[11px] text-slate-500 font-medium">
                      {member.clubOrOrg}
                    </p>
                  )}

                  {member.bio && (
                    <p className="text-xs text-slate-600 pt-2 border-t border-slate-100 line-clamp-3 leading-relaxed">
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact / Footer info if available */}
              {(member.email || member.phone) && (
                <div className="p-4 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-600 space-y-1">
                  {member.email && (
                    <div className="flex items-center gap-1.5 truncate">
                      <Mail className="w-3 h-3 text-amber-600 shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  )}
                  {member.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>{member.phone}</span>
                    </div>
                  )}
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
