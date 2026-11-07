import unidadesJson from "../data/UnidadesSoro.json";
import regioesJson from "../data/RegioesSaude.json";
import type { UnidadeSoro } from "../types/UnidadeSoro.ts";

//Formato de cada coisa
const unidades = unidadesJson as unknown as UnidadeSoro[];
const regioes = regioesJson as Record<string, string[]>;

const normalizar = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const regiaoMunicipio = new Map<string, string>();
for (const [regiao, municipios] of Object.entries(regioes)) {
  for (const municipio of municipios) {
    const chave = normalizar(municipio);
    if (regiaoMunicipio.has(chave)) {
      console.warn("Municipio repetido em RegioesSaude.json: ${municipio");
    }
    regiaoMunicipio.set(chave, regiao);
  }
}

//Busca parcial
export function unidadesMunicipio(municipio: string | null): UnidadeSoro[] {
  if (!municipio) return [];
  const alvo = normalizar(municipio);
  return unidades.filter((u) => normalizar(u.municipio) === alvo);
}

//De onde vem as unidades
export type ResultadoUnidades = {
  unidades: UnidadeSoro[];
  origem: "municipio" | "regiao" | "nenhuma";
  regiao?: string;
};

//Busca completa
export function buscarUnidades(municipio: string | null): ResultadoUnidades {
  if (!municipio) return { unidades: [], origem: "nenhuma" };

  const noMunicipio = unidadesMunicipio(municipio);
  if (noMunicipio.length > 0) {
    return { unidades: noMunicipio, origem: "municipio" };
  }

  const regiao = regiaoMunicipio.get(normalizar(municipio));
  if (!regiao) return { unidades: [], origem: "nenhuma" };

  const daRegiao = unidades.filter(
    (u) => regiaoMunicipio.get(normalizar(u.municipio)) === regiao,
  );

  return daRegiao.length > 0
    ? { unidades: daRegiao, origem: "regiao", regiao }
    : { unidades: [], origem: "nenhuma" };
}
