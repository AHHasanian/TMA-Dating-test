"use client";

import { useEffect, useState } from "react";

export default function useTelegram() {
  const [telegram, setTelegram] = useState(null);

  useEffect(() => {
    if (!window.Telegram?.WebApp) {
      return;
    }

    const webApp = window.Telegram.WebApp;

    webApp.ready();

    setTelegram(webApp);
  }, []);

  return telegram;
}
