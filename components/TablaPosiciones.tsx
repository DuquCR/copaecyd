"use client";

import { useState, useEffect } from "react";

interface TeamRow {
  equipo: string;
  categoria: string;
  tipo: string;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
  dg: number;
  pts: number;
}

export default function TablaPosiciones() {
  const [data, setData] = useState<TeamRow[]>([]);
  const [tipo, setTipo] = useState("Varonil");
  const [categoria, setCategoria] = useState("Sub-15");
  const [loading, setLoading] = useState(true);

  const categorias = ["Sub-13", "Sub-15", "Sub-17"];

  useEffect(() => {
    setLoading(true);
    fetch(`/api/tabla?tipo=${tipo}&categoria=${categoria}`)
      .then((r) => r.json())
      .then((d) => setData(d.tabla || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [tipo, categoria]);

  const filtered = data.sort((a, b) => b.pts - a.pts || b.dg - a.dg);

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="flex rounded-lg border border-gray-200 bg-white p-1">
          {["Varonil", "Femenil"].map((t) => (
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

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-primary-500 text-white">
              <th className="px-4 py-3 text-left font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">Equipo</th>
              <th className="px-4 py-3 text-center font-semibold">PJ</th>
              <th className="px-4 py-3 text-center font-semibold">PG</th>
              <th className="px-4 py-3 text-center font-semibold">PE</th>
              <th className="px-4 py-3 text-center font-semibold">PP</th>
              <th className="px-4 py-3 text-center font-semibold">GF</th>
              <th className="px-4 py-3 text-center font-semibold">GC</th>
              <th className="px-4 py-3 text-center font-semibold">DG</th>
              <th className="px-4 py-3 text-center font-semibold">Pts</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={10} className="px-4 py-12 text-center text-gray-400">
                  Cargando...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-12 text-center text-gray-400">
                  No hay datos disponibles para esta categoría.
                </td>
              </tr>
            ) : (
              filtered.map((row, i) => (
                <tr
                  key={row.equipo}
                  className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${
                    i === 0 ? "bg-accent-50/50" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-bold text-gray-500">{i + 1}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{row.equipo}</td>
                  <td className="px-4 py-3 text-center">{row.pj}</td>
                  <td className="px-4 py-3 text-center">{row.pg}</td>
                  <td className="px-4 py-3 text-center">{row.pe}</td>
                  <td className="px-4 py-3 text-center">{row.pp}</td>
                  <td className="px-4 py-3 text-center">{row.gf}</td>
                  <td className="px-4 py-3 text-center">{row.gc}</td>
                  <td className="px-4 py-3 text-center font-medium">
                    <span className={row.dg > 0 ? "text-green-600" : row.dg < 0 ? "text-red-500" : ""}>
                      {row.dg > 0 ? `+${row.dg}` : row.dg}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="rounded-full bg-primary-500 px-3 py-1 text-xs font-bold text-white">
                      {row.pts}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
        <span>PJ = Partidos Jugados</span>
        <span>PG = Ganados</span>
        <span>PE = Empatados</span>
        <span>PP = Perdidos</span>
        <span>GF = Goles a Favor</span>
        <span>GC = Goles en Contra</span>
        <span>DG = Diferencia de Goles</span>
        <span>Pts = Puntos</span>
      </div>
    </div>
  );
}
