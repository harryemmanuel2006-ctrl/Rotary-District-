import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Check, Sparkles, User, Mail, Phone, RefreshCw, Layers } from 'lucide-react';
import { DistrictProject, DigitalReceipt } from '../types';
import { useData } from '../context/DataContext';
import { PaymentGatewayModal } from './PaymentGatewayModal';
import { DigitalReceiptModal } from './DigitalReceiptModal';

interface ProjectDonationModalProps {
  project: DistrictProject;
  onClose: () => void;
}

export const ProjectDonationModal: React.FC<ProjectDonationModalProps> = ({ project, onClose }) => {
  const { addProjectDonation } = useData();

  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [amountNgn, setAmountNgn] = useState<number>(25000);
  const [customAmount, setCustomAmount] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState<'Monthly' | 'Quarterly' | 'Annual'>('Monthly');
  const [message, setMessage] = useState('');

  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [issuedReceipt, setIssuedReceipt] = useState<DigitalReceipt | null>(null);

  const presetAmounts = [10000, 25000, 50000, 100000, 250000];

  const handleSelectPreset = (amt: number) => {
    setAmountNgn(amt);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setAmountNgn(num);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amountNgn <= 0) return;
    setShowPaymentGateway(true);
  };

  const handlePaymentSuccess = (paymentRef: string, gateway: 'Paystack' | 'Flutterwave' | 'Bank Transfer Simulation') => {
    setShowPaymentGateway(false);

    const { receipt } = addProjectDonation({
      projectId: project.id,
      projectTitle: project.title,
      donorName: isAnonymous ? 'Anonymous Donor' : donorName || 'Supporter of Rotary',
      donorEmail,
      donorPhone,
      amountNgn,
      isAnonymous,
      isRecurring,
      recurringFrequency: isRecurring ? recurringFrequency : undefined,
      message,
      paymentGateway: gateway,
      paymentReference: paymentRef,
    });

    setIssuedReceipt(receipt);
  };

  if (issuedReceipt) {
    return <DigitalReceiptModal receipt={issuedReceipt} onClose={onClose} />;
  }

  const remainingFund = Math.max(0, project.targetFund - project.raisedFund);
  const progressPercent = Math.min(100, Math.round((project.raisedFund / project.targetFund) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-950 border border-amber-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Header Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 pb-6 border-b border-zinc-800">
          <img
            src={project.image}
            alt={project.title}
            className="w-20 h-20 rounded-2xl object-cover border border-amber-500/30 shadow-lg flex-shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase mb-1">
              {project.category} • {project.location}
            </span>
            <h3 className="text-xl font-extrabold text-white">{project.title}</h3>
            <p className="text-xs text-zinc-400 mt-0.5 line-clamp-2">
              {project.shortDescription}
            </p>
          </div>
        </div>

        {/* Funding Progress Bar */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-6 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-400">
              Raised: <strong className="text-amber-400 font-bold">₦{project.raisedFund.toLocaleString()}</strong>
            </span>
            <span className="text-zinc-400">
              Goal: <strong className="text-white font-bold">₦{project.targetFund.toLocaleString()}</strong>
            </span>
          </div>
          <div className="w-full bg-zinc-950 h-3 rounded-full overflow-hidden p-0.5 border border-zinc-800">
            <div
              className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] text-zinc-500 pt-1">
            <span>{progressPercent}% Goal Reached</span>
            <span>₦{remainingFund.toLocaleString()} Remaining</span>
          </div>
        </div>

        {/* Donation Form */}
        <form onSubmit={handleFormSubmit} className="space-y-5">
          
          {/* Preset Amount Selector */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">
              Select Donation Amount (NGN)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleSelectPreset(amt)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
                    amountNgn === amt && !customAmount
                      ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-md scale-105'
                      : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-amber-500/40'
                  }`}
                >
                  ₦{(amt / 1000).toFixed(0)}k
                </button>
              ))}
            </div>

            <div className="mt-2.5">
              <input
                type="number"
                placeholder="Or enter custom amount in ₦ (e.g. 150000)"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Recurring Donation Checkbox */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-3.5 space-y-3">
            <label className="flex items-center gap-2.5 text-xs text-zinc-300 font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-700 text-amber-500 focus:ring-amber-500 bg-zinc-950"
              />
              <span className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                Make this a recurring donation
              </span>
            </label>

            {isRecurring && (
              <div className="flex gap-2 pt-1">
                {(['Monthly', 'Quarterly', 'Annual'] as const).map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setRecurringFrequency(freq)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border ${
                      recurringFrequency === freq
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Donor Personal Information */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-semibold text-zinc-300">
                Donor Contact Details
              </label>
              <label className="flex items-center gap-1.5 text-[11px] text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-zinc-700 text-amber-500 focus:ring-amber-500 bg-zinc-950"
                />
                <span>Donate Anonymously</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  required={!isAnonymous}
                  placeholder="Full Name / Organization"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  disabled={isAnonymous}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none disabled:opacity-40"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="Email Address (for receipt)"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Optional Goodwill Note / Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-zinc-950 font-black text-sm hover:from-amber-400 hover:to-yellow-400 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-zinc-950" />
            <span>Donate ₦{amountNgn.toLocaleString()} Now</span>
          </button>
        </form>

      </div>

      {showPaymentGateway && (
        <PaymentGatewayModal
          title={`Donation to ${project.title}`}
          purposeDescription={`Humanitarian Project Fund (${project.category})`}
          amountNgn={amountNgn}
          payerName={isAnonymous ? 'Anonymous Donor' : donorName || 'Rotary Donor'}
          payerEmail={donorEmail}
          payerPhone={donorPhone}
          onClose={() => setShowPaymentGateway(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};
