import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const themeScript = `
    try {

      const sidebarColor =
        localStorage.getItem("sidebar-color");

      const sidebarTextColor =
        localStorage.getItem("sidebar-text-color");

      const backgroundColor =
        localStorage.getItem("background-color");

      const textColor =
        localStorage.getItem("text-color");

      if (sidebarColor) {
        document.documentElement.style.setProperty(
          "--sidebar-color",
          sidebarColor
        );
      }

      if (sidebarTextColor) {
        document.documentElement.style.setProperty(
          "--sidebar-text-color",
          sidebarTextColor
        );
      }

      if (backgroundColor) {
        document.documentElement.style.setProperty(
          "--background-color",
          backgroundColor
        );
      }

      if (textColor) {
        document.documentElement.style.setProperty(
          "--text-color",
          textColor
        );
      }

    } catch (e) {}
  `;

  return (

    <html lang="pt-BR">

      <head>

        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />

      </head>

      <body>
        {children}
      </body>

    </html>

  );
}