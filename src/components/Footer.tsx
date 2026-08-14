import React from 'react';
import { Award, Mail, Phone, MapPin, ExternalLink, Heart, Globe, Shield } from 'lucide-react';
import { useData } from '../context/DataContext';
import { RotaryLogo } from './RotaryLogo';

interface FooterProps {
  onOpenAdmin: () => void;
  openDonateModal: () => void;
  openJoinModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, openDonateModal, openJoinModal }) => {
  const { districtInfo } = useData();

  return (
    <footer className="bg-[#0B1E3D] text-white border-t border-amber-500/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-[#162C52]">
          
          {/* Col 1: District Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <RotaryLogo variant="dark" size="md" />
            </div>
            <p className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">
              NIGERIA • BAYELSA, DELTA, EDO & RIVERS STATES
            </p>

            <p className="text-xs text-slate-300 leading-relaxed max-w-md">
              Celebrating 10 Years of Rotary International District 9141. Under the leadership of District Governor Rotarian Chibueze Anthony Olikagu, Ph.D., FCA, KSM (Rotary Year 2026–2027).
            </p>

            <div className="p-4 bg-[#061329] border border-amber-500/30 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs text-amber-300 font-bold">
                <Award className="w-4 h-4 text-amber-400" />
                <span>10th District Governor Installation Ceremony</span>
              </div>
              <p className="text-[11px] text-slate-300">
                {districtInfo.installationDate} @ {districtInfo.installationVenue}, {districtInfo.installationCity}
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="#governor" className="hover:text-amber-300 transition-colors">Meet District Governor</a>
              </li>
              <li>
                <a href="#vision" className="hover:text-amber-300 transition-colors">4-Way Test & Philosophy</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-amber-300 transition-colors">BRED Literacy & Service Projects</a>
              </li>
              <li>
                <a href="#events" className="hover:text-amber-300 transition-colors">District Calendar & Events</a>
              </li>
              <li>
                <a href="#clubs" className="hover:text-amber-300 transition-colors">Rotary Clubs Directory</a>
              </li>
              <li>
                <a href="#goodwill" className="hover:text-amber-300 transition-colors">Goodwill & Tributes</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Actions */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
              District Secretariat Contact
            </h4>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{districtInfo.secretariatAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{districtInfo.secretariatEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{districtInfo.secretariatPhone}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={openDonateModal}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-xs font-black hover:from-amber-400 hover:to-yellow-400 transition-all flex items-center gap-1.5 shadow"
              >
                <Heart className="w-3.5 h-3.5 fill-slate-950" />
                <span>Donate to Foundation</span>
              </button>
              <button
                onClick={openJoinModal}
                className="px-4 py-2 rounded-xl bg-[#061329] border border-amber-500/30 text-white text-xs font-bold hover:border-amber-400 hover:bg-[#061329]/80 transition-colors"
              >
                Join Rotary
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            © 2026 Rotary International District 9141 (Bayelsa, Delta, Edo & Rivers). All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-slate-300 hover:text-amber-300 text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Secretariat Admin Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
