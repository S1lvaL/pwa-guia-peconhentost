import type { Area } from "../data/DicasPrevencao";

export type Habitat =
  | "mata-atlantica"
  | "caatinga"
  | "cerrado"
  | "marinho"
  | "agua-doce";

export interface Animal {
  id: string;
  nome: string;
  nomesPopulares?: string[];
  categoria: string;
  imagem: string | string[];
  habitats?: Habitat[];
  areas?: Area[];
  sintomas?: string[];
  descricao?: string;
  primeirosSocorros?: string[];
  oQueNaoFazer?: string[];
  periculosidade?: "Risco moderado" | "Perigo!";
  caracteristicas?: string[];
  invasora?: boolean;
}
