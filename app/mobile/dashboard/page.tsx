"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function MobileDashboard() {
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [projectStats, setProjectStats] = useState<any[]>([]);

 useEffect(() => {

  async function loadDashboard() {

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

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

    setTotalLeads(
      leads?.length || 0
    );

    setProjectStats(
      projects || []
    );

  }

  loadDashboard();

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
  ID: {project.id}
</p>

             <div className="mt-2">

  <p className="text-gray-500">
    Projeto ativo
  </p>

</div>

            </div>

          )
        )}

      </div>

    </main>
  );
}
