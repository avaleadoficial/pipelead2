"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { MobileNav } from "../components/mobile/mobile-nav";
import { MobileHeader } from "../components/mobile/mobile-header";

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
      <div
  className="
    min-h-screen
    flex
    items-center
    justify-center
  "
>
  Carregando...
</div>
    );

  }

  return (
    <>
  <MobileHeader />

 <main
  className="
    min-h-screen
    pt-24
    pb-20
  "
>
  {children}
</main>

  <MobileNav />
</>
  );
}
