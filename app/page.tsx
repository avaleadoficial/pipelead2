import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f5]">

      <header className="flex justify-between items-center px-10 py-6 border-b border-gray-200">

        <h1 className="text-3xl font-bold text-[#6B1414]">
          PipeLead
        </h1>

        <div className="flex gap-3">

          <Link
            href="/login"
            className="
              border
              border-[#454545]
              px-5
              py-2
              rounded-xl
              text-[#454545]
            "
          >
            Entrar
          </Link>

          <Link
            href="/cadastro"
            className="
              bg-[#6B1414]
              text-white
              px-5
              py-2
              rounded-xl
            "
          >
            Criar Conta
          </Link>

        </div>

      </header>

      <section className="max-w-6xl mx-auto px-8 py-24 text-center">

        <h2 className="text-6xl font-bold text-[#6B1414]">
          Organize seus leads.
          <br />
          Feche mais vendas.
        </h2>

        <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto">
          Um CRM simples e intuitivo para acompanhar oportunidades,
          organizar negociações e aumentar sua conversão.
        </p>

        <div className="flex justify-center gap-4 mt-10">

          <Link
            href="/cadastro"
            className="
              bg-[#6B1414]
              text-white
              px-8
              py-4
              rounded-2xl
              font-medium
            "
          >
            Começar Agora
          </Link>

          <Link
            href="/login"
            className="
              border
              border-[#454545]
              px-8
              py-4
              rounded-2xl
            "
          >
            Entrar
          </Link>

        </div>

      </section>

      <section className="max-w-6xl mx-auto px-8 pb-24">

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h3 className="font-bold text-xl text-[#6B1414] mb-3">
              Pipeline Visual
            </h3>

            <p className="text-gray-600">
              Organize oportunidades em etapas e acompanhe negociações em tempo real.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h3 className="font-bold text-xl text-[#6B1414] mb-3">
              Gestão de Leads
            </h3>

            <p className="text-gray-600">
              Centralize contatos e histórico comercial em um único lugar.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h3 className="font-bold text-xl text-[#6B1414] mb-3">
              Relatórios
            </h3>

            <p className="text-gray-600">
              Visualize resultados e acompanhe o desempenho do seu time.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}
