import { useState, useEffect } from "react";
import { AREAS, dadosPrevencao } from "../data/DicasPrevencao";
import type { Area } from "../data/DicasPrevencao";
import { useRegiao } from "../context/RegiaoContexto";
import animaisJson from "../data/animais.json";
import cidadesBiomasJson from "../data/CidadesBiomas.json";
import type { Animal, Habitat } from "../types/animal";

const CHAVE_STORAGE = "prevencao:itensChecados";

//Quantos animais aparecem no card antes do "Ver todos"
const LIMITE_CARDS = 2;

//Diz ao TypeScript o formato dos JSONs (eles são lidos como string comum)
const animais = animaisJson as unknown as Animal[];
type InfoCidade = { bioma: Habitat; litoral: boolean };
const cidadesBiomas = cidadesBiomasJson as unknown as Record<
  string,
  InfoCidade
>;
const nomesCidades = Object.keys(cidadesBiomas);

//Tira acentos e maiúsculas: "Camaçari" e "camacari" ficam iguais na busca
const normalizar = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

//Animais "Perigo!" aparecem primeiro, depois "Risco moderado", depois os sem valor
const pesoPericulosidade = (a: Animal) =>
  a.periculosidade === "Perigo!"
    ? 0
    : a.periculosidade === "Risco moderado"
      ? 1
      : 2;

//Lê o progresso salvo no localStorage (ou retorna um objeto vazio se não houver nada)
function carregarProgresso(): Record<string, boolean> {
  try {
    const salvo = localStorage.getItem(CHAVE_STORAGE);
    return salvo ? JSON.parse(salvo) : {};
  } catch {
    return {};
  }
}

//Ícones dos filtros caracteristicas gerais deles
const svgProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};
//Função para renderizar o ícone correto com base na área selecionada
function IconeArea({ area }: { area: Area }) {
  switch (area) {
    case "casa":
      return (
        <svg {...svgProps}>
          <path d="M3 11 12 4l9 7" />
          <path d="M5 10v10h14V10" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    case "campo":
      return (
        <svg {...svgProps}>
          <path d="M12 22V8" />
          <path d="M12 8c-2 0-3.5-1.5-3.5-3.5C10.5 4.5 12 6 12 8Z" />
          <path d="M12 8c2 0 3.5-1.5 3.5-3.5C13.5 4.5 12 6 12 8Z" />
          <path d="M12 14c-2 0-3.5-1.5-3.5-3.5C10.5 10.5 12 12 12 14Z" />
          <path d="M12 14c2 0 3.5-1.5 3.5-3.5C13.5 10.5 12 12 12 14Z" />
          <path d="M12 20c-2 0-3.5-1.5-3.5-3.5C10.5 16.5 12 18 12 20Z" />
          <path d="M12 20c2 0 3.5-1.5 3.5-3.5C13.5 16.5 12 18 12 20Z" />
          <path d="M12 4V2" />
        </svg>
      );
    case "trilha":
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="4.5" r="1.8" />
          <path d="M12 7.5 11 13l-2.5 4.5" />
          <path d="M11 13l3 2 1 5" />
          <path d="M12 8.5l3 2.5" />
          <rect x="8.2" y="8" width="3" height="5" rx="1" />
          <path d="M18 8l-3 13" />
        </svg>
      );
    case "mar":
      return (
        <svg {...svgProps}>
          <path d="M2 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
          <path d="M2 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
          <path d="M2 19c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        </svg>
      );
  }
}

