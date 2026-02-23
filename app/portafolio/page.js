import supabase from "@/lib/supabase";
import Link from "next/link";

export default async function Portafolio() {
  const { data: organizaciones, error } = await supabase
    .from("organizations")
    .select("*");

  if (error) return <pre>Error: {error.message}</pre>;

  return (
    <main>
      <h1>Portafolio</h1>
      {organizaciones.map((org) => (
        <div key={org.id}>
          <h2>{org.name}</h2>
          <p>{org.type}</p>
          <Link href={`/portafolio/${org.slug}`}>Ver proyectos</Link>
        </div>
      ))}
    </main>
  );
}