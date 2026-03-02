"use client";

import { useState, useEffect } from "react";

interface Partido {
  index: number;
  fecha: string;
  hora: string;
  local: string;
  visitante: string;
  categoria: string;
  tipo: string;
  estado: string;
}

export default function AdminResultForm() {
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [selected, setSelected] = useState<number | "">("");
  const [golesLocal, setGolesLocal] = useState("");
  const [golesVisitante, setGolesVisitante] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/calendario")
      .then((r) => r.json())
      .then((d) => {
        const all = (d.partidos || []) as (Partido & { golesLocal: string; golesVisitante: string })[];
        setPartidos(
          all
            .map((p, i) => ({ ...p, index: i }))
            .filter((p) => p.estado !== "Finalizado")
        );
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selected === "" || !golesLocal || !golesVisitante) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/resultados", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partidoIndex: selected,
          golesLocal,
          golesVisitante,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al guardar");
      setMessage({ type: "ok", text: "Resultado guardado correctamente" });
      setSelected("");
      setGolesLocal("");
      setGolesVisitante("");
    } catch (err) {
      setMessage({ type: "err", text: (err as Error).message });
    } finally {
      setLoading(false);
    }
  }

  const partido = partidos.find((p) => p.index === selected);

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      {message && (
        <div
          className={`rounded-lg p-3 text-sm font-medium ${
            message.type === "ok"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Selecciona el partido
        </label>
        <select
          className="select-field"
          value={selected}
          onChange={(e) => setSelected(e.target.value ? Number(e.target.value) : "")}
        >
          <option value="">Selecciona un partido pendiente</option>
          {partidos.map((p) => (
            <option key={p.index} value={p.index}>
              {p.fecha} {p.hora} — {p.local} vs {p.visitante} ({p.categoria})
            </option>
          ))}
        </select>
      </div>

      {partido && (
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="flex items-center justify-between text-center">
            <div className="flex-1">
              <p className="text-sm text-gray-500">Local</p>
              <p className="font-bold text-gray-900">{partido.local}</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                className="h-12 w-16 rounded-lg border border-gray-300 text-center text-xl font-bold focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                value={golesLocal}
                onChange={(e) => setGolesLocal(e.target.value)}
                placeholder="0"
              />
              <span className="text-gray-400 font-bold">-</span>
              <input
                type="number"
                min="0"
                className="h-12 w-16 rounded-lg border border-gray-300 text-center text-xl font-bold focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                value={golesVisitante}
                onChange={(e) => setGolesVisitante(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Visitante</p>
              <p className="font-bold text-gray-900">{partido.visitante}</p>
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={selected === "" || !golesLocal || !golesVisitante || loading}
        className="btn-primary w-full"
      >
        {loading ? "Guardando..." : "Guardar Resultado"}
      </button>
    </form>
  );
}
