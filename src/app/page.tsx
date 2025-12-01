import BirthdayCounter from "@/components/BirthdayCounter";

export default function Home() {
  const birthday = {
    name: "Hola Quiero Tira'",
    date: new Date(2025, 11, 12, 12, 0, 0),
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] mb-4">
            🎉 Contador de Cumpleaños 🎂
          </h1>
          <p className="text-xl text-gray-300">
            Cuenta regresiva para el próximo cumpleaños
          </p>
        </header>

        <BirthdayCounter
          name={birthday.name}
          birthDate={birthday.date}
        />
      </div>
    </main>
  );
}

