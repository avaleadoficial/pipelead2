import { Sidebar } from "../components/sidebar/sidebar";

export default function AgendaPage() {
  return (
    <main className="flex h-screen bg-gray-50">
      <Sidebar />

      <section className="flex-1 p-8">

        <h1 className="text-3xl font-bold">
          Agenda
        </h1>

        <div className="space-y-4 mt-8">

          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="font-bold">
              Ligação - Empresa X
            </h2>

            <p className="text-gray-500 mt-2">
              Amanhã às 14h
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="font-bold">
              Reunião - Cliente Y
            </h2>

            <p className="text-gray-500 mt-2">
              Sexta às 10h
            </p>
          </div>

        </div>

      </section>
    </main>
  );
}