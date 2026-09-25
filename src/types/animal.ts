/*
  Interface que define a estrutura de dados de um Animal
  Garante a validação de tipos no TypeScript e evita a repetição de código no projeto.
 */
export interface Animal {
  id: string;
  nome: string;
  categoria: string;
  subtitulo?: string; //'?' indica que o campo é opcional
  imagem: string | string[]; //Aceita tanto imagem única quanto array de fotos
  sintomas?: string;
  primeirosSocorros?: string[];
  oQueNaoFazer?: string[];
  periculosidade?: string;
}
