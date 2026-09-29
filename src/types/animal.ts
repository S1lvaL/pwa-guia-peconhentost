/*
  Interface que define a estrutura de dados de um Animal
  Garante a validação de tipos no TypeScript e evita a repetição de código no projeto.
 */
export interface Animal {
  id: string;
  nome: string;
  nomesPopulares?: string[]; //Termos alternativos pra busca
  categoria: string;
  imagem: string | string[]; //Aceita tanto imagem única quanto array de fotos
  sintomas?: string; //'?' indica que o campo é opcional
  primeirosSocorros?: string[];
  oQueNaoFazer?: string[];
  periculosidade?: "Baixa" | "Media" | "Alta";
}
