import InscripcionForm from "@/components/InscripcionForm";

export const metadata = {
  title: "Inscripciones | Copa ECYD Mérida 2026",
  description: "Inscribe a tu equipo, jugadores y director técnico para la Copa ECYD Mérida.",
};

export default function InscripcionesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="section-title mb-4">Inscripciones</h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          Completa el formulario para inscribir un equipo, jugador o director técnico.
          Los pagos de jugadores y DTs se realizan de forma individual a través de Stripe.
        </p>
      </div>

      <InscripcionForm />
    </div>
  );
}
