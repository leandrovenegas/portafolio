import portfolio from "@/data/portfolio";

export default function Home() {
  return (
    <main>
      <pre>{JSON.stringify(portfolio, null, 2)}</pre>
    </main>
  );
}