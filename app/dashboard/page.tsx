"use client";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { Sidebar } from "../components/sidebar/sidebar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ProjectChart } from "../components/dashboard/pipeline-chart";

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

const [companyName, setCompanyName] =
  useState("Cliente");

 useEffect(() => {

  async function loadDashboard() {

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    const { data: settings } =
  await supabase
    .from("pipelead_settings")
    .select("company_name")
    .eq(
      "user_id",
      session.user.id
    )
    .single();

if (settings?.company_name) {

  setCompanyName(
    settings.company_name
  );

}

    const { data: projects } =
      await supabase
        .from("pipelead_projects")
        .select("*")
        .eq(
          "user_id",
          session.user.id
        );

    const { data: leads } =
      await supabase
        .from("pipelead_leads")
        .select("*")
        .eq(
          "user_id",
          session.user.id
        );

    setTotalProjects(
      projects?.length || 0
    );

   const totalOpportunities =
  (projects || []).reduce(
    (
      total: number,
      project: any
    ) => {

      const count =
        (leads || []).filter(
          (lead: any) =>
            lead.project_id ===
            project.id
        ).length;

      return total + count;

    },
    0
  );

setTotalLeads(
  totalOpportunities
);

    const stats =
      (projects || []).map(
        (project: any) => {

          const projectLeads =
            (leads || []).filter(
              (lead: any) =>
                lead.project_id ===
                project.id
            );

          const grouped =
            projectLeads.reduce(
              (
                acc: any,
                lead: any
              ) => {

                acc[
                  lead.column_name
                ] =
                  (acc[
                    lead.column_name
                  ] || 0) + 1;

                return acc;

              },
              {}
            );

          const chartData =
            Object.entries(
              grouped
            ).map(
              ([name, value]) => ({
                name,
                value,
              })
            );

          return {
            name: project.name,
            total:
              projectLeads.length,
            chartData,
          };

        }
      );

    setProjectStats(stats);

  }

  loadDashboard();

}, []);
async function exportPDF() {
  const element =
    document.getElementById(
      "dashboard-report"
    );

  if (!element) return;

const button =
  document.querySelector(
    ".no-print"
  ) as HTMLElement;

if (button) {
  button.style.display = "none";
}

  
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

  if (button) {
  button.style.display = "block";
}
  const pdf =
    new jsPDF(
      "p",
      "mm",
      "a4"
    );

    // TÍTULO

  const cliente =
  companyName;

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
  `Relatorio-${companyName}-${dataAtual}.pdf`
);
}
  return (

    <main
  className="flex min-h-screen"
  style={{
  backgroundColor: "#f5f5f5",
  color: "#0f172a",
}}
>

      <Sidebar />

      <section
  id="dashboard-report"
  className="
    flex-1
    p-8
    ml-[200px]
  "
>
        <div className="flex justify-between items-center">

  <h1 className="text-3xl font-bold mb-6">
    Dashboard
  </h1>

 <button
  onClick={exportPDF}
  className="
    no-print
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
    grid-cols-[1fr_380px]
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
    gap-8
    w-[380px]
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
