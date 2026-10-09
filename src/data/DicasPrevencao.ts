export type Area = "casa" | "campo" | "trilha" | "mar";

export const AREAS: { id: Area; rotulo: string }[] = [
  { id: "casa", rotulo: "Casa" },
  { id: "campo", rotulo: "Campo" },
  { id: "trilha", rotulo: "Trilha" },
  { id: "mar", rotulo: "Mar" },
];

export const dadosPrevencao = {
  geral: [
    "Sacuda roupas e calçados antes de usá-los para certificar-se de que não há animais.",
    "Use calçado fechado e perneiras em áreas de mato.",
    "Evite colocar as mãos diretamente em buracos, sob pedras ou troncos podres.",
    "Mantenha o quintal limpo e evite o acúmulo de entulhos ou lixo doméstico.",
    "Não mexa em pilhas de tijolos, telhas ou lenha sem calçados e luvas de proteção.",
    "Vede frestas e buracos em paredes, portas e pisos para evitar pontos de abrigo.",
  ],

  casa: {
    domestica: [
      "Mantenha o quintal limpo e evite o acúmulo de entulhos ou lixo doméstico.",
      "Sacuda roupas e calçados antes de usá-los para certificar-se de que não há animais.",
      "Vede frestas e buracos em paredes, portas e pisos para evitar pontos de abrigo.",
    ],
    evite: [
      "Evite colocar as mãos diretamente em buracos, sob pedras ou troncos podres.",
      "Não mexa em pilhas de tijolos, telhas ou lenha sem calçados e luvas de proteção.",
    ],
  },

  campo: {
    domestica: [
      "Use botas de cano alto e luvas de couro durante o trabalho no campo.",
      "Mantenha a vegetação ao redor da residência baixa e roçada.",
    ],
    evite: [
      "Evite acúmulo de palha, grãos e materiais que atraiam roedores.",
      "Não manuseie vegetação alta sem equipamentos de proteção adequados.",
    ],
  },

  trilha: {
    domestica: [
      "Caminhe sempre usando calçados fechados e perneiras.",
      "Mantenha-se na trilha demarcada e evite áreas não exploradas.",
    ],
    evite: [
      "Evite tocar em troncos ocos ou rochas sem olhar previamente.",
      "Não caminhe à noite em trilhas sem iluminação adequada.",
    ],
  },

  mar: {
    domestica: [
      "Consulte os moradores ou salva-vidas locais sobre áreas de risco.",
      "Arraste os pés ao caminhar no raso em praias de fundo arenoso.",
    ],
    evite: [
      "Evite tocar em animais marinhos, como caravelas, águas-vivas e raias.",
      "Não entre na água em locais com sinalização de perigo.",
    ],
  },
};
