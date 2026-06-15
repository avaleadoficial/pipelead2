"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MobileProjetoPage() {

  const params = useParams();

  const projectId =
    params.id as string;

  const [projectName, setProjectName] =
    useState("");

  const [columns, setColumns] =
    useState<any[]>([]);

  useEffect(() => {

    const savedProjects =
      localStorage.getItem(
        "projects"
      );

    if (savedProjects) {

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

    }

    const savedPipeline =
      localStorage.getItem(
        `pipeline-${projectId}`
      );

    if (savedPipeline) {

      setColumns(
        JSON.parse(savedPipeline)
      );

    }

  }, [projectId]);

  return (

    <main className="min-h-screen bg-gray-100 p-4 pb-24">

      <h1 className="text-3xl font-bold mb-6">
        {projectName}
      </h1>

      <div className="space-y-4">

        {columns.map(
          (column) => (

            <div
              key={column.id}
              className="
                bg-white
                rounded-3xl
                p-4
                shadow
              "
            >

              <div className="flex justify-between">

                <h2 className="font-bold">
                  {column.title}
                </h2>

                <span>
                  {column.cards.length}
                </span>

              </div>

            </div>

          )
        )}

      </div>

    </main>

  );
}
