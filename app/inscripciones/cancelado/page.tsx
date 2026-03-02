import Link from "next/link";

export const metadata = {
  title: "Pago Cancelado | Copa ECYD Mérida 2026",
};

export default function CanceladoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="card">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
          <svg className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="mb-3 text-2xl font-bold text-gray-900">Pago Cancelado</h1>
        <p className="mb-8 text-gray-600">
          Tu pago no se completó. Tu inscripción queda pendiente hasta que realices el pago.
          Puedes intentar nuevamente cuando quieras.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/inscripciones" className="btn-primary">
            Intentar de nuevo
          </Link>
          <Link href="/" className="btn-outline">
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
