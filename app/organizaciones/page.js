import portfolio from "@/data/portfolio";

export default function Organizaciones() {
  return (
    <main>
      {portfolio.organizations.map((org) => (
        <div key={org.id}>
          <h2>{org.name}</h2>
          <p>{org.type}</p>
        </div>
      ))}
    </main>
  );
}