import type { UnidadeSoro } from "../types/unidadeSoro";

//Mostra "7136212277" como "(71) 3621-2277" (o 0800 fica separado em blocos)
export function formatarTelefone(t: string): string {
  if (t.startsWith("0800"))
    return `${t.slice(0, 4)} ${t.slice(4, 7)} ${t.slice(7)}`;
  if (t.length === 11)
    return `(${t.slice(0, 2)}) ${t.slice(2, 7)}-${t.slice(7)}`;
  return `(${t.slice(0, 2)}) ${t.slice(2, 6)}-${t.slice(6)}`;
}

//Botão Ligar
export const linkLigar = (t: string) =>
  t.startsWith("0800") ? `tel:${t}` : `tel:+55${t}`;

//Abre a rota no Google Maps (precisa de internet)
export const linkRota = (u: UnidadeSoro) => {
  const destino = u.endereco
    ? `${u.endereco}, ${u.municipio}, BA`
    : `${u.nome}, ${u.municipio}, BA`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destino)}`;
};
