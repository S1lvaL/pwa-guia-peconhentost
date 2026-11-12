import { useId, useState } from "react";
import { useRegiao } from "../context/RegiaoContexto";
import { buscarUnidades } from "../utils/buscaSoro";
import { UNIDADES_SORO_INFO, formatarData } from "../data/UnidadesSoroInfo";
import { CardUnidadeSoro, type VarianteCor } from "./CardUnidadesSoro";

// se VarianteCor não for exportada do card, defina aqui:
const cores = {
  verde: {
    borda: "border-verde-principal/70",
    sombra: "shadow-verde-principal/20",
    iconeFundo: "bg-white/25",
    icone: "text-verde-principal",
    titulo: "text-verde-principal/95",
    seta: "text-verde-principal",
    divisoria: "border-verde-principal/30",
    fundo: "bg-verde-principal/35",
  },
  vermelho: {
    borda: "border-vermelho-principal/40",
    sombra: "shadow-vermelho-principal/20",
    iconeFundo: "bg-vermelho-principal/10",
    icone: "text-vermelho-principal",
    titulo: "text-vermelho-principal",
    seta: "text-vermelho-principal",
    divisoria: "border-vermelho-principal/20",
    fundo: "bg-vermelho-principal/8",
  },
} as const;

//Ícone de hospital
function IconeHospital({ className = "" }: { className?: string }) {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 21V5.8C5 4.8 5.8 4 6.8 4h10.4c1 0 1.8.8 1.8 1.8V21M3 21h18M9 21v-4h6v4M12 7v6M9 10h6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function Seta({
  aberto,
  className = "",
}: {
  aberto: boolean;
  className?: string;
}) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform ${aberto ? "rotate-180" : ""} ${className}`}
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UnidadesSoro({
  detalhado = false,
  iniciarAberto = false,
  variante = "verde",
  compacto = false,
}: {
  detalhado?: boolean;
  iniciarAberto?: boolean;
  variante?: VarianteCor;
  compacto?: boolean;
}) {
  const { municipio } = useRegiao();
  const [aberto, setAberto] = useState(iniciarAberto);
  const idPainel = useId(); //Liga o botão ao painel
  const c = cores[variante];

  //Busca primeiro as unidades da própria cidade; se não houver, as da região de saúde
  const { unidades, origem, regiao } = buscarUnidades(municipio);

  return (
    <section
      className={`${c.fundo} border ${c.borda} rounded-[24px] shadow-md ${c.sombra}`}
    >
      {/*Cabeçalho: ícone + título. O card inteiro (esta linha) é o botão que abre e fecha*/}
      <h2>
        <button
          type="button"
          onClick={() => setAberto((a) => !a)}
          aria-expanded={aberto}
          aria-controls={idPainel}
          className={`w-full flex items-center text-left transition-all ${
            compacto ? "gap-2 p-2.5" : "gap-3 p-4"
        }`}
        >
          <span
            
          className={`shrink-0 rounded-full ${c.iconeFundo} flex items-center justify-center ${
            compacto ? "size-[36px]" : "size-[44px]"
          }`}

          >
            <IconeHospital className={c.icone} />
          </span>
          <span
            
          className={`flex-1 font-bold leading-tight ${
            compacto ? "text-[15px]" : "text-[18px]"
          } ${c.titulo}`}

          >
            Unidades de referência para soro antiveneno
          </span>
          <Seta aberto={aberto} className={c.seta} />
        </button>
      </h2>

      {/*Conteúdo: só aparece quando o card está aberto. Se a lista for longa, ela rola dentro do card*/}
      {aberto && (
        <div
          id={idPainel}
          
        className={`overflow-y-auto ${
          compacto
            ? "px-3 pb-3 space-y-2 max-h-[50vh]"
            : "px-4 pb-4 space-y-3 max-h-[60vh]"
        }`}

        >
          {/*Situação 1: ainda sem cidade escolhida*/}
          {!municipio && (
            <p className="text-[13px] leading-snug text-letra">
              Escolha sua cidade acima para ver as unidades de referência da sua
              região.
            </p>
          )}

          {/*Situação 2: nenhuma unidade encontrada*/}
          {municipio && origem === "nenhuma" && (
            <p className="text-[13px] leading-snug text-letra">
              Não encontramos unidade cadastrada para {municipio}. Procure o
              serviço de saúde mais próximo e ligue para o SAMU:{" "}
              <a
                href="tel:192"
                className="font-bold underline text-vermelho-principal"
              >
                192
              </a>
              .
            </p>
          )}

          {/*Situação 3: a cidade não tem unidade; mostramos as da região de saúde*/}
          {origem === "regiao" && (
            <p className="text-[12px] leading-snug text-letra">
              Não há unidade cadastrada em {municipio}. Mostrando unidades da
              região de saúde de {regiao}.
            </p>
          )}

          {/*Todas as unidades encontradas*/}
          {unidades.map((u) => (
            <CardUnidadeSoro
              key={u.id}
              unidade={u}
              detalhado={detalhado}
              variante={variante}
              compacto={compacto}
            />
          ))}

          {/*Rodapé: aviso do SAMU, aviso sobre o soro e fonte dos dados*/}
          {municipio && (
            <div
              className={`space-y-1 border-t ${c.divisoria} pt-2 text-[11px] leading-snug text-letra`}
            >
              <p>
                Em caso de acidente, ligue para o SAMU:{" "}
                <a
                  href="tel:192"
                  className="font-bold underline text-vermelho-principal"
                >
                  192
                </a>
                . Algumas unidades recebem o soro só quando há um acidente, e a
                disponibilidade pode mudar.
              </p>
              <p>
                Dados: {UNIDADES_SORO_INFO.fonte}, consultados em{" "}
                {formatarData(UNIDADES_SORO_INFO.atualizadoEm)}.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
