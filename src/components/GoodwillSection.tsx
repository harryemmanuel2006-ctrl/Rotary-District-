import React, { useState } from 'react';
import { Quote, MessageSquarePlus, Heart, Sparkles, User, Calendar, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

export const GoodwillSection: React.FC = () => {
  const { goodwillMessages, addGoodwillMessage } = useData();
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form State
  const [senderName, setSenderName] = useState('');
  const [senderTitle, setSenderTitle] = useState('');
  const [organizationOrClub, setOrganizationOrClub] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !message) return;

    addGoodwillMessage({
      senderName,
      senderTitle: senderTitle || 'Rotarian / Well-Wisher',
      organizationOrClub: organizationOrClub || 'District 9141 Friend',
      message: `"${message}"`,
      date: 'August 2026',
      isFeatured: false,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowAddModal(false);
      setSenderName('');
      setSenderTitle('');
      setOrganizationOrClub('');
      setMessage('');
    }, 1500);
  };

  return (
    <section className="py-20 bg-slate-50 text-slate-900 relative border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-widest mb-3">
            <Quote className="w-4 h-4 text-amber-600" />
            <span>Felicitation & Tributes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#061329] tracking-tight">
            Goodwill Messages
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Messages of goodwill and felicitations to District Governor Rotarian Chibueze Anthony Olikagu on his installation and 10th District Anniversary.
          </p>

          <div className="pt-6">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 rounded-xl bg-[#0B1E3D] text-amber-300 border border-amber-500/40 font-bold text-xs hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center gap-2 mx-auto shadow-md"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Send Your Goodwill Message</span>
            </button>
          </div>
        </div>

        {/* Goodwill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {goodwillMessages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white border rounded-3xl p-8 relative flex flex-col justify-between shadow-md transition-all ${
                msg.isFeatured
                  ? 'border-amber-500/60 shadow-lg'
                  : 'border-slate-200 hover:border-amber-500/30'
              }`}
            >
              <Quote className="w-8 h-8 text-amber-500/20 absolute top-6 right-6" />

              <div className="space-y-4">
                {msg.isFeatured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-700 text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    Featured Goodwill
                  </span>
                )}

                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed pt-2">
                  {msg.message}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#061329]">
                    {msg.senderName}
                  </h4>
                  <p className="text-xs text-amber-700 font-semibold">
                    {msg.senderTitle}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {msg.organizationOrClub}
                  </p>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {msg.date}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Add Goodwill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#061329]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1E3D] border border-amber-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl relative">
            <h3 className="text-xl font-bold text-amber-400 mb-2">Send Goodwill Message</h3>
            <p className="text-xs text-slate-300 mb-6">
              Congratulate District Governor Chibueze Anthony Olikagu & District 9141.
            </p>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Thank You!</h4>
                <p className="text-xs text-slate-200">Your goodwill message has been submitted successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Rotarian Chief John Doe"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#061329] border border-[#162C52] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">Title / Role</label>
                    <input
                      type="text"
                      placeholder="e.g., Club President / AG"
                      value={senderTitle}
                      onChange={(e) => setSenderTitle(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#061329] border border-[#162C52] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">Club or Organization</label>
                    <input
                      type="text"
                      placeholder="e.g., Rotary Club of Yenagoa"
                      value={organizationOrClub}
                      onChange={(e) => setOrganizationOrClub(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#061329] border border-[#162C52] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">Goodwill Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your congratulatory message to the District Governor..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#061329] border border-[#162C52] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400"
                  >
                    Publish Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
