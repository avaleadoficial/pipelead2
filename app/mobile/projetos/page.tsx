"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MobileProjetosPage() {

  const [projects, setProjects] =
    useState<any[]>([]);

  useEffect(() => {

  async function loadProjects() {

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return;

  const {
    data,
    error,
  } = await supabase
    .from("pipelead_projects")
    .select("*")
    .eq(
      "user_id",
      session.user.id
    );

  console.log(data);

  if (!error && data) {
    setProjects(data);
  }

}

    loadProjects();

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
