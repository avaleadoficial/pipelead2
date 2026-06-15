"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MobileProjetosPage() {

  const [projects, setProjects] =
    useState<any[]>([]);

  useEffect(() => {

    const savedProjects =
      localStorage.getItem("projects");

    if (savedProjects) {

      setProjects(
        JSON.parse(savedProjects)
      );

    }

  }, []);

  return (

    <main className="min-h-screen bg-gray-100 p-4 pb-24">

      <h1 className="text-3xl font-bold mb-6">
        Projetos
      </h1>

      <div className="space-y-4">

        {projects.map((project) => (

          <Link
            key={project.id}
            href={`/mobile/projetos/${project.id}`}
            className="
              block
              bg-white
              rounded-3xl
              p-5
              shadow
            "
          >

            <p className="text-xl font-semibold">
              📁 {project.name}
            </p>

          </Link>

        ))}

      </div>

    </main>

  );
}
