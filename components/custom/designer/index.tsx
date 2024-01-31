"use client";

import DesignerSidebar from "./sidebar";
import { useDroppable } from "@dnd-kit/core";

function Designer() {
    const droppable = useDroppable({
        id: "designer-drop-area",
        data: {
            isDesignerDropArea: true,
        },
    });

    return (
        <section className="flex w-full h-full">
            <div className="p-4 w-full">
                <div className="bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto">
                    <p className="text-3xl text-muted foreground flex flex-grow items-center font-bold">
                        Drop components here
                    </p>
                </div>
            </div>
            <DesignerSidebar />
        </section>
    );
}

export default Designer;