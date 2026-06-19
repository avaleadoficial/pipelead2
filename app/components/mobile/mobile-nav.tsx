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
    border-t
    flex
    justify-around
    items-center
    h-16
    z-50
  "
  style={{
    backgroundColor: "var(--sidebar-color)",
    color: "var(--sidebar-text-color)",
    borderColor: "#3f3f46",
  }}
>
      <Link
  href="/mobile/dashboard"
  style={{
    color: "var(--sidebar-text-color)",
  }}
>
  Dashboard
</Link>

<Link
  href="/mobile/projetos"
  style={{
    color: "var(--sidebar-text-color)",
  }}
>
  Projetos
</Link>

<Link
  href="/mobile/configuracoes"
  style={{
    color: "var(--sidebar-text-color)",
  }}
>
  Configurações
</Link>

     <button
  onClick={handleLogout}
  style={{
    color: "#ef4444",
  }}
>
  Sair
</button>

    </nav>
  );
}
