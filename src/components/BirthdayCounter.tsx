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

    // ✅ FECHA OBJETIVO EXACTA A 00:00:00 (sin errores de horas)
    let targetDate = new Date(
      now.getFullYear(),
      birthMonth,
      birthDay,
      0, 0, 0, 0
    );

    // Si ya pasó este día → saltar al próximo año
    if (now.getTime() > targetDate.getTime()) {
      targetDate = new Date(
        now.getFullYear() + 1,
        birthMonth,
        birthDay,
        0, 0, 0, 0
      );
    }

    const diff = targetDate.getTime() - now.getTime();

    // ⛔ NADA de 17 horas incorrectas: cálculo exacto
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const isToday = days === 0;

    setTimeLeft({
      days,
      hours,
      minutes,
      seconds,
      isToday,
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
    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Próximo cumpleaños de {name}
        </h2>

        <p className="text-lg text-gray-600 mt-2">
          {formatDate(timeLeft.targetDate)}
        </p>

        <p className="text-sm text-gray-500 mt-2">
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
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
      <div className="text-4xl font-bold mb-2">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-sm font-semibold tracking-wider">{label}</div>
    </div>
  );
}
