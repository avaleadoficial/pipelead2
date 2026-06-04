"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLUMN_COLORS: Record<string, string> = {
  Conversando: "#eab308",
  conversando: "#eab308",

  Quente: "#f97316",
  quente: "#f97316",

  Fechou: "#22c55e",
  fechou: "#22c55e",

  "Achou caro": "#ef4444",
  "achou caro": "#ef4444",

  "Falar em breve": "#3b82f6",
  "falar em breve": "#3b82f6",

  "Parou de responder": "#8b5cf6",
  "parou de responder": "#8b5cf6",

  Desqualificado: "#6b7280",
  desqualificado: "#6b7280",
};

export function ProjectChart({
  data,
}: any) {
  return (
    <div className="h-48">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={70}
          >
            {data.map(
  (item: any, index: number) => {

    console.log(
      "COLUNA:",
      item.name
    );

    return (
      <Cell
  key={index}
  fill={
    COLUMN_COLORS[
      item.name.trim()
    ] || "#9ca3af"
  }
/>
    );

  }
)}
          </Pie>

          <Tooltip />

        
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}