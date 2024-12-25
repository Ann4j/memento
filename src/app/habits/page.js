"use client"
import { useEffect, useState } from 'react';

export default function MyComponent() {
  const [tg, setTg] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram) {
      const webApp = window.Telegram.WebApp;
      webApp.ready();
      setTg(webApp);
    }
  }, []);

  return (
    <div>
      <h1>Моё мини-приложение</h1>
      {tg && <p>WebApp есть, можем работать с ним!</p>}
    </div>
  );
}