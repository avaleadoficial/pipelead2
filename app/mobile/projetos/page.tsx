"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

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

  <Link
    key={project.id}
    href={`/mobile/projetos/${project.id}`}
  >

    <div
      className="
        border
        rounded-xl
        p-4
        mt-4
        bg-white
        shadow
      "
    >
      {project.name}
    </div>

  </Link>

))}

    </main>

  );
}
