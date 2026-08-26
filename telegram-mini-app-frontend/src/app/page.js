import TelegramUser from "../components/TelegramUser";

export default function Home() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  return (
    <main>
      <h1>{appName}</h1>
      <p>Welcome to my application 110.</p>

      <TelegramUser />
    </main>
  );
}
