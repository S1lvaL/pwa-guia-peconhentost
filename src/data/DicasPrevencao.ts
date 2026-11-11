export type Area = "casa" | "campo" | "trilha" | "mar";

export const AREAS: { id: Area; rotulo: string }[] = [
  { id: "casa", rotulo: "Casa" },
  { id: "campo", rotulo: "Campo" },
  { id: "trilha", rotulo: "Trilha" },
  { id: "mar", rotulo: "Mar" },
];

export const dadosPrevencao = {
  casa: {
    acoes: [
      "Mantenha quintais, jardins e gramados limpos e aparados.",
      "Acondicione o lixo em sacos plásticos ou recipientes fechados.",
      "Vede frestas, buracos, soleiras de portas e rodapés despregados.",
      "Use telas em janelas, ralos de chão, pias e tanques.",
      "Sacuda e inspecione roupas e sapatos antes de usá-los.",
      "Afaste camas e berços das paredes e não deixe lençóis no chão.",
      "Use luvas de raspas de couro ao fazer limpezas no jardim ou quintal.",
      "Preserve predadores naturais como sapos, lagartos, corujas e joão-bobos.",
      "Solicite a limpeza de terrenos baldios vizinhos junto à prefeitura ou dono.",
    ],
    evite: [
      "Não acumule entulho, tijolos, telhas, madeira e folhas secas.",
      "Evite plantas densas (como trepadeiras e bananeiras) junto a muros.",
      "Não pendure roupas diretamente nas paredes.",
      "Evite acúmulo de sujeira que atraia baratas e roedores.",
    ],
  },

  campo: {
    acoes: [
      "Use botas de cano alto ou perneiras de couro, botinas e sapatos fechados.",
      "Utilize luvas de raspas de couro ao mexer em lenha, lixo ou palha.",
      "Sacuda e inspecione roupas e sapatos antes de usá-los.",
      "Limpe paióis, terreiros e controle a proliferação de roedores.",
      "Tome cuidado ao manusear locais quentes, escuros e úmidos.",
    ],
    evite: [
      "Não ponha as mãos em buracos, sob pedras, troncos podres ou cupinzeiros.",
      "Evite mexer desprotegido em palhadas de milho, feijão, cana ou dormentes.",
      "Não manuseie entulhos e resíduos rurais sem EPIs adequados.",
    ],
  },

  trilha: {
    acoes: [
      "Caminhe usando botas de trilha, calça e perneiras de proteção.",
      "Preste atenção constante por onde pisa e anda na vegetação.",
      "Use um bastão para inspecionar a vegetação à frente antes de passar.",
    ],
    evite: [
      "Não apoie as mãos em troncos ocos, vegetação fechada ou fendas de rochas.",
      "Evite caminhar fora de trilhas conhecidas ou sem iluminação adequada.",
    ],
  },

  mar: {
    acoes: [
      "Consulte o guarda-vidas sobre a presença de águas-vivas e caravelas.",
      "Observe se há bandeira lilás no posto dos salva-vidas.",
      "Use calçados ao caminhar na faixa de areia da praia.",
      "Utilize roupa de mergulho (neoprene) para cobrir a pele na água.",
      "Observe se há animais avistados encalhados na areia.",
    ],
    evite: [
      "Evite o banho de mar em locais com incidência de águas-vivas.",
      "Nunca toque em águas-vivas ou caravelas, mesmo que pareçam mortas.",
    ],
  },
};
