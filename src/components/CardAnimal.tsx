import type { Animal } from "../types/animal";
import { corPericulosidade } from "../utils/periculosidade";

interface CardAnimalProps {
  animal: Animal;
  onClick: () => void;
}

export function CardAnimal({ animal, onClick }: CardAnimalProps) {
  /*Se for array pega o primeiro item
   Se for string, usa ela diretamente.*/
  const imagemCapa = Array.isArray(animal.imagem)
    ? animal.imagem[0]
    : animal.imagem;

  const corBadge = corPericulosidade(animal.periculosidade);

  return (
    <div
      onClick={onClick}
      className="bg-white border border-cinza-borda drop-shadow-[0px_2px_4px_rgba(15,23,42,0.15)] flex gap-[16px] items-center p-[12px] rounded-[16px] cursor-pointer hover:border-verde-claro transition-all"
    >
      {/*Imagem do Animal*/}
      <div className="relative rounded-[20px] shrink-0 size-[90px] overflow-hidden bg-slate-100">
        <img
          src={imagemCapa}
          alt={animal.nome}
          className="object-cover size-full"
        />
      </div>

      {/*Conteúdo*/}
      <div className="flex flex-col gap-[6px] flex-1 min-w-0">
        <div className="flex gap-[6px] items-center flex-wrap">
          <span className="bg-verdeclaro-fundo text-verde-letra border border-cinza-borda/30  px-[8px] py-[2px] rounded-[6px] font-bold text-[11px] capitalize">
            {animal.categoria}
          </span>
          {corBadge && (
            <span
              className={`${corBadge} px-[8px] py-[2px] rounded-[6px] font-bold text-[11px]`}
            >
              {animal.periculosidade}
            </span>
          )}
        </div>

        <h3 className="font-bold text-letra text-[15px] leading-tight break-words">
          {animal.nome}
        </h3>
      </div>

      {/*Ícone Seta*/}
      <svg
        className="size-[20px] text-letra/70 shrink-0"
        fill="none"
        viewBox="0 0 20 20"
      >
        {/*Caminho da seta*/}
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
