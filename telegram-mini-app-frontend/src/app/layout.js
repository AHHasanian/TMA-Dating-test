import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "Telegram Mini App",
  description: "Telegram Mini App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}

        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
