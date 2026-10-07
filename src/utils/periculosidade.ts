import type { Animal } from "../types/animal";

const cores: Record<string, string> = {
  "Risco moderado":
    "bg-destaque-fundo text-destaque-texto border border-destaque-borda",
  "Perigo!":
    "bg-[#d18b86]/80 text-vermelho-principal border border-vermelho-borda/30 shadow-md shadow-vermelho-principal/20",
};

export function corPericulosidade(nivel: Animal["periculosidade"]) {
  return nivel ? cores[nivel] : undefined;
}
