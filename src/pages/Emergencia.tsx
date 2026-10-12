import { useMemo, useState } from "react";
import dadosAnimais from "../data/animais.json";
import type { Animal as AnimalCatalogo } from "../types/animal";
import { CardAnimal } from "../components/CardAnimal";
import { ModalDetalhes } from "../components/ModalDetalhes";
import BottomNav from "../components/BottomNav";
import { Phone, TriangleAlert } from "lucide-react";

//Abas do app (as mesmas do BottomNav)
type Aba = "animais" | "emergencia" | "prevencao";

//A aba ativa e a função de trocar de aba vêm de fora (do App)
interface EmergenciaProps {
  abaAtiva: Aba;
  setAbaAtiva: (aba: Aba) => void;
}

type Categoria =
  | "escorpioes"
  | "serpentes"
  | "aranhas"
  | "lacraias"
  | "besouros"
  | "aquaticos"
  | "anfibios";
type Caracteristica =
  | "ferrão"
  | "pequeno"
  | "muitas pernas"
  | "aquático"
  | "manchas"
  | "terrestre"
  | "grande"
  | "picada";

type AnimalEmergencia = AnimalCatalogo & {
  categoria: string;
  caracteristicas?: Caracteristica[];
  nomesPopulares?: string[];
};

const normalizar = (texto: string) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

//Usa o mesmo animais.json da página Guia de Animais.
const animais = dadosAnimais as AnimalEmergencia[];

const categorias: {
  id: Categoria;
  nome: string;
  termos: string[];
}[] = [
  {
    id: "escorpioes",
    nome: "Escorpiões",
    emoji: "🦂",
    termos: ["escorpioes", "escorpiao"],
  },
  {
    id: "serpentes",
    nome: "Serpentes",
    emoji: "🐍",
    termos: ["serpentes", "serpente", "cobra", "cobras"],
  },
  {
    id: "aranhas",
    nome: "Aranhas",
    emoji: "🕷️",
    termos: ["aranhas", "aranha"],
  },
  {
    id: "lacraias",
    nome: "Lacraias",
    emoji: "🪱",
    termos: ["lacraias", "lacraia"],
  },
  {
    id: "besouros",
    nome: "Besouros",
    emoji: "🪲",
    termos: ["besouros", "besouro"],
  },
  {
    id: "aquaticos",
    nome: "Aquáticos",
    emoji: "🐋",
    termos: ["aquaticos", "aquatico", "marinhos", "marinho"],
  },
  {
    id: "anfibios",
    nome: "Anfíbios",
    emoji: "🐸",
    termos: ["anfibios", "anfibio"],
  },
];


