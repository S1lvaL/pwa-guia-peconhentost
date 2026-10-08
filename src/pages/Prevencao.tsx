import { useState } from "react";

type Area = "casa" | "campo" | "trilha" | "mar";

//Mudar as informações de prevenção de acordo com a área selecionada (casa, campo, trilha, mar e geral)
const dadosPrevencao = {
  geral: [
    "Sacuda roupas e calçados antes de usá-los para certificar-se de que não há animais.",
    "Use calçado fechado e perneiras em áreas de mato.",
    "Evite colocar as mãos diretamente em buracos, sob pedras ou troncos podres.",
    "Mantenha o quintal limpo e evite o acúmulo de entulhos ou lixo doméstico.",
    "Não mexa em pilhas de tijolos, telhas ou lenha sem calçados e luvas de proteção.",
    "Vede frestas e buracos em paredes, portas e pisos para evitar pontos de abrigo.",
  ],
  casa: {
    domestica: [
      "Mantenha o quintal limpo e evite o acúmulo de entulhos ou lixo doméstico.",
      "Sacuda roupas e calçados antes de usá-los para certificar-se de que não há animais.",
      "Vede frestas e buracos em paredes, portas e pisos para evitar pontos de abrigo.",
    ],
    evite: [
      "Evite colocar as mãos diretamente em buracos, sob pedras ou troncos podres.",
      "Não mexa em pilhas de tijolos, telhas ou lenha sem calçados e luvas de proteção.",
    ],
  },
  campo: {
    domestica: [
      "Use botas de cano alto e luvas de couro durante o trabalho no campo.",
      "Mantenha a vegetação ao redor da residência baixa e roçada.",
    ],
    evite: [
      "Evite acúmulo de palha, grãos e materiais que atraiam roedores.",
      "Não manuseie vegetação alta sem equipamentos de proteção adequados.",
    ],
  },
  trilha: {
    domestica: [
      "Caminhe sempre usando calçados fechados e perneiras.",
      "Mantenha-se na trilha demarcada e evite áreas não exploradas.",
    ],
    evite: [
      "Evite tocar em troncos ocos ou rochas sem olhar previamente.",
      "Não caminhe à noite em trilhas sem iluminação adequada.",
    ],
  },
  mar: {
    domestica: [
      "Consulte os moradores ou salva-vidas locais sobre áreas de risco.",
      "Arraste os pés ao caminhar no raso em praias de fundo arenoso.",
    ],
    evite: [
      "Evite tocar em animais marinhos, como caravelas, águas-vivas e raias.",
      "Não entre na água em locais com sinalização de perigo.",
    ],
  },
};

const AREAS: { id: Area; rotulo: string }[] = [
  { id: "casa", rotulo: "Casa" },
  { id: "campo", rotulo: "Campo" },
  { id: "trilha", rotulo: "Trilha" },
  { id: "mar", rotulo: "Mar" },
];

//Só para o layout: depois estes dados virão da localização / do animais.json
const animaisExemplo = [
  {
    id: "escorpiao-amarelo",
    nome: "Escorpião-Amarelo",
    foto: "/imagens/escorpiao-amarelo.jpg",
  },
  { id: "jararaca", nome: "Jararaca", foto: "/imagens/jararaca.jpg" },
];

/* ---------- Ícones dos chips ---------- */
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
    case "campo": // ramo de trigo
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
    case "trilha": // caminhante com mochila e bastão
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

/* ---------- Item do checklist (antes estava repetido 3x) ---------- */
function ItemCheck({
  texto,
  marcado,
  onToggle,
}: {
  texto: string;
  marcado: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="bg-[#a9f69a]/80 border border-[#0e3d10] p-4 rounded-[16px] flex items-center space-x-4 cursor-pointer shadow-md shadow-[#0e3d10]/25 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#0e3d10]">
      <input
        type="checkbox"
        checked={marcado}
        onChange={onToggle}
        className="sr-only"
      />
      <span
        aria-hidden
        className={`w-6 h-6 rounded-[6px] border-2 flex items-center justify-center shrink-0 text-[14px] font-extrabold ${
          marcado
            ? "border-[#0e3d10] bg-[#0e3d10] text-white"
            : "border-[#0e3d10] bg-white"
        }`}
      >
        {marcado && "✓"}
      </span>
      <span
        className={`text-[14px] font-medium text-[#1f2937] leading-snug flex-1 ${
          marcado ? "line-through opacity-60" : ""
        }`}
      >
        {texto}
      </span>
    </label>
  );
}

