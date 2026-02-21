import supabase from "@/lib/supabase";

export default async function Playground() {
  const { data: organizations, error } = await supabase
    .from("organizations")
    .select("*");

  if (error) {
    return <pre>Error: {error.message}</pre>;
  }

  return (
    <main>
      <h1>Playground</h1>
      <pre>{JSON.stringify(organizations, null, 2)}</pre>
    </main>
  );
}