/*ver se foi clicado e decide o que fazer*/
function ItemCheck({
  texto,
  marcado,
  onToggle,
  tipo = "fazer",
}: {
  texto: string;
  marcado: boolean;
  onToggle: () => void;
  tipo?: "fazer" | "evite";
}) {
  const evite = tipo === "evite";
  /*O <label> faz o card inteiro funcionar como botão de marcar/desmarcar
    has-[:focus-visible] mostra um contorno quando o item é selecionado pelo teclado*/
  return (
    <label
      className={`p-4 rounded-[16px] flex items-center space-x-4 cursor-pointer border shadow-sm has-[:focus-visible]:ring-2 ${
        evite
          ? "bg-vermelho-principal/15 border-vermelho-principal/40 has-[:focus-visible]:ring-vermelho-principal"
          : "bg-verde-principal/15 border-verde-principal/40 has-[:focus-visible]:ring-verde-principal"
      }`}
    >
      <input
        type="checkbox"
        checked={marcado}
        onChange={onToggle}
        className="sr-only"
      />
      {/*Desenho da caixinha: fica escura com ✓ quando marcado*/}
      <span
        aria-hidden
        className={`w-6 h-6 rounded-[6px] border-2 flex items-center justify-center shrink-0 text-[14px] font-extrabold ${
          marcado
            ? evite
              ? "border-vermelho-principal bg-vermelho-principal text-white"
              : "border-verde-principal bg-verde-principal text-white"
            : evite
              ? "border-vermelho-principal bg-white"
              : "border-verde-principal bg-white"
        }`}
      >
        {marcado && "✓"}
      </span>
      {/*Texto da dica: riscado e mais apagado quando marcado*/}
      <span
        className={`text-[14px] font-medium text-letra leading-snug flex-1 ${
          marcado ? "line-through opacity-60" : ""
        }`}
      >
        {texto}
      </span>
    </label>
  );
}

function TituloSecao({
  children,
  tipo = "fazer",
}: {
  children: React.ReactNode;
  tipo?: "fazer" | "evite";
}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-1 h-5 bg-vermelho-principal rounded-sm" />
      <h3
        className={`text-[16px] font-bold ${
          tipo === "evite" ? "text-vermelho-principal" : "text-verde-principal"
        }`}
      >
        {children}
      </h3>
    </div>
  );
}

