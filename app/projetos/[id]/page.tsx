"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Pipeline } from "../../components/pipeline/pipeline";

export default function ProjetoPage() {

  const params = useParams();

  const projectId =
    params.id as string;

  const [projectName, setProjectName] =
    useState("");

  useEffect(() => {

  async function loadProject() {

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    const { data, error } =
      await supabase
        .from("pipelead_projects")
        .select("*")
        .eq("id", projectId)
        .eq("user_id", session.user.id)
        .single();

    console.log(data);
    console.log(error);

    if (data) {

      setProjectName(data.name);

    }

  }

  loadProject();

}, [projectId]);

  return (

    <div className="flex min-h-screen">

      <Sidebar />

     <main
  className="
    flex-1
    p-5
    min-h-screen
    ml-[200px]
  "
  style={{
    backgroundColor:
      "var(--background-color)",
    color:
      "var(--text-color)",
  }}
>

        <h1 className="text-3xl font-bold mb-6">
  {projectName}
</h1>

        <Pipeline
          projectId={projectId}
        />

      </main>

    </div>

  );
}
