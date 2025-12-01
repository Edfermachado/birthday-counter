import BirthdayCounter from "@/components/BirthdayCounter";

export default function Home() {
  // Configura aquí la fecha de cumpleaños (mes/día/año)
  const birthday = {
    name: "Hola Quiero Tira'",
    date: new Date(new Date().getFullYear(), 11, 12), // 12 de diciembre de este año
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