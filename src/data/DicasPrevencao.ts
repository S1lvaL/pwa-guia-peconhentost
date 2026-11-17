export type Area = "casa" | "campo" | "trilha" | "mar";

export interface DicaItem {
  titulo: string;
  descricao: string;
}

export interface ConteudoArea {
  acoes: DicaItem[];
  evite: DicaItem[];
}

export const AREAS: { id: Area; rotulo: string }[] = [
  { id: "casa", rotulo: "Casa" },
  { id: "campo", rotulo: "Campo" },
  { id: "trilha", rotulo: "Trilha" },
  { id: "mar", rotulo: "Água" },
];

export const dadosPrevencao: Record<Area, ConteudoArea> = {
  casa: {
    acoes: [
      {
        titulo: "Bata roupas e sapatos antes de vestir",
        descricao:
          "Inspecione calçados, toalhas e roupas de cama — escorpiões e aranhas costumam se esconder neles.",
      },
      {
        titulo: "Afaste camas e berços das paredes",
        descricao:
          "Mantenha uma distância segura da alvenaria e não deixe lençóis ou mosquiteiros encostando no chão.",
      },
      {
        titulo: "Vede frestas e coloque telas",
        descricao:
          "Feche buracos em paredes, rodapés soltos, soleiras de portas e use telas em ralos, pias e janelas.",
      },
      {
        titulo: "Mantenha quintais limpos e aparados",
        descricao:
          "Apare a grama regularmente e acondicione o lixo em sacos plásticos ou lixeiras bem fechadas.",
      },
      {
        titulo: "Use luvas de couro na limpeza",
        descricao:
          "Proteja as mãos com luvas de raspa de couro ao mexer em jardins, entulhos ou áreas externas.",
      },
      {
        titulo: "Preserve predadores naturais",
        descricao:
          "Sapos, lagartos, corujas e galinhas ajudam no controle biológico de escorpiões e aranhas.",
      },
      {
        titulo: "Acione ajuda para terrenos vizinhos",
        descricao:
          "Solicite ao proprietário ou à prefeitura a limpeza de terrenos baldios abandonados ao lado.",
      },
      {
        titulo: "Isole áreas com colmeias",
        descricao:
          "Ao encontrar uma colmeia, mantenha pessoas e animais afastados e chame profissionais especializados.",
      },
    ],
    evite: [
      {
        titulo: "Não acumule entulho no quintal",
        descricao:
          "Pilhas de tijolos, telhas, madeiras e folhas secas servem de abrigo perfeito para animais peçonhentos.",
      },
      {
        titulo: "Evite plantas densas junto aos muros",
        descricao:
          "Trepadeiras e bananeiras encostadas na casa facilitam o acesso de aranhas e escorpiões ao telhado.",
      },
      {
        titulo: "Não pendure roupas direto na parede",
        descricao:
          "Peças encostadas na parede viram esconderijo fácil para aranhas-marrons e escorpiões.",
      },
      {
        titulo: "Evite acúmulo de sujeira e restos",
        descricao:
          "Restos de alimentos atraem baratas e ratos, que são as principais presas de escorpiões e cobras.",
      },
      {
        titulo: "Nunca tente remover colmeias sozinho",
        descricao:
          "Não se aproxime sem EPI adequado nem use máquinas barulhentas de jardinagem perto de enxames.",
      },
    ],
  },

  campo: {
    acoes: [
      {
        titulo: "Use botas de cano alto ou perneiras",
        descricao:
          "Protege pés e pernas — a grande maioria das picadas de serpentes ocorre abaixo dos joelhos.",
      },
      {
        titulo: "Proteja as mãos com luvas de couro",
        descricao:
          "Use luvas de raspa de couro ao manusear lenha, palha, sacarias e materiais armazenados.",
      },
      {
        titulo: "Inspecione roupas e botinas",
        descricao:
          "Sacuda e verifique o interior de calçados e vestimentas antes de colocar no corpo.",
      },
      {
        titulo: "Mantenha paióis limpos e sem ratos",
        descricao:
          "O controle de roedores e a limpeza de terreiros evitam a aproximação de serpentes.",
      },
      {
        titulo: "Redobre a atenção em locais escuros",
        descricao:
          "Tenha cautela extra ao mexer em ambientes quentes, úmidos e pouco iluminados.",
      },
      {
        titulo: "Chame profissionais para colmeias",
        descricao:
          "Evite passar pela rota de voo das abelhas e deixe a remoção para equipes equipadas.",
      },
    ],
    evite: [
      {
        titulo: "Nunca enfie as mãos em buracos",
        descricao:
          "Não coloque mãos desprotegidas sob pedras, troncos podres, cupinzeiros ou tocas.",
      },
      {
        titulo: "Não mexa desprotegido em palhadas",
        descricao:
          "Evite manipular palha de milho, feijão, cana ou dormentes sem botas e luvas.",
      },
      {
        titulo: "Não manuseie resíduos rurais sem EPI",
        descricao:
          "Entulhos e restos de colheita costumam abrigar serpentes, aranhas e escorpiões.",
      },
      {
        titulo: "Evite barulho de motores perto de abelhas",
        descricao:
          "Não se aproxime de colmeias sem proteção; vibrações e ruídos irritam o enxame.",
      },
    ],
  },

  trilha: {
    acoes: [
      {
        titulo: "Vista calça comprida e bota de trilha",
        descricao:
          "Use calçados fechados de cano alto e, se possível, perneiras de proteção.",
      },
      {
        titulo: "Olhe sempre por onde pisa",
        descricao:
          "Mantenha atenção constante no solo, raízes e vegetação rasteira durante a caminhada.",
      },
      {
        titulo: "Use um bastão para abrir caminho",
        descricao:
          "Mexa na vegetação à frente com um graveto ou bastão antes de dar o próximo passo.",
      },
      {
        titulo: "Desvie de rotas de voo de abelhas",
        descricao:
          "Observe a movimentação de enxames e afaste-se com calma caso note colmeias.",
      },
    ],
    evite: [
      {
        titulo: "Não apoie as mãos sem olhar",
        descricao:
          "Evite segurar em troncos ocos, vegetação fechada ou fendas de rochas sem verificar antes.",
      },
      {
        titulo: "Não saia da trilha demarcada",
        descricao:
          "Evite caminhar em mata fechada ou à noite sem iluminação adequada.",
      },
      {
        titulo: "Evite perfumes fortes e roupas escuras",
        descricao:
          "Cheiros intensos e cores escuras atraem e irritam abelhas e vespas.",
      },
      {
        titulo: "Não grite nem corra perto de enxames",
        descricao:
          "Movimentos bruscos e barulho excessivo provocam ataques defensivos das abelhas.",
      },
    ],
  },

  mar: {
    acoes: [
      {
        titulo: "Consulte o guarda-vidas antes de entrar",
        descricao:
          "Pergunte sobre a presença de águas-vivas e caravelas na praia naquele dia.",
      },
      {
        titulo: "Observe a bandeira lilás na praia",
        descricao:
          "A sinalização lilás nos postos indica alerta de águas-vivas e animais marinhos peçonhentos.",
      },
      {
        titulo: "Use calçados ao caminhar na areia",
        descricao:
          "Protege os pés contra animais encalhados ou escondidos na faixa de areia.",
      },
      {
        titulo: "Use roupa de neoprene no mergulho",
        descricao:
          "Cobrir a pele reduz drasticamente o risco de contato com tentáculos na água.",
      },
      {
        titulo: "Arraste os pés em rios e águas rasas",
        descricao:
          "A movimentação na areia espanta arraias antes que você pise nelas por acidente.",
      },
    ],
    evite: [
      {
        titulo: "Evite banho de mar em áreas com surto",
        descricao:
          "Não entre na água quando houver aviso ou grande quantidade de águas-vivas avistadas.",
      },
      {
        titulo: "Nunca toque em animais na areia",
        descricao:
          "Mesmo mortas ou fora d'água, águas-vivas e caravelas continuam liberando toxinas ao toque.",
      },
    ],
  },
};
