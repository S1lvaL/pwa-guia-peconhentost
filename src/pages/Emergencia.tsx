import { useEffect, useRef, useMemo, useState } from "react";
import dadosAnimais from "../data/animais.json";
import type { Animal as AnimalCatalogo } from "../types/animal";
import { CardAnimal } from "../components/CardAnimal";
import { ModalDetalhes } from "../components/ModalDetalhes";
import BottomNav from "../components/BottomNav";
import { Phone, Pin } from "lucide-react";
import { SeletorCidade } from "../components/SeletorCidade";
import { Logo } from "../components/Logo";
import { UnidadesSoro } from "../components/UnidadesSoro";

type Aba = "animais" | "emergencia" | "prevencao";

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
  | "muitas patas"
  | "aquático"
  | "manchas"
  | "terrestre"
  | "grande"
  | "picada";

type AnimalEmergencia = AnimalCatalogo & {
  categoria: string;
  caracteristicas?: Caracteristica[];
  nomesPopulares?: string[];
  descricao?: string;
  sinaisSintomas?: string[];
};

const normalizar = (texto: string) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const animais = dadosAnimais as AnimalEmergencia[];

// Mapeamento corrigido para a pasta "categoria" (no singular)
const imagensCategoria: Record<Categoria, string> = {
  escorpioes: "/categorias/escorpiao.png",
  serpentes: "/categorias/serpente.png",
  aranhas: "/categorias/aranha.png",
  lacraias: "/categorias/lacraia.png",
  besouros: "/categorias/besouro.png",
  aquaticos: "/categorias/aquatico.png",
  anfibios: "/categorias/anfibio.png",
};

const categorias: {
  id: Categoria;
  nome: string;
  termos: string[];
}[] = [
  { id: "escorpioes", nome: "Escorpiões", termos: ["escorpioes", "escorpiao"] },
  {
    id: "serpentes",
    nome: "Serpentes",
    termos: ["serpentes", "serpente", "cobra", "cobras"],
  },
  { id: "aranhas", nome: "Aranhas", termos: ["aranhas", "aranha"] },
  { id: "lacraias", nome: "Lacraias", termos: ["lacraias", "lacraia"] },
  { id: "besouros", nome: "Besouros", termos: ["besouros", "besouro"] },
  {
    id: "aquaticos",
    nome: "Aquáticos",
    termos: ["aquaticos", "aquatico", "marinhos", "marinho"],
  },
  { id: "anfibios", nome: "Anfíbios", termos: ["anfibios", "anfibio"] },
];

