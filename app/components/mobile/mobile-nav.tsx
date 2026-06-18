"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export function MobileNav() {

  const router = useRouter();

  async function handleLogout() {

    await supabase.auth.signOut();

    router.replace("/login");

  }

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        bg-white
        border-t
        flex
        justify-around
        py-4
        z-50
      "
    >
      <Link href="/mobile/dashboard">
        Dashboard
      </Link>

      <Link href="/mobile/projetos">
        Projetos
      </Link>

      <Link href="/mobile/configuracoes">
        Configurações
      </Link>

      <button
        onClick={handleLogout}
        className="text-red-500"
      >
        Sair
      </button>

    </nav>
  );
}
