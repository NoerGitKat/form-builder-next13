import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SidebarBtnElementDragOverlay } from "./sidebar/sidebar-btn";
import { ElementsType, FormElements } from "./elements";
import { useDesigner } from "@/hooks";

export default function DragOverlayWrapper() {
    const { formElements } = useDesigner();
    const [draggedItem, setDraggedItem] = useState<Active | null>(null);

    useDndMonitor({
        onDragStart: (event) => {
            setDraggedItem(event.active);
        },
        onDragCancel: () => {
            setDraggedItem(null);
        },
        onDragEnd: () => {
            setDraggedItem(null);
        },
    });

    if (!draggedItem) return null;

    const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement;
    let node = <div>Placeholder</div>;

    if (isSidebarBtnElement) {
        node = (
            <SidebarBtnElementDragOverlay
                formElement={
                    FormElements[
                        draggedItem.data?.current?.type as ElementsType
                    ]
                }
            />
        );
    }

    const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
    if (isDesignerElement) {
        const elementId = draggedItem.data?.current?.elementId;
        const element = formElements.find((el) => el.id === elementId);
        if (!element) {
            node = <div>Element not found.</div>;
        } else {
            const DesignerElementComponent =
                FormElements[element.type].designerComponent;
            node = (
                <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-2 opacity-80 pointer-events-none">
                    <DesignerElementComponent element={element} />
                </div>
            );
        }
    }

    return <DragOverlay>{node}</DragOverlay>;
}
