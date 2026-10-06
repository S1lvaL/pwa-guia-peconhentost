//Importa os ícones visuais da biblioteca lucide-react
import { ShieldAlert, Bug, ShieldCheck } from "lucide-react";

interface BottomNavProps {
  //guarda qual das três abas está ativa
  abaAtiva: "animais" | "emergencia" | "prevencao";
  //Função para atualizar a aba selecionada
  setAbaAtiva: (aba: "animais" | "emergencia" | "prevencao") => void;
}

export default function BottomNav({ abaAtiva, setAbaAtiva }: BottomNavProps) {
  return (
    //Trava e limita a barra de navegação
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 w-full max-w-full mx-auto shadow-md shadow-verde-principal/60 z-50">
      {/* Botão da Aba Animais */}
      <button
        onClick={() => setAbaAtiva("animais")} //Ao clicar, atualiza a aba ativa para "animais"
        className={`flex flex-col items-center text-xs font-medium ${
          abaAtiva === "animais"
            ? "text-vermelho-principal  font-bold"
            : "text-verde-principal" //Se a aba for ativa adiciona a cor de destaque
        }`}
      >
        <Bug className="w-6 h-6 mb-1" /> {/*Estilizando o botão*/}
        Animais
      </button>

      {/*Botão da Aba Emergencia*/}
      <button
        onClick={() => setAbaAtiva("emergencia")}
        className={`flex flex-col items-center text-xs font-medium ${
          abaAtiva === "emergencia"
            ? "text-vermelho-principal  font-bold"
            : "text-verde-principal"
        }`}
      >
        <ShieldAlert className="w-6 h-6 mb-1" />
        Emergência
      </button>

      {/*Botão da Aba Prevenção*/}
      <button
        onClick={() => setAbaAtiva("prevencao")}
        className={`flex flex-col items-center text-xs font-medium ${
          abaAtiva === "prevencao"
            ? "text-vermelho-principal font-bold"
            : "text-verde-principal"
        }`}
      >
        <ShieldCheck className="w-6 h-6 mb-1" />
        Prevenção
      </button>
    </nav>
  );
}
