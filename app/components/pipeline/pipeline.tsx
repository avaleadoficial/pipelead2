"use client";

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

const initialColumns: any[] = [
  {
    id: "1",
    title: "Leads",
    cards: [],
  },

  {
    id: "2",
    title: "Conversando",
    cards: [],
  },

  {
    id: "3",
    title: "Quase fechando",
    cards: [],
  },
];

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

  const savedPipeline =
    localStorage.getItem(
      `pipeline-${projectId}`
    );

  if (savedPipeline) {

    setColumns(
      JSON.parse(savedPipeline)
    );

  } else {

    setColumns(initialColumns);

  }

}, [projectId]);

  // SALVAR
  useEffect(() => {

    if (columns.length > 0) {

      localStorage.setItem(
  `pipeline-${projectId}`,
  JSON.stringify(columns)
);

    }

  }, [columns]);

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
  function handleSaveCard(updatedCard: any) {

    const updatedColumns = columns.map(
      (column) => ({

        ...column,

        cards: column.cards.map(
          (card: any) =>

            card.id === updatedCard.id
              ? updatedCard
              : card
        ),

      })
    );

    setColumns(updatedColumns);
  }

  // NOVA OPORTUNIDADE
  function handleCreateOpportunity(
    columnId: string,
    newOpportunity: any
  ) {

    const updatedColumns = columns.map(
      (column) => {

        if (column.id === columnId) {

          return {

            ...column,

            cards: [
              ...column.cards,

              {
                ...newOpportunity,

                id: Date.now().toString(),
              },
            ],
          };
        }

        return column;
      }
    );

    setColumns(updatedColumns);
  }

  // NOVA COLUNA
  function handleCreateColumn(
    title: string
  ) {

    if (!title.trim()) return;

    const newColumn = {

      id: Date.now().toString(),

      title,

      cards: [],
    };

    setColumns([
      ...columns,
      newColumn,
    ]);
  }

  // EDITAR COLUNA
  function handleEditColumn(
    columnId: string,
    newTitle: string
  ) {

    const updatedColumns =
      columns.map((column) => {

        if (column.id === columnId) {

          return {
            ...column,
            title: newTitle,
          };
        }

        return column;
      });

    setColumns(updatedColumns);
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
  function handleDeleteColumn(
    columnId: string
  ) {

        const confirmDelete =
      confirm(
        "Deseja excluir esta etapa?"
      );

    if (!confirmDelete) return;

    const updatedColumns =
      columns.filter(
        (column) =>
          column.id !== columnId
      );

    setColumns(updatedColumns);
  }

  return (

  <DndContext

      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >

      <div className="flex gap-3 overflow-x-auto pb-5">

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
    min-w-[200px]
    bg-gray-100
    rounded-2xl
    p-4
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
    text-base
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
    w-5
    h-5
    text-xs
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
          className="w-full mt-4 border-2 border-dashed border-gray-300 rounded-2xl p-4 hover:bg-white transition cursor-pointer"
        >
          + Nova oportunidade
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
