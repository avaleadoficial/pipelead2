"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function MobileHeader() {

  const [companyName, setCompanyName] =
    useState("");

  const [logo, setLogo] =
    useState("");

  useEffect(() => {

    async function loadSettings() {

      const {
        data: { session },
      } =
        await supabase.auth.getSession();

      if (!session) return;

      const { data } =
        await supabase
          .from("pipelead_settings")
          .select("*")
          .eq(
            "user_id",
            session.user.id
          )
          .single();

      if (!data) return;

      setCompanyName(
        data.company_name || ""
      );

      setLogo(
        data.company_logo || ""
      );

    }

    loadSettings();

  }, []);

  return (

    <header
  className="
  fixed
  top-0
  left-0
  right-0
  h-16
  border-b
  z-50
  px-4
  flex
  items-center
"
  style={{
    backgroundColor: "var(--sidebar-color)",
    color: "var(--sidebar-text-color)",
    borderColor: "#3f3f46",
  }}
>

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

         <h1
  className="
    font-bold
    text-lg
  "
  style={{
    color: "var(--sidebar-text-color)",
  }}
>
  PipeLead CRM
</h1>

          <p
  className="text-xs"
  style={{
    color: "rgba(255,255,255,0.7)",
  }}
>
  {companyName}
</p>

        </div>

        {logo && (

          <img
            src={logo}
            className="
              w-10
              h-10
              rounded-full
              object-cover
            "
          />

        )}

      </div>

    </header>

  );

}
