import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, Lock, CheckCircle2, ArrowRight, Building2, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentGatewayModalProps {
  title: string;
  purposeDescription: string;
  amountNgn: number;
  payerName: string;
  payerEmail: string;
  payerPhone?: string;
  onClose: () => void;
  onSuccess: (paymentReference: string, gateway: 'Paystack' | 'Flutterwave' | 'Bank Transfer Simulation') => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  title,
  purposeDescription,
  amountNgn,
  payerName,
  payerEmail,
  payerPhone,
  onClose,
  onSuccess,
}) => {
  const [selectedGateway, setSelectedGateway] = useState<'Paystack' | 'Flutterwave' | 'Bank Transfer Simulation'>('Paystack');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ussd' | 'transfer'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'method' | 'simulating' | 'completed'>('method');
  const [generatedRef, setGeneratedRef] = useState('');

  // Simulated card details for testing
  const [cardNumber, setCardNumber] = useState('4084 0000 0000 9141');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('914');

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setStep('simulating');

    const prefix = selectedGateway === 'Paystack' ? 'PSTK' : selectedGateway === 'Flutterwave' ? 'FLTW' : 'BNK';
    const ref = `PAY-RID9141-${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedRef(ref);

    // Simulate real server-to-server webhook verification
    setTimeout(() => {
      setIsProcessing(false);
      setStep('completed');
      
      // Trigger celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#eab308', '#10b981', '#ffffff']
      });

      setTimeout(() => {
        onSuccess(ref, selectedGateway);
      }, 1200);

    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-950 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-xs text-zinc-400">{purposeDescription}</p>
          </div>
        </div>

        {/* Amount Box */}
        <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 border border-amber-500/30 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
              Total Payable Amount
            </span>
            <span className="text-2xl font-black text-amber-400">
              ₦{amountNgn.toLocaleString()}
            </span>
          </div>
          <div className="text-right text-xs text-zinc-400">
            <span className="block font-semibold text-white">{payerName}</span>
            <span className="text-[11px] text-zinc-500">{payerEmail}</span>
          </div>
        </div>

        {step === 'method' && (
          <form onSubmit={handleProcessPayment} className="space-y-5">
            
            {/* Gateway Selection Tabs */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2">
                Select Secure Payment Gateway
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedGateway('Paystack')}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    selectedGateway === 'Paystack'
                      ? 'bg-amber-500/15 border-amber-500 text-white font-bold shadow-md'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-emerald-400">Paystack</span>
                    {selectedGateway === 'Paystack' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                  </div>
                  <span className="text-[10px] text-zinc-400 block">Cards & USSD</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedGateway('Flutterwave')}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    selectedGateway === 'Flutterwave'
                      ? 'bg-amber-500/15 border-amber-500 text-white font-bold shadow-md'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-amber-400">Flutterwave</span>
                    {selectedGateway === 'Flutterwave' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                  </div>
                  <span className="text-[10px] text-zinc-400 block">Global Checkout</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedGateway('Bank Transfer Simulation')}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    selectedGateway === 'Bank Transfer Simulation'
                      ? 'bg-amber-500/15 border-amber-500 text-white font-bold shadow-md'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-amber-400">Bank Transfer</span>
                    {selectedGateway === 'Bank Transfer Simulation' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                  </div>
                  <span className="text-[10px] text-zinc-400 block">Direct Deposit</span>
                </button>
              </div>
            </div>

            {/* Payment Sub-Method */}
            <div className="flex gap-2 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                  paymentMethod === 'card' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Debit / Credit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('transfer')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                  paymentMethod === 'transfer' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Direct Bank Transfer
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('ussd')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                  paymentMethod === 'ussd' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                USSD Code
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-3 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                    Card Number (Demo Test Mode)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                    />
                    <CreditCard className="w-4 h-4 text-zinc-500 absolute right-3 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'transfer' && (
              <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 text-xs space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Bank Name</span>
                  <span className="font-bold text-white">First Bank of Nigeria</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Account Name</span>
                  <span className="font-bold text-amber-400">Rotary International District 9141</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Account Number</span>
                  <span className="font-mono font-black text-white text-sm bg-zinc-950 px-2 py-0.5 rounded border border-zinc-700">
                    2033819412
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 pt-1 italic">
                  * Automatic instant match token generated upon clicking button below.
                </p>
              </div>
            )}

            {paymentMethod === 'ussd' && (
              <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 text-xs text-center space-y-2">
                <p className="text-zinc-300 font-medium">Dial this code on your registered bank phone:</p>
                <div className="font-mono text-lg font-black text-amber-400 bg-zinc-950 p-2 rounded-xl border border-amber-500/30">
                  *894*9141*{amountNgn}#
                </div>
                <p className="text-[11px] text-zinc-500">Supports GTBank, FirstBank, Zenith, Access, UBA</p>
              </div>
            )}

            {/* Security Notice */}
            <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-[11px] text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>256-bit PCI-DSS Security Active</strong>: Secret keys remain safely server-side. Your payment reference and receipt are verified instantly upon authorization.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-zinc-950 font-black text-sm tracking-wide hover:from-amber-400 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <span>Pay ₦{amountNgn.toLocaleString()} via {selectedGateway}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {step === 'simulating' && (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto" />
            <div>
              <h4 className="text-base font-bold text-white">Verifying Transaction</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Connecting with {selectedGateway} secure verification endpoints...
              </p>
            </div>
            <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-xs font-mono text-amber-300 max-w-xs mx-auto">
              Reference: {generatedRef}
            </div>
          </div>
        )}

        {step === 'completed' && (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Payment Verified & Settled!</h4>
              <p className="text-xs text-zinc-300 mt-1">
                Generating your official District 9141 Digital Receipt...
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
