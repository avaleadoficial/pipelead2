"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { MobileNav } from "../components/mobile/mobile-nav";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function checkAuth() {

      const {
        data: { session },
      } =
        await supabase.auth.getSession();

      if (!session) {

        router.replace("/login");
        return;

      }

      setLoading(false);

    }

    checkAuth();

  }, [router]);

  if (loading) {

    return (
      <div className="p-6">
        Carregando...
      </div>
    );

  }

  return (
    <>
      <main className="min-h-screen pb-20">
        {children}
      </main>

      <MobileNav />
    </>
  );
}
