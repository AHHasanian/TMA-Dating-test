"use client";

import { useEffect, useState } from "react";

export default function TelegramUser() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const telegram = window.Telegram?.WebApp;

    if (telegram) {
      telegram.ready();

      setUser(telegram.initDataUnsafe?.user ?? null);
    }

    setReady(true);
  }, []);

  if (!ready) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Telegram user not detected.</p>;
  }

  return (
    <div>
      <h2>Hello, {user.first_name} 👋</h2>
      <p>ID: {user.id}</p>

      {user.username && <p>Username: @{user.username}</p>}
    </div>
  );
}
