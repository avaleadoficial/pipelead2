"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function MobileProjetoPage() {

  const router = useRouter();

  const params = useParams();

  const projectId =
    params.id as string;

  const [projectName, setProjectName] =
    useState("");

  const [columns, setColumns] =
    useState<any[]>([]);

  useEffect(() => {

    async function loadProject() {

      const {
        data: { session },
      } =
        await supabase.auth.getSession();

      if (!session) return;

      const { data: project } =
        await supabase
          .from("pipelead_projects")
          .select("*")
          .eq("id", projectId)
          .eq(
            "user_id",
            session.user.id
          )
          .single();

      if (project) {

        setProjectName(
          project.name
        );

      }

      const { data: leads } =
        await supabase
          .from("pipelead_leads")
          .select("*")
          .eq(
            "project_id",
            projectId
          );

      const grouped = [
        "Conversando",
        "Quente",
        "Fechou",
        "Achou caro",
        "Falar em breve",
        "Parou de responder",
        "Desqualificado",
      ].map((column) => ({
        id: column,
        title: column,
        cards:
          leads?.filter(
            (lead: any) =>
              lead.column_name ===
              column
          ) || [],
      }));

      setColumns(grouped);

    }

    loadProject();

  }, [projectId]);

 return (

  <main className="min-h-screen bg-gray-100 p-4 pb-24">

    <button
      onClick={() => router.back()}
      className="
        mb-4
        text-sm
        opacity-70
      "
    >
      ← Voltar
    </button>

    <h1 className="text-3xl font-bold mb-6">
      {projectName}
    </h1>

      <div
  className="
    flex
    gap-4
    overflow-x-auto
    pb-4
  "
>

       {columns.map(
  (column) => (

    <div
  key={column.id}
  className="
    min-w-[300px]
    max-w-[300px]
    bg-white
    rounded-3xl
    p-4
    shadow
    shrink-0
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

      <div className="mt-4 space-y-3">

        {column.cards.map(
          (lead: any) => (

            <div
              key={lead.id}
              className="
                bg-gray-50
                rounded-2xl
                p-3
              "
            >

              <p className="font-semibold">
                {lead.name}
              </p>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                {lead.phone}
              </p>

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
