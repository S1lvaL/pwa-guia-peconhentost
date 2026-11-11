/*Para deixar o tipo de soro entendivel para nós pessoas leigas*/
const CANONICO: Record<string, string> = {
  Botrópico: "Botrópico",
  Crotálico: "Crotálico",
  Elapídico: "Elapídico",
  Laquético: "Laquético",
  Escorpiônico: "Escorpiônico",
  Araneídico: "Aracnídico",
  Aracnídico: "Aracnídico",
};
const ROTULO_SORO: Record<string, string> = {
  Botrópico: "Jararaca e afins (botrópico)",
  Crotálico: "Cascavel (crotálico)",
  Elapídico: "Coral-verdadeira (elapídico)",
  Laquético: "Surucucu (laquético)",
  Escorpiônico: "Escorpião (escorpiônico)",
  Aracnídico: "Aranha (aracnídico)",
};

export function rotuloSoro(nome: string): string {
  const chave = CANONICO[nome] ?? nome;
  return ROTULO_SORO[chave] ?? nome;
}

export function rotulosSoros(soros: string[]): string[] {
  const vistos = new Set<string>();
  const saida: string[] = [];
  for (const nome of soros) {
    const chave = CANONICO[nome] ?? nome;
    if (vistos.has(chave)) continue;
    vistos.add(chave);
    saida.push(rotuloSoro(nome));
  }
  return saida;
}
