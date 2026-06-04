"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Sidebar } from "../../components/sidebar/sidebar";
import { Pipeline } from "../../components/pipeline/pipeline";

export default function ProjetoPage() {

  const params = useParams();

  const projectId =
    params.id as string;

  const [projectName, setProjectName] =
    useState("");

  useEffect(() => {

    const savedProjects =
      localStorage.getItem(
        "projects"
      );

    if (!savedProjects) return;

    const projects =
      JSON.parse(savedProjects);

    const project =
      projects.find(
        (p: any) =>
          p.id === projectId
      );

    if (project) {

      setProjectName(
        project.name
      );

    }

  }, [projectId]);

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

        <h1 className="text-5xl font-bold mb-8">
          {projectName}
        </h1>

        <Pipeline
          projectId={projectId}
        />

      </main>

    </div>

  );
}