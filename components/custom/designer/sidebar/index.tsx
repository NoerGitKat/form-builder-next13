import { useDesigner } from "@/hooks";
import FormElementSidebar from "./form-element-sidebar";
import PropertiesSidebar from "./properties-sidebar";

export default function DesignerSidebar() {
    const { selectedElement } = useDesigner();

    return (
        <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
            {!selectedElement ? <FormElementSidebar /> : <PropertiesSidebar />}
        </aside>
    );
}
