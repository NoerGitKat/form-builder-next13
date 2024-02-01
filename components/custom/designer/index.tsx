"use client";

import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";
import DesignerSidebar from "./sidebar";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { useDesigner } from "@/hooks";
import { ElementsType, FormElementInstance, FormElements } from "./elements";

function Designer() {
    const { formElements, addElement } = useDesigner();

    console.log("formElements", formElements);

    const droppable = useDroppable({
        id: "designer-drop-area",
        data: {
            isDesignerDropArea: true,
        },
    });

    useDndMonitor({
        onDragEnd: ({ active, over }: DragEndEvent) => {
            if (!active || !over) return;

            const isSidebarBtnElement =
                active.data?.current?.isDesignerBtnElement;

            if (isSidebarBtnElement) {
                const type = active.data?.current?.type;
                const newElement =
                    FormElements[type as ElementsType].construct(nanoid());

                addElement(0, newElement);
            }
        },
    });

    return (
        <section className="flex w-full h-full">
            <div className="p-4 w-full">
                <div
                    ref={droppable.setNodeRef}
                    className={cn(
                        "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
                        droppable.isOver && "ring-2 ring-primary/20",
                    )}
                >
                    {droppable.isOver && (
                        <div className="p-4 w-full">
                            <div className="h-[120px] rounded-md bg-primary/20"></div>
                        </div>
                    )}
                    {droppable.isOver || formElements.length > 0 ? (
                        <ul className="flex flex-col w-full gap-2 p-4">
                            {formElements.map((el) => (
                                <DesignerElementWrapper
                                    key={el.id}
                                    element={el}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p className="text-xl md:text-3xl text-muted foreground flex flex-grow items-center font-bold">
                            Drop components here
                        </p>
                    )}
                </div>
            </div>
            <DesignerSidebar />
        </section>
    );
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
    const DesignerElement = FormElements[element.type].designerComponent;

    return <DesignerElement element={element} />;
}

export default Designer;
