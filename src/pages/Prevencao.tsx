export default function Prevencao() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">
        Prevenção de Acidentes
      </h1>

      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        <h2 className="font-bold text-green-700 text-lg">
          Medidas no Dia a Dia
        </h2>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
          <li>Examine sapatos e roupas antes de usá-los.</li>
          <li>Mantenha o quintal limpo, sem entulho ou acúmulo de lixo.</li>
          <li>Vede frestas, buracos e soleiras de portas.</li>
          <li>
            Use luvas e botas ao manusear materiais de construção ou jardim.
          </li>
          <li>
            Evite colocar as mãos desprotegidas em buracos, sob pedras ou
            troncos podres.
          </li>
        </ul>
      </div>
    </div>
  );
}
