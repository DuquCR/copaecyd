import Link from "next/link";
import Countdown from "@/components/Countdown";

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════ HERO / BANNER ═══════════════════ */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-primary-500 px-4 text-center">
        {/*
          BANNER: Reemplaza este fondo con tu imagen.
          Agrega la imagen en /public/banner.jpg y usa:
          <Image src="/banner.jpg" alt="Banner" fill className="object-cover opacity-30" priority />
          Dimensiones recomendadas: 1920×1080px
        */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-900" />
        <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')]" />

        <div className="relative z-10 mx-auto max-w-4xl">
          {/*
            LOGO GRANDE: Reemplaza con tu logo.
            <Image src="/logo-copa-ecyd.png" alt="Copa ECYD" width={180} height={180} priority />
            Dimensiones recomendadas: 400×400px PNG transparente
          */}
          <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full border-4 border-accent-400 bg-white/10 text-2xl font-black text-white backdrop-blur-sm sm:h-36 sm:w-36 sm:text-3xl">
            LOGO
          </div>

          <h1 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Copa ECYD Mérida
            <span className="block text-accent-400">2026</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-primary-100 sm:text-xl">
            Torneo de fútbol juvenil católico en Mérida, Yucatán.
            ¡Inscribe a tu equipo y sé parte de la competencia!
          </p>

          {/* ── Cuenta regresiva ── */}
          <div className="mb-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent-400">
              Faltan
            </p>
            <Countdown />
          </div>

          {/* ── CTAs ── */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/inscripciones" className="btn-accent text-lg px-8 py-4">
              Inscríbete Ahora
            </Link>
            <Link href="/tabla" className="btn-outline border-white text-white hover:bg-white hover:text-primary-500 text-lg px-8 py-4">
              Ver Tabla
            </Link>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      {/* ═══════════════════ INFO CARDS ═══════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <h2 className="section-title mb-12 text-center">¿Cómo participar?</h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="card text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-50 text-accent-500">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-bold text-primary-500">1. Inscríbete</h3>
            <p className="text-sm text-gray-600">
              Registra tu equipo, jugadores y director técnico a través del formulario de inscripción.
            </p>
          </div>

          <div className="card text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-50 text-accent-500">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-bold text-primary-500">2. Paga en línea</h3>
            <p className="text-sm text-gray-600">
              Cada jugador realiza su pago de inscripción de forma individual y segura por Stripe.
            </p>
          </div>

          <div className="card text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-50 text-accent-500">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-bold text-primary-500">3. ¡A jugar!</h3>
            <p className="text-sm text-gray-600">
              Consulta el calendario, sigue la tabla de posiciones y vive la emoción del torneo.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA FINAL ═══════════════════ */}
      <section className="bg-primary-500 px-4 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            ¿Listo para competir?
          </h2>
          <p className="mb-8 text-primary-100">
            Las inscripciones están abiertas. ¡No te quedes fuera de la Copa ECYD Mérida 2026!
          </p>
          <Link href="/inscripciones" className="btn-accent text-lg px-10 py-4">
            Ir a Inscripciones
          </Link>
        </div>
      </section>
    </>
  );
}
