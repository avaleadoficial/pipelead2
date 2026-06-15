"use client";

import Link from "next/link";

export function MobileNav() {
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
        Config
      </Link>
    </nav>
  );
}
