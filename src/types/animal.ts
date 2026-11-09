/*
  Interface que define a estrutura de dados de um Animal
  Garante a validação de tipos no TypeScript e evita a repetição de código no projeto.
 */
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
  nomesPopulares?: string[]; //Termos alternativos pra busca
  categoria: string;
  imagem: string | string[]; //Aceita tanto imagem única quanto array de fotos
  habitats: Habitat[];
  sintomas?: string; //'?' indica que o campo é opcional
  primeirosSocorros?: string[];
  oQueNaoFazer?: string[];
  periculosidade?: "Risco moderado" | "Perigo!";
  Caracteristicas?: string[];
<<<<<<< Updated upstream
  invasora?: boolean;
  areas: Area[];
}
=======
}
>>>>>>> Stashed changes
