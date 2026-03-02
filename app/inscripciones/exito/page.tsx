import Link from "next/link";

export const metadata = {
  title: "¡Pago Exitoso! | Copa ECYD Mérida 2026",
};

export default function ExitoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="card">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mb-3 text-2xl font-bold text-gray-900">¡Inscripción Exitosa!</h1>
        <p className="mb-8 text-gray-600">
          Tu pago ha sido procesado correctamente. Ya estás inscrito en la Copa ECYD Mérida 2026.
          Recibirás un comprobante en tu correo electrónico.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/calendario" className="btn-primary">
            Ver Calendario
          </Link>
          <Link href="/" className="btn-outline">
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
