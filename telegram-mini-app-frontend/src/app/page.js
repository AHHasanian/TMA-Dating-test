// import TelegramUser from "../components/TelegramUser";

// export default function Home() {
//   const appName = process.env.NEXT_PUBLIC_APP_NAME;

//   return (
//     <main>
//       <h1>{appName}</h1>
//       <p>Welcome to my application 110.</p>

//       <TelegramUser />
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend request failed");
        }

        return response.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <main>
      <h1>Telegram Mini App</h1>

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}

      {error && <p>Error: {error}</p>}

      {!data && !error && <p>Connecting to backend...</p>}
    </main>
  );
}
