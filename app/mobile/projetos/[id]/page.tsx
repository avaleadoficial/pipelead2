"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Pipeline } from "@/app/components/pipeline/pipeline";

export default function MobileProjetoPage() {

  const params = useParams();

  const projectId =
    params.id as string;

  const [projectName, setProjectName] =
    useState("");

  useEffect(() => {

    async function loadProject() {

      const {
        data: { session },
      } =
        await supabase.auth.getSession();

      if (!session) return;

      const { data } =
        await supabase
          .from("pipelead_projects")
          .select("*")
          .eq("id", projectId)
          .eq(
            "user_id",
            session.user.id
          )
          .single();

      if (data) {

        setProjectName(
          data.name
        );

      }

    }

    loadProject();

  }, [projectId]);

  return (

    <main
      className="
        min-h-screen
        bg-gray-100
        p-3
        pb-24
      "
    >

      <h1
        className="
          text-2xl
          font-bold
          mb-4
        "
      >
        {projectName}
      </h1>

      <Pipeline
        projectId={projectId}
      />

    </main>

  );

}
