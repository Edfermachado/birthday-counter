import BirthdayCounter from "@/components/BirthdayCounter";

export default function Home() {
  // Fecha corregida usando mediodía
  const birthday = {
    name: "Mi Amigo",
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

        <div className="mt-16 bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            📝 Información del cumpleaños
          </h2>
          <div className="space-y-4 text-gray-600">
            <p><strong>Nombre:</strong> {birthday.name}</p>
            <p><strong>Fecha de cumpleaños:</strong> {formatDate(birthday.date)}</p>
            <p><strong>Día específico:</strong> 12 de diciembre 2025</p>

            <div className="pt-4">
              <h3 className="font-bold mb-2">Para cambiar la fecha:</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Recuerda: usa mediodía para evitar desfase
date: new Date(2025, 11, 12, 12, 0, 0)`}
              </pre>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Hoy es: {new Date().toLocaleDateString("es-ES")}</p>
          <p>Fecha configurada: {birthday.date.toLocaleDateString("es-ES")}</p>
          <p>Diferencia calculada: {
            Math.floor(
              (birthday.date.getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
            )
          } días</p>
          <p className="mt-2">Desplegado en Vercel • Se actualiza automáticamente</p>
        </footer>
      </div>
    </main>
  );
}
