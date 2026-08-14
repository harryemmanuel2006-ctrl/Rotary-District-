import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, DollarSign, UserCheck, Ticket, Mail, Phone, Building } from 'lucide-react';
import { DistrictEvent, DigitalReceipt } from '../types';
import { useData } from '../context/DataContext';
import { PaymentGatewayModal } from './PaymentGatewayModal';
import { DigitalReceiptModal } from './DigitalReceiptModal';

interface EventRegistrationModalProps {
  event: DistrictEvent;
  onClose: () => void;
}

export const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({ event, onClose }) => {
  const { addEventRegistration } = useData();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [clubName, setClubName] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [completedReceipt, setCompletedReceipt] = useState<DigitalReceipt | null>(null);
  const [registrationSuccessRef, setRegistrationSuccessRef] = useState<string | null>(null);

  const eventFee = event.eventFeeNgn || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (eventFee > 0) {
      setShowPaymentGateway(true);
    } else {
      // Free Event direct registration
      const { registration } = addEventRegistration({
        eventId: event.id,
        eventTitle: event.title,
        fullName,
        email,
        phone,
        clubName: clubName || 'Rotary Friend / Guest',
        specialRequests,
        feePaidNgn: 0,
        paymentGateway: 'Free / Exempt',
      });

      setRegistrationSuccessRef(registration.registrationRef);
    }
  };

  const handlePaymentSuccess = (paymentRef: string, gateway: 'Paystack' | 'Flutterwave' | 'Bank Transfer Simulation') => {
    setShowPaymentGateway(false);

    const { registration, receipt } = addEventRegistration({
      eventId: event.id,
      eventTitle: event.title,
      fullName,
      email,
      phone,
      clubName: clubName || 'Rotary Member',
      specialRequests,
      feePaidNgn: eventFee,
      paymentGateway: gateway,
      paymentReference: paymentRef,
    });

    setRegistrationSuccessRef(registration.registrationRef);
    if (receipt) {
      setCompletedReceipt(receipt);
    }
  };

  if (completedReceipt) {
    return <DigitalReceiptModal receipt={completedReceipt} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-950 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl relative my-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {registrationSuccessRef ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <Ticket className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Event Pass Reserved!</h3>
            <p className="text-xs text-zinc-300">
              Your registration for <strong>{event.title}</strong> has been confirmed.
            </p>
            <div className="bg-zinc-900 border border-amber-500/30 p-4 rounded-2xl max-w-xs mx-auto">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">
                Registration Reference Pass
              </span>
              <span className="text-lg font-mono font-black text-amber-400">
                {registrationSuccessRef}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              A confirmation badge has been logged in the District Secretariat database.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400 shadow-md"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Ticket className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  District 9141 Official Event
                </span>
                <h3 className="text-lg font-bold text-white leading-snug">{event.title}</h3>
              </div>
            </div>

            {/* Event Summary Pill */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 mb-6 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <Calendar className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{event.formattedDate}</span>
                {event.time && <span className="text-amber-400 font-semibold">• {event.time}</span>}
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{event.location}, {event.city}, {event.state}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                <span className="text-zinc-400">Registration Fee:</span>
                <span className="font-bold text-amber-400 text-sm">
                  {eventFee > 0 ? `₦${eventFee.toLocaleString()}` : 'FREE / COMPLIMENTARY'}
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rtn. Dr. Osaheni Igbinovia"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Email Address <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Phone Number <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Rotary Club / Organization Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rotary Club of Yenagoa / Guest"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Special Dietary / Seating Requests (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vegetarian diet, VIP protocol seating"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-bold text-xs hover:from-amber-400 hover:to-yellow-400 shadow-md shadow-amber-500/20 transition-all mt-2"
              >
                {eventFee > 0
                  ? `Proceed to Payment (₦${eventFee.toLocaleString()})`
                  : 'Confirm Free Event Pass'}
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Payment Modal nested if fee > 0 */}
      {showPaymentGateway && (
        <PaymentGatewayModal
          title={`Event Registration: ${event.title}`}
          purposeDescription={`Official Registration Ticket Pass (${event.formattedDate})`}
          amountNgn={eventFee}
          payerName={fullName}
          payerEmail={email}
          payerPhone={phone}
          onClose={() => setShowPaymentGateway(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};
