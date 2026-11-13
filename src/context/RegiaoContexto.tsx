import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Area } from "../data/DicasPrevencao";

//Chave usada para salvar a cidade no localStorage
const CHAVE_MUNICIPIO = "regiao:municipio";

//O que o contexto oferece as telas: cidade escolhida, se deve filtrar e a área da prevenção
type RegiaoCtx = {
  municipio: string | null;
  setMunicipio: (m: string | null) => void;
  filtrarCatalogo: boolean;
  setFiltrarCatalogo: (v: boolean) => void;
  areaCatalogo: Area | null;
  setAreaCatalogo: (a: Area | null) => void;
};

//Valores padrão, caso não seja usado o provider
const RegiaoContext = createContext<RegiaoCtx>({
  municipio: null,
  setMunicipio: () => {},
  filtrarCatalogo: false,
  setFiltrarCatalogo: () => {},
  areaCatalogo: null,
  setAreaCatalogo: () => {},
});

//Lê a cidade salva. O try/catch é para evitar que o app quebre caso o localStorage esteja bloqueado
function carregarMunicipio(): string | null {
  try {
    return localStorage.getItem(CHAVE_MUNICIPIO);
  } catch {
    return null;
  }
}

//Provider guarda os estados e entrega para as telas via contexto envolvendo-as children são as telas que ficam dentro do provider, que podem acessar o contexto
export function RegiaoProvider({ children }: { children: ReactNode }) {
  const [municipio, setMunicipio] = useState<string | null>(carregarMunicipio);
  const [filtrarCatalogo, setFiltrarCatalogo] = useState(false);
  const [areaCatalogo, setAreaCatalogo] = useState<Area | null>(null);

  //Salva a cidade toda vez que mudar
  useEffect(() => {
    try {
      if (municipio) localStorage.setItem(CHAVE_MUNICIPIO, municipio);
      else localStorage.removeItem(CHAVE_MUNICIPIO);
    } catch {
      //se o storage estiver cheio/bloqueado, o app continua funcionando sem salvar
    }
  }, [municipio]);

  //Entrega os estados e funções para as telas que estão dentro do provider
  return (
    <RegiaoContext.Provider
      value={{
        municipio,
        setMunicipio,
        filtrarCatalogo,
        setFiltrarCatalogo,
        areaCatalogo,
        setAreaCatalogo,
      }}
    >
      {children}
    </RegiaoContext.Provider>
  );
}
//Atalho para as telas usarem o contexto: const { municipio } = useRegiao();
//O comentário abaixo desliga um aviso do ESLint que não afeta o funcionamento.
// eslint-disable-next-line react-refresh/only-export-components
export const useRegiao = () => useContext(RegiaoContext);
