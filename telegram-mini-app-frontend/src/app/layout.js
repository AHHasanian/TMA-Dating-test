import "./globals.css";

export const metadata = {
  title: "Telegram Mini App",
  description: "Telegram Mini App",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
