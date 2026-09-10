import { ShieldAlert, Bug, ShieldCheck } from "lucide-react";

interface BottomNavProps {
  abaAtiva: "animais" | "emergencia" | "prevencao";
  setAbaAtiva: (aba: "animais" | "emergencia" | "prevencao") => void;
}

export default function BottomNav({ abaAtiva, setAbaAtiva }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 max-w-md mx-auto shadow-lg z-50">
      <button
        onClick={() => setAbaAtiva("animais")}
        className={`flex flex-col items-center text-xs font-medium ${
          abaAtiva === "animais" ? "text-green-600 font-bold" : "text-gray-500"
        }`}
      >
        <Bug className="w-6 h-6 mb-1" />
        Animais
      </button>

      <button
        onClick={() => setAbaAtiva("emergencia")}
        className={`flex flex-col items-center text-xs font-medium ${
          abaAtiva === "emergencia" ? "text-red-600 font-bold" : "text-gray-500"
        }`}
      >
        <ShieldAlert className="w-6 h-6 mb-1" />
        Emergência
      </button>

      <button
        onClick={() => setAbaAtiva("prevencao")}
        className={`flex flex-col items-center text-xs font-medium ${
          abaAtiva === "prevencao"
            ? "text-green-600 font-bold"
            : "text-gray-500"
        }`}
      >
        <ShieldCheck className="w-6 h-6 mb-1" />
        Prevenção
      </button>
    </nav>
  );
}
