"use client";

import { useState, useEffect } from "react";

interface BirthdayCounterProps {
  name: string;
  birthDate: Date;
}

export default function BirthdayCounter({ name, birthDate }: BirthdayCounterProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
    targetDate: new Date()
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    calculateTime();
  }, [birthDate]);

  function calculateTime() {
    const now = new Date();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();

    let targetDate = new Date(now.getFullYear(), birthMonth, birthDay, 0, 0, 0, 0);

    if (now.getTime() > targetDate.getTime()) {
      targetDate = new Date(now.getFullYear() + 1, birthMonth, birthDay, 0, 0, 0, 0);
    }

    const diff = targetDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setTimeLeft({
      days,
      hours,
      minutes,
      seconds,
      isToday: days === 0,
      targetDate
    });
  }

  useEffect(() => {
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [birthDate]);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (!isClient) return <div>Cargando...</div>;

  return (
    <div className="
      backdrop-blur-xl bg-white/5 
      border border-white/10 
      rounded-3xl shadow-[0_0_20px_rgba(255,255,255,0.1)]
      p-6 md:p-10 mb-8
    ">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
          Próximo cumpleaños de {name}
        </h2>

        <p className="text-lg text-gray-300 mt-2">
          {formatDate(timeLeft.targetDate)}
        </p>

        <p className="text-sm text-gray-400 mt-2">
          Zona horaria: {Intl.DateTimeFormat().resolvedOptions().timeZone}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
        <TimeUnit value={timeLeft.days} label="DÍAS" />
        <TimeUnit value={timeLeft.hours} label="HORAS" />
        <TimeUnit value={timeLeft.minutes} label="MINUTOS" />
        <TimeUnit value={timeLeft.seconds} label="SEGUNDOS" />
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="
      bg-gradient-to-br from-purple-600 to-blue-600 
      rounded-2xl p-4 text-white 
      shadow-[0_0_12px_rgba(99,102,241,0.6)]
      border border-white/10
    ">
      <div className="text-4xl font-extrabold mb-2 tracking-wide drop-shadow-lg">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-sm font-semibold tracking-wider opacity-90">
        {label}
      </div>
    </div>
  );
}
