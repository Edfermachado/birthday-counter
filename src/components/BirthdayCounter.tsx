"use client";

import { useState, useEffect } from "react";

interface BirthdayCounterProps {
  name: string;
  birthDate: Date;
}

export default function BirthdayCounter({ name, birthDate }: BirthdayCounterProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: false, targetDate: new Date() });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    calculateTime();
  }, [birthDate]);

  function calculateTime() {
    const now = new Date();
    
    // Obtener día y mes del cumpleaños
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();
    
    // Crear fecha objetivo para ESTE AÑO
    let targetDate = new Date(now.getFullYear(), birthMonth, birthDay, 0, 0, 0, 0);
    
    // Si ya pasó este año, usar próximo año
    if (now > targetDate) {
      targetDate = new Date(now.getFullYear() + 1, birthMonth, birthDay, 0, 0, 0, 0);
    }
    
    // Calcular diferencia en milisegundos
    const diff = targetDate.getTime() - now.getTime();
    
    // Calcular días, horas, minutos, segundos
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Es hoy si queda menos de 24 horas
    const isToday = diff > 0 && diff <= 24 * 60 * 60 * 1000;
    
    setTimeLeft({
      days,
      hours,
      minutes,
      seconds,
      isToday,
      targetDate,
    });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      calculateTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [birthDate]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Para evitar hidratación en el servidor
  if (!isClient) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 mb-8">
        <div className="text-center py-12">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg mb-4 mx-auto max-w-md"></div>
            <div className="h-6 bg-gray-200 rounded-lg mb-8 mx-auto max-w-sm"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 mb-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-6">
          <span className="text-4xl">🎂</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {timeLeft.isToday ? (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 animate-pulse">
              ¡HOY ES EL CUMPLEAÑOS DE {name.toUpperCase()}! 🥳
            </span>
          ) : (
            `Próximo cumpleaños de ${name}`
          )}
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          {formatDate(timeLeft.targetDate)}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Zona horaria: {Intl.DateTimeFormat().resolvedOptions().timeZone}
        </p>
      </div>

      {timeLeft.isToday ? (
        <div className="text-center py-12">
          <div className="text-7xl md:text-9xl animate-bounce mb-8">🎉</div>
          <p className="text-2xl md:text-3xl text-gray-700 font-semibold">
            ¡Felicidades! 🥳🎂✨
          </p>
          <p className="text-xl text-gray-600 mt-4">
            Hoy es un día muy especial
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            <TimeUnit value={timeLeft.days} label="DÍAS" color="from-blue-500 to-blue-600" />
            <TimeUnit value={timeLeft.hours} label="HORAS" color="from-green-500 to-green-600" />
            <TimeUnit value={timeLeft.minutes} label="MINUTOS" color="from-yellow-500 to-yellow-600" />
            <TimeUnit value={timeLeft.seconds} label="SEGUNDOS" color="from-red-500 to-red-600" />
          </div>
          
          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-3">
                <p className="text-lg text-gray-700">
                  {timeLeft.days === 1 ? (
                    <span className="font-semibold">¡Mañana es el cumpleaños! 🎉</span>
                  ) : timeLeft.days === 0 ? (
                    <span className="font-semibold">¡Hoy es el cumpleaños! 🎂</span>
                  ) : (
                    <span className="font-semibold">Faltan {timeLeft.days} días</span>
                  )} para celebrar
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {timeLeft.days === 10 ? "¡Exactamente 10 días!" : ""}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function TimeUnit({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-2xl p-4 md:p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
      <div className="text-4xl md:text-6xl font-bold mb-2">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-sm md:text-base font-semibold tracking-wider">
        {label}
      </div>
    </div>
  );
}