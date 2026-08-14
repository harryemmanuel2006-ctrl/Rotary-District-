import React, { useState, useEffect } from 'react';
import { Clock, Bell, Calendar, Check, Download } from 'lucide-react';

interface EventCountdownProps {
  targetDate: string; // YYYY-MM-DD or readable string
  eventTitle: string;
  eventLocation?: string;
}

export const EventCountdown: React.FC<EventCountdownProps> = ({
  targetDate,
  eventTitle,
  eventLocation,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  const [reminderSet, setReminderSet] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      // Parse event date
      let eventTime = new Date(targetDate).getTime();
      if (isNaN(eventTime)) {
        // Fallback for custom string formatted like "25th July, 2026"
        eventTime = new Date('2026-07-25T09:00:00').getTime();
      }

      const now = new Date().getTime();
      const difference = eventTime - now;

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
  }, [targetDate]);

  const handleDownloadIcs = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Rotary International District 9141//Event Calendar//EN
BEGIN:VEVENT
SUMMARY:${eventTitle}
DESCRIPTION:Rotary District 9141 Official Event
LOCATION:${eventLocation || 'District 9141 Secretariat'}
DTSTART:20260725T090000Z
DTEND:20260725T170000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${eventTitle.replace(/[^a-zA-Z0-9]/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setReminderSet(true);
  };

  if (timeLeft.isPast) {
    return (
      <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full">
        <Check className="w-3.5 h-3.5" />
        <span>Event Live / Recently Concluded</span>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-5 text-white shadow-xl">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
          <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="uppercase tracking-wider text-[11px]">Event Countdown Timer</span>
        </div>
        <button
          onClick={handleDownloadIcs}
          className="flex items-center gap-1 text-[11px] font-semibold text-zinc-300 hover:text-amber-400 transition-colors"
        >
          {reminderSet ? (
            <span className="text-emerald-400 flex items-center gap-1">
              <Check className="w-3 h-3" /> Reminder Saved
            </span>
          ) : (
            <span className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
              <Bell className="w-3 h-3 text-amber-400" /> Save to Calendar
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-zinc-950/80 border border-amber-500/20 p-2.5 rounded-xl">
          <span className="block text-xl sm:text-2xl font-black text-amber-400 font-mono">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-[10px] text-zinc-400 font-semibold uppercase">Days</span>
        </div>

        <div className="bg-zinc-950/80 border border-amber-500/20 p-2.5 rounded-xl">
          <span className="block text-xl sm:text-2xl font-black text-amber-400 font-mono">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-[10px] text-zinc-400 font-semibold uppercase">Hours</span>
        </div>

        <div className="bg-zinc-950/80 border border-amber-500/20 p-2.5 rounded-xl">
          <span className="block text-xl sm:text-2xl font-black text-amber-400 font-mono">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-[10px] text-zinc-400 font-semibold uppercase">Mins</span>
        </div>

        <div className="bg-zinc-950/80 border border-amber-500/20 p-2.5 rounded-xl">
          <span className="block text-xl sm:text-2xl font-black text-amber-400 font-mono text-yellow-400">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-[10px] text-zinc-400 font-semibold uppercase">Secs</span>
        </div>
      </div>
    </div>
  );
};
