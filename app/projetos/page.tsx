"use client";

import { Sidebar } from "../components/sidebar/sidebar";
import { useEffect, useState } from "react";

export default function ProjetosPage() {

  const [projects, setProjects] =
    useState<any[]>([]);

  const [projectName, setProjectName] =
    useState("");

  useEffect(() => {

    const savedProjects =
      localStorage.getItem("projects");

    if (savedProjects) {

      setProjects(
        JSON.parse(savedProjects)
      );

    }

  }, []);

  function createProject() {

    if (!projectName.trim()) return;

    const newProject = {

      id: Date.now().toString(),

      name: projectName,

    };

    const defaultPipeline = [

  {
    id: Date.now() + "-1",
    title: "Conversando",
    cards: [],
  },

  {
    id: Date.now() + "-2",
    title: "Quente",
    cards: [],
  },

  {
    id: Date.now() + "-3",
    title: "Fechou",
    cards: [],
  },

  {
    id: Date.now() + "-4",
    title: "Achou caro",
    cards: [],
  },

  {
    id: Date.now() + "-5",
    title: "Falar em breve",
    cards: [],
  },

  {
    id: Date.now() + "-6",
    title: "Parou de responder",
    cards: [],
  },

  {
    id: Date.now() + "-7",
    title: "Desqualificado",
    cards: [],
  },

];

    const updatedProjects = [
      ...projects,
      newProject,
    ];

    setProjects(updatedProjects);

    localStorage.setItem(
      "projects",
      JSON.stringify(updatedProjects)
    );

    localStorage.setItem(
  `pipeline-${newProject.id}`,
  JSON.stringify(defaultPipeline)
);
console.log(
  "Pipeline criado:",
  `pipeline-${newProject.id}`
);

console.log(defaultPipeline);
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
