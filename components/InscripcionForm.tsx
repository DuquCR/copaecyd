"use client";

import { useState, useEffect } from "react";

const CATEGORIAS: Record<string, string[]> = {
  Varonil: ["Sub-13", "Sub-15", "Sub-17"],
  Femenil: ["Sub-13", "Sub-15", "Sub-17"],
};

const POSICIONES = ["Portero", "Defensa", "Medio", "Delantero"];

type TipoInscripcion = "" | "equipo" | "jugador" | "dt";

interface FormData {
  tipoInscripcion: TipoInscripcion;
  tipo: string;
  categoria: string;
  equipo: string;
  // Equipo fields
  nombreEquipo: string;
  responsable: string;
  telefonoResponsable: string;
  emailResponsable: string;
  // Jugador fields
  nombreJugador: string;
  fechaNacimiento: string;
  posicion: string;
  numeroPlayera: string;
  telefonoJugador: string;
  nombreTutor: string;
  telefonoTutor: string;
  // DT fields
  nombreDT: string;
  telefonoDT: string;
  emailDT: string;
}

const INITIAL: FormData = {
  tipoInscripcion: "",
  tipo: "",
  categoria: "",
  equipo: "",
  nombreEquipo: "",
  responsable: "",
  telefonoResponsable: "",
  emailResponsable: "",
  nombreJugador: "",
  fechaNacimiento: "",
  posicion: "",
  numeroPlayera: "",
  telefonoJugador: "",
  nombreTutor: "",
  telefonoTutor: "",
  nombreDT: "",
  telefonoDT: "",
  emailDT: "",
};

