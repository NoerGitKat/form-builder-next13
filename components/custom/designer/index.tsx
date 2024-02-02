"use client";

import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";
import DesignerSidebar from "./sidebar";
import {
    DragEndEvent,
    useDndMonitor,
    useDraggable,
    useDroppable,
} from "@dnd-kit/core";
import { BiSolidTrash } from "react-icons/bi";
import { useDesigner } from "@/hooks";
import { ElementsType, FormElementInstance, FormElements } from "./elements";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function Designer() {
    const { formElements, addElement } = useDesigner();

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
                    {droppable.isOver && formElements.length === 0 && (
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
    const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
    const { removeElement } = useDesigner();
    const DesignerElement = FormElements[element.type].designerComponent;

    const topDropzone = useDroppable({
        id: element.id + "-top",
        data: {
            type: element.type,
            elementId: element.id,
            isTopDropzone: true,
        },
    });

    const bottomDropzone = useDroppable({
        id: element.id + "-bottom",
        data: {
            type: element.type,
            elementId: element.id,
            isBottomDropzone: true,
        },
    });

    const draggable = useDraggable({
        id: element.id + "-drag-handler",
        data: {
            type: element.type,
            elementId: element.id,
            isDesignerElement: true,
        },
    });

    if (draggable.isDragging) {
        return null;
    }

    return (
        <section
            className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
            ref={draggable.setNodeRef}
            {...draggable.listeners}
            {...draggable.attributes}
            onMouseEnter={() => {
                setMouseIsOver(true);
            }}
            onMouseLeave={() => {
                setMouseIsOver(false);
            }}
        >
            {mouseIsOver && (
                <section>
                    <div className="absolute right-0 h-full z-10">
                        <Button
                            className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
                            variant="outline"
                            onClick={() => removeElement(element.id)}
                        >
                            <BiSolidTrash className="h-6 w-6" />
                        </Button>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
                        <p className="text-muted-foreground text-sm">
                            Click for properties or drag to move
                        </p>
                    </div>
                </section>
            )}
            <div
                ref={topDropzone.setNodeRef}
                className={cn(
                    "absolute w-full h-1/2 rounded-t-md",
                    topDropzone.isOver && "border-t-8 border-solid",
                )}
            ></div>
            <div
                className={cn(
                    "flex w-full h-full items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100 transition-all",
                    mouseIsOver && "opacity-30",
                )}
            >
                <DesignerElement element={element} />
            </div>
            <div
                ref={bottomDropzone.setNodeRef}
                className={cn(
                    "absolute  w-full bottom-0 h-1/2 rounded-b-md",
                    bottomDropzone.isOver && "border-b-8 border-solid",
                )}
            ></div>
        </section>
    );
}

export default Designer;
