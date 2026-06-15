"use client";

import { useEffect, useState } from "react";

export default function MobileConfiguracoesPage() {

  const [companyName, setCompanyName] =
    useState("");

  const [logo, setLogo] =
    useState("");

  const [sidebarColor, setSidebarColor] =
    useState("#000000");

  const [sidebarTextColor, setSidebarTextColor] =
    useState("#ffffff");

  const [backgroundColor, setBackgroundColor] =
    useState("#f5f5f5");

  const [textColor, setTextColor] =
    useState("#111111");

  useEffect(() => {

    const savedSidebar =
      localStorage.getItem(
        "sidebar-color"
      );

    const savedSidebarText =
      localStorage.getItem(
        "sidebar-text-color"
      );

    const savedBg =
      localStorage.getItem(
        "background-color"
      );

    const savedText =
      localStorage.getItem(
        "text-color"
      );

    const savedName =
      localStorage.getItem(
        "company-name"
      );

    const savedLogo =
      localStorage.getItem(
        "company-logo"
      );

    if (savedSidebar)
      setSidebarColor(savedSidebar);

    if (savedSidebarText)
      setSidebarTextColor(savedSidebarText);

    if (savedBg)
      setBackgroundColor(savedBg);

    if (savedText)
      setTextColor(savedText);

    if (savedName)
      setCompanyName(savedName);

    if (savedLogo)
      setLogo(savedLogo);

  }, []);

  function handleSave() {

    localStorage.setItem(
      "sidebar-color",
      sidebarColor
    );

    localStorage.setItem(
      "sidebar-text-color",
      sidebarTextColor
    );

    localStorage.setItem(
      "background-color",
      backgroundColor
    );

    localStorage.setItem(
      "text-color",
      textColor
    );

    localStorage.setItem(
      "company-name",
      companyName
    );

    localStorage.setItem(
      "company-logo",
      logo
    );

    document.documentElement.style.setProperty(
      "--sidebar-color",
      sidebarColor
    );

    document.documentElement.style.setProperty(
      "--sidebar-text-color",
      sidebarTextColor
    );

    document.documentElement.style.setProperty(
      "--background-color",
      backgroundColor
    );

    document.documentElement.style.setProperty(
      "--text-color",
      textColor
    );

    alert("Configurações salvas!");
  }

  function handleLogoUpload(
    e: any
  ) {

    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend = () => {

      setLogo(
        reader.result as string
      );

    };

    reader.readAsDataURL(file);
  }

  return (

    <main
      className="
        min-h-screen
        p-4
        pb-24
      "
      style={{
        backgroundColor,
        color: textColor,
      }}
    >

      <h1 className="text-3xl font-bold mb-6">
        Configurações
      </h1>

      <div
        className="
          bg-white
          rounded-3xl
          p-5
          shadow
          space-y-6
        "
      >

        <div>

          <label className="block mb-2">
            Nome da empresa
          </label>

          <input
            value={companyName}
            onChange={(e) =>
              setCompanyName(
                e.target.value
              )
            }
            className="
              w-full
              border
              rounded-2xl
              p-4
              text-black
            "
          />

        </div>

        <div>

          <label className="block mb-2">
            Logo
          </label>

          <label
            className="
              bg-black
              text-white
              px-4
              py-3
              rounded-2xl
              inline-block
            "
          >

            Escolher logo

            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />

          </label>

          {logo && (

            <img
              src={logo}
              className="
                w-24
                h-24
                rounded-2xl
                mt-4
                object-cover
              "
            />

          )}

        </div>

        <div className="space-y-5">

          <div>

            <label>
              Cor Sidebar
            </label>

            <input
              type="color"
              value={sidebarColor}
              onChange={(e) =>
                setSidebarColor(
                  e.target.value
                )
              }
              className="
                w-full
                h-14
                mt-2
              "
            />

          </div>

          <div>

            <label>
              Texto Sidebar
            </label>

            <input
              type="color"
              value={sidebarTextColor}
              onChange={(e) =>
                setSidebarTextColor(
                  e.target.value
                )
              }
              className="
                w-full
                h-14
                mt-2
              "
            />

          </div>

          <div>

            <label>
              Cor Fundo
            </label>

            <input
              type="color"
              value={backgroundColor}
              onChange={(e) =>
                setBackgroundColor(
                  e.target.value
                )
              }
              className="
                w-full
                h-14
                mt-2
              "
            />

          </div>

          <div>

            <label>
              Cor Texto
            </label>

            <input
              type="color"
              value={textColor}
              onChange={(e) =>
                setTextColor(
                  e.target.value
                )
              }
              className="
                w-full
                h-14
                mt-2
              "
            />

          </div>

        </div>

        <button
          onClick={handleSave}
          className="
            w-full
            bg-black
            text-white
            py-4
            rounded-2xl
          "
        >
          Salvar configurações
        </button>

      </div>

    </main>

  );
}
