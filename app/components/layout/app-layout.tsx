"use client";

import { Sidebar } from "../sidebar/sidebar";
import { MobileNav } from "../mobile/mobile-nav";
import { useMobile } from "@/hooks/useMobile";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMobile();

  return (
    <main className="flex h-screen bg-gray-50">
      {!isMobile && <Sidebar />}

      <section
        className={`
          flex-1
          overflow-auto
          ${isMobile ? "pb-20 p-4" : "p-8"}
        `}
      >
        {children}
      </section>

      {isMobile && <MobileNav />}
    </main>
  );
}