//Componente principal da tela
//onVerTodos: função enviada pelo App para trocar para a aba "animais"
export default function Prevencao({ onVerTodos }: { onVerTodos?: () => void }) {
  //Estado inicial como null (nenhum filtro selecionado = dicas gerais)
  const [areaAtiva, setAreaAtiva] = useState<Area | null>(null);
  const [itensChecados, setItensChecados] =
    useState<Record<string, boolean>>(carregarProgresso);

  //Cidade escolhida (vem do contexto, então continua salva ao trocar de aba)
  const { municipio, setMunicipio, setFiltrarCatalogo } = useRegiao();
  //Controla se o campo de busca da cidade está aberto e o que foi digitado
  const [editandoLocal, setEditandoLocal] = useState(false);
  const [busca, setBusca] = useState("");

  //Salva toda vez que o progresso mudar
  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(itensChecados));
    } catch {
      //se o storage estiver cheio/bloqueado, o app continua funcionando sem salvar
    }
  }, [itensChecados]);

  //Marca ou desmarca uma dica
  const toggleCheck = (item: string) =>
    setItensChecados((prev) => ({ ...prev, [item]: !prev[item] }));

  //Sugestões de cidade: só aparecem a partir de 2 letras, no máximo 6
  const sugestoes =
    busca.trim().length >= 2
      ? nomesCidades
          .filter((cidade) =>
            normalizar(cidade).includes(normalizar(busca.trim())),
          )
          .slice(0, 6)
      : [];

  const escolherCidade = (cidade: string) => {
    setMunicipio(cidade);
    setBusca("");
    setEditandoLocal(false);
  };

  const alternarBusca = () => {
    setBusca("");
    setEditandoLocal((aberto) => !aberto);
  };

  //Animais da região: bioma da cidade + água doce (todas) + marinho (se for litoral)
  const infoCidade = municipio ? cidadesBiomas[municipio] : undefined;
  const habitatsDaCidade: Habitat[] = infoCidade
    ? [
        infoCidade.bioma,
        "agua-doce",
        ...(infoCidade.litoral ? (["marinho"] as Habitat[]) : []),
      ]
    : [];
  const animaisDaRegiao = animais
    .filter((a) => (a.habitats ?? []).some((h) => habitatsDaCidade.includes(h)))
    .sort((a, b) => pesoPericulosidade(a) - pesoPericulosidade(b));
  const animaisVisiveis = animaisDaRegiao.slice(0, LIMITE_CARDS);
  const restantes = animaisDaRegiao.length - LIMITE_CARDS;

  //"Ver todos": liga o filtro de região no catálogo e troca de aba
  const verTodos = () => {
    setFiltrarCatalogo(true);
    onVerTodos?.();
  };

  //Cálculo de progresso (somente ativo quando um filtro for escolhido)
  const areaSelecionada = areaAtiva ? dadosPrevencao[areaAtiva] : null;
  //Junta as duas listas da área ("domestica" e "evite") numa só
  const todosOsItens = areaSelecionada
    ? [...areaSelecionada.domestica, ...areaSelecionada.evite]
    : [];
  const totalItens = todosOsItens.length;
  const totalConcluidos = todosOsItens.filter(
    (item) => itensChecados[item],
  ).length;
  const porcentagem =
    totalItens > 0 ? Math.round((totalConcluidos / totalItens) * 100) : 0;

  return (
    <div className="bg-verde-fundo min-h-screen flex flex-col w-full max-w-full mx-auto pt-8 pb-10 overflow-y-auto">
      <div className="p-4 space-y-5 flex-1">
        {/*Header*/}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-[40px] font-extrabold leading-[32px] text-verde-principal">
              Sistema de prevenção
            </h1>
            <p className="text-[12px] font-bold text-letra/75 uppercase tracking-wide mt-1 pt-3">
              informação hoje, segurança sempre
            </p>
          </div>
          {/*MUDAR QUANDO FIZERMOS NOSSA LOGO*/}
          <div className="bg-[#fef3c7] px-3 py-2 rounded-[20px] flex items-center space-x-1.5 shrink-0">
            <div className="w-2 h-2 rounded-full bg-[#601212]" />
            <span className="text-[12px] font-bold text-[#601212]">Logo</span>
          </div>
        </div>

        {/*Barra de localização + campo de busca da cidade*/}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 bg-verde-principal/10 border border-verde-principal/40 rounded-[16px] px-3 py-2 text-[13px] text-letra shadow-sm shadow-verde-principal/20">
            <svg
              className="size-[18px] shrink-0 text-vermelho-principal"
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
              <strong className="text-verde-principal">
                {municipio ? `${municipio} - BA` : "Escolha sua cidade"}
              </strong>
            </span>
            <button
              type="button"
              onClick={alternarBusca}
              className="font-bold underline text-vermelho-principal"
            >
              {editandoLocal
                ? "[Cancelar]"
                : municipio
                  ? "[Alterar]"
                  : "[Escolher]"}
            </button>
          </div>

          {editandoLocal && (
            <div className="space-y-1">
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                autoFocus
                autoComplete="off"
                placeholder="Digite o nome da cidade"
                aria-label="Buscar cidade"
                className="w-full rounded-[12px] border border-verde-principal/40 bg-white px-3 py-2 text-[14px] text-letra outline-none focus:ring-2 focus:ring-verde-principal"
              />
              {sugestoes.length > 0 && (
                <ul className="rounded-[12px] border border-verde-principal/40 bg-white overflow-hidden shadow-sm">
                  {sugestoes.map((cidade) => (
                    <li key={cidade}>
                      <button
                        type="button"
                        onClick={() => escolherCidade(cidade)}
                        className="w-full text-left px-3 py-2 text-[14px] text-letra hover:bg-verde-principal/10"
                      >
                        {cidade} - BA
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {busca.trim().length >= 2 && sugestoes.length === 0 && (
                <p className="px-1 text-[12px] text-letra/75">
                  Nenhuma cidade encontrada. Confira se o nome está certo.
                </p>
              )}
            </div>
          )}
        </div>

        {/*Card principal: animais da região*/}
        <section className="bg-verde-principal/87 text-white p-4 rounded-[24px] space-y-3 shadow-md shadow-verde-principal/40">
          <h2 className="text-[18px] font-bold leading-tight">
            Animais Peçonhentos nesta Região
          </h2>

          {!municipio ? (
            <p className="text-[13px] leading-snug">
              Escolha sua cidade acima para ver os animais que ocorrem na
              região.
            </p>
          ) : animaisDaRegiao.length === 0 ? (
            <p className="text-[13px] leading-snug">
              Nenhum animal cadastrado para esta região ainda.
            </p>
          ) : (
            /*Lista que rola para o lado (overflow-x-auto) e "encaixa" cada card*/
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1">
              {animaisVisiveis.map((animal) => (
                <article
                  key={animal.id}
                  className="snap-start shrink-0 w-[210px] flex items-center gap-2 bg-white rounded-[16px] p-2"
                >
                  <img
                    src={
                      Array.isArray(animal.imagem)
                        ? animal.imagem[0]
                        : animal.imagem
                    }
                    alt={animal.nome}
                    loading="lazy"
                    className="w-[52px] h-[52px] rounded-[12px] object-cover bg-verde-principal/10"
                  />
                  {/*Depois: ligar este botão à tela animais*/}
                  <div className="min-w-0">
                    <strong className="block text-[13px] text-verde-principal truncate">
                      {animal.nome}
                    </strong>
                    <button
                      type="button"
                      className="text-[12px] text-vermelho-principal underline"
                    >
                      Ver no Catálogo
                    </button>
                  </div>
                </article>
              ))}

              {/*Último card: aparece só quando há mais animais do que o limite*/}
              {restantes > 0 && (
                <button
                  type="button"
                  onClick={verTodos}
                  className="snap-start shrink-0 w-[150px] flex items-center justify-center bg-white/15 border border-white/40 rounded-[16px] p-2 text-[13px] font-bold text-white"
                >
                  Ver todos (+{restantes})
                </button>
              )}
            </div>
          )}
        </section>

        {/*Filtros*/}
        <div className="space-y-3">
          <h2 className="text-[18px] font-bold text-verde-principal leading-tight">
            Prevenção e segurança por área
          </h2>

          <div className="flex gap-2 overflow-x-auto pb-1" role="tablist">
            {AREAS.map(({ id, rotulo }) => {
              const isActive = areaAtiva === id;
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setAreaAtiva(isActive ? null : id)}
                  //flex-col: ícone em cima e texto embaixo; flex-1: os 4 dividem a largura
                  className={`flex-1 flex flex-col items-center gap-1 px-1 py-2.5 rounded-[16px] text-[13px] font-bold transition border ${
                    isActive
                      ? "bg-verde-principal text-white border-verde-principal shadow-sm shadow-verde-principal/60"
                      : "bg-verde-principal/10 text-verde-principal border-verde-principal/40 shadow-sm shadow-vermelho-principal/30"
                  }`}
                >
                  <IconeArea area={id} />
                  {rotulo}
                </button>
              );
            })}
          </div>

          {/*Progresso SOMENTE quando algum filtro estiver ativo*/}
          {areaAtiva && (
            <div className="space-y-1.5 pt-1">
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((segIndex) => (
                  <div
                    key={segIndex}
                    className={`h-[6px] flex-1 rounded-[3px] transition-colors duration-300 ${
                      (porcentagem / 100) * 4 > segIndex
                        ? "bg-verde-principal"
                        : "bg-verde-principal/25"
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[11px] text-letra">
                <span className="font-semibold">Progresso do plano</span>
                <span className="font-bold text-vermelho-principal">
                  {porcentagem}% concluído
                </span>
              </div>
            </div>
          )}
        </div>

        {/*Checklist*/}
        {!areaSelecionada ? (
          //Sem filtro: mostra as dicas gerais
          <div className="space-y-3">
            <TituloSecao>Dicas de manejo e checklist</TituloSecao>
            <div className="space-y-2">
              {dadosPrevencao.geral.map((item) => (
                <ItemCheck
                  key={item}
                  texto={item}
                  marcado={!!itensChecados[item]}
                  onToggle={() => toggleCheck(item)}
                />
              ))}
            </div>
          </div>
        ) : (
          //Com filtro: mostra as dicas da área selecionada
          <>
            <div className="space-y-3">
              <TituloSecao>
                <span className="capitalize">Prevenção {areaAtiva}</span>
              </TituloSecao>
              <div className="space-y-2">
                {areaSelecionada.domestica.map((item) => (
                  <ItemCheck
                    key={item}
                    texto={item}
                    marcado={!!itensChecados[item]}
                    onToggle={() => toggleCheck(item)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <TituloSecao tipo="evite">Evite</TituloSecao>
              <div className="space-y-2">
                {areaSelecionada.evite.map((item) => (
                  <ItemCheck
                    key={item}
                    texto={item}
                    tipo="evite"
                    marcado={!!itensChecados[item]}
                    onToggle={() => toggleCheck(item)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
