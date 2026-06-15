"use client";

import { useEffect, useState } from "react";

export default function MobileDashboard() {
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [projectStats, setProjectStats] = useState<any[]>([]);

  useEffect(() => {
    const savedProjects =
      localStorage.getItem("projects");

    let totalLeadsCount = 0;
    const stats: any[] = [];

    if (savedProjects) {
      const projects =
        JSON.parse(savedProjects);

      projects.forEach(
        (project: any) => {

          const savedPipeline =
            localStorage.getItem(
              `pipeline-${project.id}`
            );

          if (!savedPipeline)
            return;

          const columns =
            JSON.parse(savedPipeline);

          let total = 0;

          columns.forEach(
            (column: any) => {
              total +=
                column.cards?.length || 0;
            }
          );

          totalLeadsCount += total;

          stats.push({
            name: project.name,
            total,
            columns:
              columns.filter(
                (column: any) =>
                  column.cards?.length > 0
              ),
          });
        }
      );

      setTotalProjects(
        projects.length
      );
    }

    setProjectStats(stats);
    setTotalLeads(totalLeadsCount);

  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-4 pb-24">

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="space-y-4">

        <div className="bg-white rounded-3xl p-6 shadow">
          <p className="text-gray-500">
            Leads
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalLeads}
          </h2>

          <p className="text-gray-500 mt-2">
            Total de oportunidades
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <p className="text-gray-500">
            Projetos
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalProjects}
          </h2>

          <p className="text-gray-500 mt-2">
            Projetos ativos
          </p>
        </div>

      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Projetos
      </h2>

      <div className="space-y-4">

        {projectStats.map(
          (project) => (

            <div
              key={project.name}
              className="
                bg-white
                rounded-3xl
                p-5
                shadow
              "
            >

              <h3 className="font-bold text-lg">
                {project.name}
              </h3>

              <p className="text-gray-500 mt-1">
                {project.total}
                {" "}
                oportunidades
              </p>

              <div className="mt-4 space-y-2">

                {project.columns.map(
                  (column: any) => (

                    <div
                      key={column.title}
                      className="
                        flex
                        justify-between
                        items-center
                        bg-gray-50
                        rounded-xl
                        px-3
                        py-2
                      "
                    >

                      <span>
                        {column.title}
                      </span>

                      <span className="font-semibold">
                        {column.cards.length}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

          )
        )}

      </div>

    </main>
  );
}
