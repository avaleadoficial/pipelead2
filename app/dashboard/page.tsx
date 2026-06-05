"use client";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { Sidebar } from "../components/sidebar/sidebar";
import { useEffect, useState } from "react";
import { ProjectChart }
from "../components/dashboard/pipeline-chart";

const COLUMN_COLORS: Record<string, string> = {
  Conversando: "#eab308",
  Quente: "#f97316",
  Fechou: "#22c55e",
  "Achou caro": "#ef4444",
  "Falar em breve": "#3b82f6",
  "Parou de responder": "#8b5cf6",
  Desqualificado: "#6b7280",
};
export default function DashboardPage() {
  const [totalLeads, setTotalLeads] =
  useState(0);

const [totalProjects, setTotalProjects] =
  useState(0);

const [projectStats, setProjectStats] =
  useState<any[]>([]);

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

        const chartData =
  columns.map(
    (column: any) => ({
      name: column.title,
      value:
        column.cards?.length || 0,
    })
  );

stats.push({
  name: project.name,
  total,
  chartData,
});

      }
    );

    setTotalProjects(
  projects.length
);

  }

  setProjectStats(stats);

  setTotalLeads(
    totalLeadsCount
  );

}, []);

async function exportPDF() {
  const element =
    document.getElementById(
      "dashboard-report"
    );

  if (!element) return;

  const dataUrl = await toPng(
  element,
  {
    cacheBust: true,
    pixelRatio: 2,
    canvasWidth:
      element.scrollWidth,
    canvasHeight:
      element.scrollHeight,
  }
);

  const pdf =
    new jsPDF(
      "p",
      "mm",
      "a4"
    );

    // TÍTULO

  const cliente =
  localStorage.getItem(
    "company-name"
  ) || "Cliente";

const dataAtual =
  new Date().toLocaleDateString(
    "pt-BR"
  );
pdf.setFontSize(18);

pdf.text(
`Relatório de Oportunidades - ${cliente}`,
  105,
  15,
  {
    align: "center",
  }
);

// DATA
pdf.setFontSize(10);

pdf.text(
  `Gerado em: ${dataAtual}`,
  105,
  22,
  {
    align: "center",
  }
);

// IMAGEM DO DASHBOARD
const imgProps =
  pdf.getImageProperties(
    dataUrl
  );

const pdfWidth = 190;

const pdfHeight =
  (imgProps.height *
    pdfWidth) /
  imgProps.width;

pdf.addImage(
  dataUrl,
  "PNG",
  10,
  30,
  pdfWidth,
  pdfHeight
);

// RODAPÉ
pdf.setFontSize(8);

pdf.text(
  "AVALEAD",
  105,
  290,
  {
    align: "center",
  }
);

  

pdf.save(
  `Relatorio-${cliente}-${dataAtual}.pdf`
);
}
  return (

    <main
  className="flex h-screen"
  style={{
    backgroundColor:
      "var(--background-color)",
    color:
      "var(--text-color)",
  }}
>

      <Sidebar />

      <section
  id="dashboard-report"
  className="flex-1 p-8"
>

        <div className="flex justify-between items-center">

  <h1 className="text-3xl font-bold">
    Dashboard
  </h1>

  <button
    onClick={exportPDF}
    className="
      bg-black
      text-white
      px-5
      py-3
      rounded-2xl
      hover:opacity-90
      cursor-pointer
    "
  >
    Exportar Relatório PDF
  </button>

</div>

        <div className="grid grid-cols-2 gap-5 mt-8">

          <div
            className="
              p-8
              rounded-3xl
              shadow
            "
            style={{
              backgroundColor:
                "rgba(255,255,255,0.8)",
            }}
          >

            <p className="text-gray-500 text-lg">
              Leads
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {totalLeads}
            </h2>

            <p className="text-gray-500 mt-3">
              Total de oportunidades
            </p>

          </div>

          <div
            className="
              p-8
              rounded-3xl
              shadow
            "
            style={{
              backgroundColor:
                "rgba(255,255,255,0.8)",
            }}
          >

            <p className="text-gray-500 text-lg">
              Projetos
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {totalProjects}
            </h2>

            <p className="text-gray-500 mt-3">
              Projetos ativos
            </p>

          </div>

        </div>
<div className="mt-10">

  <h2 className="text-2xl font-bold mb-5">
    Projetos
  </h2>

  <div className="space-y-3">

    {projectStats.map(
      (project) => (

        <div
  key={project.name}
  className="
    p-5
    rounded-2xl
    shadow
  "
  style={{
    backgroundColor:
      "rgba(255,255,255,0.8)",
  }}
>

  <div
  className="
    grid
    grid-cols-[1fr_500px]
    items-center
  "
>

    <div>

      <p className="font-semibold">
        {project.name}
      </p>

      <p className="opacity-70">
        {project.total}
        {" "}
        oportunidades
      </p>

    </div>

    <div
  className="
    flex
    justify-end
    items-center
    gap-16
    w-[500px]
    ml-auto
  "
>

  <div
  className="
    w-48
    h-48
    shrink-0
  "
>

    <ProjectChart
      data={project.chartData}
    />

  </div>

  <div
  className="
    w-[180px]
    space-y-2
  "
>

    {project.chartData
      .filter(
        (item: any) =>
          item.value > 0
      )
      .map(
        (
          item: any,
          index: number
        ) => (

          <div
            key={item.name}
            className="
              flex
              items-center
              gap-2
            "
          >

            <div
  className="
    w-3
    h-3
    rounded-full
  "
  style={{
    background:
  COLUMN_COLORS[
    item.name.trim()
  ] || "#9ca3af",
  }}
/>
            <span
  className="
    whitespace-nowrap
    text-sm
  "
>
  {item.name}
</span>

            <span
              className="
                text-gray-500
              "
            >
              ({item.value})
            </span>

          </div>

        )
      )}

  </div>

</div>
  </div>

</div>

      )
    )}

  </div>

</div>
      </section>

    </main>

  );

}
