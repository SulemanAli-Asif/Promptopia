import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

function RootLayout({ children }: RootLayoutProps) {
  const session = undefined;
  return (
    <html lang="en">
      <Provider session={session}>
        <body>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </body>
      </Provider>
    </html>
  );
}

export default RootLayout;

interface RootLayoutProps {
  children: ReactNode;
}
