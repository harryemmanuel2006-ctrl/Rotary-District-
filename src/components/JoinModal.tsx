import React, { useState } from 'react';
import {
  Users,
  X,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  User,
  Search,
  CreditCard,
  Upload,
  ShieldCheck,
  Check,
  Sparkles,
  Award,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { MembershipApplication, MembershipStatus, DigitalReceipt } from '../types';
import { PaymentGatewayModal } from './PaymentGatewayModal';
import { DigitalReceiptModal } from './DigitalReceiptModal';
import confetti from 'canvas-confetti';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  const { clubs, addApplication, applications, recordMembershipPayment } = useData();

  const [activeTab, setActiveTab] = useState<'apply' | 'track'>('apply');

  // Application Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState<'Bayelsa' | 'Rivers' | 'Edo' | 'Delta' | 'Other'>('Bayelsa');
  const [city, setCity] = useState('');
  const [occupation, setOccupation] = useState('');
  const [preferredClubId, setPreferredClubId] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([
    'Literacy & Education',
    'Disease Prevention & Health',
  ]);
  const [previousExperience, setPreviousExperience] = useState('None');
  const [address, setAddress] = useState('');
  const [passportPhotoUrl, setPassportPhotoUrl] = useState('');
  const [message, setMessage] = useState('');

  const [submittedApp, setSubmittedApp] = useState<MembershipApplication | null>(null);

  // Application Status Lookup State
  const [searchQuery, setSearchQuery] = useState('');
  const [foundApp, setFoundApp] = useState<MembershipApplication | null>(null);
  const [searchExecuted, setSearchExecuted] = useState(false);

  // Payment State
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [issuedReceipt, setIssuedReceipt] = useState<DigitalReceipt | null>(null);

  if (!isOpen) return null;

  const areasOfFocusOptions = [
    'Literacy & Basic Education',
    'Disease Prevention & Health',
    'Maternal & Child Health',
    'Peace & Conflict Prevention',
    'Water, Sanitation & Hygiene',
    'Economic & Community Development',
    'Supporting the Environment',
    'Youth Service & Rotaract',
  ];

  const handleToggleArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter((a) => a !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  const handlePhotoUploadSimulation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPassportPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedClub = clubs.find((c) => c.id === preferredClubId);
    const clubName = selectedClub ? selectedClub.name : 'Rotary Club of Yenagoa (Default Secretariat Allocation)';

    const newApp = addApplication({
      fullName,
      email,
      phone,
      state,
      city,
      occupation,
      preferredClubId,
      preferredClubName: clubName,
      areasOfInterest: selectedAreas,
      previousExperience,
      address,
      passportPhotoUrl: passportPhotoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      message,
    });

    setSubmittedApp(newApp);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#10b981', '#ffffff'],
    });
  };

  const handleSearchApp = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchExecuted(true);
    const cleanQuery = searchQuery.trim().toLowerCase();

    const match = applications.find(
      (a) =>
        a.referenceNumber.toLowerCase() === cleanQuery ||
        a.email.toLowerCase() === cleanQuery ||
        a.phone.includes(cleanQuery)
    );

    setFoundApp(match || null);
  };

  const handlePaymentSuccess = (paymentRef: string, gateway: 'Paystack' | 'Flutterwave' | 'Bank Transfer Simulation') => {
    setShowPaymentGateway(false);
    if (foundApp) {
      const receipt = recordMembershipPayment(foundApp.id, gateway, paymentRef);
      setIssuedReceipt(receipt);
      // Refresh local found app status to Active
      setFoundApp({ ...foundApp, status: 'Active', paymentReference: paymentRef });
    }
  };

  if (issuedReceipt) {
    return <DigitalReceiptModal receipt={issuedReceipt} onClose={onClose} />;
  }

  const getStatusBadge = (status: MembershipStatus) => {
    switch (status) {
      case 'Pending':
        return <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs font-bold">Pending Review</span>;
      case 'Under Review':
        return <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">Under Review</span>;
      case 'Approved':
      case 'Payment Pending':
        return <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">Approved — Dues Payment Ready</span>;
      case 'Active':
        return <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1"><Award className="w-3.5 h-3.5" /> Active Rotarian</span>;
      case 'Rejected':
        return <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold">Application Not Approved</span>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#061329]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0B1E3D] border border-amber-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#061329] border border-[#162C52] text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tabs */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
              District 9141 Secretariat
            </span>
            <h3 className="text-xl font-black text-white">Join Rotary / Membership Portal</h3>
          </div>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="flex bg-[#061329] p-1 rounded-2xl border border-[#162C52] mb-6">
          <button
            onClick={() => { setActiveTab('apply'); setSubmittedApp(null); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'apply'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            1. Submit Application
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'track'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            2. Check Application Status & Pay Fees
          </button>
        </div>

        {activeTab === 'apply' && (
          <div>
            {submittedApp ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Application Received!</h4>
                <p className="text-xs text-slate-200">
                  Thank you, <strong>{submittedApp.fullName}</strong>. Your Rotary membership application has been submitted to the District 9141 Secretariat.
                </p>

                <div className="bg-[#061329] border border-amber-500/30 p-4 rounded-2xl max-w-sm mx-auto">
                  <span className="text-[10px] font-semibold text-slate-300 uppercase block">
                    Your Membership Application Reference
                  </span>
                  <span className="text-xl font-mono font-black text-amber-400">
                    {submittedApp.referenceNumber}
                  </span>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Save this reference number to track status & pay induction dues!
                  </p>
                </div>

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('track')}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
                  >
                    Track Status & Pay Fees
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl border border-[#162C52] text-slate-300 text-xs font-semibold hover:bg-[#061329]"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs max-h-[65vh] overflow-y-auto pr-2">
                
                {/* Personal Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-200 mb-1">
                      Full Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Tariowei Ebi"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#061329] border border-[#162C52] rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-200 mb-1">
                      Email Address <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#061329] border border-[#162C52] rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-200 mb-1">
                      Phone Number <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 800 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#061329] border border-[#162C52] rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-200 mb-1">
                      State <span className="text-amber-400">*</span>
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value as any)}
                      className="w-full px-3.5 py-2 bg-[#061329] border border-[#162C52] rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                    >
                      <option value="Bayelsa">Bayelsa State</option>
                      <option value="Rivers">Rivers State</option>
                      <option value="Edo">Edo State</option>
                      <option value="Delta">Delta State</option>
                      <option value="Other">Other / Diaspora</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-200 mb-1">
                      City / Town <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Yenagoa, Port Harcourt"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#061329] border border-[#162C52] rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Vocation & Club Choice */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-200 mb-1">
                      Occupation / Classification <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Medical Doctor, Engineer, Legal Practitioner"
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#061329] border border-[#162C52] rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-200 mb-1">
                      Preferred Rotary Club
                    </label>
                    <select
                      value={preferredClubId}
                      onChange={(e) => setPreferredClubId(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#061329] border border-[#162C52] rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                    >
                      <option value="">-- Recommend Club Based on Location --</option>
                      {clubs.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.state})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Passport Photograph Upload */}
                <div>
                  <label className="block font-semibold text-slate-200 mb-1">
                    Passport Photograph (Upload or Image Link)
                  </label>
                  <div className="flex items-center gap-3 bg-[#061329] p-2.5 rounded-xl border border-[#162C52]">
                    {passportPhotoUrl ? (
                      <img
                        src={passportPhotoUrl}
                        alt="Passport Preview"
                        className="w-12 h-12 rounded-xl object-cover border border-amber-500/40"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-[#0B1E3D] border border-dashed border-[#162C52] flex items-center justify-center text-slate-400">
                        <User className="w-6 h-6" />
                      </div>
                    )}
                    <div className="flex-1 space-y-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUploadSimulation}
                        className="block w-full text-[11px] text-slate-300 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-amber-500/20 file:text-amber-300 hover:file:bg-amber-500/30"
                      />
                      <input
                        type="url"
                        placeholder="Or paste photo web link (https://...)"
                        value={passportPhotoUrl}
                        onChange={(e) => setPassportPhotoUrl(e.target.value)}
                        className="w-full px-2.5 py-1 bg-[#0B1E3D] border border-[#162C52] rounded-lg text-white text-[11px] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Areas of Interest */}
                <div>
                  <label className="block font-semibold text-slate-200 mb-1">
                    Areas of Rotary Service Interest
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-[#061329]/60 p-3 rounded-2xl border border-[#162C52]">
                    {areasOfFocusOptions.map((area) => (
                      <label key={area} className="flex items-center gap-2 cursor-pointer text-[11px] text-slate-200">
                        <input
                          type="checkbox"
                          checked={selectedAreas.includes(area)}
                          onChange={() => handleToggleArea(area)}
                          className="w-3.5 h-3.5 rounded border-[#162C52] text-amber-500 focus:ring-amber-500 bg-[#0B1E3D]"
                        />
                        <span>{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Previous Experience & Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-200 mb-1">
                      Previous Rotary / Rotaract Experience
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Past Rotaract President / None"
                      value={previousExperience}
                      onChange={(e) => setPreviousExperience(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#061329] border border-[#162C52] rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-200 mb-1">
                      Residential / Office Address <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full street address, City, State"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#061329] border border-[#162C52] rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-200 mb-1">
                    Additional Message to Secretariat (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us why you want to serve with Rotary..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#061329] border border-[#162C52] rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-slate-950 font-black text-xs hover:from-amber-400 hover:to-yellow-400 shadow-lg shadow-amber-500/20 transition-all mt-2"
                >
                  Submit Membership Application to District 9141
                </button>
              </form>
            )}
          </div>
        )}

        {activeTab === 'track' && (
          <div className="space-y-6">
            
            {/* Search Box */}
            <form onSubmit={handleSearchApp} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  required
                  placeholder="Enter Application Ref (e.g. RID9141-MEM-2026-8821) or Email"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#061329] border border-[#162C52] rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
              >
                Track Status
              </button>
            </form>

            {/* Quick Demo Pre-fill hints */}
            <div className="bg-[#061329]/60 p-3 rounded-xl border border-[#162C52] text-[11px] text-slate-300 flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-200">Quick Test Refs:</span>
              <button
                onClick={() => { setSearchQuery('RID9141-MEM-2026-8821'); setFoundApp(applications.find((a) => a.referenceNumber === 'RID9141-MEM-2026-8821') || null); }}
                className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
              >
                Approved Ref (Dr. Tariowei Ebi)
              </button>
              <button
                onClick={() => { setSearchQuery('RID9141-MEM-2026-4419'); setFoundApp(applications.find((a) => a.referenceNumber === 'RID9141-MEM-2026-4419') || null); }}
                className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
              >
                Active Member Ref (Grace Oghenekaro)
              </button>
            </div>

            {/* Search Results */}
            {foundApp ? (
              <div className="bg-[#061329] border border-amber-500/30 rounded-2xl p-5 space-y-4 text-xs">
                
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#162C52]">
                  <div>
                    <span className="font-mono font-bold text-amber-400 text-sm">
                      {foundApp.referenceNumber}
                    </span>
                    <h4 className="text-base font-extrabold text-white">{foundApp.fullName}</h4>
                    <p className="text-slate-300 text-[11px]">{foundApp.occupation} • {foundApp.city}, {foundApp.state}</p>
                  </div>
                  <div>
                    {getStatusBadge(foundApp.status)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">Assigned Rotary Club:</span>
                    <span className="font-bold text-white">{foundApp.preferredClubName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Submitted On:</span>
                    <span className="font-semibold text-slate-200">{foundApp.submittedAt}</span>
                  </div>
                </div>

                {foundApp.adminNotes && (
                  <div className="bg-[#0B1E3D] p-3 rounded-xl border border-[#162C52] text-[11px]">
                    <span className="font-semibold text-amber-400 block mb-0.5">Secretariat Review Notes:</span>
                    <p className="text-slate-200">{foundApp.adminNotes}</p>
                  </div>
                )}

                {/* Status Action Workflow */}
                {(foundApp.status === 'Approved' || foundApp.status === 'Payment Pending') && (
                  <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/40 p-4 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-slate-300 uppercase font-semibold block">
                          Applicable Dues / Induction Fee
                        </span>
                        <span className="font-bold text-amber-400 text-sm">
                          {foundApp.assignedFeeName || 'New Member Charter & Induction Fee'}
                        </span>
                      </div>
                      <span className="text-2xl font-black text-white">
                        ₦{(foundApp.feeAmountNgn || 75000).toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => setShowPaymentGateway(true)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-slate-950 font-black text-xs hover:from-amber-400 hover:to-yellow-400 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Pay Membership Fee Online (Paystack / Flutterwave)</span>
                    </button>
                  </div>
                )}

                {foundApp.status === 'Active' && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl space-y-2 text-center">
                    <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                    <h5 className="font-bold text-white text-sm">Active District 9141 Member</h5>
                    <p className="text-[11px] text-slate-200">
                      Payment verified ({foundApp.paymentReference}). Welcome to the global Rotary family!
                    </p>
                  </div>
                )}

              </div>
            ) : (
              searchExecuted && (
                <div className="text-center py-8 text-slate-300 text-xs bg-[#061329]/40 rounded-2xl border border-[#162C52] space-y-2">
                  <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                  <p>No membership application found matching "{searchQuery}".</p>
                  <p className="text-[11px] text-slate-400">Please check your reference number or submit a new application.</p>
                </div>
              )
            )}

          </div>
        )}

      </div>

      {showPaymentGateway && foundApp && (
        <PaymentGatewayModal
          title={`Membership Fee Payment: ${foundApp.fullName}`}
          purposeDescription={`${foundApp.assignedFeeName || 'Member Induction Fee'} (${foundApp.preferredClubName})`}
          amountNgn={foundApp.feeAmountNgn || 75000}
          payerName={foundApp.fullName}
          payerEmail={foundApp.email}
          payerPhone={foundApp.phone}
          onClose={() => setShowPaymentGateway(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};