// Ícones vetoriais renovados: estilo preenchido, com formas simples e fáceis de reconhecer.
function IconeCategoria({ categoria }: { categoria: Categoria }) {
  const svgProps = {
    width: 30,
    height: 30,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (categoria) {
    case "escorpioes":
      return (
        <svg {...svgProps} viewBox="0 0 32 32">
          {/* Corpo */}
          <ellipse cx="15" cy="17" rx="5" ry="6" fill="currentColor" fillOpacity=".2" />
          <path d="M12 13c-2-3 0-6 3-6s5 3 3 6" />
          <path d="M12 17c-3 0-5 2-5 4s3 3 5 1" />
          <path d="M18 17c3 0 5 2 5 4s-3 3-5 1" />
          {/* Pinças */}
          <path d="M11 13 7 10 4 12 2 10" />
          <path d="M20 13 24 10 27 12 29 10" />
          <path d="m4 12-2 3 4 1 2-3" />
          <path d="m27 12 2 3-4 1-2-3" />
          {/* Pernas */}
          <path d="m11 17-5 1-2 3" />
          <path d="m11 20-4 3-1 3" />
          <path d="m19 17 5 1 2 3" />
          <path d="m19 20 4 3 1 3" />
          {/* Cauda curvada e ferrão */}
          <path d="M16 11c4-2 7-5 6-8-1-2-4-1-4 1" strokeWidth="2.5" />
          <path d="m18 4 4-3-1 5" fill="currentColor" />
          {/* Olhos */}
          <circle cx="13" cy="9" r=".8" fill="currentColor" />
          <circle cx="17" cy="9" r=".8" fill="currentColor" />
        </svg>
      );
    case "serpentes":
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          {/* Corpo enrolado da cobra */}
          <path d="M17 5 C14 2 9 3 8 6 C7 9 11 11 14 10 C18 9 20 12 18 15 C16 18 10 18 8 15 C6 12 9 10 11 12 C13 14 11 17 8 18" fill="currentColor" fillOpacity=".15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Cabeça */}
          <path d="M15 4 C16 2 19 2 21 4 L20 7 C18 8 16 7 15 6 Z" fill="currentColor" fillOpacity=".25" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Olho */}
          <circle cx="19" cy="4.5" r=".7" fill="currentColor" stroke="none" />
          {/* Língua bifurcada */}
          <path d="M20 7 L22 9 M22 9 L23 8 M22 9 L22 10" strokeWidth="1" strokeLinecap="round" />
          {/* Detalhes das escamas */}
          <path d="M10 7 Q11 6 12 7" />
          <path d="M14 13 Q15 12 16 13" />
          <path d="M10 15 Q11 14 12 15" />
        </svg>
      );
    case "aranhas":
      return (
        <svg {...svgProps} viewBox="0 0 24 24">
          {/* Corpo */}
          <ellipse cx="12" cy="15" rx="4" ry="5" fill="currentColor" fillOpacity=".2" />
          <ellipse cx="12" cy="15" rx="4" ry="5" />
          <circle cx="12" cy="8" r="2.5" />
          {/* Pernas esquerdas */}
          <path d="M9 9 6 6 3 7" />
          <path d="M8.5 12 5 10 2 12" />
          <path d="M8.5 16 5 16 3 19" />
          <path d="M9 19 7 21 7 23" />
          {/* Pernas direitas */}
          <path d="m15 9 3-3 3 1" />
          <path d="m15.5 12 3.5-2 3 2" />
          <path d="m15.5 16 3.5 0 2 3" />
          <path d="m15 19 2 2 0 2" />
          {/* Olhos */}
          <circle cx="11" cy="7.5" r=".6" fill="currentColor" stroke="none" />
          <circle cx="13" cy="7.5" r=".6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "lacraias":
      return (
        <svg {...svgProps}>
          <path d="M6 9c2-3 5-2 6 0s-1 4 1 5 4-1 5 1-1 4 2 5 5-1 6-4" strokeWidth="4" />
          <path d="m7 8-3-3M10 8l-1-4M12 12l-4 2M15 14l-1 4M19 16l3 1M22 19l2 4M25 16l4 0" strokeWidth="1.7" />
          <path d="M5 9 3 11M25 16l3-3" />
        </svg>
      );
    case "besouros":
      return (
        <svg {...svgProps}>
          <path d="M12 8 9 4M20 8l3-4" strokeWidth="2.2" />
          <path d="M8 12c0-4 3-6 8-6s8 2 8 6v7c0 4-4 7-8 7s-8-3-8-7Z" fill="currentColor" fillOpacity=".2" strokeWidth="2" />
          <path d="M16 7v18M8 13l-4-2M8 18l-4 2M24 13l4-2M24 18l4 2M11 24l-2 3M21 24l2 3" />
          <circle cx="12" cy="11" r="1" fill="currentColor" stroke="none" />
          <circle cx="20" cy="11" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "aquaticos":
      return (
        <svg {...svgProps}>
          <path d="M4 15c4-6 10-8 17-5l6 5-6 5c-7 3-13 1-17-5Z" fill="currentColor" fillOpacity=".2" strokeWidth="2" />
          <path d="m4 15-3-5v10l3-5ZM14 11c2 2 2 6 0 8" />
          <circle cx="21" cy="13" r="1" fill="currentColor" stroke="none" />
          <path d="M4 26c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
        </svg>
      );
    case "anfibios":
      return (
        <svg {...svgProps}>
          <path d="M8 12 4 8 2 10l4 6M24 12l4-4 2 2-4 6" strokeWidth="2.2" />
          <path d="M7 15c0-5 3-7 9-7s9 2 9 7v4c0 4-4 6-9 6s-9-2-9-6Z" fill="currentColor" fillOpacity=".2" strokeWidth="2" />
          <circle cx="10" cy="8" r="3.2" fill="currentColor" fillOpacity=".25" />
          <circle cx="22" cy="8" r="3.2" fill="currentColor" fillOpacity=".25" />
          <circle cx="10" cy="8" r=".9" fill="currentColor" stroke="none" />
          <circle cx="22" cy="8" r=".9" fill="currentColor" stroke="none" />
          <path d="M12 17c2 2 6 2 8 0M8 23l-3 3M24 23l3 3" />
        </svg>
      );
  }
}

//Converte a categoria do JSON para o filtro correspondente desta tela.
function categoriaCompativel(
  categoriaAnimal: string,
  categoriaFiltro: Categoria,
) {
  const categoriaNormalizada = normalizar(categoriaAnimal);
  const categoria = categorias.find((item) => item.id === categoriaFiltro);
  return (
    !!categoria &&
    categoria.termos.some((termo) => categoriaNormalizada.includes(termo))
  );
}

const filtrosDisponiveis: { valor: Caracteristica; rotulo: string }[] = [
  { valor: "ferrão", rotulo: "Presença de ferrão" },
  { valor: "pequeno", rotulo: "Tamanho pequeno" },
  { valor: "muitas pernas", rotulo: "Muitas pernas" },
  { valor: "aquático", rotulo: "Ambiente aquático" },
  { valor: "manchas", rotulo: "Padrão de manchas" },
  { valor: "terrestre", rotulo: "Ambiente terrestre" },
  { valor: "grande", rotulo: "Tamanho grande" },
  { valor: "picada", rotulo: "Dor na picada ou contato" },
];

function ItemCaracteristica({
  valor,
  rotulo,
  marcado,
  onToggle,
}: {
  valor: Caracteristica;
  rotulo: string;
  marcado: boolean;
  onToggle: (valor: Caracteristica) => void;
}) {
  return (
    <label className="flex min-h-[42px] cursor-pointer items-center gap-2 rounded-xl bg-white px-3 py-2 text-[12px] text-[#292929] shadow-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#c9000b]">
      <input
        type="checkbox"
        checked={marcado}
        onChange={() => onToggle(valor)}
        className="h-4 w-4 shrink-0 accent-[#c9000b]"
      />
      <span>{rotulo}</span>
    </label>
  );
}

export default function Emergencia({ abaAtiva, setAbaAtiva }: EmergenciaProps) {
  const [pesquisa, setPesquisa] = useState("");
  const [outrasCaracteristicas, setOutrasCaracteristicas] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState<Categoria | null>(null);
  const [caracteristicasAtivas, setCaracteristicasAtivas] = useState<
    Caracteristica[]
  >([]);
  const [animalSelecionado, setAnimalSelecionado] =
    useState<AnimalEmergencia | null>(null);

  const resultados = useMemo(() => {
    const termo = normalizar(pesquisa);
    return animais.filter((animal) => {
      const nomes = [animal.nome, ...(animal.nomesPopulares ?? [])].map(
        normalizar,
      );
      const categoriaNome = normalizar(animal.categoria);
      const correspondeTexto =
        !termo ||
        nomes.some((nome) => nome.includes(termo)) ||
        categoriaNome.includes(termo) ||
        categorias.some(
          (categoria) =>
            categoria.termos.some(
              (item) => item.includes(termo) || termo.includes(item),
            ) && categoriaCompativel(animal.categoria, categoria.id),
        );
      const correspondeCategoria =
        !categoriaAtiva ||
        categoriaCompativel(animal.categoria, categoriaAtiva);
      // Características são aplicadas quando existirem no JSON; se não existirem, não excluem o animal.
      const caracteristicasAnimal = animal.caracteristicas ?? [];
      const correspondeCaracteristicas =
        caracteristicasAtivas.length === 0 ||
        caracteristicasAnimal.length === 0 ||
        caracteristicasAtivas.every((item) =>
          caracteristicasAnimal.includes(item),
        );
      return (
        correspondeTexto && correspondeCategoria && correspondeCaracteristicas
      );
    });
  }, [pesquisa, categoriaAtiva, caracteristicasAtivas]);

  const alternarCaracteristica = (valor: Caracteristica) => {
    setCaracteristicasAtivas((atuais) =>
      atuais.includes(valor)
        ? atuais.filter((item) => item !== valor)
        : [...atuais, valor],
    );
  };

  const selecionarCategoria = (id: Categoria) => {
    setCategoriaAtiva((atual) => (atual === id ? null : id));
  };

  return (
    <div className="min-h-screen w-full bg-verde-fundo font-sans text-[#171717] sm:flex sm:justify-center sm:pt-5">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1024px] flex-col overflow-hidden  bg-verde-fundo shadow-xl sm:min-h-[844px] sm:rounded-[25px]">
        {/* Cabeçalho */}
        <header className="flex min-h-[82px] pt-5 items-center gap-3 bg-[#ca1018] px-5 py-3 text-white">
          <div
            className="flex h-10 w-11 shrink-0 items-center justify-between"
            aria-hidden="true"
          >
            {/*Icone de alerta*/}
            <TriangleAlert
              className="size-[25px] text-white"
              strokeWidth={3}
              aria-hidden="true"
            />
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-[25px] mr-5 font-extrabold leading-[32px] text-white">
              Atendimento de Emergência
            </h1>
            {/*Logo do app - MUDAR DEPOIS*/}
            <div className="bg-[#fef3c7] px-3  py-2 rounded-[20px] flex items-center justify-between space-x-1.5 shrink-0">
              <div className="w-2 h-2 rounded-full bg-[#601212]" />
              <span className="text-[12px] font-bold text-[#601212]">Logo</span>
            </div>
          </div>
        </header>

        <main className="flex-1 space-y-4 overflow-y-auto px-[18px] pb-40 pt-4">
          {/* Pesquisa */}
          <section className="space-y-2">
            <div className="flex items-start gap-2">
              <span
                className="-mt-1 text-[35px] leading-none text-[#c9000b]"
                aria-hidden="true"
              >
                ⌕
              </span>
              <div>
                <h2 className="text-[15px] font-bold">
                  Pesquise o animal ou o grupo
                </h2>
                <p className="mt-1 text-[12px] leading-snug text-[#555]">
                  Digite o nome do animal ou selecione uma categoria para
                  encontrar informações e características.
                </p>
              </div>
            </div>
            <form
              className="flex h-10 overflow-hidden rounded-lg border border-[#d4d4d4] shadow-sm shadow-vermelho-principal/10 focus-within:ring-2 focus-within:ring-[#c9000b]/30"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="search"
                value={pesquisa}
                onChange={(event) => setPesquisa(event.target.value)}
                placeholder="Ex.: aranha-marrom, cascavel, escorpião..."
                aria-label="Pesquisar animal ou grupo"
                className="min-w-0 flex-1 px-3 text-[12px] text-verde-principal outline-none"
              />
              <button
                type="submit"
                className="bg-[#bd0008] px-3 text-[12px] font-bold text-white border border-vermelho-borda/30 shadow-sm shadow-vermelho-principal/10 transition hover:bg-[#900006]"
              >
                Pesquisar →
              </button>
            </form>
          </section>

          {/*Categorias com rolagem*/}
          <section>
            <h2 className="mb-2 flex items-center gap-2 text-[15px] font-bold">
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c50009"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M12 3v18M3 12h18" />
              </svg>
              Selecione uma categoria
            </h2>
            <div
              className="overflow-x-auto overflow-y-hidden rounded-xl  p-3"
              aria-label="Categorias de animais"
            >
              <div className="flex w-max gap-2 ">
                {categorias.map((categoria) => {
                  const selecionada = categoriaAtiva === categoria.id;
                  return (
                    <button
                      key={categoria.id}
                      type="button"
                      aria-pressed={selecionada}
                      onClick={() => selecionarCategoria(categoria.id)}
                      className={`flex min-h-[70px] w-[92px] shrink-0 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-[12px] font-bold transition ${
                        selecionada
                          ? "bg-vermelho text-white border border-vermelho-borda/60 shadow-md shadow-vermelho-principal/50 "
                          : "bg-vermelho-claro text-verde-principal border border-verde-principal/15 shadow-sm shadow-verde-principal/35 hover:bg-vermelho-medio"
                      }`}
                    >
                      <span
                        className="flex h-7 items-center justify-center"
                        aria-hidden="true"
                      >
                        <IconeCategoria categoria={categoria.id} />
                      </span>
                      <span>{categoria.nome}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            {categoriaAtiva && (
              <button
                type="button"
                onClick={() => setCategoriaAtiva(null)}
                className="mt-2 text-[12px] font-bold text-verde-principal underline"
              >
                Limpar categoria
              </button>
            )}
          </section>

          {/* Características */}
          <section className="rounded-xl bg-[#ffecef] border border-verde-principal/70  shadow-md shadow-sm shadow-vermelho-principal/40 p-3">
            <div className="mb-3 flex items-start gap-2">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#c50009] text-[14px] font-bold text-[#c50009]"
                aria-hidden="true"
              >
                ✓
              </span>
              <div>
                <h2 className="text-[14px] font-bold">
                  Possíveis sinais e características
                </h2>
                <p className="mt-1 text-[12px] text-letra/80">
                  Marque as opções que podem ajudar a identificar o animal:
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {filtrosDisponiveis.map((filtro) => (
                <ItemCaracteristica
                  key={filtro.valor}
                  valor={filtro.valor}
                  rotulo={filtro.rotulo}
                  marcado={caracteristicasAtivas.includes(filtro.valor)}
                  onToggle={alternarCaracteristica}
                />
              ))}
              <div className="col-span-2 flex h-[42px] items-center gap-2 rounded-xl border border-[#e0b8bc] bg-white px-3 shadow-sm focus-within:ring-2 focus-within:ring-[#c9000b]/20">
                <label
                  htmlFor="outras-caracteristicas"
                  className="shrink-0 text-[12px] font-semibold text-[#292929]"
                >
                  Outros:
                </label>
                <input
                  id="outras-caracteristicas"
                  type="text"
                  value={outrasCaracteristicas}
                  onChange={(event) => setOutrasCaracteristicas(event.target.value)}
                  placeholder="Digite aqui..."
                  aria-label="Outras características do animal"
                  className="min-w-0 flex-1 bg-transparent text-[12px] text-[#292929] outline-none placeholder:text-[#888]"
                />
              </div>
            </div>
            {caracteristicasAtivas.length > 0 && (
              <button
                type="button"
                onClick={() => setCaracteristicasAtivas([])}
                className="mt-3 text-[12px] font-bold text-verde-principal underline"
              >
                Limpar características
              </button>
            )}
          </section>

          {/*Resultados com rolagem*/}
          <section>
            <div className="mb-2 flex items-center gap-2">
              <h2 className="flex-1 text-[15px] font-bold">
                Possíveis animais encontrados
              </h2>
              <span className="rounded-md bg-[#ffd3d6] px-2 py-1 text-[9px] border border-vermelho font-bold text-vermelho">
                Resultados da busca
              </span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-vermelho px-2 text-[10px] border border-vermelho font-bold text-white">
                {resultados.length}
              </span>
            </div>
            {/*Lista de cards*/}
            <div
              className="min-h-[400px] overflow-y-auto flex flex-col gap-[10px] p-2"
              aria-live="polite"
            >
              {resultados.length > 0 ? (
                resultados.map((animal) => (
                  <CardAnimal
                    key={animal.id}
                    animal={animal}
                    onClick={() => setAnimalSelecionado(animal)}
                  />
                ))
              ) : (
                <p className="px-2 py-5 text-center text-[12px] text-verde-principal">
                  Nenhum animal encontrado. Tente alterar a pesquisa ou os
                  filtros.
                </p>
              )}
            </div>
          </section>

          {/*SAMU*/}
          <a
            href="tel:192"
            className="fixed bottom-[68px] left-4 right-4 mx-auto max-w-[600px] z-30 bg-vermelho-emergencia drop-shadow-[0px_4px_6px_rgba(220,38,38,0.25)] h-[56px] rounded-[16px] flex items-center justify-center gap-[12px] text-white font-bold text-[16px] hover:bg-vermelho-principal/90 transition-colors"
          >
            {/*Icone de telefone*/}
            <Phone className="size-[20px]" strokeWidth={3} aria-hidden="true" />
            Emergência · Chamar SAMU (192)
          </a>
        </main>

        {/*Menu inferior*/}
        <BottomNav abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />

        {/*Modal de detalhes*/}
        <ModalDetalhes
          animal={animalSelecionado}
          onClose={() => setAnimalSelecionado(null)}
        />
      </div>
    </div>
  );
}
