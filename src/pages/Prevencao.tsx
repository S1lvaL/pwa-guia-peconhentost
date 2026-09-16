import { useState } from "react";
//Mudar as informações de prevenção de acordo com a área selecionada (casa, campo, trilha, mar e geral
//Dados divididos por estado: nulo
const dadosPrevencao = {
  geral: [
    "Mantenha o quintal limpo e evite o acúmulo de entulhos ou lixo doméstico.",
    "Sacuda roupas e calçados antes de usá-los para certificar-se de que não há animais.",
    "Evite colocar as mãos diretamente em buracos, sob pedras ou troncos podres.",
    "Não mexa em pilhas de tijolos, telhas ou lenha sem calçados e luvas de proteção.",
    "Vede frestas e buracos em paredes, portas e pisos para evitar pontos de abrigo.",
  ],
  //Dados específicos por área
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

export default function Prevencao() {
  //Estado inicial como null (nenhum filtro selecionado)
  const [areaAtiva, setAreaAtiva] = useState<
    "casa" | "campo" | "trilha" | "mar" | null
  >(null);
  const [itensChecados, setItensChecados] = useState<Record<string, boolean>>(
    {},
  );

  const toggleCheck = (item: string) => {
    setItensChecados((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  //Cálculo de progresso (somente ativo quando um filtro for escolhido)
  const areaSelecionada = areaAtiva ? dadosPrevencao[areaAtiva] : null;
  const todosOsItens = areaSelecionada
    ? [...areaSelecionada.domestica, ...areaSelecionada.evite]
    : [];
  const totalItens = todosOsItens.length;
  const totalConcluidos = todosOsItens.filter(
    (item) => itensChecados[item],
  ).length;
  const porcentagem =
    totalItens > 0 ? Math.round((totalConcluidos / totalItens) * 100) : 0;

  return (
    <div className="bg-[#efefef] min-h-screen flex flex-col justify-between max-w-[390px] mx-auto pb-10">
      <div className="p-4 space-y-5 flex-1">
        {/* AppHeader */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-[32px] font-extrabold leading-[32px] text-[#0e3d10]">
              Sistema de prevenção
            </h1>
            <p className="text-[12px] font-bold text-[#0e3d10]/70 uppercase tracking-wide mt-1">
              informação hoje, segurança sempre
            </p>
          </div>
          <div className="bg-[#fef3c7] px-3 py-2 rounded-[20px] flex items-center space-x-1.5 shrink-0">
            <div className="w-2 h-2 rounded-full bg-[#601212]" />
            <span className="text-[12px] font-bold text-[#601212]">Logo</span>
          </div>
        </div>

        {/* SafetyAreaContainer */}
        <div className="bg-[#a9f69a]/70 border border-[#0e3d10] p-4 rounded-[24px] space-y-4 shadow-sm">
          <div>
            <h2 className="text-[18px] font-bold text-[#0e3d10] leading-tight">
              Prevenção e segurança por área
            </h2>
            <p className="text-[13px] font-medium text-[#0e3d10] mt-0.5">
              Selecione o cenário para listar as tarefas:
            </p>
          </div>

          {/* Botões de Filtro */}
          <div className="flex gap-2">
            {(["casa", "campo", "trilha", "mar"] as const).map((area) => {
              const isActive = areaAtiva === area;
              return (
                <button
                  key={area}
                  onClick={() => setAreaAtiva(isActive ? null : area)}
                  className={`flex-1 py-2.5 rounded-[12px] text-[14px] font-bold capitalize transition border ${
                    isActive
                      ? "bg-[#0e3d10] text-white border-[#a9f69a]/80"
                      : "bg-[#a9f69a] text-[#0e3d10] border-[#0e3d10]"
                  }`}
                >
                  {area}
                </button>
              );
            })}
          </div>

          {/* Exibe o Progresso SOMENTE quando algum filtro estiver ativo */}
          {areaAtiva && (
            <div className="space-y-1.5 pt-1">
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((segIndex) => {
                  const preenchido = (porcentagem / 100) * 4 > segIndex;
                  return (
                    <div
                      key={segIndex}
                      className={`h-[6px] flex-1 rounded-[3px] transition-colors duration-300 ${
                        preenchido ? "bg-[#0e3d10]" : "bg-[#c0d1bd]"
                      }`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-[11px] text-[#6b7280]">
                <span className="font-semibold">Progresso do plano</span>
                <span className="font-bold">{porcentagem}% concluído</span>
              </div>
            </div>
          )}
        </div>

        {/* VISÃO INICIAL (Sem filtro ativo) */}
        {!areaAtiva ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-5 bg-[#c0d1bd] rounded-sm" />
              <h3 className="text-[16px] font-bold text-[#0e3d10]">
                Dicas de manejo do ambiente
              </h3>
            </div>

            <div className="space-y-2">
              {dadosPrevencao.geral.map((item, idx) => {
                const isChecked = !!itensChecados[item];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCheck(item)}
                    className="bg-[#a9f69a]/80 border border-[#0e3d10] p-4 rounded-[16px] flex items-center space-x-4 cursor-pointer shadow-[0px_4px_8px_0px_rgba(0,0,0,0.03)]"
                  >
                    <div
                      className={`w-6 h-6 rounded-[12px] border-2 border-[#d1d5db] bg-white flex items-center justify-center shrink-0 ${isChecked ? "border-[#0e3d10] bg-emerald-100" : ""}`}
                    >
                      {isChecked && (
                        <div className="w-3 h-3 bg-[#0e3d10] rounded-sm" />
                      )}
                    </div>
                    <p
                      className={`text-[14px] font-medium text-[#1f2937] leading-snug flex-1 ${isChecked ? "line-through opacity-60" : ""}`}
                    >
                      {item}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* VISÃO COM FILTRO ATIVADO */
          <>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-5 bg-[#c0d1bd] rounded-sm" />
                <h3 className="text-[16px] font-bold text-[#0e3d10] capitalize">
                  Prevenção {areaAtiva}
                </h3>
              </div>

              <div className="space-y-2">
                {areaSelecionada?.domestica.map((item, idx) => {
                  const isChecked = !!itensChecados[item];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCheck(item)}
                      className="bg-[#a9f69a]/80 border border-[#0e3d10] p-4 rounded-[16px] flex items-center space-x-4 cursor-pointer shadow-[0px_4px_8px_0px_rgba(0,0,0,0.03)]"
                    >
                      <div
                        className={`w-6 h-6 rounded-[12px] border-2 border-[#d1d5db] bg-white flex items-center justify-center shrink-0 ${isChecked ? "border-[#0e3d10] bg-emerald-100" : ""}`}
                      >
                        {isChecked && (
                          <div className="w-3 h-3 bg-[#0e3d10] rounded-sm" />
                        )}
                      </div>
                      <p
                        className={`text-[14px] font-medium text-[#1f2937] leading-snug flex-1 ${isChecked ? "line-through opacity-60" : ""}`}
                      >
                        {item}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-5 bg-[#c0d1bd] rounded-sm" />
                <h3 className="text-[16px] font-bold text-[#0e3d10]">Evite</h3>
              </div>

              <div className="space-y-2">
                {areaSelecionada?.evite.map((item, idx) => {
                  const isChecked = !!itensChecados[item];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCheck(item)}
                      className="bg-[#a9f69a]/80 border border-[#0e3d10] p-4 rounded-[16px] flex items-center space-x-4 cursor-pointer shadow-[0px_4px_8px_0px_rgba(0,0,0,0.03)]"
                    >
                      <div
                        className={`w-6 h-6 rounded-[12px] border-2 border-[#d1d5db] bg-white flex items-center justify-center shrink-0 ${isChecked ? "border-[#0e3d10] bg-emerald-100" : ""}`}
                      >
                        {isChecked && (
                          <div className="w-3 h-3 bg-[#0e3d10] rounded-sm" />
                        )}
                      </div>
                      <p
                        className={`text-[14px] font-medium text-[#1f2937] leading-snug flex-1 ${isChecked ? "line-through opacity-60" : ""}`}
                      >
                        {item}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
