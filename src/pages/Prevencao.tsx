import { useState, useEffect } from "react";
import { AREAS, dadosPrevencao } from "../data/DicasPrevencao";
import type { Area } from "../data/DicasPrevencao";
import { useRegiao } from "../context/RegiaoContexto";
import { SeletorCidade } from "../components/SeletorCidade";
import { filtrarPorRegiao } from "../utils/regiao";
import animaisJson from "../data/animais.json";
import type { Animal } from "../types/animal";
import { ModalDetalhes } from "../components/ModalDetalhes";
import { UnidadesSoro } from "../components/UnidadesSoro";
import { Logo } from "../components/Logo";

//Chave usada para salvar o progresso do checklist no navegador
const CHAVE_STORAGE = "prevencao:itensChecados";

//Quantos animais aparecem no card antes do "Ver todos"
const LIMITE_CARDS = 2;

//Diz ao TypeScript o formato do JSON (ele é lido como string comum)
const animais = animaisJson as unknown as Animal[];

//Coloca uma prioridade, ordena do mais perigoso ao menos perigoso
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

//Um item do checklist (uma dica que pode ser marcada)
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
      {/*Desenho da caixinha: fica escura com check quando marcado*/}
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
//onVerUnidades: função enviada pelo App para abrir a lista completa de unidades (Emergência)
export default function Prevencao({
  onVerTodos,
}: {
  onVerTodos?: () => void;
  onVerUnidades?: () => void;
}) {
  //Estado inicial como null (nenhum filtro selecionado = dicas gerais)
  const [areaAtiva, setAreaAtiva] = useState<Area | null>(null);
  const [itensChecados, setItensChecados] =
    useState<Record<string, boolean>>(carregarProgresso);

  //Animal aberto no modal de detalhes
  const [animalSelecionado, setAnimalSelecionado] = useState<Animal | null>(
    null,
  );

  //Cidade escolhida e filtros do catálogo (vêm do contexto, então não se perdem ao trocar de aba)
  const { municipio, setFiltrarCatalogo, setAreaCatalogo } = useRegiao();

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

  //Dicas da área escolhida
  const areaSelecionada = areaAtiva ? dadosPrevencao[areaAtiva] : null;
  const rotuloArea = AREAS.find((a) => a.id === areaAtiva)?.rotulo;

  //Animais que vão aparecer no card com base nos filtros (região, área e periculosidade)
  const animaisDaRegiao = filtrarPorRegiao(animais, municipio)
    .filter((a) => !areaAtiva || (a.areas ?? []).includes(areaAtiva))
    .sort((a, b) => pesoPericulosidade(a) - pesoPericulosidade(b));
  //Só os primeiros animais cabem no card; "restantes" é quantos ficaram de fora
  const animaisVisiveis = animaisDaRegiao.slice(0, LIMITE_CARDS);
  const restantes = animaisDaRegiao.length - LIMITE_CARDS;

  //Função chamada quando clicar em "ver todos" para mudar de aba se ela existir
  const verTodos = () => {
    setFiltrarCatalogo(true);
    setAreaCatalogo(areaAtiva);
    onVerTodos?.();
  };

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
    <div className="bg-verde-fundo min-h-screen flex flex-col w-full max-w-full mx-auto pt-5 pb-5 overflow-y-auto">
      <div className="p-4 space-y-4 flex-1">
        {/*Header*/}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-[40px] font-extrabold leading-[30px] text-verde-principal">
              Sistema de prevenção
            </h1>
            <p className="text-[12px] font-bold text-letra/75 uppercase tracking-wide mt-1 pt-3">
              informação hoje, segurança sempre
            </p>
          </div>
          <Logo />
        </div>

        {/*Barra de localização + busca de cidade (componente compartilhado)*/}
        <SeletorCidade />

        {/*Card das unidades referênci para o soro antiveneno*/}
        <UnidadesSoro />

        {/*Card principal: animais da região (e da área, quando houver uma escolhida)*/}
        <section className="bg-verde-principal/97 border-2 border-black/45 text-white p-4 rounded-[24px] space-y-3 shadow-md shadow-verde-principal/30">
          <h2 className="text-[18px] font-bold leading-tight">
            Animais Peçonhentos nesta Região
            {rotuloArea && <span> · {rotuloArea}</span>}
          </h2>

          {!municipio ? (
            <p className="text-[13px] leading-snug">
              Escolha sua cidade acima para ver os animais que ocorrem na
              região.
            </p>
          ) : animaisDaRegiao.length === 0 ? (
            <p className="text-[13px] leading-snug">
              Nenhum animal cadastrado para{" "}
              {areaAtiva ? "esta área nesta" : "esta"} região ainda.
            </p>
          ) : (
            /*Lista que rola para o lado (overflow-x-auto) e "encaixa" cada card*/
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1">
              {animaisVisiveis.map((animal) => (
                <button
                  key={animal.id}
                  type="button"
                  onClick={() => setAnimalSelecionado(animal)}
                  className="snap-start shrink-0 w-[210px] flex items-center gap-2 bg-white border border-black rounded-[16px] p-2 text-left"
                >
                  <img
                    src={
                      Array.isArray(animal.imagem)
                        ? animal.imagem[0]
                        : animal.imagem
                    }
                    alt={animal.nome}
                    loading="lazy"
                    className="w-[52px] h-[52px] rounded-[12px] object-cover border border-verde-principal bg-verde-principal/10"
                  />
                  <div className="min-w-0">
                    <strong className="block text-[13px] text-verde-principal truncate ">
                      {animal.nome}
                    </strong>
                    <span className="text-[12px] text-vermelho-principal underline">
                      Ver detalhes
                    </span>
                  </div>
                </button>
              ))}

              {/*Último card: aparece só quando há mais animais do que o limite*/}
              {restantes > 0 && (
                <button
                  type="button"
                  onClick={verTodos}
                  className="snap-start shrink-0 w-[150px] flex items-center justify-center bg-white/95 border border-verde-principal/40 rounded-[16px] p-2 text-[13px] shadow-sm shadow-verde-principal/20 font-bold text-vermelho-principal"
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
                      : "bg-verde-principal/15 text-verde-principal border-verde-principal/40 shadow-sm shadow-vermelho-principal/35"
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
              <TituloSecao>Prevenção · {rotuloArea}</TituloSecao>
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
      <ModalDetalhes
        animal={animalSelecionado}
        onClose={() => setAnimalSelecionado(null)}
      />
    </div>
  );
}
