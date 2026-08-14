import React, { useState } from 'react';
import { Heart, X, CheckCircle, Shield, Building, CreditCard, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import { PaymentGatewayModal } from './PaymentGatewayModal';
import { DigitalReceiptModal } from './DigitalReceiptModal';
import { DigitalReceipt } from '../types';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCause?: string;
}

export const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose, defaultCause }) => {
  const { districtInfo, projects, addProjectDonation } = useData();

  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [selectedCause, setSelectedCause] = useState(defaultCause || 'BRED Literacy Project (School Desks)');
  const [amount, setAmount] = useState('50000');
  const [customAmount, setCustomAmount] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);

  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [issuedReceipt, setIssuedReceipt] = useState<DigitalReceipt | null>(null);

  if (!isOpen) return null;

  const causes = [
    'BRED Literacy Project (School Desks)',
    'PolioPlus Elimination Fund',
    'Maternal & Child Health Care',
    'Water & Sanitation Infrastructure',
    'The Rotary Foundation (TRF) Annual Fund',
  ];

  const payableNgn = parseFloat(customAmount || amount) || 50000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPaymentGateway(true);
  };

  const handlePaymentSuccess = (paymentRef: string, gateway: 'Paystack' | 'Flutterwave' | 'Bank Transfer Simulation') => {
    setShowPaymentGateway(false);

    // Find project match or default to first project
    const matchingProj = projects.find((p) => p.title.toLowerCase().includes('bred')) || projects[0];

    const { receipt } = addProjectDonation({
      projectId: matchingProj ? matchingProj.id : 'proj-1',
      projectTitle: selectedCause,
      donorName: isAnonymous ? 'Anonymous Donor' : donorName || 'Friend of Rotary',
      donorEmail,
      donorPhone,
      amountNgn: payableNgn,
      isAnonymous,
      isRecurring,
      paymentGateway: gateway,
      paymentReference: paymentRef,
    });

    setIssuedReceipt(receipt);
  };

  if (issuedReceipt) {
    return <DigitalReceiptModal receipt={issuedReceipt} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#061329]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0B1E3D] border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#061329] border border-[#162C52] text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-amber-400">
          <Heart className="w-5 h-5 fill-amber-400" />
          <span className="text-xs font-bold uppercase tracking-widest">Support District Humanitarian Service</span>
        </div>

        <h3 className="text-xl font-black text-white mb-1">
          Donate to District 9141 Projects
        </h3>
        <p className="text-xs text-slate-300 mb-6">
          Every contribution directly empowers children, communities, and health facilities in Bayelsa, Delta, Edo, and Rivers States.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1">Select Cause / Project</label>
            <select
              value={selectedCause}
              onChange={(e) => setSelectedCause(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#061329] border border-[#162C52] rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
            >
              {causes.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">Donor Name</label>
              <input
                type="text"
                required={!isAnonymous}
                disabled={isAnonymous}
                placeholder="e.g. Chief John Smith"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#061329] border border-[#162C52] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 disabled:opacity-40"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#061329] border border-[#162C52] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-200">Donation Amount (NGN)</label>
              <label className="flex items-center gap-1.5 text-[11px] text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-[#162C52] text-amber-500 bg-[#061329]"
                />
                <span>Donate Anonymously</span>
              </label>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-2">
              {['25000', '50000', '100000'].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => { setAmount(amt); setCustomAmount(''); }}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    amount === amt && !customAmount
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow'
                      : 'bg-[#061329] text-slate-200 border-[#162C52] hover:border-amber-500/40'
                  }`}
                >
                  ₦{Number(amt).toLocaleString()}
                </button>
              ))}
            </div>

            <input
              type="number"
              placeholder="Or enter custom amount in ₦..."
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#061329] border border-[#162C52] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black hover:from-amber-400 hover:to-yellow-400 shadow-lg"
            >
              Pay ₦{payableNgn.toLocaleString()} Online
            </button>
          </div>
        </form>

      </div>

      {showPaymentGateway && (
        <PaymentGatewayModal
          title={`Donation: ${selectedCause}`}
          purposeDescription="Rotary District 9141 Humanitarian Service Project Fund"
          amountNgn={payableNgn}
          payerName={isAnonymous ? 'Anonymous Donor' : donorName || 'Rotary Supporter'}
          payerEmail={donorEmail}
          payerPhone={donorPhone}
          onClose={() => setShowPaymentGateway(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};
