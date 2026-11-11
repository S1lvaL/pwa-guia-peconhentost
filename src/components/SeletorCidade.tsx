import { useState } from "react";
import { useRegiao } from "../context/RegiaoContexto.tsx";
import cidadesBiomasJson from "../data/CidadesBiomas.json";

export type VarianteCor = "verde" | "vermelho";

const cores = {
  verde: {
    barraFundo: "bg-verde-principal/10",
    barraBorda: "border-verde-principal/40",
    barraSombra: "shadow-verde-principal/20",
    destaque: "text-verde-principal",
    inputBorda: "border-verde-principal/40",
    inputFocus: "focus:ring-verde-principal",
    listaBorda: "border-verde-principal/40",
    itemHover: "hover:bg-verde-principal/10",
    exercao: "text-vermelho-principal",
  },
  vermelho: {
    barraFundo: "bg-vermelho-principal/10",
    barraBorda: "border-vermelho-principal/40",
    barraSombra: "shadow-vermelho-principal/20",
    destaque: "text-vermelho-principal",
    inputBorda: "border-vermelho-principal/40",
    inputFocus: "focus:ring-vermelho-principal",
    listaBorda: "border-vermelho-principal/40",
    itemHover: "hover:bg-vermelho-principal/10",
    exercao: "text-verde-principal",
  },
} as const;

//Lista as cidades do JSON para o filtro
//Object.keys pega as CHAVES do JSON/
const nomesCidades = Object.keys(cidadesBiomasJson);

//Tira acentos e maiúsculas
const normalizar = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export function SeletorCidade({
  variante = "verde",
}: {
  variante?: VarianteCor;
}) {
  //Pega o estado do contexto de região para trocar se necessário
  const { municipio, setMunicipio } = useRegiao();
  const c = cores[variante];

  //Controla se o seletor está em modo de edição e o que foi digitado (busca)
  const [editando, setEditando] = useState(false);
  const [busca, setBusca] = useState("");

  const termo = normalizar(busca.trim());
  //Apartir de duas letras digitadas, filtra a lista de Cidades
  const sugestoes =
    termo.length >= 2
      ? nomesCidades
          .filter((cidade) => normalizar(cidade).includes(termo))
          .slice(0, 6)
      : [];
  //Escolhe a cidade, salva no contexto, limpa a busca e fecha o seletor
  const escolherCidade = (cidade: string) => {
    setMunicipio(cidade);
    setEditando(false);
    setBusca("");
  };
  //Abre e fecha o seletor de cidade, limpando a busca ao fechar
  const alternarBusca = () => {
    setBusca("");
    setEditando((aberto) => !aberto);
  };
  return (
    <div className="space-y-2">
      {/*Barra de localização*/}
      <div
        className={`flex items-center gap-1.5 ${c.barraFundo} border ${c.barraBorda} rounded-[16px] px-3 py-2 text-[13px] text-letra shadow-sm ${c.barraSombra}`}
      >
        <svg
          className={`size-[18px] shrink-0 ${c.exercao}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        <span className="flex-1">
          Sua localização atual:{" "}
          <strong className={c.destaque}>
            {/*Se há cidade mostra "Cidade - BA"; se não, pede para escolher*/}
            {municipio ? `${municipio} - BA` : "Escolha sua cidade"}
          </strong>
        </span>
        <button
          type="button"
          onClick={alternarBusca}
          className={`font-bold underline ${c.exercao}`}
        >
          {/*O texto do botão muda conforme o estado*/}
          {editando ? "[Cancelar]" : municipio ? "[Alterar]" : "[Escolher]"}
        </button>
      </div>

      {/*Campo de busca com sugestões*/}
      {editando && (
        <div className="space-y-1">
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            autoFocus
            autoComplete="off"
            placeholder="Digite o nome da cidade"
            aria-label="Buscar cidade"
            className={`w-full rounded-[12px] border ${c.inputBorda} bg-white px-3 py-2 text-[14px] text-letra outline-none focus:ring-2 ${c.inputFocus}`}
          />
          {/*Se houver sugestões, mostra a lista*/}
          {sugestoes.length > 0 && (
            <ul
              className={`rounded-[12px] border ${c.listaBorda} bg-white overflow-hidden shadow-sm`}
            >
              {sugestoes.map((cidade) => (
                <li key={cidade}>
                  <button
                    type="button"
                    onClick={() => escolherCidade(cidade)}
                    className={`w-full text-left px-3 py-2 text-[14px] text-letra ${c.itemHover}`}
                  >
                    {cidade} - BA
                  </button>
                </li>
              ))}
            </ul>
          )}
          {termo.length >= 2 && sugestoes.length === 0 && (
            <p className="px-1 text-[12px] text-letra/75">
              Nenhuma cidade encontrada. Confira se o nome está certo.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
