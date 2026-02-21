import supabase from "@/lib/supabase";

export default async function Organizaciones() {
  const { data: organizaciones, error } = await supabase
    .from("organizations")
    .select("*");

  if (error) return <pre>Error: {error.message}</pre>;

  return (
    <main>
      <h1>Organizaciones</h1>
      {organizaciones.map((org) => (
        <div key={org.id}>
          <h2>{org.name}</h2>
          <p>{org.type}</p>
          {org.website && <a href={org.website}>{org.website}</a>}
        </div>
      ))}
    </main>
  );
}