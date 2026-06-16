"use client";

import { useDraggable } from "@dnd-kit/core";
import { supabase } from "@/lib/supabase";
import { CSS } from "@dnd-kit/utilities";

import { CalendarDays } from "lucide-react";

import { useState } from "react";

export function OpportunityModal({
  card,
  onSave,
  success,
}: any) {

  const [open, setOpen] =
    useState(false);

  const [formData, setFormData] =
    useState(card);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: card.id,
  });

  const style = {
    transform: CSS.Translate.toString(
      transform
    ),
  };

  function formatarData(data: string) {

  if (!data) return "Sem atividade";

  const hoje =
    new Date()
      .toISOString()
      .split("T")[0];

  if (data === hoje) {
    return "Hoje";
  }

  const [ano, mes, dia] =
    data.split("-");

  return `${dia}/${mes}/${ano}`;
}

  // SALVAR
  function handleSave() {

    onSave(formData);

    setOpen(false);
  }

  // EXCLUIR
  async function handleDelete() {

  const confirmDelete =
    confirm(
      "Deseja excluir esta oportunidade?"
    );

  if (!confirmDelete) return;

  const { error } =
    await supabase
      .from("pipelead_leads")
      .delete()
      .eq("id", card.id);

  if (error) {

    console.error(error);

    alert(
      "Erro ao excluir oportunidade"
    );

    return;

  }

  window.location.reload();

}
  return (
    <>
      {/* CARD */}
      <div
  ref={setNodeRef}
  style={style}
  {...listeners}
  {...attributes}
  onClick={() => setOpen(true)}
  className={`
    bg-white
    rounded-2xl
    p-4
    border
    cursor-grab
    active:cursor-grabbing
    shadow-sm
    h-28
    flex
    flex-col
    justify-between
    overflow-hidden
    transition-all

    ${
      success
        ? "animate-successPulse border-green-500"
        : ""
    }
  `}
>

        <div className="flex justify-between items-start">

          <div>

            <h3 className="font-bold text-lg">
              {card.nome}
            </h3>

            <p className="text-gray-500 text-sm">
              {card.empresa}
            </p>

          </div>

          <span className="font-bold">
            {card.valor}
          </span>

        </div>

        <div
  className={`
    flex
    items-center
    gap-2
    mt-5
    text-sm
    ${
      card.data ===
      new Date()
        .toISOString()
        .split("T")[0]
        ? "text-green-600 font-semibold"
        : card.data &&
          card.data <
            new Date()
              .toISOString()
              .split("T")[0]
        ? "text-red-600 font-semibold"
        : "text-gray-500"
    }
  `}
>

  <CalendarDays size={16} />

  {formatarData(card.data)}

</div>

      </div>

      {/* MODAL */}
      {open && (

        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
          onClick={() =>
            setOpen(false)
          }
        >

          <div
            className="bg-white rounded-3xl p-7 w-[580px]"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">

              <h2 className="text-4xl font-bold">
                Editar oportunidade
              </h2>

              <button
                onClick={() =>
                  setOpen(false)
                }
                className="text-3xl"
              >
                ×
              </button>

            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 gap-4">

              {/* NOME */}
              <div>
                <label className="text-sm text-gray-500">
                  Nome
                </label>

                <input
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nome:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-2xl p-4 mt-2"
                />
              </div>

              {/* INSTAGRAM */}
              <div>
                <label className="text-sm text-gray-500">
                  Instagram
                </label>

                <input
                  value={formData.empresa}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      empresa:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-2xl p-4 mt-2"
                />
              </div>

              {/* VALOR */}
              <div>
                <label className="text-sm text-gray-500">
                  Valor
                </label>

                <input
                  value={formData.valor}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      valor:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-2xl p-4 mt-2"
                />
              </div>

              {/* DATA */}
              <div>
                <label className="text-sm text-gray-500">
                  Próxima atividade
                </label>

                <input
                  type="date"
                  value={formData.data}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      data:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-2xl p-4 mt-2"
                />
              </div>

              {/* TELEFONE */}
              <div>
                <label className="text-sm text-gray-500">
                  Telefone
                </label>

                <input
                  value={
                    formData.telefone ||
                    ""
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      telefone:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-2xl p-4 mt-2"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm text-gray-500">
                  Email
                </label>

                <input
                  value={
                    formData.email ||
                    ""
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-2xl p-4 mt-2"
                />
              </div>

            </div>

            {/* OBS */}
            <div className="mt-4">

              <label className="text-sm text-gray-500">
                Observações
              </label>

              <textarea
                value={
                  formData.obs || ""
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    obs:
                      e.target.value,
                  })
                }
                className="w-full border rounded-2xl p-4 mt-2 h-32"
              />

            </div>

            {/* BOTÕES */}
            <div className="flex justify-between mt-8">

              {/* EXCLUIR */}
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-6 py-4 rounded-2xl"
              >
                Excluir
              </button>

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    setOpen(false)
                  }
                  className="bg-gray-200 px-6 py-4 rounded-2xl"
                >
                  Cancelar
                </button>

                <button
                  onClick={handleSave}
                  className="bg-black text-white px-6 py-4 rounded-2xl"
                >
                  Salvar
                </button>

              </div>

            </div>

          </div>

        </div>

      )}
    </>
  );
}
