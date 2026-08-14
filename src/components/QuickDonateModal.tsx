import React, { useState, useEffect } from 'react';
import { Heart, X, CheckCircle2, ShieldCheck, Sparkles, Building2, Download, Printer, Copy, CreditCard, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { DigitalReceipt } from '../types';

interface QuickDonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProjectTitle?: string;
}

export const QuickDonateModal: React.FC<QuickDonateModalProps> = ({
  isOpen,
  onClose,
  defaultProjectTitle,
}) => {
  const { districtInfo, projects, addProjectDonation } = useData();

  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<number>(25000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [donorPhone, setDonorPhone] = useState<string>('');
  const [donorClub, setDonorClub] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [paymentGateway, setPaymentGateway] = useState<'Paystack' | 'Flutterwave' | 'Direct Bank Transfer'>('Paystack');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completedReceipt, setCompletedReceipt] = useState<DigitalReceipt | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (defaultProjectTitle) {
      setSelectedProject(defaultProjectTitle);
    } else if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0].title);
    }
  }, [defaultProjectTitle, projects]);

  if (!isOpen) return null;

  const presetAmounts = [5000, 10000, 25000, 50000, 100000, 250000];

  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleSelectPreset = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(0);
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalAmount || finalAmount <= 0) {
      alert('Please specify a valid donation amount.');
      return;
    }
    if (!donorName && !isAnonymous) {
      alert('Please enter your full name or select Anonymous.');
      return;
    }
    if (!donorEmail) {
      alert('Please provide an email address for your official digital tax receipt.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const { receipt } = addProjectDonation({
        projectId: projects.find((p) => p.title === selectedProject)?.id || 'gen-fund',
        projectTitle: selectedProject || 'District 9141 General Humanitarian Fund',
        donorName: isAnonymous ? 'Anonymous Rotarian / Friend of Rotary' : donorName,
        donorEmail,
        donorPhone,
        donorClub,
        amountNgn: finalAmount,
        currency: 'NGN',
        paymentMethod: paymentGateway,
        paymentReference: `RID9141-QD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
        isAnonymous,
      });

      setIsProcessing(false);
      setCompletedReceipt(receipt);
    }, 1200);
  };

  const handleCopyReceipt = () => {
    if (completedReceipt) {
      navigator.clipboard.writeText(
        `Rotary District 9141 Official Receipt\nReceipt #: ${completedReceipt.receiptNumber}\nDonor: ${completedReceipt.recipientName}\nProject: ${completedReceipt.purpose}\nAmount: ₦${completedReceipt.amountNgn.toLocaleString()}\nDate: ${completedReceipt.issuedDate}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#061329]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-2 border-amber-500/40 relative my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {completedReceipt ? (
          /* Receipt View */
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">
                Official Digital Receipt
              </span>
              <h3 className="text-2xl font-black text-[#061329]">
                Donation Successfully Received!
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Thank you for empowering humanitarian transformation in District 9141.
              </p>
            </div>

            {/* Official Receipt Card */}
            <div className="bg-slate-50 border-2 border-dashed border-amber-500/40 rounded-2xl p-5 text-left space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-500">Receipt Number:</span>
                <span className="font-mono font-black text-amber-700">{completedReceipt.receiptNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Project / Cause:</span>
                <span className="font-bold text-[#061329] text-right truncate max-w-[200px]">{completedReceipt.purpose}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Donor Name:</span>
                <span className="font-bold text-[#061329]">{completedReceipt.recipientName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="font-black text-lg text-emerald-700 font-mono">
                  ₦{completedReceipt.amountNgn.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-[11px] text-slate-400">
                <span>Date: {completedReceipt.issuedDate}</span>
                <span>Gateway: {completedReceipt.paymentMethod}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopyReceipt}
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Copy className="w-4 h-4 text-amber-600" />
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl bg-[#0B1E3D] text-amber-400 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
            </div>

            <button
              onClick={() => {
                setCompletedReceipt(null);
                onClose();
              }}
              className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              Return to Website
            </button>
          </div>
        ) : (
          /* Quick Donate Form */
          <form onSubmit={handleDonate} className="space-y-5">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-[11px] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Direct Support Gateway</span>
              </div>
              <h3 className="text-2xl font-black text-[#061329] tracking-tight">
                Quick Donate
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Select your project, amount, and complete your donation in 60 seconds.
              </p>
            </div>

            {/* Project Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Select Project to Support
              </label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 bg-slate-50 text-slate-900 text-xs font-semibold"
              >
                <option value="District 9141 General Humanitarian Fund">
                  District 9141 General Humanitarian Fund
                </option>
                {projects.map((p) => (
                  <option key={p.id} value={p.title}>
                    {p.title} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Amount Presets */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Choose Donation Amount (NGN)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleSelectPreset(amt)}
                    className={`py-2.5 rounded-xl text-xs font-black transition-all font-mono border ${
                      selectedAmount === amt && !customAmount
                        ? 'bg-[#0B1E3D] text-amber-400 border-amber-500 shadow-md scale-[1.02]'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    ₦{amt.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="relative mt-2">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                  ₦ Custom:
                </span>
                <input
                  type="number"
                  min="500"
                  placeholder="Or enter custom amount in Naira"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-full pl-20 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 bg-slate-50 text-slate-900 text-xs font-semibold font-mono"
                />
              </div>
            </div>

            {/* Donor Information */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required={!isAnonymous}
                    disabled={isAnonymous}
                    placeholder="e.g. Rtn. John Doe"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 bg-slate-50 text-slate-900 text-xs disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Email Address (for Receipt) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 bg-slate-50 text-slate-900 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 bg-slate-50 text-slate-900 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Rotary Club / Org (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rotary Club of Port Harcourt"
                    value={donorClub}
                    onChange={(e) => setDonorClub(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-amber-500 bg-slate-50 text-slate-900 text-xs"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <span className="text-xs text-slate-600">Make this donation anonymous on public leaderboards</span>
              </label>
            </div>

            {/* Payment Gateway Options */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Payment Channel
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Paystack', 'Flutterwave', 'Direct Bank Transfer'] as const).map((gateway) => (
                  <button
                    key={gateway}
                    type="button"
                    onClick={() => setPaymentGateway(gateway)}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all text-center ${
                      paymentGateway === gateway
                        ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {gateway}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              <Heart className="w-4 h-4 fill-slate-950" />
              <span>
                {isProcessing ? 'Processing Donation...' : `Donate ₦${finalAmount.toLocaleString()} Now`}
              </span>
            </button>

            <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Secure 256-Bit SSL Encryption • Official Rotary District 9141 Receipt Issued</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
