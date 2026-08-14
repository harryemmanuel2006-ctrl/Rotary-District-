import React, { useState } from 'react';
import { Shield, Lock, Unlock, Menu, X, Heart, UserPlus, Award, ChevronDown } from 'lucide-react';
import { useData } from '../context/DataContext';
import { RotaryLogo } from './RotaryLogo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openJoinModal: () => void;
  openDonateModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openJoinModal,
  openDonateModal,
}) => {
  const { districtInfo, isAdmin, setIsAdmin } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdminPassModal, setShowAdminPassModal] = useState(false);
  const [passInput, setPassPassInput] = useState('');
  const [passError, setPassError] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'governor', label: 'About Us', hasDropdown: true },
    { id: 'projects', label: 'Projects', hasDropdown: true },
    { id: 'impact', label: 'Our Impact' },
    { id: 'events', label: 'Events' },
    { id: 'clubs', label: 'Clubs', hasDropdown: true },
    { id: 'vision', label: 'Membership', hasDropdown: true },
    { id: 'goodwill', label: 'News' },
    { id: 'leadership', label: 'Resources', hasDropdown: true },
    { id: 'gallery', label: 'Gallery' },
  ];

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setShowAdminPassModal(true);
      setPassPassInput('');
      setPassError(false);
    }
  };

  const verifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (passInput === '9141' || passInput.toLowerCase() === 'rotary' || passInput === 'admin') {
      setIsAdmin(true);
      setShowAdminPassModal(false);
      setActiveTab('admin');
    } else {
      setPassError(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm text-[#0B1E3D]">
      {/* Top Banner Ribbon */}
      <div className="bg-white border-b border-slate-100 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          
          {/* Top Left/Center Badge */}
          <div className="flex items-center gap-2 font-bold text-amber-600 tracking-wide mx-auto sm:mx-0">
            <Award className="w-4 h-4 text-amber-500" />
            <span>DISTRICT 9141 @ 10 YEARS</span>
            <span className="hidden md:inline text-slate-300">•</span>
            <span className="hidden md:inline text-slate-600 font-normal">Theme: <strong className="text-[#0B1E3D] font-bold">{districtInfo.theme}</strong></span>
          </div>

          {/* Top Right Socials & Admin */}
          <div className="flex items-center gap-4 text-slate-600 text-[11px]">
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-semibold text-[#0B1E3D]">Follow Us:</span>
              <div className="flex items-center gap-1.5">
                {['Facebook', 'X', 'Instagram', 'YouTube', 'LinkedIn'].map((platform, i) => (
                  <span
                    key={platform}
                    title={platform}
                    className="w-6 h-6 rounded-full border border-amber-500/50 text-amber-600 flex items-center justify-center font-bold text-[10px] hover:bg-amber-50 cursor-pointer transition-colors"
                  >
                    {platform[0]}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Admin Access */}
            <button
              onClick={handleAdminToggle}
              title={isAdmin ? 'Exit Admin Mode' : 'Admin Login'}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all ${
                isAdmin
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                  : 'bg-slate-100 border-slate-200 text-[#0B1E3D] hover:border-amber-500'
              }`}
            >
              {isAdmin ? <Unlock className="w-3 h-3 text-emerald-600" /> : <Lock className="w-3 h-3 text-amber-600" />}
              <span>{isAdmin ? 'Admin Active' : 'Admin'}</span>
            </button>
            {isAdmin && (
              <button
                onClick={() => setActiveTab('admin')}
                className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px] uppercase shadow"
              >
                Dashboard
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Main Logo & Menu Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center cursor-pointer group hover:opacity-95 transition-opacity"
          >
            <RotaryLogo variant="light" size="md" />
          </div>

          {/* Right Header Controls (Heart + Menu Button) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Join Button (Tablet / Desktop) */}
            <button
              onClick={openJoinModal}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#0B1E3D] text-[#0B1E3D] font-bold text-xs hover:bg-slate-50 transition-all"
            >
              <UserPlus className="w-3.5 h-3.5 text-amber-600" />
              <span>Join Rotary</span>
            </button>

            {/* Circular Heart Button */}
            <button
              onClick={openDonateModal}
              title="Donate to District Projects"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-50 border-2 border-amber-400 flex items-center justify-center text-amber-600 hover:bg-amber-500 hover:text-white transition-all shadow-sm shrink-0"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-500" />
            </button>

            {/* Menu Trigger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-[#0B1E3D] text-white font-bold text-xs hover:bg-[#061329] transition-all shadow-md"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-amber-400" /> : <Menu className="w-4 h-4 text-amber-400" />}
              <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Primary Navigation Bar (Desktop) */}
      <div className="border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 overflow-x-auto py-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`flex items-center gap-1 px-3 py-2.5 text-xs font-bold transition-all relative ${
                  activeTab === link.id
                    ? 'text-amber-600 font-black border-b-2 border-amber-500'
                    : 'text-[#0B1E3D] hover:text-amber-600'
                }`}
              >
                <span>{link.label}</span>
                {link.hasDropdown && <ChevronDown className="w-3 h-3 text-slate-400" />}
              </button>
            ))}
          </nav>

          {/* Donate Now Gold Button */}
          <div className="py-2 ml-auto lg:ml-0 flex items-center gap-2">
            <button
              onClick={openJoinModal}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-[#0B1E3D] text-[#0B1E3D] font-bold text-xs hover:bg-slate-50 transition-all"
            >
              <UserPlus className="w-3.5 h-3.5 text-amber-600" />
              <span>Join Rotary</span>
            </button>

            <button
              onClick={openDonateModal}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#0B1E3D] font-black text-xs shadow-md transition-all hover:scale-105"
            >
              <Heart className="w-3.5 h-3.5 fill-[#0B1E3D]" />
              <span>Donate Now</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown & Backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[110px] bottom-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden overflow-y-auto">
          <div className="bg-white border-b border-slate-200 px-4 pt-4 pb-8 space-y-4 max-w-xl mx-auto shadow-2xl rounded-b-3xl">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-black uppercase tracking-wider text-amber-600">
                District Navigation
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                District 9141 (2026–2027)
              </span>
            </div>

            {/* Nav Grid */}
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold text-left transition-colors min-h-[44px] ${
                    activeTab === link.id
                      ? 'bg-amber-500/15 text-amber-700 border-2 border-amber-500 font-black'
                      : 'text-[#0B1E3D] bg-slate-50 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                </button>
              ))}
            </div>

            {/* Mobile Action Buttons */}
            <div className="pt-2 border-t border-slate-200 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  openDonateModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0B1E3D] font-black text-xs shadow-md transition-all min-h-[44px]"
              >
                <Heart className="w-4 h-4 fill-[#0B1E3D]" />
                <span>Donate to District Projects</span>
              </button>
              
              <button
                onClick={() => {
                  openJoinModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-[#0B1E3D] text-[#0B1E3D] font-bold text-xs hover:bg-slate-50 transition-all min-h-[44px]"
              >
                <UserPlus className="w-4 h-4 text-amber-600" />
                <span>Become a Rotarian</span>
              </button>

              {/* Mobile Admin Link */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (isAdmin) {
                    setActiveTab('admin');
                  } else {
                    setShowAdminPassModal(true);
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-[#0B1E3D] font-semibold text-xs border border-slate-200 min-h-[44px]"
              >
                <Shield className="w-4 h-4 text-amber-600" />
                <span>{isAdmin ? 'Open Admin CMS Dashboard' : 'District Secretariat Admin Login'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Admin Passcode Modal */}
      {showAdminPassModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-amber-500/40 rounded-3xl max-w-md w-full p-6 text-[#0B1E3D] shadow-2xl relative">
            <button
              onClick={() => setShowAdminPassModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0B1E3D]">Admin Management Login</h3>
                <p className="text-xs text-slate-500">District 9141 Content Control Panel</p>
              </div>
            </div>

            <form onSubmit={verifyPasscode} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0B1E3D] mb-1">
                  Enter Admin Passcode
                </label>
                <input
                  type="password"
                  placeholder="Enter passcode (Hint: 9141)"
                  value={passInput}
                  onChange={(e) => setPassPassInput(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-[#0B1E3D] placeholder-slate-400 focus:outline-none focus:border-amber-500 text-sm font-medium"
                  autoFocus
                />
                {passError && (
                  <p className="text-rose-600 text-xs mt-1.5 font-medium">
                    Incorrect passcode! Try typing <strong>9141</strong> or <strong>rotary</strong>.
                  </p>
                )}
                <p className="text-[11px] text-slate-500 mt-2">
                  * Passcode is set to <strong>9141</strong> for district administrators.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdminPassModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-black bg-amber-500 text-[#0B1E3D] hover:bg-amber-400 shadow-md"
                >
                  Unlock Admin Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
