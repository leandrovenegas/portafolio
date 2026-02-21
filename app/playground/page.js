import portfolio from "@/data/portfolio";

export default function Playground() {
  return (
    <main>
      <pre>{JSON.stringify(portfolio, null, 2)}</pre>
    </main>
  );
}