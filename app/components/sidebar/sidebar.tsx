"use client";

import {
  LayoutDashboard,
  Kanban,
  FolderOpen,
  Settings,
  MoreVertical,
} from "lucide-react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

export function Sidebar() {

  const router = useRouter();

  const [openMenu, setOpenMenu] =
    useState<string | null>(null);

const [editingProject, setEditingProject] =
  useState<any>(null);
  const [projectToDelete, setProjectToDelete] =
  useState<any>(null);

const [newProjectName, setNewProjectName] =
  useState("");

  const [companyName, setCompanyName] =
    useState("Cliente");

  const [logo, setLogo] =
    useState("");
  const [projects, setProjects] =
  useState<any[]>([]);

  const [openProjectModal, setOpenProjectModal] =
  useState(false);

const [projectName, setProjectName] =
  useState("");


  useEffect(() => {

  const savedName =
    localStorage.getItem(
      "company-name"
    );

  const savedLogo =
    localStorage.getItem(
      "company-logo"
    );

  const savedProjects =
    localStorage.getItem(
      "projects"
    );

  if (savedName) {
    setCompanyName(savedName);
  }

  if (savedLogo) {
    setLogo(savedLogo);
  }

  if (savedProjects) {
    setProjects(
      JSON.parse(savedProjects)
    );
  }

}, []);
function createProject() {

  if (!projectName.trim()) return;

  const newProject = {
    id: Date.now().toString(),
    name: projectName,
  };

  const defaultPipeline = [

    {
      id: "1",
      title: "Conversando",
      cards: [],
    },

    {
      id: "2",
      title: "Quente",
      cards: [],
    },

    {
      id: "3",
      title: "Fechou",
      cards: [],
    },

    {
      id: "4",
      title: "Achou caro",
      cards: [],
    },

    {
      id: "5",
      title: "Falar em breve",
      cards: [],
    },

    {
      id: "6",
      title: "Parou de responder",
      cards: [],
    },

    {
      id: "7",
      title: "Desqualificado",
      cards: [],
    },

  ];

  localStorage.setItem(
    `pipeline-${newProject.id}`,
    JSON.stringify(defaultPipeline)
  );

  const updatedProjects = [
    ...projects,
    newProject,
  ];

  setProjects(updatedProjects);

  localStorage.setItem(
    "projects",
    JSON.stringify(updatedProjects)
  );

  setProjectName("");

  setOpenProjectModal(false);

}
function deleteProject(projectId: string) {

  const updatedProjects =
    projects.filter(
      (project) =>
        project.id !== projectId
    );

  setProjects(updatedProjects);

  localStorage.setItem(
    "projects",
    JSON.stringify(updatedProjects)
  );

  localStorage.removeItem(
    `pipeline-${projectId}`
  );


  setProjects(updatedProjects);

  localStorage.setItem(
    "projects",
    JSON.stringify(updatedProjects)
  );

  localStorage.removeItem(
    `pipeline-${projectId}`
  );

}
function renameProject() {

  if (!editingProject) return;

  const updatedProjects =
    projects.map((project) =>

      project.id === editingProject.id
        ? {
            ...project,
            name: newProjectName,
          }
        : project

    );

  setProjects(updatedProjects);

  localStorage.setItem(
    "projects",
    JSON.stringify(updatedProjects)
  );

  setEditingProject(null);

  setNewProjectName("");

}
  return (
  <>
    {openProjectModal && (

      <div
        className="
          fixed
          inset-0
          bg-black/50
          z-50
          flex
          items-center
          justify-center
        "
      >

        <div
          className="
            bg-white
            p-6
            rounded-2xl
            w-[400px]
          "
        >

          <h2 className="text-black text-2xl font-bold mb-4">
            Novo Projeto
          </h2>

          <input
            value={projectName}
            onChange={(e) =>
              setProjectName(e.target.value)
            }
            placeholder="Nome do projeto"
            className="
              w-full
              border
              p-3
              rounded-xl
              text-black
            "
          />

          <div className="flex gap-3 mt-4">

  <button
    onClick={createProject}
    className="
      flex-1
      bg-black
      text-white
      p-3
      rounded-xl
      cursor-pointer
    "
  >
    Criar Projeto
  </button>

  <button
    onClick={() => {

      setOpenProjectModal(false);

      setProjectName("");

    }}
    className="
      flex-1
      border
      p-3
      rounded-xl
      text-black
      cursor-pointer
    "
  >
    Cancelar
  </button>

</div>

                </div> 

      </div>

    )}
{editingProject && (

  <div
    className="
      fixed
      inset-0
      bg-black/50
      z-50
      flex
      items-center
      justify-center
    "
  >

    <div
      className="
        bg-white
        p-6
        rounded-2xl
        w-[400px]
      "
    >

      <h2 className="text-black text-2xl font-bold mb-4">
        Editar Projeto
      </h2>

      <input
        value={newProjectName}
        onChange={(e) =>
          setNewProjectName(
            e.target.value
          )
        }
        className="
          w-full
          border
          p-3
          rounded-xl
          text-black
        "
      />

      <div className="flex gap-3 mt-4">

        <button
          onClick={renameProject}
          className="
            flex-1
            bg-black
            text-white
            p-3
            rounded-xl
            cursor-pointer
          "
        >
          Salvar
        </button>

        <button
          onClick={() =>
            setEditingProject(null)
          }
          className="
            flex-1
            border
            p-3
            rounded-xl
            text-black
            cursor-pointer
          "
        >
          Cancelar
        </button>

      </div>

    </div>

  </div>

)}

{projectToDelete && (

  <div
    className="
      fixed
      inset-0
      bg-black/50
      z-50
      flex
      items-center
      justify-center
    "
  >

    <div
      className="
        bg-white
        p-6
        rounded-2xl
        w-[420px]
      "
    >

      <h2 className="text-black text-2xl font-bold mb-3">
        Excluir Projeto
      </h2>

      <p className="text-gray-500 mb-6">
        Deseja excluir o projeto
        {" "}
        <strong>
          {projectToDelete.name}
        </strong>
        ?
      </p>

      <div className="flex gap-3">

        <button
          onClick={() =>
            setProjectToDelete(null)
          }
          className="
            flex-1
            border
            p-3
            rounded-xl
            text-black
            cursor-pointer
          "
        >
          Cancelar
        </button>

        <button
          onClick={() => {

            deleteProject(
              projectToDelete.id
            );

            setProjectToDelete(null);

          }}
          className="
            flex-1
            bg-red-600
            text-white
            p-3
            rounded-xl
            cursor-pointer
          "
        >
          Excluir
        </button>

      </div>

    </div>

  </div>

)}


<aside
  style={{
    width: "200px",
minWidth: "200px",
maxWidth: "200px",
    background: "var(--sidebar-color)",
    color: "var(--sidebar-text-color)",
  }}
  className="
    h-screen
    border-r
    p-5
    relative
    flex
    flex-col
    shrink-0
  "
    >

      {/* TOPO */}
      <div className="mb-10">

        <h1 className="text-2xl font-bold">
  PipeLead
</h1>

      </div>

      {/* MENU */}
      <nav className="space-y-2 flex-1">

        <Link
          href="/dashboard"
          className="
            flex
            items-center
            gap-3
            py-2
px-3
            rounded-xl
            hover:bg-white/10
            transition
          "
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

                  <div className="mt-2">

  <div
  className="
    flex
    items-center
    gap-3
    py-2
px-3
    font-medium
    opacity-80
  "
>
  <FolderOpen size={20} />
  Projetos
</div>

  {projects.map((project) => (

  <div
    key={project.id}
    className="
  flex
  items-center
  justify-between
  pl-10
  pr-3
  py-2
  rounded-xl
  hover:bg-white/10
  min-w-0

    "
  >

    <Link
  href={`/projetos/${project.id}`}
  className="
    flex
    items-center
    gap-3
    flex-1
    min-w-0
  "
>
  <span className="opacity-70">
    -
  </span>

  <span
    className="
      truncate
      whitespace-nowrap
      overflow-hidden
    "
  >
    {project.name}
  </span>

</Link>

    <div className="relative">

  <button
  onClick={(e) => {

    e.stopPropagation();

    setOpenMenu(
      openMenu === project.id
        ? null
        : project.id
    );

  }}
  className="
    p-1
    cursor-pointer
  "
>
  <MoreVertical size={16} />
</button>

  {openMenu === project.id && (

    <div
  onClick={(e) =>
    e.stopPropagation()
  }
  className="
    absolute
    right-0
    top-8
    bg-white
    text-black
    rounded-xl
    shadow-lg
    overflow-hidden
    z-50
    min-w-[140px]
  "
>

      <button
        onClick={() => {

          setEditingProject(project);

          setNewProjectName(
            project.name
          );

          setOpenMenu(null);

        }}
        className="
          w-full
          text-left
          px-4
          py-2
          hover:bg-gray-100
          cursor-pointer
        "
      >
        Editar nome
      </button>

      <button
        onClick={() => {

  setProjectToDelete(project);

  setOpenMenu(null);

}}
        className="
          w-full
          text-left
          px-4
          py-2
          text-red-500
          hover:bg-gray-100
          cursor-pointer
        "
      >
        Excluir
      </button>

    </div>

  )}

</div>

  </div>

))}

  <button
  onClick={() =>
    setOpenProjectModal(true)
  }
  className="
    flex
    items-center
    gap-3
    p-3
    rounded-xl
    opacity-70
    hover:bg-white/10
    w-full
    text-left
    cursor-pointer
  "
>
  + Novo Projeto
</button>

</div>

        <Link
          href="/configuracoes"
          className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-white/10
            transition
            cursor-pointer
          "
        >
          <Settings size={20} />
          Configurações
        </Link>

      </nav>

      {/* FOOTER */}
      <div className="border-t border-white/10 pt-5">

        <div className="flex items-center gap-3 mb-4">

          {logo && (

            <img
  src={logo}
  alt="Logo"
  className="
    w-12
    h-12
    rounded-full
    object-cover
  "
/>

          )}

          <div>

            <p className="font-bold text-sm">
              {companyName}
            </p>

            <p className="text-xs opacity-70">
              Cliente
            </p>

          </div>

        </div>

        {/* SAIR */}
        <button
  onClick={() => {

    localStorage.removeItem(
      "logged"
    );

    router.push("/login");

  }}
  className="
    w-full
    bg-white/10
    hover:bg-white/20
    transition
    rounded-xl
    p-3
    text-sm
    cursor-pointer
  "
>
  Sair
</button>

      </div>

        </aside>
  </>
);
}
