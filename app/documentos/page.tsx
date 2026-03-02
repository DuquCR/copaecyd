import { DOCUMENTOS } from "@/lib/mock-data";

export const metadata = {
  title: "Documentos | Copa ECYD Mérida 2026",
  description: "Descarga el reglamento, términos y condiciones y demás documentos del torneo.",
};

export default function DocumentosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="section-title mb-4">Documentos</h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          Descarga los documentos oficiales del torneo. Asegúrate de leer el
          reglamento antes de inscribirte.
        </p>
      </div>

      <div className="mx-auto grid max-w-3xl gap-4">
        {DOCUMENTOS.map((doc) => (
          <a
            key={doc.nombre}
            href={doc.archivo}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center gap-4 border border-gray-100 transition-all hover:border-accent-300 hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-50">
              <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{doc.nombre}</h3>
              <p className="text-sm text-gray-500">{doc.descripcion}</p>
            </div>
            <div className="shrink-0">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-gray-400">
        {/* Coloca tus archivos PDF en la carpeta /public/docs/ */}
        Los documentos se abrirán en una nueva pestaña. Coloca tus PDFs en la carpeta public/docs/
      </div>
    </div>
  );
}
