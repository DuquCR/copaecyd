import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-primary-500 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* ── Branding ── */}
          <div>
            <div className="flex items-center gap-3">
              {/* LOGO: Reemplaza con <Image src="/logo-white.png" ... /> */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xs font-bold text-primary-500">
                EC
              </div>
              <span className="text-lg font-bold">Copa ECYD Mérida</span>
            </div>
            <p className="mt-3 text-sm text-primary-100">
              Torneo de fútbol juvenil católico en Mérida, Yucatán, México.
            </p>
          </div>

          {/* ── Links ── */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent-400">
              Navegación
            </h3>
            <ul className="space-y-2 text-sm text-primary-100">
              <li><Link href="/inscripciones" className="hover:text-white transition-colors">Inscripciones</Link></li>
              <li><Link href="/tabla" className="hover:text-white transition-colors">Tabla de Posiciones</Link></li>
              <li><Link href="/calendario" className="hover:text-white transition-colors">Calendario</Link></li>
              <li><Link href="/documentos" className="hover:text-white transition-colors">Documentos</Link></li>
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent-400">
              Contacto
            </h3>
            <ul className="space-y-2 text-sm text-primary-100">
              <li>Mérida, Yucatán, México</li>
              <li>
                <a href="mailto:contacto@copaecyd.com" className="hover:text-white transition-colors">
                  contacto@copaecyd.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-400 pt-6 text-center text-xs text-primary-200">
          © {new Date().getFullYear()} Copa ECYD Mérida. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
