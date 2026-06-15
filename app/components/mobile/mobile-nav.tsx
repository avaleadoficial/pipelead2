"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  FolderOpen,
  Settings
} from "lucide-react";

export function MobileNav() {
  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        h-16
        bg-white
        border-t
        flex
        justify-around
        items-center
        z-50
      "
    >
      <Link
        href="/dashboard"
        className="flex flex-col items-center text-xs"
      >
        <LayoutDashboard size={20} />
        Dashboard
      </Link>

      <Link
        href="/projetos"
        className="flex flex-col items-center text-xs"
      >
        <FolderOpen size={20} />
        Projetos
      </Link>

      <Link
        href="/configuracoes"
        className="flex flex-col items-center text-xs"
      >
        <Settings size={20} />
        Config
      </Link>
    </nav>
  );
}
