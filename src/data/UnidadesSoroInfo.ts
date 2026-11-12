/*Origem dos dados de UnidadeSoro.json*/
export const UNIDADES_SORO_INFO = {
  fonte: "Ministério da Saúde",
  link: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/animais-peconhentos/hospitais-de-referencia/bahia/view",
  atualizadoEm: "10-11-2026",
};

//Converte o formato da data
export const formatarData = (iso: string): string => {
  const [ano, mes, dia] = iso.split("-");
  return `${ano}/${mes}/${dia}`;
};
