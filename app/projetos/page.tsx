"use client";

import { Sidebar } from "../components/sidebar/sidebar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProjetosPage() {

  const [projects, setProjects] =
    useState<any[]>([]);

  const [projectName, setProjectName] =
    useState("");

  useEffect(() => {

  async function loadProjects() {

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    const { data, error } =
      await supabase
        .from("pipelead-projects")
        .select("*")
        .eq(
          "user_id",
          session.user.id
        );

    if (error) {

      console.log(error);
      return;

    }

    setProjects(data || []);

  }

  loadProjects();

}, []);
 async function createProject() {

  if (!projectName.trim()) return;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return;

  const { data, error } =
    await supabase
      .from("pipelead-projects")
      .insert({
        user_id: session.user.id,
        name: projectName,
      })
      .select()
      .single();

  if (error) {

    console.log(error);
    return;

  }

  setProjects([
    ...projects,
    data,
  ]);

  setProjectName("");

}

  return (

    <div className="flex">

      <Sidebar />

      <main
        className="flex-1 p-8 min-h-screen"
        style={{
          backgroundColor:
            "var(--background-color)",
          color:
            "var(--text-color)",
        }}
      >

        <h1 className="text-3xl font-bold mb-8">
          Projetos
        </h1>

        <div className="flex gap-3 mb-8">

          <input
            value={projectName}
            onChange={(e) =>
              setProjectName(
                e.target.value
              )
            }
            placeholder="Nome do projeto"
            className="
              border
              rounded-xl
              px-4
              py-3
              w-80
              text-black
            "
          />

          <button
            onClick={createProject}
            className="
              bg-black
              text-white
              px-5
              rounded-xl
            "
          >
            + Criar Projeto
          </button>

        </div>

        <div className="grid gap-4">

          {projects.map((project) => (

            <div
              key={project.id}
              className="
                border
                rounded-2xl
                p-5
                text-xl
                font-semibold
              "
            >
              📁 {project.name}
            </div>

          ))}

        </div>

      </main>

    </div>

  );
}
