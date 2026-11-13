import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface SafariNavigator extends Navigator {
  standalone?: boolean;
}

function checkShouldShowIOSPrompt(): boolean {
  if (typeof window === "undefined") return false;
  //Verifica se o app já está aberto como aplicativo instalado na tela inicial
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as SafariNavigator).standalone === true;

  if (isStandalone) return false;
  if (sessionStorage.getItem("pwa-install-dismissed")) return false;

  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSPrompt] = useState<boolean>(checkShouldShowIOSPrompt);
  const [isVisible, setIsVisible] = useState<boolean>(checkShouldShowIOSPrompt);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as SafariNavigator).standalone === true;

    if (isStandalone || sessionStorage.getItem("pwa-install-dismissed")) {
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("pwa-install-dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-2xl border border-emerald-800/20 bg-white p-4 shadow-2xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-[#0e3d10]">
            Instale o Guia no seu celular
          </h3>
          <p className="mt-1 text-xs text-gray-600 leading-relaxed">
            Tenha acesso rápido às orientações de emergência mesmo{" "}
            <strong>sem conexão com a internet</strong>.
          </p>
        </div>

        <button
          onClick={handleClose}
          aria-label="Fechar aviso"
          className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {/*Exibido apenas quando há suporte à instalação direta*/}
      {deferredPrompt && (
        <div className="mt-3 flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="rounded-lg px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100"
          >
            Agora não
          </button>
          <button
            onClick={handleInstallClick}
            className="rounded-lg bg-[#0e3d10] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-900"
          >
            Instalar aplicativo
          </button>
        </div>
      )}

      {/*Para iOS / Safari (Instrução passo a passo) */}
      {showIOSPrompt && !deferredPrompt && (
        <div className="mt-3 rounded-xl bg-emerald-50/80 p-3 text-xs text-emerald-950">
          <p className="font-semibold">Como instalar no iPhone (iOS):</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4">
            <li>
              Abra este site obrigatoriamente pelo navegador{" "}
              <strong>Safari</strong>.
            </li>
            <li>
              Toque no ícone de <strong>Compartilhar</strong> (quadrado com seta
              para cima na barra inferior).
            </li>
            <li>
              Role para baixo e selecione{" "}
              <strong>"Adicionar à Tela de Início"</strong>.
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
