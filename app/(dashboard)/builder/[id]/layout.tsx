import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
    return (
        <section className="flex w-full flex-grow mx-auto">{children}</section>
    );
}

export default Layout;
