"use client";
import { supabase } from "@/lib/supabase";
import {
  Pencil,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";

import { useEffect, useState } from "react";

import { OpportunityModal } from "../modals/opportunity-modal";

import { CreateOpportunityModal } from "../modals/create-opportunity-modal";

import { CreateColumnModal } from "../modals/create-column-modal";

export function Pipeline({
  projectId = "default",
}: {
  projectId?: string;
}) {

  // DRAG
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // ESTADO
  const [columns, setColumns] =
    useState<any[]>([]);
  const [successColumnId, setSuccessColumnId] =
  useState<string | null>(null);
    

  // CARREGAR
 useEffect(() => {

  async function loadLeads() {

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    const { data, error } =
      await supabase
        .from("pipelead_leads")
        .select("*")
        .eq("project_id", projectId)
        .eq("user_id", session.user.id);

    if (error) {
      console.error(error);
      return;
    }

   const { data: dbColumns } =
  await supabase
    .from("pipelead_columns")
    .select("*")
    .eq("project_id", projectId)
    .order("position");

if (!dbColumns) return;

const cols: any[] = dbColumns.map(
  (column: any) => ({
    id: column.id,
    title: column.title,
    cards: [] as any[],
  })
);

data?.forEach((lead) => {

  const columnIndex =
    cols.findIndex(
      (c) =>
        c.title === lead.column_name
    );

  if (columnIndex === -1) return;

  cols[columnIndex].cards.push({
    id: lead.id,
    nome: lead.name,
    empresa: lead.empresa,
    telefone: lead.phone,
    email: lead.email,
    valor: lead.value,
    data: lead.data,
    obs: lead.obs,
  });

});

setColumns(cols);
  }

  loadLeads();

}, [projectId]);



  // DRAG
  function handleDragEnd(event: any) {

    
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;

    const overColumnId = over.id;

    let draggedCard: any = null;

    let sourceColumnIndex = -1;

    columns.forEach((column, index) => {

      const foundCard =
        column.cards.find(
          (card: any) =>
            card.id === activeId
        );

      if (foundCard) {

        draggedCard = foundCard;

        sourceColumnIndex = index;
      }

    });

    if (!draggedCard) return;

    const newColumns = [...columns];

    // REMOVE
    newColumns[sourceColumnIndex].cards =
      newColumns[sourceColumnIndex].cards.filter(
        (card: any) =>
          card.id !== activeId
      );

    // NOVA COLUNA
    const targetColumnIndex =
      newColumns.findIndex(
        (column: any) =>
          column.id === overColumnId
      );

    if (targetColumnIndex !== -1) {

  newColumns[targetColumnIndex].cards.push(
  draggedCard
);

const targetColumn =
  newColumns[targetColumnIndex];

supabase
  .from("pipelead_leads")
  .update({
    column_name: targetColumn.title,
  })
  .eq("id", draggedCard.id)
  .then(({ error }) => {
    if (error) {
      console.error(error);
    }
  });
if (
  targetColumn.title
    .trim()
    .toLowerCase() ===
  "fechou"
) {

  setSuccessColumnId(
    targetColumn.id
  );

  setTimeout(() => {
    setSuccessColumnId(null);
  }, 800);

}


}

    setColumns(newColumns);
  }

  // EDITAR CARD
  async function handleSaveCard(
  updatedCard: any
) {

  const { error } =
    await supabase
      .from("pipelead_leads")
      .update({
        name: updatedCard.nome,
        empresa: updatedCard.empresa,
        phone: updatedCard.telefone,
        email: updatedCard.email,
        value:
          Number(updatedCard.valor) || 0,
        data:
          updatedCard.data || null,
        obs:
          updatedCard.obs || "",
      })
      .eq("id", updatedCard.id);

  if (error) {
    console.error(error);
    alert("Erro ao salvar");
    return;
  }

  setColumns((prev) =>
    prev.map((column) => ({
      ...column,
      cards: column.cards.map(
        (card: any) =>
          card.id === updatedCard.id
            ? updatedCard
            : card
      ),
    }))
  );

}

  // NOVA OPORTUNIDADE
  async function handleCreateOpportunity(
  columnId: string,
  newOpportunity: any
) {

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return;

  const column =
    columns.find(
      (c) => c.id === columnId
    );

  if (!column) return;

  const { data, error } =
    await supabase
      .from("pipelead_leads")
      .insert({
        user_id: session.user.id,
        project_id: projectId,

        column_name:
          column.title,

        name:
          newOpportunity.nome,

        empresa:
          newOpportunity.empresa,

        phone:
          newOpportunity.telefone,

        email:
          newOpportunity.email,

        value:
          Number(
            newOpportunity.valor
          ) || 0,

        data:
          newOpportunity.data || null,

        obs:
          newOpportunity.obs || "",
      })
      .select()
      .single();

  if (error) {
    console.error(error);
    alert(
      "Erro ao criar oportunidade"
    );
    return;
  }

  setColumns((prev) =>
  prev.map((column) => {

      if (
        column.id !== columnId
      )
        return column;

      return {
        ...column,
        cards: [
          ...column.cards,
          {
            id: data.id,
            nome: data.name,
            empresa: data.empresa,
            telefone: data.phone,
            email: data.email,
            valor: data.value,
            data: data.data,
            obs: data.obs,
          },
        ],
      };

     })
);

}
  // NOVA COLUNA
  async function handleCreateColumn(
  title: string
) {

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return;

  const { data } =
    await supabase
      .from("pipelead_columns")
      .insert({
        user_id: session.user.id,
        project_id: projectId,
        title,
        position: columns.length + 1,
      })
      .select()
      .single();

  if (!data) return;

  setColumns([
    ...columns,
    {
      id: data.id,
      title: data.title,
      cards: [],
    },
  ]);

}

  // EDITAR COLUNA
  async function handleEditColumn(
  columnId: string,
  newTitle: string
) {

  const { error } =
    await supabase
      .from("pipelead_columns")
      .update({
        title: newTitle,
      })
      .eq("id", columnId);

  if (error) {
    console.error(error);
    return;
  }

  setColumns(
    columns.map((column) => {

      if (
        column.id === columnId
      ) {

        return {
          ...column,
          title: newTitle,
        };

      }

      return column;

    })
  );

} 
  
  function moveColumnLeft(
  columnId: string
) {

  const index =
    columns.findIndex(
      (column) =>
        column.id === columnId
    );

  if (index <= 0) return;

  const updated = [...columns];

  [
    updated[index - 1],
    updated[index]
  ] = [
    updated[index],
    updated[index - 1]
  ];

  setColumns(updated);

}

function moveColumnRight(
  columnId: string
) {

  const index =
    columns.findIndex(
      (column) =>
        column.id === columnId
    );

  if (
    index === -1 ||
    index === columns.length - 1
  )
    return;

  const updated = [...columns];

  [
    updated[index],
    updated[index + 1]
  ] = [
    updated[index + 1],
    updated[index]
  ];

  setColumns(updated);

}

  // EXCLUIR COLUNA
  async function handleDeleteColumn(
  columnId: string
) {

  const confirmDelete =
    confirm(
      "Deseja excluir esta etapa?"
    );

  if (!confirmDelete) return;

  const { error } =
    await supabase
      .from("pipelead_columns")
      .delete()
      .eq("id", columnId);

  if (error) {

    console.error(error);

    alert(
      "Erro ao excluir etapa"
    );

    return;

  }

  setColumns(
    columns.filter(
      (column) =>
        column.id !== columnId
    )
  );

} 

  return (

  <DndContext

      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >

    <div
  className="
    flex
    flex-nowrap
    gap-1
    overflow-x-auto
    pb-5
    px-1
    items-start
  "
>

        {columns.map((column) => (

          <Column
  key={column.id}
  column={column}
  success={
    successColumnId === column.id
  }
  onCreateOpportunity={handleCreateOpportunity}
  onEditColumn={handleEditColumn}
  onDeleteColumn={handleDeleteColumn}
  onMoveLeft={moveColumnLeft}
  onMoveRight={moveColumnRight}
>

            {
  [...column.cards]
    .sort((a, b) => {

      if (!a.data) return 1;
      if (!b.data) return -1;

      return (
        new Date(a.data).getTime() -
        new Date(b.data).getTime()
      );

    })
    .map((card: any) => (

              <OpportunityModal
  key={card.id}
  card={card}
  onSave={handleSaveCard}
/>
  

            ))}

          </Column>

        ))}

        {/* NOVA COLUNA */}
        <CreateColumnModal
          onCreate={handleCreateColumn}
        />

      </div>

    </DndContext>
  );
}

// COLUNA
function Column({
  column,
  children,
  success,
  onCreateOpportunity,
  onEditColumn,
  onDeleteColumn,
  onMoveLeft,
  onMoveRight,
}: any) {

  const { setNodeRef } =
    useDroppable({
      id: column.id,
    });

  // EDITAR
  const [editing, setEditing] =
    useState(false);

  const [title, setTitle] =
    useState(column.title || "");

  // MODAL OPORTUNIDADE
  const [
    openOpportunityModal,
    setOpenOpportunityModal,
  ] = useState(false);

  function handleSave() {

    if (!title.trim()) return;

    onEditColumn(
      column.id,
      title
    );

    setEditing(false);
  }

  return (

    <>
      {/* MODAL ETAPA */}
      {editing && (

        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
          onClick={() =>
            setEditing(false)
          }
        >

          <div
            className="bg-white rounded-3xl p-6 w-[400px]"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <h2 className="text-2xl font-bold mb-5">
              Editar etapa
            </h2>

            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full border rounded-2xl p-4"
              placeholder="Nome da etapa"
            />

            <div className="flex gap-3 mt-5">

              <button
                onClick={handleSave}
                className="flex-1 bg-black text-white p-4 rounded-2xl cursor-pointer"
              >
                Salvar
              </button>

              <button
                onClick={() =>
                  onDeleteColumn(column.id)
                }
                className="flex-1 bg-red-500 text-white p-4 rounded-2xl cursor-pointer"
              >
                Excluir
              </button>

            </div>

          </div>

        </div>

      )}

      {/* COLUNA */}
     <div
  ref={setNodeRef}
  className={`
    w-[170px]
    min-w-[170px]
    flex-shrink-0
    bg-gray-100
    rounded-2xl
    p-2
    transition-all
    ${
      success
        ? "animate-successColumn"
        : ""
    }
  `}
>

        {/* HEADER */}
        {/* HEADER */}
{/* HEADER */}
<div
  className="
    flex
    items-center
    justify-between
    h-8
    mb-5
  "
>

  <button
  onClick={() =>
    onMoveLeft(column.id)
  }
  className="
    p-1
    rounded-lg
    hover:bg-white
    cursor-pointer
  "
>
  <ChevronLeft size={12} />
</button>

  <button
  onClick={() =>
    setEditing(true)
  }
  className="
    flex
    items-center
    gap-2
    font-semibold 
    text-sm
    cursor-pointer
  "
>

  <span>
    {column.title || "Sem nome"}
  </span>

  <span
  className="
    flex
    items-center
    justify-center
    w-4
    h-4
    text-[10px]
    rounded-full
    bg-gray-200
    text-gray-600
  "
>
  {column.cards.length}
</span>

  <Pencil
    size={12}
    className="text-black"
  />

</button>

  <button
  onClick={() =>
    onMoveRight(column.id)
  }
  className="
    p-1
    rounded-lg
    hover:bg-white
    cursor-pointer
  "
>
  <ChevronRight size={12} />
</button>

</div>

        {/* CARDS */}
        <div className="space-y-4">

          {children}

        </div>

        {/* NOVA OPORTUNIDADE */}
        <button
          onClick={() =>
            setOpenOpportunityModal(true)
          }
          className="w-full mt-3 border-2 border-dashed border-gray-300 rounded-xl p-2 text-sm hover:bg-white transition cursor-pointer"
        >
          + Nova Oportunidade
        </button>

        {/* MODAL */}
        <CreateOpportunityModal
          open={openOpportunityModal}
          onClose={() =>
            setOpenOpportunityModal(false)
          }
          onSave={(newOpportunity: any) => {

            onCreateOpportunity(
              column.id,
              newOpportunity
            );

            setOpenOpportunityModal(false);

          }}
        />

      </div>
    </>
  );
}
