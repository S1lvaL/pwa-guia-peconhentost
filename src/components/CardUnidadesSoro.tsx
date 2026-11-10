//Card de UMA unidade de referência
import type { UnidadeSoro } from "../types/unidadeSoro";
import { formatarTelefone, linkLigar, linkRota } from "../utils/contatoUnidade";

//Ícone de telefone (do protótipo do Figma)
function IconeTelefone() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8.2 3H5.4C4.6 3 4 3.6 4 4.4 4 13 11 20 19.6 20c.8 0 1.4-.6 1.4-1.4v-2.8l-4-1.3-1.1 2a13 13 0 0 1-8.4-8.4l2-1.1L8.2 3Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function CardUnidadeSoro({
  unidade: u,
  detalhado = false,
}: {
  unidade: UnidadeSoro;
  detalhado?: boolean;
}) {
  return (
    <article className="rounded-[10px] border border-verde-principal/30 bg-verde-principal/25 px-3 py-2 space-y-1 shadow-md shadow-verde-principal/20 w-full">
      <div>
        <strong className="block text-[14px] leading-snug text-verde-principal">
          {u.nome}
        </strong>
        <span className="text-[12px] text-letra/80">{u.municipio} - BA</span>
      </div>

      {/*Só na versão detalhada: soros no local ou levados sob demanda*/}
      {detalhado && (
        <p className="text-[12px] leading-snug text-letra">
          {(() => {
            const soros = u.soros ?? [];
            if (u.supridoSobDemanda) {
              return soros.length > 0
                ? `Soro no local: ${soros.join(", ")}. Os demais são levados quando necessário.`
                : "O soro é levado até a unidade quando há um acidente.";
            }
            return soros.length > 0
              ? `Soros: ${soros.join(", ")}.`
              : "Soros: não informado.";
          })()}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {u.telefone ? (
          <a
            href={linkLigar(u.telefone)}
            aria-label={`Ligar para ${u.nome} no número ${formatarTelefone(u.telefone)}`}
            className="inline-flex items-center gap-1.5 rounded-[12px] bg-vermelho-principal/90 px-2.5 py-1.5 text-[12px] font-bold text-white"
          >
            <IconeTelefone />
            Ligar · {formatarTelefone(u.telefone)}
          </a>
        ) : (
          <span className="text-[12px] text-letra/80 items-rigth">
            Telefone não informado
          </span>
        )}
        <a
          href={linkRota(u)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] font-bold underline text-verde-principal"
        >
          Como chegar
        </a>
      </div>
    </article>
  );
}
