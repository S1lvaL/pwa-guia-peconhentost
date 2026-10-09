import { useMemo, useState } from "react";

type Categoria = "escorpioes" | "cobras" | "aranhas" | "lacraias" | "besouros";
type Caracteristica =
  | "ferrão"
  | "pequeno"
  | "muitas pernas"
  | "aquático"
  | "manchas"
  | "terrestre"
  | "grande"
  | "picada";

type Animal = {
  id: string;
  nome: string;
  categoria: Categoria;
  emoji: string;
  descricao: string;
  caracteristicas: Caracteristica[];
};

const categorias: { id: Categoria; nome: string; emoji: string }[] = [
  { id: "escorpioes", nome: "Escorpiões", emoji: "🦂" },
  { id: "cobras", nome: "Cobras", emoji: "🐍" },
  { id: "aranhas", nome: "Aranhas", emoji: "🕷️" },
  { id: "lacraias", nome: "Lacraias", emoji: "🪱" },
  { id: "besouros", nome: "Besouros", emoji: "🪲" },
];

const animais: Animal[] = [
  {
    id: "surucucu-pico-de-jaca",
    nome: "Surucucu-pico-de-jaca",
    categoria: "cobras",
    emoji: "🐍",
    descricao:
      "Serpente peçonhenta; mantenha distância e não tente capturá-la.",
    caracteristicas: ["grande", "terrestre", "picada"],
  },
  {
    id: "jararaca-da-seca",
    nome: "Jararaca",
    categoria: "cobras",
    emoji: "🐍",
    descricao:
      "Serpente peçonhenta; evite aproximação e procure ajuda em caso de acidente.",
    caracteristicas: ["manchas", "terrestre", "picada"],
  },
  {
    id: "escorpiao-amarelo",
    nome: "Escorpião-amarelo",
    categoria: "escorpioes",
    emoji: "🦂",
    descricao: "Pode se abrigar em locais escuros, entulhos e calçados.",
    caracteristicas: ["ferrão", "pequeno", "terrestre", "picada"],
  },
  {
    id: "aranha-marrom",
    nome: "Aranha-marrom",
    categoria: "aranhas",
    emoji: "🕷️",
    descricao:
      "Pode se esconder em roupas, caixas e locais pouco movimentados.",
    caracteristicas: ["pequeno", "terrestre", "picada"],
  },
  {
    id: "lacraia",
    nome: "Lacraia",
    categoria: "lacraias",
    emoji: "🪱",
    descricao: "Tem muitos segmentos e pernas; não manuseie o animal.",
    caracteristicas: ["muitas pernas", "terrestre", "picada"],
  },
  {
    id: "besouro",
    nome: "Besouro",
    categoria: "besouros",
    emoji: "🪲",
    descricao:
      "Não toque em animais desconhecidos; a identificação deve ser feita com segurança.",
    caracteristicas: ["pequeno", "terrestre"],
  },
];

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