export default function InscripcionForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [equipos, setEquipos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const set = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  useEffect(() => {
    if (
      (form.tipoInscripcion === "jugador" || form.tipoInscripcion === "dt") &&
      form.tipo &&
      form.categoria
    ) {
      fetch(
        `/api/equipos?tipo=${encodeURIComponent(form.tipo)}&categoria=${encodeURIComponent(form.categoria)}`
      )
        .then((r) => r.json())
        .then((data) => setEquipos(data.equipos || []))
        .catch(() => setEquipos([]));
    }
  }, [form.tipoInscripcion, form.tipo, form.categoria]);

  const totalSteps = form.tipoInscripcion === "equipo" ? 3 : 4;

  function nextStep() {
    if (step < totalSteps) setStep(step + 1);
  }

  function prevStep() {
    if (step > 0) setStep(step - 1);
  }

  function canAdvance(): boolean {
    switch (step) {
      case 0:
        return !!form.tipoInscripcion;
      case 1:
        return !!form.tipo;
      case 2:
        if (form.tipoInscripcion === "equipo") {
          return !!form.categoria && !!form.nombreEquipo && !!form.responsable && !!form.telefonoResponsable;
        }
        return !!form.categoria;
      case 3:
        if (form.tipoInscripcion === "jugador") {
          return !!form.equipo && !!form.nombreJugador && !!form.fechaNacimiento && !!form.posicion;
        }
        if (form.tipoInscripcion === "dt") {
          return !!form.equipo && !!form.nombreDT && !!form.telefonoDT;
        }
        return true;
      default:
        return false;
    }
  }

  async function handleSubmit() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/inscripciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al inscribir");

      if (form.tipoInscripcion === "jugador" || form.tipoInscripcion === "dt") {
        // Redirect to Stripe checkout
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
          return;
        }
      }

      setMessage({ type: "ok", text: data.message || "¡Inscripción exitosa!" });
      setForm(INITIAL);
      setStep(0);
    } catch (err) {
      setMessage({ type: "err", text: (err as Error).message });
    } finally {
      setLoading(false);
    }
  }

  const isLastStep = step === totalSteps;

  return (
    <div className="card mx-auto max-w-2xl">
      {/* ── Progress bar ── */}
      <div className="mb-8">
        <div className="mb-2 flex justify-between text-xs font-medium text-gray-500">
          <span>Paso {step + 1} de {totalSteps + 1}</span>
          <span>{Math.round(((step) / totalSteps) * 100)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-accent-500 transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {message && (
        <div
          className={`mb-6 rounded-lg p-4 text-sm font-medium ${
            message.type === "ok"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* ═══ Step 0: Tipo de inscripción ═══ */}
      {step === 0 && (
        <div>
          <h3 className="mb-6 text-xl font-bold text-primary-500">¿Qué deseas inscribir?</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {(
              [
                { key: "equipo", icon: "👥", label: "Equipo", desc: "Registra un nuevo equipo" },
                { key: "jugador", icon: "⚽", label: "Jugador", desc: "Inscribe a un jugador" },
                { key: "dt", icon: "📋", label: "Director Técnico", desc: "Inscribe a un DT" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.key}
                onClick={() => set("tipoInscripcion", opt.key)}
                className={`rounded-xl border-2 p-6 text-center transition-all ${
                  form.tipoInscripcion === opt.key
                    ? "border-accent-500 bg-accent-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <div className="mb-2 text-3xl">{opt.icon}</div>
                <div className="font-semibold text-gray-900">{opt.label}</div>
                <div className="mt-1 text-xs text-gray-500">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══ Step 1: Tipo (Varonil / Femenil) ═══ */}
      {step === 1 && (
        <div>
          <h3 className="mb-6 text-xl font-bold text-primary-500">Selecciona el tipo</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Varonil", "Femenil"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  set("tipo", t);
                  set("categoria", "");
                  set("equipo", "");
                }}
                className={`rounded-xl border-2 p-6 text-center text-lg font-semibold transition-all ${
                  form.tipo === t
                    ? "border-accent-500 bg-accent-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══ Step 2: Categoría + datos de equipo ═══ */}
      {step === 2 && (
        <div>
          <h3 className="mb-6 text-xl font-bold text-primary-500">
            {form.tipoInscripcion === "equipo"
              ? "Datos del equipo"
              : "Selecciona la categoría"}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Categoría</label>
              <div className="grid gap-3 sm:grid-cols-3">
                {(CATEGORIAS[form.tipo] || []).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      set("categoria", cat);
                      set("equipo", "");
                    }}
                    className={`rounded-lg border-2 px-4 py-3 text-sm font-semibold transition-all ${
                      form.categoria === cat
                        ? "border-accent-500 bg-accent-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {form.tipoInscripcion === "equipo" && form.categoria && (
              <>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Nombre del equipo
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Ej: Leones FC"
                    value={form.nombreEquipo}
                    onChange={(e) => set("nombreEquipo", e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Nombre del responsable
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Nombre completo del responsable"
                    value={form.responsable}
                    onChange={(e) => set("responsable", e.target.value)}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Teléfono</label>
                    <input
                      type="tel"
                      className="input-field"
                      placeholder="999 123 4567"
                      value={form.telefonoResponsable}
                      onChange={(e) => set("telefonoResponsable", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="input-field"
                      placeholder="correo@ejemplo.com"
                      value={form.emailResponsable}
                      onChange={(e) => set("emailResponsable", e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ═══ Step 3: Equipo + datos de jugador o DT ═══ */}
      {step === 3 && form.tipoInscripcion === "jugador" && (
        <div>
          <h3 className="mb-6 text-xl font-bold text-primary-500">Datos del jugador</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Equipo</label>
              <select
                className="select-field"
                value={form.equipo}
                onChange={(e) => set("equipo", e.target.value)}
              >
                <option value="">Selecciona tu equipo</option>
                {equipos.map((eq) => (
                  <option key={eq} value={eq}>{eq}</option>
                ))}
              </select>
              {equipos.length === 0 && (
                <p className="mt-1 text-xs text-amber-600">
                  No hay equipos registrados en esta categoría. Primero debe inscribirse un equipo.
                </p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Nombre completo</label>
              <input
                type="text"
                className="input-field"
                placeholder="Nombre completo del jugador"
                value={form.nombreJugador}
                onChange={(e) => set("nombreJugador", e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  className="input-field"
                  value={form.fechaNacimiento}
                  onChange={(e) => set("fechaNacimiento", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Posición</label>
                <select
                  className="select-field"
                  value={form.posicion}
                  onChange={(e) => set("posicion", e.target.value)}
                >
                  <option value="">Selecciona posición</option>
                  {POSICIONES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Número de playera
                </label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="Ej: 10"
                  min="1"
                  max="99"
                  value={form.numeroPlayera}
                  onChange={(e) => set("numeroPlayera", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Teléfono del jugador
                </label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="999 123 4567"
                  value={form.telefonoJugador}
                  onChange={(e) => set("telefonoJugador", e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Nombre del tutor</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Nombre del padre/madre/tutor"
                  value={form.nombreTutor}
                  onChange={(e) => set("nombreTutor", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Teléfono del tutor
                </label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="999 123 4567"
                  value={form.telefonoTutor}
                  onChange={(e) => set("telefonoTutor", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 3 && form.tipoInscripcion === "dt" && (
        <div>
          <h3 className="mb-6 text-xl font-bold text-primary-500">Datos del Director Técnico</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Equipo</label>
              <select
                className="select-field"
                value={form.equipo}
                onChange={(e) => set("equipo", e.target.value)}
              >
                <option value="">Selecciona el equipo</option>
                {equipos.map((eq) => (
                  <option key={eq} value={eq}>{eq}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Nombre completo</label>
              <input
                type="text"
                className="input-field"
                placeholder="Nombre completo del DT"
                value={form.nombreDT}
                onChange={(e) => set("nombreDT", e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="999 123 4567"
                  value={form.telefonoDT}
                  onChange={(e) => set("telefonoDT", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="correo@ejemplo.com"
                  value={form.emailDT}
                  onChange={(e) => set("emailDT", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Navigation Buttons ═══ */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={prevStep}
          disabled={step === 0}
          className="rounded-lg px-6 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:invisible"
        >
          ← Anterior
        </button>

        {isLastStep || (form.tipoInscripcion === "equipo" && step === 2 && canAdvance()) ? (
          <button
            onClick={handleSubmit}
            disabled={!canAdvance() || loading}
            className="btn-accent"
          >
            {loading
              ? "Procesando..."
              : form.tipoInscripcion === "equipo"
              ? "Inscribir Equipo"
              : "Inscribirse y Pagar"}
          </button>
        ) : (
          <button
            onClick={nextStep}
            disabled={!canAdvance()}
            className="btn-primary"
          >
            Siguiente →
          </button>
        )}
      </div>
    </div>
  );
}
