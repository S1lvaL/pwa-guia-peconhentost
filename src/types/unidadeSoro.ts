export interface UnidadeSoro {
  id: string;
  nome: string;
  municipio: string;
  endereco?: string;
  telefone?: string;
  soros?: string[]; //Campo não obrigatório
}
