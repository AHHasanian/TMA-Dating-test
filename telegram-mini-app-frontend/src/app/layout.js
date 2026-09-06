import Script from "next/script";
import "./globals.css";
import BottomNavigation from "@/components/BottomNavigation/BottomNavigation";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Telegram Mini App",
  description: "Telegram Mini App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <BottomNavigation />
        <AuthProvider>{children} </AuthProvider>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
