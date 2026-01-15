import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main
      className="
        min-h-screen
        w-full
        overflow-y-auto
        flex
        items-start
        justify-start
        p-[20px]
        md:p-[30px]
        lg:p-[50px]
      "
    >
      {children}
    </main>
  );
}
