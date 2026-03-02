"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

function calcTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diff / (1000 * 60)) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-3xl font-bold text-white sm:h-20 sm:w-20 sm:text-4xl md:h-24 md:w-24 md:text-5xl">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-2 text-xs font-medium uppercase tracking-wider text-white/80 sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const targetDate = new Date(
    process.env.NEXT_PUBLIC_TOURNAMENT_DATE || "2026-06-15T09:00:00"
  );

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calcTimeLeft(targetDate));
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) {
    return (
      <div className="flex justify-center gap-4">
        {["Días", "Horas", "Min", "Seg"].map((l) => (
          <Digit key={l} value={0} label={l} />
        ))}
      </div>
    );
  }

  if (!timeLeft) {
    return (
      <div className="rounded-xl bg-white/20 px-8 py-4 backdrop-blur-sm">
        <p className="text-2xl font-bold text-white">
          ¡El torneo ha comenzado!
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-3 sm:gap-4 md:gap-6">
      <Digit value={timeLeft.dias} label="Días" />
      <Digit value={timeLeft.horas} label="Horas" />
      <Digit value={timeLeft.minutos} label="Min" />
      <Digit value={timeLeft.segundos} label="Seg" />
    </div>
  );
}
