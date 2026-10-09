import { useState } from "react";
import { Phone, X, TriangleAlert, CircleCheck, CircleX } from "lucide-react";
import type { Animal } from "../types/animal";
import { corPericulosidade } from "../utils/periculosidade";

interface ModalDetalhesProps {
  animal: Animal | null;
  onClose: () => void;
}

export function ModalDetalhes({ animal, onClose }: ModalDetalhesProps) {
  const [abaAtiva, setAbaAtiva] = useState<"socorros" | "donts">("socorros");

  if (!animal) return null;

  const corBadge = corPericulosidade(animal.periculosidade);

  return (
    //Fundo do modal ficar opaco e escurecido, cobrindo toda a tela
    <div className="fixed inset-0 z-40 bg-black/60 flex flex-col justify-end">
      {/*Fecha ao clicar fora*/}
      <div className="absolute inset-0" onClick={onClose} />

      {/*O Modal é posicionado acima do BottomNav*/}
      <div className="relative bg-white mx-2 sm:mx-6 lg:mx-auto lg:w-full lg:max-w-[800px] max-h-[calc(75vh-64px)] mb-[76px] rounded-[32px] p-[16px] flex flex-col gap-[12px] drop-shadow-[0px_-8px_12px_rgba(0,0,0,0.15)] z-10 animate-in slide-in-from-bottom duration-300 overflow-hidden">
        {/* Barra superior / Fechar (Fixo no topo)*/}
        <div className="flex items-center justify-between h-[32px] shrink-0">
          <div className="size-[32px]" />
          <div className="w-[48px] h-[5px] bg-[#d1d5db] rounded-[10px]" />
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="bg-[#f1f5f9] size-[32px] rounded-[16px] flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <X
              className="size-[16px] text-[#475569]"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </button>
        </div>

        {/*Conteúdo principal*/}
        <div className="flex-1 overflow-y-auto flex flex-col gap-[16px] pr-1">
          {/*Fotos/Galeria
            As imagens se ajustam automaticamente com forme o tamanho da tela*/}
          {Array.isArray(animal.imagem) ? (
            <div className="grid grid-cols-2 gap-2 shrink-0">
              {animal.imagem.map((imgUrl, index) => (
                <div
                  key={index}
                  className="aspect-square relative rounded-[12px] overflow-hidden bg-slate-100"
                >
                  <img
                    src={imgUrl}
                    alt={`${animal.nome} - foto ${index + 1}`}
                    className="size-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="aspect-video relative rounded-[13px] shrink-0 overflow-hidden bg-slate-100">
              <img
                src={animal.imagem}
                alt={animal.nome}
                className="size-full object-cover"
              />
            </div>
          )}

          {/*Nome e Categorias*/}
          <div className="flex flex-col gap-[10px] shrink-0">
            <h2 className="font-extrabold text-letra text-[26px] leading-tight">
              {animal.nome}
            </h2>
            <div className="flex gap-[8px] items-center">
              <span className="bg-verdeclaro-fundo text-verde-letra border border-cinza-borda px-[10px] py-[4px] rounded-[8px] font-bold text-[12px] capitalize shadow-sm shadow-[#0e3d10]/40 ml-2">
                {animal.categoria}
              </span>
              {corBadge && (
                <span
                  className={`px-[10px] py-[4px] rounded-[8px] font-bold text-[12px] shadow-sm ${corBadge}`}
                >
                  {animal.periculosidade}
                </span>
              )}
            </div>
          </div>

          {/*Sintomas Comuns*/}
          {animal.sintomas && (
            <div className="bg-destaque-fundo border border-destaque-borda p-[12px] rounded-[12px] flex gap-[12px] items-center shrink-0 ml-1">
              <div className="bg-[#fef3c7] size-[32px] rounded-[16px] flex items-center justify-center shrink-0">
                {/*Icone de alerta*/}
                <TriangleAlert
                  className="size-[18px] text-destaque-texto"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-col gap-[2px] ">
                <h4 className="font-bold text-destaque-texto text-[15px] leading-[18px]">
                  Sintomas Comuns
                </h4>
                <p className="font-medium text-letra text-[13px] leading-[18px]">
                  {animal.sintomas}
                </p>
              </div>
            </div>
          )}

          {/*Abas: Primeiros Socorros / O que NÃO fazer*/}
          <div className="flex flex-col gap-[12px] shrink-0 ml-2">
            <div className="flex gap-[8px]">
              <button
                onClick={() => setAbaAtiva("socorros")}
                className={`flex-1 py-[8px] px-[12px] rounded-[10px] flex items-center justify-center gap-[6px] font-bold text-[13px] transition-colors ${
                  abaAtiva === "socorros"
                    ? "bg-[#059669] text-white shadow-md shadow-verde-principal/35"
                    : "bg-[#f1f5f9] text-letra shadow-md shadow-vermelho-principal/20 "
                }`}
              >
                <span>Primeiros Socorros</span>
              </button>
              <button
                onClick={() => setAbaAtiva("donts")}
                className={`flex-1 py-[8px] px-[12px] rounded-[10px] flex items-center justify-center gap-[6px] font-bold text-[13px] transition-colors  ${
                  abaAtiva === "donts"
                    ? "bg-[#dc2626] text-white  shadow-md shadow-vermelho-principal/45"
                    : "bg-[#f1f5f9] text-letra shadow-md shadow-verde-principal/25"
                }`}
              >
                <span>O que NÃO Fazer</span>
              </button>
            </div>
            {/*Icones das Abas*/}
            <div className="flex flex-col gap-[8px]">
              {abaAtiva === "socorros"
                ? animal.primeirosSocorros?.map((item, index) => (
                    <div key={index} className="flex gap-[10px] items-center">
                      <CircleCheck
                        className="size-[16px] text-[#059669] shrink-0"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <p className="font-medium text-[#475569] text-[13px]">
                        {item}
                      </p>
                    </div>
                  ))
                : animal.oQueNaoFazer?.map((item, index) => (
                    <div key={index} className="flex gap-[10px] items-center">
                      <CircleX
                        className="size-[16px] text-[#dc2626] shrink-0"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <p className="font-medium text-[#475569] text-[13px]">
                        {item}
                      </p>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/*BOTÃO DE EMERGÊNCIA (Fixo na parte inferior do modal)
          Duvida, vai levar ao telefone?*/}
        <a
          href="tel:192"
          className="bg-vermelho-principal drop-shadow-[0px_4px_6px_rgba(220,38,38,0.25)] h-[56px] rounded-[16px] flex items-center justify-center gap-[12px] text-white font-bold text-[16px] shrink-0 mt-auto hover:bg-[#b91c1c] transition-colors"
        >
          {/*Icone de telefone*/}
          <Phone className="size-[20px]" strokeWidth={2} aria-hidden="true" />
          Emergência · Chamar SAMU (192)
        </a>
      </div>
    </div>
  );
}