function IconeCategoria({ categoria }: { categoria: Categoria }) {
  return (
    <img
      src={imagensCategoria[categoria]}
      alt=""
      className="h-10 w-10 object-contain"
    />
  );
}

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
  { valor: "muitas patas", rotulo: "Muitas patas" },
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
  // Controla a rolagem automática dos resultados
  const resultadosRef = useRef<HTMLElement | null>(null);

  // Identifica cada pesquisa realizada
  const [buscaSolicitada, setBuscaSolicitada] = useState(0);
  const [categoriaAtiva, setCategoriaAtiva] = useState<Categoria | null>(null);
  const [caracteristicasAtivas, setCaracteristicasAtivas] = useState<
    Caracteristica[]
  >([]);
  const [outroFiltro, setOutroFiltro] = useState("");
  const [animalSelecionado, setAnimalSelecionado] =
    useState<AnimalEmergencia | null>(null);
  const [animalPendente, setAnimalPendente] = useState<AnimalEmergencia | null>(
    null,
  );

  // Recupera o animal fixado anteriormente
  const [animalFixadoId, setAnimalFixadoId] = useState<string | null>(() => {
    try {
      return localStorage.getItem("animalFixadoEmergencia");
    } catch {
      return null;
    }
  });

  // Encontra o animal correspondente no catálogo
  const animalFixado =
    animais.find((animal) => String(animal.id) === animalFixadoId) ?? null;

  // Mantém a fixação salva no aplicativo
  useEffect(() => {
    if (animalFixadoId) {
      localStorage.setItem("animalFixadoEmergencia", animalFixadoId);
    } else {
      localStorage.removeItem("animalFixadoEmergencia");
    }
  }, [animalFixadoId]);

  // Remove uma fixação que não existe mais no catálogo
  useEffect(() => {
    if (animalFixadoId && !animalFixado) {
      setAnimalFixadoId(null);
    }
  }, [animalFixadoId, animalFixado]);

  // Fixa um animal ou abre a confirmação para substituir o atual
  const fixarAnimal = (animal: AnimalEmergencia) => {
    if (animalFixadoId === String(animal.id)) {
      return;
    }

    if (animalFixado) {
      setAnimalPendente(animal);
      return;
    }

    setAnimalFixadoId(String(animal.id));
  };

  // Confirma a substituição
  const confirmarSubstituicao = () => {
    if (animalPendente) {
      setAnimalFixadoId(String(animalPendente.id));
      setAnimalPendente(null);
    }
  };

  // Cancela a substituição
  const cancelarSubstituicao = () => {
    setAnimalPendente(null);
  };

  // Limpa os filtros e a seleção ao sair do catálogo para a área de prevenção/checklist.
  const limparFiltros = () => {
    setPesquisa("");
    setCategoriaAtiva(null);
    setCaracteristicasAtivas([]);
    setOutroFiltro("");
    setAnimalSelecionado(null);
  };

  const resultados = useMemo(() => {
    const termo = normalizar(pesquisa);
    const termoOutro = normalizar(outroFiltro);

    return animais.filter((animal) => {
      const nomes = [animal.nome, ...(animal.nomesPopulares ?? [])].map(
        normalizar,
      );
      const categoriaNome = normalizar(animal.categoria);
      const descricaoAnimal = normalizar(animal.descricao ?? "");
      const sintomasAnimal = (animal.sinaisSintomas ?? []).map(normalizar);

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

      const caracteristicasAnimal = animal.caracteristicas ?? [];
      const correspondeCaracteristicas =
        caracteristicasAtivas.length === 0 ||
        caracteristicasAtivas.every((item) =>
          caracteristicasAnimal.includes(item),
        );

      // Filtro para o campo "Outros" (busca livre na descrição, nome ou sintomas)
      const correspondeOutro =
        !termoOutro ||
        nomes.some((n) => n.includes(termoOutro)) ||
        descricaoAnimal.includes(termoOutro) ||
        sintomasAnimal.some((s) => s.includes(termoOutro)) ||
        caracteristicasAnimal.some((c) => normalizar(c).includes(termoOutro));

      return (
        correspondeTexto &&
        correspondeCategoria &&
        correspondeCaracteristicas &&
        correspondeOutro
      );
    });
  }, [pesquisa, categoriaAtiva, caracteristicasAtivas, outroFiltro]);
    // Rola automaticamente até os animais encontrados
  useEffect(() => {
    if (buscaSolicitada > 0) {
      resultadosRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [buscaSolicitada]);

  // A pesquisa, a categoria e o checklist funcionam como filtros independentes.
  // Ao começar a usar um deles, os filtros dos outros dois são limpos.
  const limparChecklist = () => {
    setCaracteristicasAtivas([]);
    setOutroFiltro("");
  };

  const alterarPesquisa = (valor: string) => {
    setPesquisa(valor);
    if (valor.trim()) {
      setCategoriaAtiva(null);
      limparChecklist();
    }
  };
 
  const alternarCaracteristica = (valor: Caracteristica) => {
    // Limpa somente a pesquisa por texto.
    // Mantém a categoria selecionada.
    setPesquisa("");

    setCaracteristicasAtivas((atuais) =>
      atuais.includes(valor)
        ? atuais.filter((item) => item !== valor)
        : [...atuais, valor],
    );
  };

  const alterarOutroFiltro = (valor: string) => {
    // Mantém a categoria e as características selecionadas.
    setPesquisa("");
    setOutroFiltro(valor);
  };

  const selecionarCategoria = (id: Categoria) => {
    // Limpa somente a pesquisa por texto.
    // Preserva todas as características marcadas.
    setPesquisa("");

    // Seleciona ou desmarca a categoria.
    setCategoriaAtiva((atual) => (atual === id ? null : id));

    // Leva automaticamente até os resultados.
    setBuscaSolicitada((atual) => atual + 1);
  };

  return (
    <div className="min-h-screen w-full bg-verde-fundo font-sans text-[#171717] sm:flex sm:justify-center sm:pt-5">
    <div className="relative mx-auto flex min-h-screen w-full max-w-[1024px] flex-col overflow-hidden bg-verde-fundo shadow-xl sm:min-h-[844px] sm:rounded-[25px]">
      {/* Cabeçalho no mesmo estilo da tela Prevenção */}

        <header className="flex justify-between items-center px-4 pt-8 pb-4 bg-verde-fundo">
          <div className="min-w-0">
            <h1 className="text-[32px] font-extrabold leading-[34px] text-vermelho-principal">
              Atendimento de Emergência
            </h1>

            <p className="text-[12px] font-bold text-letra/75 uppercase tracking-wide mt-2">
              informação rápida, cuidado imediato
            </p>
          </div>

          {/* Logo */}
          <Logo />
        </header>

        <main className="flex-1 space-y-4 overflow-y-auto px-[18px] pb-40 pt-4">
          {/* Seletor de município e animal fixado */}
          <section className="space-y-3">
            <SeletorCidade variante="vermelho" />

            {animalFixado && (
              <div className="flex items-center justify-between gap-3 rounded-xl border border-[#bd0008] bg-white p-3 shadow-sm">
                <button
                  type="button"
                  onClick={() => setAnimalSelecionado(animalFixado)}
                  className="flex min-w-0 flex-1 items-center gap-2 text-left"
                >
                  <Pin
                    size={19}
                    className="shrink-0 text-[#bd0008]"
                    fill="currentColor"
                  />

                  <div className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase text-[#777]">
                      Animal fixado para identificação
                    </span>

                    <span className="block truncate text-[14px] font-bold text-[#bd0008]">
                      {animalFixado.nome}
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAnimalFixadoId(null)}
                  className="shrink-0 rounded-lg px-2 py-2 text-[11px] font-bold text-[#bd0008] hover:bg-[#ffecef]"
                >
                  Retirar
                </button>
              </div>
            )}
          </section>

          <UnidadesSoro
            detalhado
            variante="vermelho"
            compacto
        />

          <section className="space-y-2">
            <div className="flex items-start gap-2">
              <span
                className="-mt-1 text-[35px] leading-none text-[#c9000b]"
                aria-hidden="true"
              >
                ⌕
              </span>
              <div>
                <h2 className="text-[17px] font-bold">
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
              onSubmit={(event) => {
                event.preventDefault();

                if (pesquisa.trim()) {
                  setCategoriaAtiva(null);
                  limparChecklist();

                  // Solicita a pesquisa e a rolagem automática
                  setBuscaSolicitada((atual) => atual + 1);
                }
              }}
            >
              <input
                type="search"
                value={pesquisa}
                onChange={(event) => alterarPesquisa(event.target.value)}
                onKeyDown={(event) => {
                  // Ctrl + Espaço realiza a pesquisa
                  if (event.ctrlKey && event.code === "Space") {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
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
          <section>
            <h2 className="mb-2 flex items-center gap-2 text-[17px] font-bold">
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
              className="overflow-x-auto overflow-y-hidden rounded-xl p-3 pb-4"
              aria-label="Categorias de animais"
              style={{
                scrollbarWidth: "auto",
                scrollbarColor: "#ca1018 #ffecef",
              }}
            >
              <div className="flex w-max gap-2">
                {categorias.map((categoria) => {
                  const selecionada = categoriaAtiva === categoria.id;
                  return (
                    <button
                      key={categoria.id}
                      type="button"
                      aria-pressed={selecionada}
                      onClick={() => selecionarCategoria(categoria.id)}
                      className={`flex min-h-[100px] w-[100px] shrink-0 flex-col items-center justify-center gap-2 rounded-xl px-2 py-3 text-[12px] font-bold transition ${
                        selecionada
                          ? "bg-[#ca1018] text-white border border-[#bd0008] shadow-md shadow-vermelho-principal/50"
                          : "bg-[#ffecef] text-verde-principal border border-[#bd0008] shadow-sm shadow-verde-principal/35 hover:bg-vermelho-medio"
                      }`}
                    >
                      <span
                        className="flex h-12 w-12 items-center justify-center"
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
                className="mt-2 text-[12px] font-bold text-[#ca1018] underline"
              >
                Limpar categoria
              </button>
            )}
          </section>

          <section className="rounded-xl border border-[#bd0008] bg-[#ffecef] shadow-md shadow-vermelho-principal/40 p-3">
            <div className="mb-3 flex items-start gap-2">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#c50009] text-[14px] font-bold text-[#c50009]"
                aria-hidden="true"
              >
                ✓
              </span>
              <div>
                <h2 className="text-[15px] font-bold">
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
            </div>

            {/* Campo "Outros" idêntico ao modelo visual */}
            <div className="mt-2 flex min-h-[42px] items-center gap-2 rounded-xl bg-white px-3 py-2 text-[12px] text-[#292929] shadow-sm border border-transparent focus-within:ring-2 focus-within:ring-[#c9000b]">
              <input
                type="checkbox"
                checked={outroFiltro.length > 0}
                readOnly
                className="h-4 w-4 shrink-0 accent-[#c9000b]"
              />
              <span className="font-bold text-[#292929] shrink-0">Outros:</span>
              <input
                type="text"
                value={outroFiltro}
                onChange={(e) => alterarOutroFiltro(e.target.value)}
                placeholder="Digite aqui outra característica..."
                className="w-full bg-transparent outline-none text-[12px] text-[#292929]"
              />
            </div>

            <p className="mt-2 text-[11px] text-letra/70">
              Selecione os sinais identificados ou digite outra característica
              do animal.
            </p>

            {(caracteristicasAtivas.length > 0 || outroFiltro.length > 0) && (
              <button
                type="button"
                onClick={() => {
                  setCaracteristicasAtivas([]);
                  setOutroFiltro("");
                }}
                className="mt-3 text-[12px] font-bold text-[#ca1018] underline"
              >
                Limpar características
              </button>
            )}
          </section>

          <section 
          ref={resultadosRef}
          className="scroll-mt-4">
            <div className="mb-2 flex items-center gap-2">
              <h2 className="flex-1 text-[15px] font-bold">
                Possíveis animais encontrados
              </h2>
              <span className="rounded-md bg-[#ffd3d6] px-2 py-1 text-[9px] border border-vermelho font-bold text-vermelho">
                Resultados da busca
              </span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ca1018] px-2 text-[10px] border border-vermelho font-bold text-white">
                {resultados.length}
              </span>
            </div>
            <div
              className="flex min-h-[400px] flex-col overflow-y-auto gap-[10px] p-2"
              aria-live="polite"
            >
              {resultados.length > 0 ? (
                resultados.map((animal) => (
                  <CardAnimal
                    key={animal.id}
                    animal={animal}
                    onClick={() => setAnimalSelecionado(animal)}
                    onFixar={() => fixarAnimal(animal)}
                    fixado={animalFixadoId === String(animal.id)}
                    mostrarDescricao={false}
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

          <a
            href="tel:192"
            className="fixed bottom-[68px] left-4 right-4 mx-auto max-w-[600px] z-30 bg-vermelho-emergencia drop-shadow-[0px_4px_6px_rgba(220,38,38,0.25)] h-[56px] rounded-[16px] flex items-center justify-center gap-[12px] text-white font-bold text-[16px] hover:bg-vermelho-principal/90 transition-colors"
          >
            <Phone className="size-[20px]" strokeWidth={3} aria-hidden="true" />
            Emergência · Chamar SAMU (192)
          </a>
        </main>

        <BottomNav
          abaAtiva={abaAtiva}
          setAbaAtiva={(novaAba) => {
            if (novaAba === "prevencao") {
              limparFiltros();
            }
            setAbaAtiva(novaAba);
          }}
        />

        <ModalDetalhes
          animal={animalSelecionado}
          onClose={() => setAnimalSelecionado(null)}
        />
        {/* Confirmação para substituir animal fixado */}
        {animalPendente && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-5">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="titulo-confirmacao"
              className="w-full max-w-[380px] rounded-2xl border-2 border-[#bd0008] bg-[#ffecef] p-5 shadow-xl"
            >
              <h2
                id="titulo-confirmacao"
                className="mb-3 text-[18px] font-extrabold text-[#bd0008]"
              >
                Substituir animal fixado?
              </h2>

              <p className="mb-5 text-[14px] leading-relaxed text-[#292929]">
                O animal {animalFixado?.nome} já está fixado. Deseja
                substituí-lo por {animalPendente.nome}?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={cancelarSubstituicao}
                  className="rounded-xl border border-[#bd0008] bg-white px-5 py-2.5 text-[13px] font-bold text-[#bd0008] transition hover:bg-[#ffe0e4]"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={confirmarSubstituicao}
                  className="rounded-xl bg-[#bd0008] px-6 py-2.5 text-[13px] font-bold text-white transition hover:bg-[#900006]"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}