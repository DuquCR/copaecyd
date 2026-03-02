import CalendarioPartidos from "@/components/CalendarioPartidos";

export const metadata = {
  title: "Calendario | Copa ECYD Mérida 2026",
  description: "Calendario de partidos de la Copa ECYD Mérida. Filtra por categoría y tipo.",
};

export default function CalendarioPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="section-title mb-4">Calendario de Partidos</h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          Consulta las fechas, horarios y resultados de todos los partidos del torneo.
        </p>
      </div>

      <CalendarioPartidos />
    </div>
  );
}
