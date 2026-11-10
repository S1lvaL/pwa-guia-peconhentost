/*Seção completa "Unidades de referência para soro antiveneno":
  título, mensagens (sem cidade, da região, nenhuma), lista de CardUnidadeSoro e rodapé.
  Prevenção: <UnidadesSoro limite={1} onVerTodas={...} />
  Emergência: <UnidadesSoro detalhado />   (sem limite, com os soros)
*/
import { useRegiao } from "../context/RegiaoContexto";
import { buscarUnidades } from "../utils/buscaSoro";
import { UNIDADES_SORO_INFO, formatarData } from "../data/UnidadesSoroInfo";
import { CardUnidadeSoro } from "./CardUnidadesSoro";

//Ícone de hospital (do protótipo do Figma)
function IconeHospital() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="text-verde-principal"
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

export function UnidadesSoro({
  limite,
  detalhado = false,
  onVerTodas,
}: {
  limite?: number; //quantas unidades mostrar
  detalhado?: boolean; //mostra também os soros em cada unidade
  onVerTodas?: () => void; //função do botão "Ver todas" (só aparece se houver mais que o limite)
}) {
  const { municipio } = useRegiao();

  //Busca primeiro as unidades da própria cidade; se não houver, as da região de saúde
  const { unidades, origem, regiao } = buscarUnidades(municipio);
  const visiveis = limite ? unidades.slice(0, limite) : unidades;
  const restantes = limite ? unidades.length - limite : 0;

  return (
    <section
      aria-live="polite"
      className="bg-white border border-verde-principal/40 rounded-[20px] p-3 flex gap-2.5 shadow-md shadow-verde-principal/20"
    >
      <div className="shrink-0 size-[44px] rounded-full bg-verde-principal/10 flex items-center justify-center">
        <IconeHospital />
      </div>

      <div className="min-w-0 flex-1 space-y-2">
        <h2 className="text-[16px] font-bold leading-tight text-verde-principal">
          Unidades de referência para soro antiveneno
        </h2>

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
          <p className="text-[12px] leading-snug text-letra/80">
            Não há unidade cadastrada em {municipio}. Mostrando unidades da
            região de saúde de {regiao}.
          </p>
        )}

        {/*Lista de unidades*/}
        <div className="flex flex-col items-center gap-2">
          {visiveis.map((u) => (
            <div key={u.id} className="w-full max-w-[280px]">
              <CardUnidadeSoro unidade={u} detalhado={detalhado} />
            </div>
          ))}
        </div>

        {/*Botão "Ver todas": só aparece se houver mais unidades que o limite e a função existir*/}
        {restantes > 0 && onVerTodas && (
          <button
            type="button"
            onClick={onVerTodas}
            className="text-[13px] font-bold underline text-vermelho-principal"
          >
            Ver todas as unidades (+{restantes})
          </button>
        )}

        {/*Rodapé  aviso sobre o soro e fonte dos dados*/}
        {municipio && (
          <div className="space-y-1 border-t border-verde-principal/20 pt-1.5 text-[10px] leading-snug text-letra/80">
            <p>
              Algumas unidades recebem o soro só quando há um acidente, e a
              disponibilidade pode mudar.
            </p>
            <p>
              Dados: {UNIDADES_SORO_INFO.fonte}, consultados em{" "}
              {formatarData(UNIDADES_SORO_INFO.atualizadoEm)}.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
