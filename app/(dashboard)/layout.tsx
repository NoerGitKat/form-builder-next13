import Logo from "@/components/custom/logo";
import ThemeSwitcher from "@/components/custom/theme-switcher";
import { UserButton } from "@clerk/nextjs";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <aside className="flex gap-4 items-center">
          <ThemeSwitcher />
          <UserButton afterSignOutUrl="/" />
        </aside>
      </nav>
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
}
