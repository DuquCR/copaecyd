import TablaPosiciones from "@/components/TablaPosiciones";

export const metadata = {
  title: "Tabla de Posiciones | Copa ECYD Mérida 2026",
  description: "Consulta la tabla de posiciones actualizada de la Copa ECYD Mérida.",
};

export default function TablaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="section-title mb-4">Tabla de Posiciones</h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          Posiciones actualizadas en tiempo real. Filtra por tipo y categoría.
        </p>
      </div>

      <TablaPosiciones />
    </div>
  );
}
