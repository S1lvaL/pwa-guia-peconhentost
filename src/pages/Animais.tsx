/*
  Pagina de listagem de animais, com filtros por categoria e busca por nome
*/
import { useState } from "react"; //Hook (função especial) do React para guardar estados
import dadosAnimais from "../data/animais.json";
import { CardAnimal } from "../components/CardAnimal";
import { ModalDetalhes } from "../components/ModalDetalhes";
import type { Animal } from "../types/animal";
//Tipos de categorias para filtro
type CategoriaFiltro =
  | "todos"
  | "serpentes"
  | "escorpioes"
  | "aranhas"
  | "anfibios"
  | "aquaticos";
//Array  para exibir os filtros na tela
const listaCategorias: { id: CategoriaFiltro; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "serpentes", label: "Serpentes" },
  { id: "escorpioes", label: "Escorpiões" },
  { id: "aranhas", label: "Aranhas" },
  { id: "anfibios", label: "Anfíbios" },
  { id: "aquaticos", label: "Aquáticos" },
];
//Usa a interface para definir uma props opcional e identificar qual animal foi selecionado
interface AnimaisProps {
  onSelectAnimal?: (animal: Animal) => void;
}
//Componente principal da página de listagem de animais
export default function Animais({ onSelectAnimal }: AnimaisProps) {
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] =
    useState<CategoriaFiltro>("todos");
  const [animalSelecionado, setAnimalSelecionado] = useState<Animal | null>(
    null,
  );
  //Converte os dados do JSON para o tipo Animal
  const animais: Animal[] = dadosAnimais as Animal[];
  //Filtra os animais usando duas regras: a categoria selecionada e o termo de busca
  const animaisFiltrados = animais.filter((animal) => {
    const atendeCategoria =
      categoriaAtiva === "todos" ||
      animal.categoria.toLowerCase() === categoriaAtiva.toLowerCase();
    const atendeBusca = animal.nome.toLowerCase().includes(busca.toLowerCase());

    return atendeCategoria && atendeBusca;
  });
  //Função para lidar com o clique em um animal e dispara o prop onSelectAnimal
  const handleAnimalClick = (animal: Animal) => {
    setAnimalSelecionado(animal);
    if (onSelectAnimal) {
      onSelectAnimal(animal);
    }
  };
  //Renderiza a página com o cabeçalho, campo de busca, filtros de categoria, lista de cards e modal de detalhes
  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col justify-between w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto pt-8 pb-6 px-4">
      <div className="pt-[24px] px-[16px] space-y-[20px] flex-1">
        {/* Header */}
        <div className="flex items-center justify-between py-[5px]">
          <div className="flex flex-col gap-[2px]">
            <h1 className="font-extrabold text-[#0e3d10]/90 text-[40px] leading-[32px]">
              Guia de Animais
            </h1>
            <p className="font-bold text-[#475569] text-[11px] uppercase tracking-wide mt-0.5 pt-3">
              Consulte espécies e saiba como agir
            </p>
          </div>
          <div className="bg-[#fef3c7] flex gap-[4px] h-[40px] items-center px-[12px] rounded-[20px]">
            <div className="size-[8px] bg-[#601212] rounded-full" />
            <span className="font-bold text-[#601212] text-[12px]">Logo</span>
          </div>
        </div>

        {/* Campo de Busca */}
        <div className="bg-[#f1f5f9] flex gap-[10px] items-center px-[16px] py-[12px] rounded-[24px] shadow-sm shadow-[#780F0F]/15">
          <svg
            className="size-[18px] text-[#475569]"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              d="M12.5 12.5L16.5 16.5M14 8.5C14 11.5376 11.5376 14 8.5 14C5.46243 14 3 11.5376 3 8.5C3 5.46243 5.46243 3 8.5 3C11.5376 3 14 5.46243 14 8.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome (ex: Peixe-Leão)..."
            className="bg-transparent font-bold text-[14px] text-[#0e3d10] placeholder-[#0e3d10]/35 outline-none flex-1"
          />
          {busca && (
            <button
              onClick={() => setBusca("")}
              className="text-[#94a3b8] text-[12px] font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filtros de Categoria 
        Permite que os botões quebrem linha (flex-wrap) em telas maiores (md:)*/}
        <div className="relative overflow-x-auto md:overflow-visible no-scrollbar py-1">
          <div className="flex md:flex-wrap gap-[8px] whitespace-nowrap md:whitespace-normal pb-3">
            {listaCategorias.map((cat) => {
              const isActive = categoriaAtiva === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaAtiva(cat.id)}
                  className={`px-[16px] py-[8px] rounded-[20px] text-[14px] transition-colors ${
                    isActive
                      ? "bg-[#780F0F] text-white font-semibold shadow-md shadow-[#780F0F]/35"
                      : "bg-white text-[#0e3d10]/80 font-bold border border-[#e2e8f0] shadow-sm shadow-[#0e3d10]/20"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/*Lista de Cards*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[12px]">
          {animaisFiltrados.length > 0 ? (
            animaisFiltrados.map((animal) => (
              <CardAnimal
                key={animal.id}
                animal={animal}
                onClick={() => handleAnimalClick(animal)}
              />
            ))
          ) : (
            <div className="text-center py-10 text-[#64748b]">
              <p className="font-bold text-[19px] text-[#0e3d10]">
                Nenhum animal encontrado
              </p>
              <p className="text-[12px] text-[#0e3d10]/75">
                Verifique o termo buscado ou altere o filtro.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Componente do Modal */}
      <ModalDetalhes
        animal={animalSelecionado}
        onClose={() => setAnimalSelecionado(null)}
      />
    </div>
  );
}
