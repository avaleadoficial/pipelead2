import { Sidebar } from "./components/sidebar/sidebar";
import { Pipeline } from "./components/pipeline/pipeline";

export default function Home() {
  return (
    <main
  className="flex h-screen"
  style={{
    backgroundColor:
      "var(--background-color)",
    color:
      "var(--text-color)",
  }}
>
      <Sidebar />

      <section className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold">
          Pipeline de Vendas
        </h1>

        <div className="mt-8">
          <Pipeline projectId="geral" />
        </div>
      </section>
    </main>
  );
}