function TituloSecao({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-1 h-5 bg-[#0e3d10] rounded-sm" />
      <h3 className="text-[16px] font-bold text-[#0e3d10]">{children}</h3>
    </div>
  );
}

export default function Prevencao() {
  //Estado inicial como null (nenhum filtro selecionado = dicas gerais)
  const [areaAtiva, setAreaAtiva] = useState<Area | null>(null);
  const [itensChecados, setItensChecados] = useState<Record<string, boolean>>(
    {},
  );

  const toggleCheck = (item: string) =>
    setItensChecados((prev) => ({ ...prev, [item]: !prev[item] }));

  //Cálculo de progresso (somente ativo quando um filtro for escolhido)
  const areaSelecionada = areaAtiva ? dadosPrevencao[areaAtiva] : null;
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
        {/* Header */}
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

        {/* Barra de localização (por enquanto fixa, só o visual) */}
        <div className="flex items-center gap-1.5 bg-[#a9f69a]/50 border border-verde-principal rounded-[16px] px-3 py-2 text-[13px] text-[#0e3d10]">
          <span aria-hidden>📍</span>
          <span className="flex-1">
            Sua localização atual: <strong>Salvador - BA</strong>
          </span>
          <button type="button" className="font-bold underline">
            [Alterar]
          </button>
        </div>

        {/* Card principal: animais da região (por enquanto dados de exemplo) */}
        <section className="bg-[#a9f69a]/70 border border-verde-principal p-4 rounded-[24px] space-y-3 shadow-md shadow-verde-principal/40">
          <h2 className="text-[18px] font-bold text-[#0e3d10] leading-tight">
            Animais Peçonhentos Frequentes nesta Região
          </h2>
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1">
            {animaisExemplo.map((animal) => (
              <article
                key={animal.id}
                className="snap-start shrink-0 w-[210px] flex items-center gap-2 bg-verde-fundo border border-[#0e3d10] rounded-[16px] p-2"
              >
                <img
                  src={animal.foto}
                  alt={animal.nome}
                  loading="lazy"
                  className="w-[52px] h-[52px] rounded-[12px] object-cover bg-[#c0d1bd]"
                />
                <div className="min-w-0">
                  <strong className="block text-[13px] text-[#0e3d10] truncate">
                    {animal.nome}
                  </strong>
                  <button
                    type="button"
                    className="text-[12px] text-verde-principal underline"
                  >
                    Ver no Catálogo
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Filtros */}
        <div className="space-y-3">
          <h2 className="text-[18px] font-bold text-[#0e3d10] leading-tight">
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
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[14px] font-bold transition border border-[#0e3d10] shrink-0 ${
                    isActive
                      ? "bg-[#0e3d10] text-white shadow-md shadow-[#0e3d10]/40"
                      : "bg-[#a9f69a] text-[#0e3d10] shadow-md shadow-[#0e3d10]/20"
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
                        ? "bg-[#0e3d10]"
                        : "bg-[#c0d1bd]"
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[11px] text-[#6b7280]">
                <span className="font-semibold">Progresso do plano</span>
                <span className="font-bold">{porcentagem}% concluído</span>
              </div>
            </div>
          )}
        </div>

        {/* Checklist */}
        {!areaSelecionada ? (
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
              <TituloSecao>Evite</TituloSecao>
              <div className="space-y-2">
                {areaSelecionada.evite.map((item) => (
                  <ItemCheck
                    key={item}
                    texto={item}
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
import { useState } from "react";


// ============================================================
// TIPOS
// ============================================================

type Categoria =
  | "escorpioes"
  | "cobras"
  | "aranhas"
  | "lacraias";


// ============================================================
// DADOS DOS ANIMAIS
// ============================================================

const animais = [
  {
    id: "surucucu",
    nome: "Surucucu pico de jaca",
    categoria: "cobras" as Categoria,
    descricao: "Ver esta para colocar aqui",
    foto: "/imagens/surucucu.jpg",
  },

  {
    id: "jararaca-seca",
    nome: "Jararaca da seca",
    categoria: "cobras" as Categoria,
    descricao: "Ver esta para colocar aqui",
    foto: "/imagens/jararaca.jpg",
  },

  {
    id: "escorpiao-amarelo",
    nome: "Escorpião-Amarelo",
    categoria: "escorpioes" as Categoria,
    descricao: "Ver informações sobre este animal",
    foto: "/imagens/escorpiao-amarelo.jpg",
  },

  {
    id: "aranha-marrom",
    nome: "Aranha-marrom",
    categoria: "aranhas" as Categoria,
    descricao: "Ver informações sobre este animal",
    foto: "/imagens/aranha-marrom.jpg",
  },

  {
    id: "lacraia",
    nome: "Lacraia",
    categoria: "lacraias" as Categoria,
    descricao: "Ver informações sobre este animal",
    foto: "/imagens/lacraia.jpg",
  },
];


// ============================================================
// CATEGORIAS
// ============================================================

const categorias = [
  {
    id: "escorpioes" as Categoria,
    nome: "Escorpiões",
    icone: "🦂",
  },

  {
    id: "cobras" as Categoria,
    nome: "Cobras",
    icone: "🐍",
  },

  {
    id: "aranhas" as Categoria,
    nome: "Aranhas",
    icone: "🕷️",
  },

  {
    id: "lacraias" as Categoria,
    nome: "Lacraias",
    icone: "🪱",
  },
];


// ============================================================
// CARACTERÍSTICAS
// ============================================================

const caracteristicas = [
  "Presença de ferrão",
  "Tamanho pequeno",
  "Muitas pernas",
  "Ambiente aquático",
  "Padrão de manchas",
  "Ambiente terrestre",
  "Tamanho grande",
  "Dor na picada ou contato",
];


// ============================================================
// COMPONENTE CHECKBOX
// ============================================================

function CaracteristicaCheck({
  texto,
  marcado,
  onToggle,
}: {
  texto: string;
  marcado: boolean;
  onToggle: () => void;
}) {

  return (

    <label
      className="
        bg-white
        rounded-[10px]
        min-h-[30px]
        px-2
        py-1
        flex
        items-center
        gap-1.5
        text-[8px]
        cursor-pointer
        select-none
        transition
        hover:bg-[#fff7f8]
      "
    >

      <input
        type="checkbox"
        checked={marcado}
        onChange={onToggle}
        className="sr-only"
      />


      <span
        className={`
          w-[17px]
          h-[17px]
          rounded-[2px]
          border
          flex
          items-center
          justify-center
          shrink-0
          text-[12px]
          font-bold

          ${
            marcado
              ? "bg-[#c9000b] border-[#c9000b] text-white"
              : "bg-white border-gray-300"
          }
        `}
      >

        {marcado && "✓"}

      </span>


      <span>
        {texto}
      </span>

    </label>
  );
}


// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

export default function Emergencia() {


  // ==========================================================
  // ESTADOS
  // ==========================================================

  const [pesquisa, setPesquisa] =
    useState("");


  const [categoriaAtiva, setCategoriaAtiva] =
    useState<Categoria | null>(null);


  const [caracteristicasMarcadas, setCaracteristicasMarcadas] =
    useState<Record<string, boolean>>({
      "Padrão de manchas": true,
      "Tamanho grande": true,
    });



  // ==========================================================
  // MARCAR / DESMARCAR CARACTERÍSTICAS
  // ==========================================================

  const alterarCaracteristica = (
    nome: string,
  ) => {

    setCaracteristicasMarcadas(
      (anterior) => ({
        ...anterior,
        [nome]: !anterior[nome],
      }),
    );
  };



  // ==========================================================
  // PESQUISA DOS ANIMAIS
  // ==========================================================

  const animaisFiltrados =
    animais.filter((animal) => {


      const textoPesquisa =
        pesquisa
          .toLowerCase()
          .trim();


      const correspondePesquisa =
        textoPesquisa === "" ||
        animal.nome
          .toLowerCase()
          .includes(textoPesquisa) ||
        animal.categoria
          .toLowerCase()
          .includes(textoPesquisa);


      const correspondeCategoria =
        categoriaAtiva === null ||
        animal.categoria === categoriaAtiva;


      return (
        correspondePesquisa &&
        correspondeCategoria
      );

    });



  // ==========================================================
  // SELECIONAR CATEGORIA
  // ==========================================================

  const selecionarCategoria = (
    categoria: Categoria,
  ) => {

    if (categoriaAtiva === categoria) {

      setCategoriaAtiva(null);

    } else {

      setCategoriaAtiva(categoria);

    }

  };



  // ==========================================================
  // VISUAL DA TELA
  // ==========================================================

  return (

    <div
      className="
        bg-white
        min-h-screen
        flex
        flex-col
        w-full
        max-w-full
        mx-auto
        overflow-y-auto
        pb-20
      "
    >


      {/* =====================================================
          CABEÇALHO
      ====================================================== */}

      <header
        className="
          bg-[#ca1018]
          text-white
          px-5
          py-3
          flex
          items-center
          gap-3
          shrink-0
        "
      >


        {/* ÍCONE DE ALERTA */}

        <div
          className="
            w-[44px]
            h-[44px]
            border-2
            border-white
            flex
            items-center
            justify-center
            text-[28px]
            font-bold
            shrink-0
          "
        >
          !
        </div>



        {/* TÍTULO */}

        <div
          className="
            leading-[1.05]
          "
        >

          <span
            className="
              block
              text-[17px]
              font-semibold
            "
          >
            Atendimento de
          </span>

          <strong
            className="
              block
              text-[23px]
              font-extrabold
            "
          >
            Emergência
          </strong>

        </div>


      </header>



      {/* =====================================================
          CONTEÚDO
      ====================================================== */}

      <main
        className="
          p-4
          space-y-4
          flex-1
        "
      >


        {/* ===================================================
            PESQUISA
        ==================================================== */}

        <section>

          <div
            className="
              flex
              items-start
              gap-2
            "
          >

            {/* LUPA */}

            <div
              className="
                text-[#c9000b]
                text-[38px]
                leading-[32px]
                shrink-0
              "
            >
              ⌕
            </div>


            <div>

              <h2
                className="
                  text-[13px]
                  font-bold
                  text-[#171717]
                "
              >
                Pesquise o animal ou o grupo
              </h2>


              <p
                className="
                  text-[8px]
                  text-gray-600
                  leading-[1.3]
                "
              >
                Digite o nome do animal ou selecione
                uma categoria abaixo para encontrar
                informações e características.
              </p>

            </div>

          </div>



          {/* BARRA DE PESQUISA */}

          <div
            className="
              flex
              h-[29px]
              mt-2
              border
              border-gray-300
              rounded-[5px]
              overflow-hidden
              bg-white
            "
          >

            <input
              type="text"
              value={pesquisa}
              onChange={(e) =>
                setPesquisa(e.target.value)
              }
              placeholder="Ex.: aranha marrom, cascavel, escorpião..."
              className="
                flex-1
                min-w-0
                outline-none
                px-2
                text-[8px]
                text-gray-700
              "
            />


            <button
              type="button"
              onClick={() => {
                // A pesquisa já acontece automaticamente
                // enquanto o usuário digita.
              }}
              className="
                bg-[#bd0008]
                text-white
                px-3
                text-[8px]
                font-bold
                hover:bg-[#990006]
                transition
              "
            >
              Pesquisar →
            </button>

          </div>

        </section>



        {/* ===================================================
            CATEGORIAS
        ==================================================== */}

        <section>

          <h2
            className="
              text-[13px]
              font-bold
              mb-2
              flex
              items-center
              gap-2
            "
          >

            <span
              className="
                text-[#c50009]
                text-[21px]
                leading-none
              "
            >
              ▦
            </span>

            Selecione uma categoria

          </h2>



          <div
            className="
              grid
              grid-cols-4
              gap-2
            "
          >

            {categorias.map(
              (categoria) => {

                const selecionada =
                  categoriaAtiva ===
                  categoria.id;


                return (

                  <button
                    key={categoria.id}
                    type="button"
                    onClick={() =>
                      selecionarCategoria(
                        categoria.id,
                      )
                    }
                    className={`
                      h-[62px]
                      rounded-[8px]
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-0.5
                      font-bold
                      text-[9px]
                      transition-all

                      ${
                        selecionada
                          ? "bg-[#c9000b] text-white shadow-md"
                          : "bg-[#ffd9dc] text-[#4d0b0d]"
                      }
                    `}
                  >

                    <span
                      className="
                        text-[25px]
                        leading-[25px]
                      "
                    >
                      {categoria.icone}
                    </span>


                    <span>
                      {categoria.nome}
                    </span>

                  </button>

                );

              },
            )}

          </div>


        </section>



        {/* ===================================================
            POSSÍVEIS SINAIS
        ==================================================== */}

        <section
          className="
            bg-[#ffecef]
            rounded-[10px]
            p-2.5
          "
        >


          {/* TÍTULO */}

          <div
            className="
              flex
              items-start
              gap-1.5
              mb-2
            "
          >


            {/* ÍCONE */}

            <div
              className="
                w-[22px]
                h-[22px]
                rounded-full
                border-2
                border-[#c50009]
                text-[#c50009]
                flex
                items-center
                justify-center
                text-[14px]
                font-bold
                shrink-0
              "
            >
              ✓
            </div>


            <div>

              <h2
                className="
                  text-[12px]
                  font-bold
                  leading-tight
                "
              >
                Possíveis sinais e características
              </h2>


              <p
                className="
                  text-[8px]
                  text-gray-600
                  mt-0.5
                "
              >
                Marque as opções que podem ajudar
                a identificar o animal:
              </p>

            </div>

          </div>



          {/* CHECKBOXES */}

          <div
            className="
              grid
              grid-cols-2
              gap-2
            "
          >

            {caracteristicas.map(
              (caracteristica) => (

                <CaracteristicaCheck
                  key={caracteristica}
                  texto={caracteristica}
                  marcado={
                    !!caracteristicasMarcadas[
                      caracteristica
                    ]
                  }
                  onToggle={() =>
                    alterarCaracteristica(
                      caracteristica,
                    )
                  }
                />

              ),
            )}

          </div>


        </section>



        {/* ===================================================
            POSSÍVEIS ANIMAIS ENCONTRADOS
        ==================================================== */}

        <section>


          {/* TÍTULO */}

          <div
            className="
              flex
              items-center
              gap-1
              mb-2
            "
          >

            <h2
              className="
                text-[12px]
                font-bold
                flex-1
              "
            >
              🐾 Possíveis animais encontrados
            </h2>


            <span
              className="
                bg-[#ffd3d6]
                text-[#a60008]
                rounded-[8px]
                px-1.5
                py-1
                text-[5px]
                font-bold
              "
            >
              Resultados da busca
            </span>


            <span
              className="
                w-[15px]
                h-[15px]
                rounded-full
                bg-[#c80009]
                text-white
                flex
                items-center
                justify-center
                text-[7px]
                font-bold
              "
            >
              {animaisFiltrados.length}
            </span>

          </div>



          {/* =================================================
              LISTA DE ANIMAIS
          ================================================== */}

          <div className="space-y-1">


            {animaisFiltrados.length === 0 ? (

              <div
                className="
                  py-5
                  text-center
                  text-[11px]
                  text-gray-500
                "
              >
                Nenhum animal encontrado.
              </div>

            ) : (

              animaisFiltrados.map(
                (animal) => (

                  <button
                    key={animal.id}
                    type="button"
                    onClick={() => {

                      alert(
                        `Você selecionou ${animal.nome}.`
                      );

                    }}
                    className="
                      w-full
                      h-[44px]
                      flex
                      items-center
                      text-left
                      border-b
                      border-gray-200
                      hover:bg-[#fff5f5]
                      transition
                    "
                  >


                    {/* FOTO */}

                    <div
                      className="
                        w-[65px]
                        h-[37px]
                        rounded-[6px]
                        overflow-hidden
                        bg-[#c5a274]
                        mr-2
                        shrink-0
                      "
                    >

                      <img
                        src={animal.foto}
                        alt={animal.nome}
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />

                    </div>



                    {/* INFORMAÇÕES */}

                    <div
                      className="
                        min-w-0
                        flex-1
                      "
                    >

                      <h3
                        className="
                          text-[10px]
                          font-bold
                          truncate
                        "
                      >
                        {animal.nome}
                      </h3>


                      <p
                        className="
                          text-[7px]
                          text-gray-500
                          truncate
                        "
                      >
                        {animal.descricao}
                      </p>

                    </div>


                  </button>

                ),
              )

            )}

          </div>



          {/* =================================================
              BOTÃO SAMU
          ================================================== */}

          <a
            href="tel:192"
            className="
              w-[145px]
              h-[39px]
              bg-[#d0000b]
              text-white
              rounded-[9px]
              flex
              items-center
              gap-1.5
              px-2
              ml-auto
              mt-1
              shadow-md
              hover:bg-[#a90008]
              transition
            "
          >


            {/* TELEFONE */}

            <div
              className="
                w-[25px]
                h-[25px]
                bg-white
                text-[#d0000b]
                rounded-full
                flex
                items-center
                justify-center
                text-[13px]
                shrink-0
              "
            >
              ☎
            </div>


            {/* TEXTO */}

            <div>

              <strong
                className="
                  block
                  text-[6px]
                  leading-tight
                "
              >
                LIGUE PARA O
              </strong>


              <strong
                className="
                  block
                  text-[11px]
                  leading-tight
                "
              >
                SAMU 192
              </strong>

            </div>


          </a>


        </section>


      </main>



      {/* =====================================================
          MENU INFERIOR
      ====================================================== */}

      <nav
        className="
          fixed
          bottom-0
          left-0
          right-0
          mx-auto
          w-full
          max-w-[390px]
          h-[58px]
          bg-white
          border-t
          border-gray-200
          grid
          grid-cols-3
          z-50
        "
      >


        {/* PREVENÇÃO */}

        <button
          type="button"
          onClick={() => {
            console.log(
              "Abrir tela de Prevenção",
            );
          }}
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-0.5
            text-[#626a72]
            text-[8px]
            font-bold
          "
        >

          <span
            className="
              text-[21px]
              leading-[21px]
            "
          >
            🛡️
          </span>

          Prevenção

        </button>



        {/* EMERGÊNCIA */}

        <button
          type="button"
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-0.5
            text-[#c9000b]
            text-[8px]
            font-bold
          "
        >

          <span
            className="
              text-[26px]
              leading-[21px]
            "
          >
            ✚
          </span>

          Emergência

        </button>



        {/* ANIMAIS */}

        <button
          type="button"
          onClick={() => {
            console.log(
              "Abrir tela de Animais",
            );
          }}
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-0.5
            text-[#626a72]
            text-[8px]
            font-bold
          "
        >

          <span
            className="
              text-[21px]
              leading-[21px]
            "
          >
            🐾
          </span>

          Animais

        </button>


      </nav>


    </div>
  );
}