"use client";

import { Sidebar } from "../components/sidebar/sidebar";
import { Pipeline } from "../components/pipeline/pipeline";

export default function PipelinePage() {

  return (

    <div className="flex">

      <Sidebar />

      <main
        className="flex-1 p-8 min-h-screen"
        style={{
          backgroundColor: "var(--background-color)",
          color: "var(--text-color)",
        }}
      >

        <h1 className="text-5xl font-bold mb-8">
          Pipeline
        </h1>

        <Pipeline projectId="geral" />

      </main>

    </div>

  );
}