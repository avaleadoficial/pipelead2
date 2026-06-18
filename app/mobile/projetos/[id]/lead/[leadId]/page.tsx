"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MobileLeadPage() {

  const params = useParams();

  const leadId =
    params.leadId as string;

  const [lead, setLead] =
    useState<any>(null);

  useEffect(() => {

    async function loadLead() {

      const { data } =
        await supabase
          .from("pipelead_leads")
          .select("*")
          .eq("id", leadId)
          .single();

      setLead(data);

    }

    loadLead();

  }, [leadId]);

  if (!lead) {

    return (
      <div className="p-4">
        Carregando...
      </div>
    );

  }

  return (

    <main className="p-4 pb-24">

      <h1 className="text-3xl font-bold mb-6">
        {lead.name}
      </h1>

      <div className="bg-white rounded-3xl p-5 shadow space-y-4">

        <div>
          <p className="text-gray-500">
            Telefone
          </p>

          <p>
            {lead.phone}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Status
          </p>

          <p>
            {lead.column_name}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Observações
          </p>

          <p>
            {lead.notes || "-"}
          </p>
        </div>

      </div>

    </main>

  );

}
