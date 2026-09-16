import { PhoneCall } from "lucide-react"; //AINDA FALTA AS TELAS PARA FAZER ESSA PARTE

export default function Emergencia() {
  return (
    <div className="space-y-4">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
        <h1 className="text-xl font-bold text-red-700">
          O que fazer em caso de acidente?
        </h1>
        <p className="text-sm text-red-600 mt-1">
          Mantenha a vítima calma e higienize o local do ferimento.
        </p>
      </div>

      <a
        href="tel:192"
        className="flex items-center justify-center space-x-2 bg-red-600 text-white font-bold py-3 px-4 rounded-xl shadow hover:bg-red-700 transition"
      >
        <PhoneCall className="w-5 h-5" />
        <span>Ligar para o SAMU (192)</span>
      </a>

      <div className="bg-white p-4 rounded-xl shadow space-y-2">
        <h2 className="font-bold text-gray-800">Primeiros Socorros Básicos:</h2>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Lave o local da picada com água e sabão.</li>
          <li>Mantenha a vítima deitada e em repouso.</li>
          <li>Não tente garrotear ou amarrar o membro afetado.</li>
          <li>Não aplique produtos caseiros no local da ferida.</li>
          <li>
            Se possível, tire uma foto do animal para rápida identificação.
          </li>
        </ul>
      </div>
    </div>
  );
}
