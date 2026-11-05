import cidadesBiomasJson from "../data/CidadesBiomas.json";
import type { Animal, Habitat } from "../types/animal";

type InfoCidade = { bioma: Habitat; litoral: boolean };
const cidadesBiomas = cidadesBiomasJson as unknown as Record<
  string,
  InfoCidade
>;

//Devolve só os animais que ocorrem na região da cidade:
//bioma da cidade + água doce (todas) + marinho (só se for litoral)
export function filtrarPorRegiao(
  lista: Animal[],
  municipio: string | null,
): Animal[] {
  const info = municipio ? cidadesBiomas[municipio] : undefined;
  if (!info) return [];

  const habitats: Habitat[] = [
    info.bioma,
    "agua-doce",
    ...(info.litoral ? (["marinho"] as Habitat[]) : []),
  ];
  return lista.filter((a) =>
    (a.habitats ?? []).some((h) => habitats.includes(h)),
  );
}
