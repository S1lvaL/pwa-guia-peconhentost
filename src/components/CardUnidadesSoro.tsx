//Card de UMA unidade de referência
import type { UnidadeSoro } from "../types/unidadeSoro";
import { formatarTelefone, linkLigar, linkRota } from "../utils/contatoUnidade";
import { rotulosSoros } from "../utils/rotuloSoro";

export type VarianteCor = "verde" | "vermelho";

const cores = {
  verde: {
    borda: "border-verde-principal/50",
    fundo: "bg-white/30",
    sombra: "shadow-verde-principal/30",
    titulo: "text-verde-principal/85",
    link: "text-verde-principal",
  },
  vermelho: {
    borda: "border-vermelho-principal/40",
    fundo: "bg-vermelho-principal/10",
    sombra: "shadow-vermelho-principal/20",
    titulo: "text-vermelho-principal",
    link: "text-vermelho-principal",
  },
} as const;

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
  variante = "verde",
}: {
  unidade: UnidadeSoro;
  detalhado?: boolean;
  variante?: VarianteCor;
}) {
  const c = cores[variante];

  return (
    <article
      className={`rounded-[10px] border ${c.borda} ${c.fundo} px-3 py-2 space-y-1 shadow-md ${c.sombra} w-full`}
    >
      <div>
        <strong className={`block text-[14px] leading-snug ${c.titulo}`}>
          {u.nome}
        </strong>
        <span className="block text-[12px] text-letra/80">
          {u.municipio} - BA
        </span>
        {u.endereco && (
          <span className="block text-[12px] text-letra/70 mt-0.5 leading-snug">
            {u.endereco}
          </span>
        )}
      </div>

      {/*Só na versão detalhada: soros no local ou levados sob demanda*/}
      {detalhado && (
        <div className="text-[12px] leading-snug text-letra space-y-1">
          {(() => {
            const lista = rotulosSoros(u.soros ?? []);

            if (u.supridoSobDemanda) {
              if (lista.length === 0) {
                return (
                  <p>O soro é levado até a unidade quando há um acidente.</p>
                );
              }
              return (
                <>
                  <p>Soro no local:</p>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {lista.map((soro) => (
                      <li key={soro}>{soro}</li>
                    ))}
                  </ul>
                  <p className="text-letra/80">
                    Os demais são levados quando necessário.
                  </p>
                </>
              );
            }

            if (lista.length === 0) {
              return <p>Soros: não informado.</p>;
            }

            return (
              <>
                <p>Soros disponíveis:</p>
                <ul className="list-disc pl-4 space-y-0.5">
                  {lista.map((soro) => (
                    <li key={soro}>{soro}</li>
                  ))}
                </ul>
              </>
            );
          })()}
        </div>
      )}

      <div className="flex flex-wrap items-center  pt-1 gap-2">
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
          <span className="text-[12px] text-letra/80">
            Telefone não informado
          </span>
        )}
        <a
          href={linkRota(u)}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-[12px] font-bold underline ${c.link}`}
        >
          Como chegar
        </a>
      </div>
    </article>
  );
}
