import Counter from "../components/Counter";

export default function Home() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  return (
    <main>
      <h1>{appName}</h1>
      <p>Welcome to my application.</p>

      <Counter />
    </main>
  );
}
