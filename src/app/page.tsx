import BirthdayCounter from "@/components/BirthdayCounter";

export default function Home() {
  // Fecha corregida usando mediodía
  const birthday = {
    name: "Hola Quiero Tira'",
    date: new Date(2025, 11, 12, 12, 0, 0), // <-- MEDIODÍA, evita desfases
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            🎉 Contador de Cumpleaños 🎂
          </h1>
          <p className="text-xl text-gray-600">
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
