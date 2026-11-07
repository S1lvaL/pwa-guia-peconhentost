/*Origem dos dados de UnidadeSoro.json*/
export const UNIDADES_SORO_INFO = {
  fonte: "",
  link: "",
  atualizadoEm: "",
};

//Converte o formato da data
export const formatarData = (iso: string): string => {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
};