export default function Emergencia() {
  const [pesquisa, setPesquisa] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState<Categoria | null>(null);
  const [caracteristicasAtivas, setCaracteristicasAtivas] = useState<
    Caracteristica[]
  >([]);
  const [animalSelecionado, setAnimalSelecionado] = useState<Animal | null>(
    null,
  );
  const [paginaAtiva, setPaginaAtiva] = useState("emergencia");

  const resultados = useMemo(() => {
    const termo = pesquisa.trim().toLocaleLowerCase("pt-BR");
    return animais.filter((animal) => {
      const correspondeTexto =
        !termo ||
        animal.nome.toLocaleLowerCase("pt-BR").includes(termo) ||
        animal.categoria.includes(termo as Categoria) ||
        categorias
          .find((categoria) => categoria.id === animal.categoria)
          ?.nome.toLocaleLowerCase("pt-BR")
          .includes(termo);
      const correspondeCategoria =
        !categoriaAtiva || animal.categoria === categoriaAtiva;
      const correspondeCaracteristicas = caracteristicasAtivas.every((item) =>
        animal.caracteristicas.includes(item),
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
    <div className="min-h-screen w-full bg-[#eeeeee] font-sans text-[#171717] sm:flex sm:justify-center sm:pt-5">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[390px] flex-col overflow-hidden bg-white shadow-xl sm:min-h-[844px] sm:rounded-[25px]">
        {/* Cabeçalho */}
        <header className="flex min-h-[82px] items-center gap-3 bg-[#ca1018] px-5 py-3 text-white">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center"
            aria-hidden="true"
          >
            <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
              <path
                d="M24 4 45 42H3L24 4Z"
                stroke="white"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <path
                d="M24 16V28"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="24" cy="35" r="2.2" fill="white" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[16px] font-semibold">Atendimento de</span>
            <h1 className="text-[23px] font-extrabold">Emergência</h1>
          </div>
        </header>

        <main className="flex-1 space-y-4 overflow-y-auto px-[18px] pb-24 pt-4">
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
                <h2 className="text-[14px] font-bold">
                  Pesquise o animal ou o grupo
                </h2>
                <p className="mt-1 text-[11px] leading-snug text-[#555]">
                  Digite o nome do animal ou selecione uma categoria para
                  encontrar informações e características.
                </p>
              </div>
            </div>
            <form
              className="flex h-10 overflow-hidden rounded-lg border border-[#d4d4d4] focus-within:ring-2 focus-within:ring-[#c9000b]/30"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="search"
                value={pesquisa}
                onChange={(event) => setPesquisa(event.target.value)}
                placeholder="Ex.: aranha-marrom, cascavel, escorpião..."
                aria-label="Pesquisar animal ou grupo"
                className="min-w-0 flex-1 px-3 text-[12px] outline-none"
              />
              <button
                type="submit"
                className="bg-[#bd0008] px-3 text-[11px] font-bold text-white transition hover:bg-[#900006]"
              >
                Pesquisar →
              </button>
            </form>
          </section>

          {/* Categorias com rolagem */}
          <section>
            <h2 className="mb-2 flex items-center gap-2 text-[14px] font-bold">
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
              className="overflow-x-auto overflow-y-hidden rounded-xl border border-[#f0b9bd] bg-[#fff7f8] p-2"
              aria-label="Categorias de animais"
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
                      className={`flex min-h-[70px] w-[92px] shrink-0 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-[10px] font-bold transition ${
                        selecionada
                          ? "bg-[#c9000b] text-white shadow-md"
                          : "bg-[#ffd9dc] text-[#4d0b0d] hover:bg-[#ffc4c9]"
                      }`}
                    >
                      <span
                        className="text-[25px] leading-7"
                        aria-hidden="true"
                      >
                        {categoria.emoji}
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
                className="mt-2 text-[11px] font-semibold text-[#b00008] underline"
              >
                Limpar categoria
              </button>
            )}
          </section>

          {/* Características */}
          <section className="rounded-xl bg-[#ffecef] p-3">
            <div className="mb-3 flex items-start gap-2">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#c50009] text-[14px] font-bold text-[#c50009]"
                aria-hidden="true"
              >
                ✓
              </span>
              <div>
                <h2 className="text-[13px] font-bold">
                  Possíveis sinais e características
                </h2>
                <p className="mt-1 text-[10px] text-[#555]">
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
            {caracteristicasAtivas.length > 0 && (
              <button
                type="button"
                onClick={() => setCaracteristicasAtivas([])}
                className="mt-3 text-[11px] font-semibold text-[#b00008] underline"
              >
                Limpar características
              </button>
            )}
          </section>

          {/* Resultados com rolagem */}
          <section>
            <div className="mb-2 flex items-center gap-2">
              <h2 className="flex-1 text-[13px] font-bold">
                🐾 Possíveis animais encontrados
              </h2>
              <span className="rounded-md bg-[#ffd3d6] px-2 py-1 text-[9px] font-bold text-[#a60008]">
                Resultados da busca
              </span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c80009] px-1 text-[10px] font-bold text-white">
                {resultados.length}
              </span>
            </div>
            <div
              className="max-h-[230px] overflow-y-auto rounded-lg border border-[#e5e5e5] px-2"
              aria-live="polite"
            >
              {resultados.length > 0 ? (
                resultados.map((animal) => (
                  <button
                    key={animal.id}
                    type="button"
                    onClick={() => setAnimalSelecionado(animal)}
                    className="flex min-h-[62px] w-full items-center border-b border-[#e5e5e5] py-2 text-left transition last:border-b-0 hover:bg-[#fff1f2]"
                  >
                    <span
                      className="mr-3 flex h-11 w-[58px] shrink-0 items-center justify-center rounded-lg bg-[#f4e4e4] text-[29px]"
                      aria-hidden="true"
                    >
                      {animal.emoji}
                    </span>
                    <span className="min-w-0 flex-1">
                      <strong className="block text-[12px]">
                        {animal.nome}
                      </strong>
                      <span className="mt-1 block text-[10px] leading-snug text-[#555]">
                        {animal.descricao}
                      </span>
                    </span>
                    <span
                      className="pl-2 text-[18px] text-[#c9000b]"
                      aria-hidden="true"
                    >
                      ›
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-2 py-5 text-center text-[12px] text-[#555]">
                  Nenhum animal encontrado. Tente alterar a pesquisa ou os
                  filtros.
                </p>
              )}
            </div>
          </section>

          {/* SAMU */}
          <a
            href="tel:192"
            className="ml-auto flex min-h-[48px] w-[175px] items-center gap-3 rounded-xl bg-[#d0000b] px-3 py-2 text-white shadow-md transition hover:scale-[1.02] hover:bg-[#a90008]"
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[18px] text-[#d0000b]"
              aria-hidden="true"
            >
              ☎
            </span>
            <span>
              <strong className="block text-[9px]">LIGUE PARA O</strong>
              <span className="text-[15px] font-extrabold">SAMU 192</span>
            </span>
          </a>
        </main>

        {/* Menu inferior */}
        <nav className="absolute bottom-0 left-0 z-10 grid h-[62px] w-full grid-cols-3 border-t border-[#ddd] bg-white">
          {[
            { id: "prevencao", nome: "Prevenção", icone: "🛡️" },
            { id: "emergencia", nome: "Emergência", icone: "✚" },
            { id: "animais", nome: "Animais", icone: "🐾" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setPaginaAtiva(item.id);
                if (item.id !== "emergencia") {
                  window.alert(
                    item.id === "prevencao"
                      ? "Abrindo o Sistema de Prevenção..."
                      : "Abrindo catálogo de animais...",
                  );
                }
              }}
              className={`flex flex-col items-center justify-center gap-1 text-[10px] font-bold transition hover:bg-[#fff3f4] ${paginaAtiva === item.id ? "text-[#c9000b]" : "text-[#626a72]"}`}
              aria-current={paginaAtiva === item.id ? "page" : undefined}
            >
              <span
                className={`text-[22px] leading-5 ${item.id === "emergencia" ? "text-[27px]" : ""}`}
                aria-hidden="true"
              >
                {item.icone}
              </span>
              <span>{item.nome}</span>
            </button>
          ))}
        </nav>

        {/* Detalhes simples do animal selecionado */}
        {animalSelecionado && (
          <div
            className="absolute inset-0 z-20 flex items-end bg-black/40"
            role="presentation"
            onClick={() => setAnimalSelecionado(null)}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="titulo-animal"
              onClick={(event) => event.stopPropagation()}
              className="w-full rounded-t-3xl bg-white p-5 shadow-2xl"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="text-[36px]" aria-hidden="true">
                  {animalSelecionado.emoji}
                </span>
                <div>
                  <h2 id="titulo-animal" className="text-[18px] font-extrabold">
                    {animalSelecionado.nome}
                  </h2>
                  <p className="text-[12px] text-[#666]">
                    {
                      categorias.find(
                        (item) => item.id === animalSelecionado.categoria,
                      )?.nome
                    }
                  </p>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed">
                {animalSelecionado.descricao}
              </p>
              <p className="mt-3 rounded-lg bg-[#fff0f1] p-3 text-[12px] leading-relaxed text-[#8c0007]">
                Em caso de acidente, procure atendimento de saúde imediatamente.
                Não tente capturar o animal nem faça torniquete ou cortes no
                local.
              </p>
              <button
                type="button"
                onClick={() => setAnimalSelecionado(null)}
                className="mt-4 w-full rounded-xl bg-[#c9000b] px-4 py-3 text-sm font-bold text-white"
              >
                Fechar
              </button>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
