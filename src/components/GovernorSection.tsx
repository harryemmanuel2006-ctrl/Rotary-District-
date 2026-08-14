import React from 'react';
import { Award, Calendar, MapPin, CheckCircle2, BookOpen, Quote, Shield, ExternalLink, Sparkles, Building } from 'lucide-react';
import { useData } from '../context/DataContext';

export const GovernorSection: React.FC = () => {
  const { districtInfo } = useData();

  return (
    <section className="py-20 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-xs font-bold uppercase tracking-widest mb-3">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Rotary Year 2026–2027 Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#061329] tracking-tight">
            Meet the District Governor
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Leading Rotary International District 9141 across Bayelsa, Delta, Edo, and Rivers States.
          </p>
        </div>

        {/* Governor Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left: Official Portrait & Quick Bio Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B1E3D] border-2 border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl relative text-white">
              <div className="aspect-[4/5] relative bg-[#061329]">
                <img
                  src={districtInfo.governorImage}
                  alt={districtInfo.governorFullTitle}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061329] via-[#061329]/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3 py-1 rounded-md bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow">
                    10th District Governor
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2">
                    {districtInfo.governorFullTitle}
                  </h3>
                  <p className="text-xs text-amber-300 font-semibold mt-1">
                    Rotary Club of Yenagoa • Bayelsa State
                  </p>
                </div>
              </div>

              {/* Quick Key Achievements */}
              <div className="p-6 space-y-4 bg-[#0B1E3D] border-t border-[#162C52]">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Key Rotary Milestones
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-200">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Joined Rotary (2002):</strong> Started as Rotaractor at FUTO, Owerri (Club Secretary & SUG Director). Joined RC Yenagoa in 2010.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>RC Yenagoa President (2017–18):</strong> Doubled club membership, chartered 2 new clubs, emerged Best Club in Membership Development.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>District Membership Chair (2019–22):</strong> Achieved net gain of 1,998 members and 70 new clubs — ranked 1st in Zone 22 Africa & 2nd Globally!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Foundation Recognition:</strong> Benefactor, Major Donor, Multiple Paul Harris Fellow, Cadre of Technical Adviser.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Installation Ceremony Card */}
            <div className="bg-gradient-to-br from-[#0B1E3D] to-[#061329] border border-amber-500/40 rounded-2xl p-6 text-white space-y-3 shadow-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <h4 className="text-sm font-black text-amber-300 uppercase tracking-wider">
                  Installation Ceremony Details
                </h4>
              </div>
              <div className="space-y-1.5 text-xs text-slate-200 pt-2 border-t border-amber-500/20">
                <p className="flex items-center justify-between">
                  <span className="text-slate-300">Date:</span>
                  <strong className="text-white">{districtInfo.installationDate}</strong>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-slate-300">Venue:</span>
                  <strong className="text-white">{districtInfo.installationVenue}</strong>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-slate-300">City & State:</span>
                  <strong className="text-white">{districtInfo.installationCity}</strong>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-slate-300">Milestone:</span>
                  <strong className="text-amber-400 font-bold">Celebrating District 9141 @ 10!</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Governor's Message & Detailed Biography Citation */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Governor's Message Box */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 relative shadow-xl text-slate-800">
              <Quote className="w-10 h-10 text-amber-500/20 absolute top-6 right-6" />
              
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
                  Official Welcome Message
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#061329] mb-4">
                Message from District Governor Chibueze Anthony Olikagu
              </h3>

              <div className="prose max-w-none text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed whitespace-pre-line">
                {districtInfo.governorMessage}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#061329]">Rotarian Chibueze Anthony Olikagu, Ph.D., FCA, KSM</p>
                  <p className="text-[11px] text-slate-500">District Governor, RID 9141 (2026–2027)</p>
                </div>
                <div className="text-right text-[11px] text-slate-500">
                  <span>Yenagoa, Nigeria</span>
                </div>
              </div>
            </div>

            {/* Citation & Biography Box */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-amber-600">
                <BookOpen className="w-5 h-5" />
                <h3 className="text-lg font-bold text-[#061329]">
                  Professional & Academic Profile
                </h3>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 whitespace-pre-line">
                {districtInfo.governorCitationBio}
              </div>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] text-amber-700 font-bold">Academic Qualifications</p>
                  <p className="text-slate-800 font-medium">Ph.D. in Transport Management Technology (FUTO)</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] text-amber-700 font-bold">Professional Fellowships</p>
                  <p className="text-slate-800 font-medium">Fellow ICAN, Member CITN, Member CIOTA</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] text-amber-700 font-bold">Business Leadership</p>
                  <p className="text-slate-800 font-medium">Founder & MD, Financial Lens Consulting Ltd</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] text-amber-700 font-bold">Public Service Role</p>
                  <p className="text-slate-800 font-medium">Technical Adviser to Executive Governor of Bayelsa State</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
