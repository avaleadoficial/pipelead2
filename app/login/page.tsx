"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {

    async function checkUser() {

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {

  const isMobile =
    window.innerWidth < 768;

  if (isMobile) {

    router.replace(
      "/mobile/dashboard"
    );

  } else {

    router.replace(
      "/dashboard"
    );

  }

}

    }

    checkUser();

  }, [router]);

  async function handleLogin() {

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

    if (error) {
      alert(error.message);
      return;
    }

    const isMobile =
  window.innerWidth < 768;

if (isMobile) {

  router.push(
    "/mobile/dashboard"
  );

} else {

  router.push(
    "/dashboard"
  );

}
  }

  return (

    <main
      className="
        min-h-screen
        flex
        items-center
        justify-center
      "
      style={{
        backgroundColor:
          "var(--background-color)",
      }}
    >

      <div
        className="
          bg-white
          p-10
          rounded-3xl
          w-[420px]
          shadow-xl
        "
      >

        <div className="text-center mb-8">

          <h1
            className="text-6xl font-bold mb-3"
            style={{
              color: "#6D213C",
            }}
          >
            PipeLead
          </h1>

          <p className="text-gray-500 text-lg">
            Seu CRM de vendas personalizado
          </p>

        </div>

        <input
          placeholder="E-mail"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            w-full
            border
            p-4
            rounded-2xl
            mb-4
            text-black
          "
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) =>
            setSenha(e.target.value)
          }
          className="
            w-full
            border
            p-4
            rounded-2xl
            mb-2
            text-black
          "
        />

        <button
          className="
            text-sm
            text-gray-500
            hover:underline
            mb-6
          "
        >
          Esqueceu sua senha?
        </button>

        <button
          onClick={handleLogin}
          className="
            w-full
            text-white
            p-4
            rounded-2xl
            font-medium
          cursor-pointer
          "
          style={{
            backgroundColor: "#000000",
          }}
        >
          Entrar
        </button>

        <div className="flex items-center gap-3 my-6">

          <div className="flex-1 h-px bg-gray-200" />

          <span className="text-gray-400 text-sm">
            ou
          </span>

          <div className="flex-1 h-px bg-gray-200" />

        </div>

        <button
          onClick={() => router.push("/cadastro")}
          className="
            w-full
            border
            p-4
            rounded-2xl
            text-black
            hover:bg-gray-50
          cursor-pointer
          "
        >
          Criar nova conta
        </button>

      </div>

    </main>

  );
}
