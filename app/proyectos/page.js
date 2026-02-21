import portfolio from "@/data/portfolio";

export default function Proyectos() {
  return (
    <main>
      {portfolio.projects.map((project) => (
        <div key={project.id}>
          <h2>{project.title}</h2>
          <p>{project.date}</p>
          <p>{project.status}</p>
        </div>
      ))}
    </main>
  );
}