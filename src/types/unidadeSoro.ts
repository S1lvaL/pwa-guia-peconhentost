export interface UnidadeSoro {
  id: string;
  nome: string;
  municipio: string;
  endereco?: string;
  telefone?: string;
  soros?: string[]; //Campo não obrigatório
  supridoSobDemanda?: boolean; //hospitais que tiver apenas por abastecimento true
}
