"use client";

import { useState } from "react";

export function CreateOpportunityModal({
  open,
  onClose,
  onSave,
}: any) {

  const [nome, setNome] =
    useState("");

  const [empresa, setEmpresa] =
    useState("");

  const [valor, setValor] =
    useState("");

  const [data, setData] =
    useState("");
const [telefone, setTelefone] =
  useState("");

const [email, setEmail] =
  useState("");
  const [obs, setObs] =
    useState("");

  if (!open) return null;

  function handleSave() {

    if (!nome.trim()) return;

    onSave({
  nome,
  empresa,
  telefone,
  email,
  valor,
  data,
  obs,
});

    // RESET
    setNome("");
setEmpresa("");
setTelefone("");
setEmail("");
setValor("");
setData("");
setObs("");

    onClose();
  }

  return (

    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >

      <div
        className="bg-white w-[500px] rounded-3xl p-6 shadow-2xl"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <h2 className="text-3xl font-bold mb-6">
          Nova Oportunidade
        </h2>

        <div className="space-y-4">

          <input
            placeholder="Nome da oportunidade"
            value={nome}
            onChange={(e) =>
              setNome(e.target.value)
            }
            className="w-full border rounded-2xl p-4"
          />

          <input
            placeholder="Instagram"
            value={empresa}
            onChange={(e) =>
              setEmpresa(e.target.value)
            }
            className="w-full border rounded-2xl p-4"
          />
<input
  placeholder="Telefone"
  value={telefone}
  onChange={(e) =>
    setTelefone(e.target.value)
  }
  className="w-full border rounded-2xl p-4"
/>

<input
  placeholder="Email"
  value={email}
  onChange={(e) =>
    setEmail(e.target.value)
  }
  className="w-full border rounded-2xl p-4"
/>
          <input
            placeholder="Valor"
            value={valor}
            onChange={(e) =>
              setValor(e.target.value)
            }
            className="w-full border rounded-2xl p-4"
          />

          <input
            type="date"
            value={data}
            onChange={(e) =>
              setData(e.target.value)
            }
            className="w-full border rounded-2xl p-4"
          />

          <textarea
            placeholder="Observações"
            value={obs}
            onChange={(e) =>
              setObs(e.target.value)
            }
            className="w-full border rounded-2xl p-4 h-28"
          />

        </div>

        {/* BOTÕES */}
        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-2xl bg-gray-200"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-3 rounded-2xl bg-black text-white"
          >
            Salvar
          </button>

        </div>

      </div>

    </div>
  );
}