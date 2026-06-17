"use client";

import { Sidebar } from "../components/sidebar/sidebar";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function ConfiguracoesPage() {

  const [companyName, setCompanyName] =
    useState("");

  const [logo, setLogo] =
    useState("");

 useEffect(() => {

  async function loadSettings() {

    const {
      data: { session },
    } = await supabase.auth.getSession();

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

  // SALVAR
 async function handleSave() {

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return;

  const payload = {
  user_id: session.user.id,
  company_name: companyName,
  company_logo: logo,
};

  const { error } = await supabase
    .from("pipelead_settings")
    .upsert(payload, {
      onConflict: "user_id",
    });

  if (error) {
    console.error(error);
    alert("Erro ao salvar");
    return;
  }


  alert("Configurações salvas!");

}

  // LOGO
  function handleLogoUpload(
    e: any
  ) {

    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend = () => {

      setLogo(
        reader.result as string
      );

    };

    reader.readAsDataURL(file);
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
  className="
    flex-1
    p-8
    ml-[200px]
  "
>

        <h1 className="text-3xl font-bold mb-8">
          Configurações
        </h1>

        <div className="bg-white rounded-3xl p-8 w-[700px] shadow space-y-8">

          {/* EMPRESA */}
          <div>

            <label className="block mb-2 font-medium">
              Nome da empresa
            </label>

            <input
              value={companyName}
              onChange={(e) =>
                setCompanyName(
                  e.target.value
                )
              }
              className="w-full border rounded-2xl p-4"
            />

          </div>

          {/* LOGO */}
          <div>

            <label className="block mb-2 font-medium">
              Logo da empresa
            </label>

            <label className="bg-black text-white px-5 py-3 rounded-2xl cursor-pointer inline-block mt-2">

  Escolher logo

  <input
    type="file"
    accept="image/*"
    onChange={handleLogoUpload}
    className="hidden"
  />

</label>

            {logo && (

              <img
                src={logo}
                className="w-24 h-24 rounded-2xl mt-4 object-cover"
              />

            )}

          </div>


          {/* BOTÃO */}
          <button
            onClick={handleSave}
            className="bg-black text-white px-8 py-4 rounded-2xl cursor-pointer"
          >
            Salvar configurações
          </button>

        </div>

      </section>

    </main>
  );
}
