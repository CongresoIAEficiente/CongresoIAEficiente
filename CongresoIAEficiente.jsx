
import React, { useState, useEffect } from "react";

export default function CongresoIAEficiente() {
  const [congresistas, setCongresistas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);

  useEffect(() => {
    fetch("/congresistas_simulados.json")
      .then(res => res.json())
      .then(data => setCongresistas(data));
  }, []);

  const filtrados = congresistas.filter(c =>
    c.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  if (seleccionado) {
    return (
      <div className="min-h-screen bg-[#F5F6F8] text-[#2C3E50] font-sans px-6 py-10 max-w-4xl mx-auto">
        <button onClick={() => setSeleccionado(null)} className="mb-4 text-[#4A90E2] underline">← Volver</button>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="w-32 h-32 bg-[#E6EAF9] rounded-full" />
            <div>
              <h1 className="text-2xl font-bold">{seleccionado.nombre}</h1>
              <p className="text-sm text-[#4A90E2]">{seleccionado.camara} - {seleccionado.partido} - {seleccionado.region}</p>
            </div>
            <div className="ml-auto bg-[#4A90E2] text-white px-4 py-2 rounded-full font-semibold text-lg">
              Puntaje IA: {seleccionado.puntaje_ia}
            </div>
          </div>

          <hr className="my-6 border-[#D6E9F9]" />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-[#D6E9F9] p-4 rounded-lg"><p className="font-semibold">Asistencia:</p><p>{seleccionado.asistencia}%</p></div>
            <div className="bg-[#D6E9F9] p-4 rounded-lg"><p className="font-semibold">Proyectos Presentados:</p><p>{seleccionado.proyectos_presentados}</p></div>
            <div className="bg-[#D6E9F9] p-4 rounded-lg"><p className="font-semibold">Proyectos Aprobados:</p><p>{seleccionado.proyectos_aprobados}</p></div>
            <div className="bg-[#D6E9F9] p-4 rounded-lg"><p className="font-semibold">Intervenciones:</p><p>{seleccionado.intervenciones}</p></div>
            <div className="bg-[#D6E9F9] p-4 rounded-lg"><p className="font-semibold">Coherencia de Votación:</p><p>{seleccionado.coherencia_votacion}%</p></div>
            <div className="bg-[#D6E9F9] p-4 rounded-lg"><p className="font-semibold">Influencias:</p><p>{seleccionado.influencias}</p></div>
          </div>

          <hr className="my-6 border-[#D6E9F9]" />

          <div className="text-sm">
            <h3 className="font-bold text-lg mb-2">🛑 Investigaciones o procesos</h3>
            {seleccionado.procesos.length === 0 ? <p>Sin investigaciones registradas.</p> : (
              <ul className="list-disc list-inside">
                {seleccionado.procesos.map((p, i) => (
                  <li key={i}>{p.tipo} - {p.motivo} ({p.estado}, {p.año})</li>
                ))}
              </ul>
            )}

            <h3 className="font-bold text-lg mt-6 mb-2">🧬 Vínculos políticos o familiares</h3>
            {seleccionado.vinculos_familiares.length === 0 ? <p>Sin vínculos registrados.</p> : (
              <ul className="list-disc list-inside">
                {seleccionado.vinculos_familiares.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8] text-[#2C3E50] font-sans">
      <header className="bg-[#D6E9F9] p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#4A90E2] text-white font-bold px-3 py-2 rounded-lg">IA</div>
          <div>
            <h1 className="text-xl font-bold">CONGRESO IA-EFICIENTE</h1>
            <p className="text-sm text-[#4A90E2]">Análisis transparente. Decisión informada.</p>
          </div>
        </div>
      </header>

      <main className="px-6 py-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Explora los congresistas</h2>
        <input
          type="text"
          placeholder="Buscar congresista"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded-md border border-[#AAB2BD] mb-6"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map((c, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-[#EEF4FA]"
              onClick={() => setSeleccionado(c)}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#E6EAF9] rounded-full" />
                <div>
                  <h3 className="text-lg font-semibold">{c.nombre}</h3>
                  <p className="text-sm text-[#4A90E2]">{c.camara} - {c.partido}</p>
                </div>
                <div className="ml-auto text-white bg-[#4A90E2] rounded-full px-3 py-1 font-semibold">
                  {c.puntaje_ia}
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-10 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2">¿Cómo funciona?</h3>
          <p className="text-sm text-[#2C3E50]">
            Esta plataforma utiliza un algoritmo de inteligencia artificial que analiza el desempeño
            legislativo de los congresistas colombianos de forma objetiva y verificable.
          </p>
        </section>
      </main>
    </div>
  );
}
