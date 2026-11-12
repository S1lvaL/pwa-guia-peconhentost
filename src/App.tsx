import { useState } from "react";
import Prevencao from "./pages/Prevencao";
import Animais from "./pages/Animais";
import Emergencia from "./pages/Emergencia";
import BottomNav from "./components/BottomNav";
import { RegiaoProvider } from "./context/RegiaoContexto"; // 1) novo import

type Tab = "animais" | "emergencia" | "prevencao";

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState<Tab>("emergencia");

  return (
    <RegiaoProvider>
      <div className="flex justify-center items-start min-h-screen bg-gray-300">
        <div className="relative flex flex-col w-full lg:max-w-[1024px] min-h-screen bg-verde-fundo shadow-xl overflow-x-clip pb-16">
          {/* Navegação de Telas*/}
          {abaAtiva === "prevencao" && (
            <Prevencao onVerTodos={() => setAbaAtiva("animais")} />
          )}

          {abaAtiva === "emergencia" && (
            <Emergencia />
          )}

          {abaAtiva === "animais" && <Animais />}

          {/*Barra de Navegação Inferior*/}
          <BottomNav abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />
        </div>
      </div>
    </RegiaoProvider>
  );
}
