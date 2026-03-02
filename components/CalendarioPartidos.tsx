"use client";

import { useState, useEffect } from "react";

interface Partido {
  fecha: string;
  hora: string;
  local: string;
  visitante: string;
  categoria: string;
  tipo: string;
  cancha: string;
  golesLocal: string;
  golesVisitante: string;
  estado: string;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("es-MX", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function CalendarioPartidos() {
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [tipo, setTipo] = useState("Todos");
  const [categoria, setCategoria] = useState("Todas");
  const [loading, setLoading] = useState(true);

  const categorias = ["Todas", "Sub-13", "Sub-15", "Sub-17"];
  const tipos = ["Todos", "Varonil", "Femenil"];

  useEffect(() => {
    setLoading(true);
    fetch("/api/calendario")
      .then((r) => r.json())
      .then((d) => setPartidos(d.partidos || []))
      .catch(() => setPartidos([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = partidos.filter((p) => {
    if (tipo !== "Todos" && p.tipo !== tipo) return false;
    if (categoria !== "Todas" && p.categoria !== categoria) return false;
    return true;
  });

  const grouped = filtered.reduce<Record<string, Partido[]>>((acc, p) => {
    if (!acc[p.fecha]) acc[p.fecha] = [];
    acc[p.fecha].push(p);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort();

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="flex rounded-lg border border-gray-200 bg-white p-1">
          {tipos.map((t) => (
            <button
              key={t}
              onClick={() => setTipo(t)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                tipo === t
                  ? "bg-primary-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex rounded-lg border border-gray-200 bg-white p-1">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                categoria === cat
                  ? "bg-accent-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Match Cards */}
      {loading ? (
        <div className="py-12 text-center text-gray-400">Cargando partidos...</div>
      ) : sortedDates.length === 0 ? (
        <div className="py-12 text-center text-gray-400">No hay partidos para los filtros seleccionados.</div>
      ) : (
        <div className="space-y-8">
          {sortedDates.map((date) => (
            <div key={date}>
              <h3 className="mb-4 text-lg font-bold text-primary-500">
                {formatDate(date)}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {grouped[date].map((p, i) => (
                  <div
                    key={`${date}-${i}`}
                    className="card border border-gray-100"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-500">
                        {p.categoria} · {p.tipo}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          p.estado === "Finalizado"
                            ? "bg-green-50 text-green-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {p.estado}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex-1 text-right">
                        <p className="font-bold text-gray-900">{p.local}</p>
                      </div>

                      <div className="mx-4 flex items-center gap-2">
                        {p.estado === "Finalizado" ? (
                          <div className="flex items-center gap-1 rounded-lg bg-gray-100 px-4 py-2">
                            <span className="text-xl font-black text-gray-900">{p.golesLocal}</span>
                            <span className="text-gray-400">-</span>
                            <span className="text-xl font-black text-gray-900">{p.golesVisitante}</span>
                          </div>
                        ) : (
                          <div className="rounded-lg bg-primary-50 px-4 py-2 text-sm font-bold text-primary-500">
                            {p.hora}
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="font-bold text-gray-900">{p.visitante}</p>
                      </div>
                    </div>

                    <div className="mt-3 text-center text-xs text-gray-400">
                      {p.cancha}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
