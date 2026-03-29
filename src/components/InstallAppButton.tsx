"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export function InstallAppButton() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(() => {
    if (typeof window === "undefined") return false;
    const standaloneMedia = window.matchMedia("(display-mode: standalone)");
    return (
      standaloneMedia.matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    );
  });
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallEvent(null);
      setMessage("App installed successfully.");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (isInstalled) {
      setMessage("App is already installed on this device.");
      return;
    }

    if (installEvent) {
      await installEvent.prompt();
      const choice = await installEvent.userChoice;
      if (choice.outcome === "accepted") {
        setMessage("Great choice. Installing app...");
      } else {
        setMessage("Install dismissed. You can install any time from browser menu.");
      }
      return;
    }

    setMessage("Use browser menu and choose Install app or Add to Home Screen.");
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => void handleInstall()}
        className="border border-white/30 px-4 py-2 text-[10px] tracking-[0.2em] text-white/85 uppercase transition hover:bg-white hover:text-[#0d4039]"
      >
        Install App
      </button>
      {message ? <p className="mt-2 text-[10px] text-white/60">{message}</p> : null}
    </div>
  );
}
