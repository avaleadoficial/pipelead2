"use client";

import { useEffect, useState } from "react";

export default function MobileProjetosPage() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const {
  data
} = await supabase
  .from("pipelead-projects")
  .select("*");

    console.log("PROJECTS:", savedProjects);

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  return (
    <main className="p-4">

      <h1 className="text-3xl font-bold">
        Projetos Mobile
      </h1>

      <p className="mt-4">
        Total: {projects.length}
      </p>

      {projects.map((project) => (
        <div
          key={project.id}
          className="
            border
            rounded-xl
            p-4
            mt-4
          "
        >
          {project.name}
        </div>
      ))}

    </main>
  );
}
