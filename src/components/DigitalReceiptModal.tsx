import React from 'react';
import { X, Printer, CheckCircle2, ShieldCheck, Award, Download, Share2 } from 'lucide-react';
import { DigitalReceipt } from '../types';
import { useData } from '../context/DataContext';

interface DigitalReceiptModalProps {
  receipt: DigitalReceipt;
  onClose: () => void;
}

export const DigitalReceiptModal: React.FC<DigitalReceiptModalProps> = ({ receipt, onClose }) => {
  const { districtInfo } = useData();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-950 border border-amber-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl relative my-8 print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Modal Close Button (hidden in print) */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Action Header bar (hidden in print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-800 print:hidden">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" />
            <span>Official Transaction Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-bold text-xs hover:scale-105 transition-all shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
          </div>
        </div>

        {/* Printable Official Receipt Document */}
        <div className="bg-zinc-900/90 border border-amber-500/30 rounded-2xl p-6 sm:p-8 print:border-2 print:border-zinc-300 print:bg-white print:text-zinc-900 relative overflow-hidden">
          
          {/* Rotary Gold Watermark Seal background */}
          <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none print:opacity-10">
            <Award className="w-80 h-80 text-amber-400" />
          </div>

          {/* District Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-amber-500/30 pb-6 mb-6 gap-4 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-yellow-200 p-1 flex-shrink-0 shadow-lg">
                <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center text-amber-400 font-extrabold text-lg border border-amber-500/50">
                  9141
                </div>
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight text-white print:text-zinc-950">
                  ROTARY INTERNATIONAL DISTRICT 9141
                </h2>
                <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider print:text-amber-700">
                  Secretariat & Treasury • Nigeria
                </p>
                <p className="text-[11px] text-zinc-400 print:text-zinc-600">
                  Bayelsa • Delta • Edo • Rivers States
                </p>
              </div>
            </div>

            <div className="text-right sm:text-right text-xs">
              <span className="inline-block px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold uppercase text-[10px] mb-1 print:bg-zinc-100 print:text-zinc-900">
                OFFICIAL DIGITAL RECEIPT
              </span>
              <p className="font-mono text-zinc-300 print:text-zinc-800 font-bold text-sm">
                #{receipt.receiptNumber}
              </p>
              <p className="text-zinc-400 text-[11px] print:text-zinc-600">
                Date: {receipt.issuedAt}
              </p>
            </div>
          </div>

          {/* Receipt Body */}
          <div className="space-y-6 text-sm">
            
            {/* Purpose & Amount Tile */}
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 print:bg-zinc-50 print:border-zinc-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider block font-semibold print:text-zinc-500">
                  Payment Purpose / Category
                </span>
                <p className="text-base font-bold text-amber-400 print:text-zinc-900 mt-0.5">
                  {receipt.purpose}
                </p>
                <span className="text-xs text-zinc-400 print:text-zinc-600">
                  Receipt Type: <strong>{receipt.type}</strong>
                </span>
              </div>
              <div className="sm:text-right bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-xl print:bg-amber-50 print:border-amber-200">
                <span className="text-[10px] text-zinc-400 uppercase font-semibold block print:text-zinc-600">
                  Total Amount Paid
                </span>
                <span className="text-2xl font-black text-amber-400 print:text-amber-700">
                  ₦{receipt.amountNgn.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payer Details & Transaction Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-zinc-950/40 border border-zinc-800/80 rounded-xl p-3.5 print:bg-zinc-50 print:border-zinc-200">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-semibold print:text-zinc-500">
                  Payer / Contributor Details
                </span>
                <p className="font-bold text-white print:text-zinc-900 mt-1">
                  {receipt.payerName}
                </p>
                <p className="text-xs text-zinc-400 print:text-zinc-700">
                  {receipt.payerEmail}
                </p>
                {receipt.payerPhone && (
                  <p className="text-xs text-zinc-400 print:text-zinc-700">
                    {receipt.payerPhone}
                  </p>
                )}
              </div>

              <div className="bg-zinc-950/40 border border-zinc-800/80 rounded-xl p-3.5 print:bg-zinc-50 print:border-zinc-200">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-semibold print:text-zinc-500">
                  Gateway & Verification Ref
                </span>
                <p className="font-mono text-xs font-bold text-amber-300 print:text-zinc-900 mt-1 break-all">
                  {receipt.reference}
                </p>
                <p className="text-xs text-zinc-400 print:text-zinc-700 mt-0.5">
                  Payment Method: <strong>{receipt.paymentMethod}</strong>
                </p>
                <p className="text-[11px] text-emerald-400 font-semibold print:text-emerald-700 mt-0.5">
                  Status: Verified & Settled
                </p>
              </div>
            </div>

            {/* Notes / Tax Deductibility Notice */}
            <div className="border-t border-zinc-800/80 pt-4 text-xs text-zinc-400 print:text-zinc-600 print:border-zinc-200 space-y-1">
              <p className="italic">
                "{receipt.notes || 'Thank you for your valuable support towards humanitarian service across Rotary District 9141.'}"
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-amber-400/90 print:text-zinc-700 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>This digital receipt is electronically issued and authenticated by Rotary International District 9141 Treasury.</span>
              </div>
            </div>

            {/* Authorizing Signature & Seal */}
            <div className="border-t border-amber-500/30 pt-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 print:border-zinc-300">
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold text-white print:text-zinc-950">
                  {districtInfo.governorFullTitle}
                </p>
                <p className="text-[11px] text-amber-400 font-semibold print:text-amber-800">
                  District Governor 2026–2027 • District 9141
                </p>
              </div>
              <div className="text-center sm:text-right">
                <div className="inline-block border-2 border-dashed border-amber-500/50 rounded-lg px-3 py-1 bg-amber-500/10 text-[10px] font-black uppercase text-amber-300 tracking-wider print:border-zinc-400 print:bg-zinc-100 print:text-zinc-800">
                  Verified Treasury Seal
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-[11px] text-zinc-500 mt-4 print:hidden">
          Keep a copy for your records or tax deductible claims. Question? Contact <a href={`mailto:${districtInfo.secretariatEmail}`} className="text-amber-400 underline">{districtInfo.secretariatEmail}</a>
        </p>

      </div>
    </div>
  );
};
