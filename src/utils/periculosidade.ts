import type { Animal } from "../types/animal";

const cores: Record<string, string> = {
  "Risco moderado": "bg-[#d1a213] text-white border border-[#544103]/55",
  "Perigo!": "bg-vermelho-principal text-white border border-vermelho-borda/30",
};

export function corPericulosidade(nivel: Animal["periculosidade"]) {
  return nivel ? cores[nivel] : undefined;
}
