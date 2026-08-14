import React, { useState } from 'react';
import { Compass, CheckSquare, HeartHandshake, ShieldCheck, Music, Heart, BookOpen } from 'lucide-react';

export const VisionMissionSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vision' | '4way' | 'avenues' | 'code' | 'prayers'>('vision');

  return (
    <section className="py-20 bg-white text-slate-900 relative border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-widest mb-3">
            <Compass className="w-4 h-4 text-amber-600" />
            <span>Guiding Principles & Rotary Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#061329] tracking-tight">
            Our Vision, Mission & Values
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            The foundational ideals that guide Rotarians across District 9141 and around the world.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center sm:justify-center gap-2 mb-10 overflow-x-auto pb-3 sm:pb-0 no-scrollbar sm:flex-wrap">
          <button
            onClick={() => setActiveTab('vision')}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 min-h-[44px] ${
              activeTab === 'vision'
                ? 'bg-[#0B1E3D] text-amber-400 border border-amber-500/40 shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:text-[#061329] border border-slate-200 hover:bg-slate-200'
            }`}
          >
            Vision & Object of Rotary
          </button>
          <button
            onClick={() => setActiveTab('4way')}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 min-h-[44px] ${
              activeTab === '4way'
                ? 'bg-[#0B1E3D] text-amber-400 border border-amber-500/40 shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:text-[#061329] border border-slate-200 hover:bg-slate-200'
            }`}
          >
            The 4-Way Test
          </button>
          <button
            onClick={() => setActiveTab('avenues')}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 min-h-[44px] ${
              activeTab === 'avenues'
                ? 'bg-[#0B1E3D] text-amber-400 border border-amber-500/40 shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:text-[#061329] border border-slate-200 hover:bg-slate-200'
            }`}
          >
            Avenues of Service
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 min-h-[44px] ${
              activeTab === 'code'
                ? 'bg-[#0B1E3D] text-amber-400 border border-amber-500/40 shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:text-[#061329] border border-slate-200 hover:bg-slate-200'
            }`}
          >
            Rotarian Code of Conduct
          </button>
          <button
            onClick={() => setActiveTab('prayers')}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 min-h-[44px] ${
              activeTab === 'prayers'
                ? 'bg-[#0B1E3D] text-amber-400 border border-amber-500/40 shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:text-[#061329] border border-slate-200 hover:bg-slate-200'
            }`}
          >
            Prayers, Grace & Anthems
          </button>
        </div>

        {/* Tab Content Display */}

        {/* 1. Vision & Object of Rotary */}
        {activeTab === 'vision' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Vision Banner */}
            <div className="bg-[#0B1E3D] text-white border border-amber-500/40 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-xl">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
                  Rotary Vision Statement
                </span>
                <blockquote className="text-xl sm:text-2xl font-black text-amber-300 leading-snug">
                  “Together, we see a world where people unite and take action to create lasting change — across the globe, in our communities, and in ourselves.”
                </blockquote>
                <p className="text-xs text-slate-200 leading-relaxed pt-4 border-t border-[#162C52]">
                  As we stand on the cusp of eliminating polio, we ourselves stand poised for our next challenges. To achieve the vision of Rotary International and The Rotary Foundation, we focus on 4 priorities: Increase Impact, Expand Our Reach, Enhance Participant Engagement, and Increase Our Ability to Adapt.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px] font-bold uppercase">
                <div className="p-2.5 bg-[#061329] rounded-xl border border-[#162C52] text-amber-400">
                  1. Increase Impact
                </div>
                <div className="p-2.5 bg-[#061329] rounded-xl border border-[#162C52] text-amber-400">
                  2. Expand Reach
                </div>
                <div className="p-2.5 bg-[#061329] rounded-xl border border-[#162C52] text-amber-400">
                  3. Enhance Engagement
                </div>
                <div className="p-2.5 bg-[#061329] rounded-xl border border-[#162C52] text-amber-400">
                  4. Increase Ability to Adapt
                </div>
              </div>
            </div>

            {/* Object of Rotary */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6 shadow-xl">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-amber-600" />
                <h3 className="text-xl font-bold text-[#061329]">The Object of Rotary</h3>
              </div>

              <p className="text-xs text-slate-600">
                The Object of Rotary is to encourage and foster the ideal of service as a basis of worthy enterprise and, in particular, to encourage and foster:
              </p>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-amber-700 font-bold uppercase text-[10px] tracking-wider block mb-1">First</span>
                  <p>The development of acquaintance as an opportunity for service;</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-amber-700 font-bold uppercase text-[10px] tracking-wider block mb-1">Second</span>
                  <p>High ethical standards in business and professions; the recognition of the worthiness of all useful occupations; and the dignifying of each Rotarian’s occupation as an opportunity to serve society;</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-amber-700 font-bold uppercase text-[10px] tracking-wider block mb-1">Third</span>
                  <p>The application of the ideal of service in each Rotarian’s personal, business, and community life;</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-amber-700 font-bold uppercase text-[10px] tracking-wider block mb-1">Fourth</span>
                  <p>The advancement of international understanding, goodwill, and peace through a world fellowship of business and professional persons united in the ideal of service.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. The 4-Way Test */}
        {activeTab === '4way' && (
          <div className="max-w-4xl mx-auto bg-[#0B1E3D] text-white border-2 border-amber-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-8 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-500/30">
              <CheckSquare className="w-4 h-4 text-amber-400" />
              <span>Ethical Guide for Rotarians</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white">
              THE 4-WAY TEST
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Of the things we think, say or do:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
              <div className="p-6 bg-[#061329] rounded-2xl border border-amber-500/30 flex items-start gap-4 hover:border-amber-500 transition-colors">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-black text-amber-300">Is it the TRUTH?</h4>
                  <p className="text-xs text-slate-300 mt-1">Honesty, integrity, and transparency in all personal and professional dealings.</p>
                </div>
              </div>

              <div className="p-6 bg-[#061329] rounded-2xl border border-amber-500/30 flex items-start gap-4 hover:border-amber-500 transition-colors">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-black text-amber-300">Is it FAIR to all concerned?</h4>
                  <p className="text-xs text-slate-300 mt-1">Ensuring justice, equity, and mutual respect for every stakeholder involved.</p>
                </div>
              </div>

              <div className="p-6 bg-[#061329] rounded-2xl border border-amber-500/30 flex items-start gap-4 hover:border-amber-500 transition-colors">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-black text-amber-300">Will it build GOODWILL and BETTER FRIENDSHIPS?</h4>
                  <p className="text-xs text-slate-300 mt-1">Promoting harmony, unity, and lasting fellowship in society.</p>
                </div>
              </div>

              <div className="p-6 bg-[#061329] rounded-2xl border border-amber-500/30 flex items-start gap-4 hover:border-amber-500 transition-colors">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center shrink-0">
                  4
                </div>
                <div>
                  <h4 className="text-lg font-black text-amber-300">Will it be BENEFICIAL to all concerned?</h4>
                  <p className="text-xs text-slate-300 mt-1">Creating value and positive outcome for our communities and humanity.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Avenues of Service */}
        {activeTab === 'avenues' && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="bg-slate-50 border border-slate-200 hover:border-amber-500/50 p-6 rounded-2xl space-y-3 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#0B1E3D] text-amber-400 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="text-base font-bold text-[#061329]">Club Service</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Focuses on making clubs strong. A thriving club is anchored by strong relationships and an active membership development plan.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 hover:border-amber-500/50 p-6 rounded-2xl space-y-3 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#0B1E3D] text-amber-400 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="text-base font-bold text-[#061329]">Vocational Service</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calls on every Rotarian to work with integrity and contribute their professional expertise to the problems and needs of society.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 hover:border-amber-500/50 p-6 rounded-2xl space-y-3 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#0B1E3D] text-amber-400 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="text-base font-bold text-[#061329]">Community Service</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Encourages every Rotarian to find ways to improve the quality of life for people in their communities and serve the public interest.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 hover:border-amber-500/50 p-6 rounded-2xl space-y-3 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#0B1E3D] text-amber-400 flex items-center justify-center font-bold">
                4
              </div>
              <h4 className="text-base font-bold text-[#061329]">International Service</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Exemplifies global reach in promoting peace and understanding by sponsoring or volunteering on international projects.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 hover:border-amber-500/50 p-6 rounded-2xl space-y-3 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#0B1E3D] text-amber-400 flex items-center justify-center font-bold">
                5
              </div>
              <h4 className="text-base font-bold text-[#061329]">Youth Service</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Empowers youth and young professionals through leadership development like Rotaract, Interact, RYLA, and Youth Exchange.
              </p>
            </div>
          </div>
        )}

        {/* 4. Code of Conduct */}
        {activeTab === 'code' && (
          <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-amber-600" />
              <h3 className="text-xl font-bold text-[#061329]">Rotarian Code of Conduct</h3>
            </div>
            <p className="text-xs text-slate-600">
              As a Rotarian, I will:
            </p>
            <ol className="space-y-4 text-xs sm:text-sm text-slate-800">
              <li className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <span className="font-bold text-amber-600">1.</span>
                <span>Act with integrity and high ethical standards in my personal and professional life.</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <span className="font-bold text-amber-600">2.</span>
                <span>Deal fairly with others and treat them and their occupations with respect.</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <span className="font-bold text-amber-600">3.</span>
                <span>Use my professional skills through Rotary to mentor young people, help those with special needs, and improve people's quality of life in my community and in the world.</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <span className="font-bold text-amber-600">4.</span>
                <span>Avoid behavior that reflects adversely on Rotary or other Rotarians.</span>
              </li>
            </ol>
          </div>
        )}

        {/* 5. Prayers, Grace & Anthems */}
        {activeTab === 'prayers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Rotary Prayer & Grace */}
            <div className="bg-[#0B1E3D] text-white border border-amber-500/40 rounded-3xl p-8 space-y-6 shadow-xl">
              <div className="space-y-3">
                <h4 className="text-lg font-bold text-amber-400 uppercase tracking-wider">Rotary Prayer</h4>
                <div className="p-4 bg-[#061329] rounded-2xl border border-[#162C52] text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed italic">
                  <p>Inspire Rotarians lord we ask</p>
                  <p>To live as we profess</p>
                  <p>To dignify our daily task</p>
                  <p>And serve in selflessness</p>
                  <p className="pt-2">For fellowship which here we share</p>
                  <p>We offer thanks to thee</p>
                  <p>We pray that it will be our care</p>
                  <p>To spread it bounteously.</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#162C52]">
                <h4 className="text-lg font-bold text-amber-400 uppercase tracking-wider">Rotary Grace</h4>
                <div className="p-4 bg-[#061329] rounded-2xl border border-[#162C52] text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed italic">
                  <p>O Lord and giver of all good,</p>
                  <p>We thank thee for our daily food.</p>
                  <p>May Rotary friends and Rotary ways,</p>
                  <p>Help us to serve thee all our Days.</p>
                </div>
              </div>
            </div>

            {/* National Anthem */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-4 shadow-xl">
              <h4 className="text-lg font-bold text-amber-700 uppercase tracking-wider">National Anthem (Nigeria)</h4>
              <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-3 leading-relaxed shadow-sm">
                <div>
                  <strong className="text-amber-800 block mb-1">Stanza 1</strong>
                  <p>Nigeria, we hail thee,</p>
                  <p>Our own dear native land,</p>
                  <p>Though tribes and tongue may differ</p>
                  <p>In brotherhood we stand,</p>
                  <p>Nigerians all, and proud to serve</p>
                  <p>Our sovereign Motherland.</p>
                </div>
                <div>
                  <strong className="text-amber-800 block mb-1">Stanza 2</strong>
                  <p>Our flag shall be a symbol</p>
                  <p>That truth and justice reign,</p>
                  <p>In peace or battle honour'd,</p>
                  <p>And this we count as gain,</p>
                  <p>To hand on to our children</p>
                  <p>A banner without stain.</p>
                </div>
                <div>
                  <strong className="text-amber-800 block mb-1">Stanza 3</strong>
                  <p>O God of all creation,</p>
                  <p>Grant this our one request.</p>
                  <p>Help us to build a nation</p>
                  <p>Where no man is oppressed,</p>
                  <p>And so with peace and plenty</p>
                  <p>Nigeria may be blessed.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
