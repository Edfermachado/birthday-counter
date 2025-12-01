import BirthdayCounter from "@/components/BirthdayCounter";

export default function Home() {
  // Configura aquí la fecha de cumpleaños (año, mes, día)
  // IMPORTANTE: Usar UTC para evitar problemas de zona horaria
  const birthday = {
    name: "Hola quiero tira'",
    // Crea la fecha en UTC (mes 0-11, donde 0=Enero, 11=Diciembre)
    date: new Date(Date.UTC(2025, 11, 12)), // 12 de diciembre 2025 en UTC
  };

  // Función para formatear fecha para mostrar
  const formatBirthday = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
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
            <p>
              <strong>Nombre:</strong> {birthday.name}
            </p>
            <p>
              <strong>Fecha de cumpleaños:</strong> {formatBirthday(birthday.date)}
            </p>
            <div className="pt-4">
              <h3 className="font-bold mb-2">Para cambiar la fecha:</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// En src/app/page.tsx, cambia esta línea:
const birthday = {
  name: "Nombre de tu amigo",
  date: new Date(Date.UTC(año, mes-1, día)),
};

// Ejemplo para 25 de diciembre 2025:
date: new Date(Date.UTC(2025, 11, 25))

// Los meses van de 0 a 11 (0=Enero, 11=Diciembre)`}
              </pre>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Desplegado en Vercel • Se actualiza automáticamente cada segundo</p>
          <p className="mt-2">Tiempo actual del servidor: {new Date().toUTCString()}</p>
        </footer>
      </div>
    </main>
  );
}