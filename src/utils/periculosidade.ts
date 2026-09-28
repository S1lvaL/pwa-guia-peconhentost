import type { Animal } from "../types/animal";

export function corPericulosidade(nivel: Animal["periculosidade"]) {
  const cores = {
    Baixa: "bg-destaque-borda text-white",
    Media: "bg-destaque-texto text-white",
    Alta: "bg-vermelho-principal text-white",
  };
  return cores[nivel ?? "Alta"];
}
