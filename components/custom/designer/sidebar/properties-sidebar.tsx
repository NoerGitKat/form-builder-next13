import React from "react";
import { FormElements } from "../elements";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { useDesigner } from "@/hooks";

export default function PropertiesSidebar() {
    const { selectedElement, setSelectedElement } = useDesigner();

    if (!selectedElement) return null;

    const PropertiesForm =
        FormElements[selectedElement.type].propertiesComponent;

    return (
        <aside className="flex flex-col p-2">
            <div className="flex justify-between items-center">
                <h5 className="text-sm text-foreground/70">
                    Element properties
                </h5>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                        setSelectedElement(null);
                    }}
                >
                    <AiOutlineClose />
                </Button>
            </div>
            <PropertiesForm element={selectedElement} />
        </aside>
    );
}
