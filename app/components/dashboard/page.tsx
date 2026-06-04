"use client";

import { useEffect, useState } from "react";

import { ProjectChart }
from "./pipeline-chart";

export default function DashboardPage() {

  const [totalLeads, setTotalLeads] =
    useState(0);

  const [totalProjects, setTotalProjects] =
    useState(0);

  const [projectStats, setProjectStats] =
    useState<any[]>([]);

  useEffect(() => {

    const savedProjects =
      localStorage.getItem(
        "projects"
      );

    if (!savedProjects) return;

    const projects =
      JSON.parse(savedProjects);

    setTotalProjects(
      projects.length
    );

    let leadsCount = 0;

    const stats: any[] = [];

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

        const chartData =
          columns.map(
            (column: any) => {

              const count =
                column.cards?.length || 0;

              total += count;

              return {
                name:
                  column.title,
                value:
                  count,
              };

            }
          );

        leadsCount += total;

        stats.push({
          name:
            project.name,
          total,
          chartData,
        });

      }
    );

    setTotalLeads(
      leadsCount
    );
console.log("PROJECTS", projects);
console.log("STATS", stats);
    setProjectStats(stats);

  }, []);

  return (

    <main
      className="
        p-8
        min-h-screen
      "
      style={{
        backgroundColor:
          "var(--background-color)",
        color:
          "var(--text-color)",
      }}
    >

      <h1 className="text-5xl font-bold mb-8">
        Dashboard
      </h1>
<div className="bg-red-500 text-white p-4">
  TESTE DASHBOARD
</div>
      <div className="grid grid-cols-2 gap-5">

        <div
          className="
            p-6
            rounded-3xl
            shadow
            bg-white
          "
        >

          <p className="text-gray-500">
            Oportunidades
          </p>

          <h2 className="text-5xl font-bold">
            {totalLeads}
          </h2>

        </div>

        <div
          className="
            p-6
            rounded-3xl
            shadow
            bg-white
          "
        >

          <p className="text-gray-500">
            Projetos
          </p>

          <h2 className="text-5xl font-bold">
            {totalProjects}
          </h2>

        </div>

      </div>

      <div className="mt-10">

        <h2
          className="
            text-2xl
            font-bold
            mb-5
          "
        >
          Projetos
        </h2>
<pre>
  {JSON.stringify(projectStats, null, 2)}
</pre>
        <div className="grid md:grid-cols-2 gap-5">

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

                <h3
                  className="
                    text-xl
                    font-bold
                  "
                >
                  {project.name}
                </h3>

                <p
                  className="
                    text-gray-500
                    mb-4
                  "
                >
                  {project.total}
                  {" "}
                  oportunidades
                </p>

                <div className="bg-red-500 text-white p-4 rounded mb-4">
  TESTE GRÁFICO
</div>

<ProjectChart
  data={project.chartData}
/>

              </div>

            )
          )}

        </div>

      </div>

    </main>

  );

}