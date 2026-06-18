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
    snap-x
    snap-mandatory
    pb-4
  "
>

       {columns.map(
  (column) => (

    <div
  key={column.id}
  className="
    w-[85vw]
    bg-white
    rounded-3xl
    p-4
    shadow
    shrink-0
    snap-center
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

    <Link
      key={lead.id}
      href={`/mobile/projetos/${projectId}/lead/${lead.id}`}
    >

      <div
        className="
          bg-gray-50
          rounded-2xl
          p-3
          cursor-pointer
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

    </Link>

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
