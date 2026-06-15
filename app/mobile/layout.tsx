import { MobileNav } from "../components/mobile/mobile-nav";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen pb-20">
        {children}
      </main>

      <MobileNav />
    </>
  );
}
