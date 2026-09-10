import { useState } from "react";
import BottomNav from "./components/BottomNav";
import Animais from "./pages/Animais";
import Emergencia from "./pages/Emergencia";
import Prevencao from "./pages/Prevencao";

function App() {
  const [abaAtiva, setAbaAtiva] = useState<
    "animais" | "emergencia" | "prevencao"
  >("animais");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between max-w-md mx-auto relative pb-20">
      <main className="flex-1 p-4">
        {abaAtiva === "animais" && <Animais />}
        {abaAtiva === "emergencia" && <Emergencia />}
        {abaAtiva === "prevencao" && <Prevencao />}
      </main>

      <BottomNav abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />
    </div>
  );
}

export default App;
