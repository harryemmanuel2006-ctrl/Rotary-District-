import React, { useState, useEffect } from 'react';
import { Clock, Bell, Calendar, Check, Download, MapPin, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';
import { DistrictEvent } from '../types';

interface EventCountdownProps {
  onRegisterClick?: (event: DistrictEvent) => void;
}

export const EventCountdown: React.FC<EventCountdownProps> = ({ onRegisterClick }) => {
  const { districtInfo, events } = useData();

  // Find the selected countdown event or default to the next upcoming featured event
  const countdownEvent =
    events.find((e) => e.id === districtInfo.countdownEventId) ||
    events.find((e) => e.isFeatured) ||
    events[0];

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  const [reminderSaved, setReminderSaved] = useState(false);

  const targetDateStr = countdownEvent?.date || '2026-07-25';

  useEffect(() => {
    const calculateTime = () => {
      let targetTime = new Date(targetDateStr).getTime();
      if (isNaN(targetTime)) {
        // Fallback for custom formatted strings
        targetTime = new Date('2026-07-25T09:00:00').getTime();
      }

      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDateStr]);

  if (!countdownEvent) return null;

  const handleDownloadIcs = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Rotary International District 9141//Event Calendar//EN
BEGIN:VEVENT
SUMMARY:${countdownEvent.title}
DESCRIPTION:${countdownEvent.description || 'Rotary District 9141 Official Event'}
LOCATION:${countdownEvent.location}, ${countdownEvent.city}, ${countdownEvent.state}
DTSTART:${targetDateStr.replace(/-/g, '')}T090000Z
DTEND:${targetDateStr.replace(/-/g, '')}T180000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${countdownEvent.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setReminderSaved(true);
    setTimeout(() => setReminderSaved(false), 4000);
  };

  return (
    <div className="bg-[#0B1E3D]/95 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-amber-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            <span>Next Major District Event Countdown</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
            {countdownEvent.title}
          </h3>
        </div>

        <button
          onClick={handleDownloadIcs}
          className="flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-[#061329] hover:bg-amber-500 hover:text-slate-950 px-3.5 py-2 rounded-xl border border-amber-500/30 transition-all shrink-0"
        >
          {reminderSaved ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Calendar Saved!</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Save to Calendar</span>
            </>
          )}
        </button>
      </div>

      {/* Event Meta: Location and Date */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mb-6">
        <div className="flex items-center gap-1.5 bg-[#061329] px-3 py-1.5 rounded-lg border border-slate-700">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>{countdownEvent.formattedDate || countdownEvent.date}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#061329] px-3 py-1.5 rounded-lg border border-slate-700">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>{countdownEvent.location}, {countdownEvent.city}</span>
        </div>
        {countdownEvent.category && (
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-lg font-bold">
            {countdownEvent.category}
          </span>
        )}
      </div>

      {/* 4-Box Digital Countdown Timer */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center mb-6">
        <div className="bg-[#061329] border border-amber-500/30 p-3 sm:p-4 rounded-2xl shadow-inner">
          <span className="block text-2xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mt-1 block">
            Days
          </span>
        </div>

        <div className="bg-[#061329] border border-amber-500/30 p-3 sm:p-4 rounded-2xl shadow-inner">
          <span className="block text-2xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mt-1 block">
            Hours
          </span>
        </div>

        <div className="bg-[#061329] border border-amber-500/30 p-3 sm:p-4 rounded-2xl shadow-inner">
          <span className="block text-2xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mt-1 block">
            Minutes
          </span>
        </div>

        <div className="bg-[#061329] border border-amber-500/30 p-3 sm:p-4 rounded-2xl shadow-inner">
          <span className="block text-2xl sm:text-4xl font-black text-yellow-300 font-mono tracking-tight animate-pulse">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mt-1 block">
            Seconds
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {onRegisterClick ? (
          <button
            onClick={() => onRegisterClick(countdownEvent)}
            className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
          >
            <span>Register for This Event</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <a
            href="#events"
            className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all text-center"
          >
            <span>View All District Events & Register</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};
