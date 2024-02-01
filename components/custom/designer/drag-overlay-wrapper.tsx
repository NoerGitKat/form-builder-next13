import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SidebarBtnElementDragOverlay } from "./sidebar-btn";
import { ElementsType, FormElements } from "./elements";

export default function DragOverlayWrapper() {
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

    return <DragOverlay>{node}</DragOverlay>;
}
