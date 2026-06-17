"use client";

import { useState } from "react";

export function CreateColumnModal({
  onCreate,
}: any) {

  const [open, setOpen] =
    useState(false);

  const [title, setTitle] =
    useState("");

  function handleCreate() {

    if (!title) return;

    onCreate(title);

    setTitle("");

    setOpen(false);
  }

  if (!open) {

    return (

      <button
  onClick={() => setOpen(true)}
  className="
    w-[170px]
min-w-[170px]
h-[50px]
    border-2
    border-dashed
    rounded-2xl
    flex
    items-center
    justify-center
    hover:bg-gray-100
    transition
    cursor-pointer
  "
>
  + Nova Etapa
</button>

    );
  }

  return (

    <div className="w-[250px] min-w-[250px] bg-white rounded-2xl p-4 shadow">

      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        placeholder="Nome da etapa"
        className="w-full border rounded-xl p-3"
      />

      <div className="flex gap-3 mt-3">

  <button
    onClick={handleCreate}
    className="
      flex-1
      bg-black
      text-white
      p-3
      rounded-xl
      cursor-pointer
    "
  >
    Criar Etapa
  </button>

  <button
    onClick={() => {

      setTitle("");

      setOpen(false);

    }}
    className="
      flex-1
      border
      p-3
      rounded-xl
      cursor-pointer
    "
  >
    Cancelar
  </button>

</div>

    </div>
  );
}
