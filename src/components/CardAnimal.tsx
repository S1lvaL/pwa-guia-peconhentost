import type { Animal } from "../types/animal";

interface CardAnimalProps {
  animal: Animal;
  onClick: () => void;
}

export function CardAnimal({ animal, onClick }: CardAnimalProps) {
  //Se for array (ex: Anfíbios Genéricos), pega o primeiro item. Se for string, usa ela diretamente.
  const imagemCapa = Array.isArray(animal.imagem)
    ? animal.imagem[0]
    : animal.imagem;

  return (
    <div
      onClick={onClick}
      className="bg-white border border-[#e2e8f0] drop-shadow-[0px_2px_4px_rgba(15,23,42,0.04)] flex gap-[16px] items-center p-[12px] rounded-[16px] cursor-pointer hover:border-[#059669]/50 transition-all"
    >
      {/*Imagem do Animal*/}
      <div className="relative rounded-[12px] shrink-0 size-[80px] overflow-hidden bg-slate-100">
        <img
          src={imagemCapa}
          alt={animal.nome}
          className="object-cover size-full"
        />
      </div>

      {/*Conteúdo*/}
      <div className="flex flex-col gap-[6px] flex-1">
        <div className="flex gap-[6px] items-center flex-wrap">
          <span className="bg-[#ecfdf5] text-[#064e3b] px-[8px] py-[2px] rounded-[6px] font-bold text-[11px] capitalize">
            {animal.categoria}
          </span>
          <span className="bg-[#fee2e2] text-[#991b1b] px-[8px] py-[2px] rounded-[6px] font-bold text-[11px]">
            {animal.periculosidade || "Atenção"}
          </span>
        </div>

        <div>
          <h3 className="font-bold text-[#0f172a] text-[16px] leading-tight">
            {animal.nome}
          </h3>
          {animal.subtitulo && (
            <p className="font-medium text-[#475569] text-[12px]">
              {animal.subtitulo}
            </p>
          )}
        </div>
      </div>

      {/*Ícone Seta*/}
      <svg
        className="size-[20px] text-[#94a3b8] shrink-0"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          d="M7.5 15L12.5 10L7.5 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
