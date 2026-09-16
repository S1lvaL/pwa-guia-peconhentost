export interface Animal {
  id: string;
  nome: string;
  categoria: string;
  subtitulo?: string;
  imagem: string | string[]; // Aceita tanto imagem única quanto array de fotos
  sintomas?: string;
  primeirosSocorros?: string[];
  oQueNaoFazer?: string[];
  periculosidade?: string;
}
