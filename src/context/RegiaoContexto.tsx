import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

const CHAVE_MUNICIPIO = "regiao:municipio";

type RegiaoCtx = {
  //Cidade escolhida pelo usuário
  municipio: string | null;
  setMunicipio: (m: string | null) => void;
  //Só vira true quando o usuário clica em "Ver todos" na Prevenção
  filtrarCatalogo: boolean;
  setFiltrarCatalogo: (v: boolean) => void;
};

const RegiaoContext = createContext<RegiaoCtx>({
  municipio: null,
  setMunicipio: () => {},
  filtrarCatalogo: false,
  setFiltrarCatalogo: () => {},
});

//Lê a cidade salva (com proteção caso o storage esteja bloqueado)
function carregarMunicipio(): string | null {
  try {
    return localStorage.getItem(CHAVE_MUNICIPIO);
  } catch {
    return null;
  }
}

export function RegiaoProvider({ children }: { children: ReactNode }) {
  const [municipio, setMunicipio] = useState<string | null>(carregarMunicipio);
  const [filtrarCatalogo, setFiltrarCatalogo] = useState(false);

  //Salva a cidade toda vez que mudar
  useEffect(() => {
    try {
      if (municipio) localStorage.setItem(CHAVE_MUNICIPIO, municipio);
      else localStorage.removeItem(CHAVE_MUNICIPIO);
    } catch {
      //se o storage estiver cheio/bloqueado, o app continua funcionando sem salvar
    }
  }, [municipio]);

  return (
    <RegiaoContext.Provider
      value={{ municipio, setMunicipio, filtrarCatalogo, setFiltrarCatalogo }}
    >
      {children}
    </RegiaoContext.Provider>
  );
}
//Hook para usar nas telas: const { municipio } = useRegiao();
// eslint-disable-next-line react-refresh/only-export-components
export const useRegiao = () => useContext(RegiaoContext);
