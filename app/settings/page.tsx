import { Sidebar } from "../components/sidebar/sidebar";

export default function SettingsPage() {
  return (
    <main className="flex h-screen bg-gray-50">
      <Sidebar />

      <section className="flex-1 p-8">

        <h1 className="text-3xl font-bold">
          Configurações
        </h1>

      </section>
    </main>
  );
}