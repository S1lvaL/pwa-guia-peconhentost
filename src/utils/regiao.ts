import cidadesBiomasJson from "../data/CidadesBiomas.json";
import type { Animal, Habitat } from "../types/animal";

type InfoCidade = { bioma: Habitat; litoral: boolean };
//Diz ao TypeScript o formato do JSON (ele é lido como string comum)
//"as unknown as ..." significa "confie na mãe, o JSON tem esse formato".
const cidadesBiomas = cidadesBiomasJson as unknown as Record<
  string,
  InfoCidade
>;

//Recebe a lista de todos os animais e a cidade escolhida
//E devolve só os animais que atendem os critérios
export function filtrarPorRegiao(
  lista: Animal[],
  municipio: string | null,
): Animal[] {
  //Procura a cidade se não tiver fica como indefinido
  const info = municipio ? cidadesBiomas[municipio] : undefined;
  if (!info) return []; //Fica como vazio sem cidade
  //Monta a lista de habitats que a cidade tem
  const habitats: Habitat[] = [
    info.bioma,
    "agua-doce", //Toda cidade tem rio ou lagoa ou açude
    ...(info.litoral ? (["marinho"] as Habitat[]) : []), //Se a cidade for litoranea
  ];
  //Filtra a lista de animais, devolvendo só os que tem algum habitat na lista da cidade
  return lista.filter((a) =>
    (a.habitats ?? []).some((h) => habitats.includes(h)),
  );
}
