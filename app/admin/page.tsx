import AdminResultForm from "@/components/AdminResultForm";

export const metadata = {
  title: "Admin | Copa ECYD Mérida 2026",
};

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Ingresar resultado */}
        <div>
          <h2 className="mb-4 text-xl font-bold text-gray-900">Ingresar Resultado</h2>
          <AdminResultForm />
        </div>

        {/* Quick stats */}
        <div>
          <h2 className="mb-4 text-xl font-bold text-gray-900">Acciones Rápidas</h2>
          <div className="grid gap-4">
            <a
              href={`https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID || "TU_SHEET_ID"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card flex items-center gap-4 border border-gray-100 transition-all hover:border-green-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Abrir Google Sheets</h3>
                <p className="text-sm text-gray-500">Edita directamente la hoja de cálculo</p>
              </div>
            </a>

            <a
              href="https://dashboard.stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="card flex items-center gap-4 border border-gray-100 transition-all hover:border-purple-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Stripe Dashboard</h3>
                <p className="text-sm text-gray-500">Revisa pagos y transacciones</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
