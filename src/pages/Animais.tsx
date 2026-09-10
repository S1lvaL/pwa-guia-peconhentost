import { useState } from "react";
import animaisData from "../data/animais.json";

export default function Animais() {
  const [busca, setBusca] = useState("");

  const animaisFiltrados = animaisData.filter(
    (animal) =>
      animal.nome.toLowerCase().includes(busca.toLowerCase()) ||
      animal.categoria.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Animais Peçonhentos</h1>

      <input
        type="text"
        placeholder="Buscar por nome ou categoria..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <div className="grid grid-cols-1 gap-4">
        {animaisFiltrados.map((animal) => (
          <div
            key={animal.id}
            className="bg-white p-4 rounded-xl shadow border border-gray-100 flex items-center space-x-4"
          >
            <img
              src={
                Array.isArray(animal.imagem) ? animal.imagem[0] : animal.imagem
              }
              alt={animal.nome}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800 uppercase">
                {animal.categoria}
              </span>
              <h2 className="text-lg font-bold text-gray-800 mt-1">
                {animal.nome}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
