"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CadastroPage() {

  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [loading, setLoading] = useState(false);

  async function criarConta() {

    if (senha !== confirmar) {
      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: {
            nome,
          },
        },
      });

    setLoading(false);

    if (error) {
      return;
    }

    router.push("/login");
  }

  return (
    <main
      className="
        min-h-screen
        flex
        items-center
        justify-center
      "
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

        <h1
          className="
            text-5xl
            font-bold
            text-center
            mb-8
          "
        >
          Criar Conta
        </h1>

        <input
          placeholder="Nome"
          value={nome}
          onChange={(e)=>setNome(e.target.value)}
          className="w-full border p-4 rounded-2xl mb-4 text-black"
        />

        <input
          placeholder="E-mail"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border p-4 rounded-2xl mb-4 text-black"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e)=>setSenha(e.target.value)}
          className="w-full border p-4 rounded-2xl mb-4 text-black"
        />

        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmar}
          onChange={(e)=>setConfirmar(e.target.value)}
          className="w-full border p-4 rounded-2xl mb-6 text-black"
        />

        <button
          onClick={criarConta}
          className="
            w-full
            bg-black
            text-white
            p-4
            rounded-2xl
          "
        >
          {loading
            ? "Criando..."
            : "Criar Conta"}
        </button>

        <button
          onClick={() =>
            router.push("/login")
          }
          className="
            w-full
            mt-4
            text-gray-500
          "
        >
          Já tenho uma conta
        </button>

      </div>
    </main>
  );
}
