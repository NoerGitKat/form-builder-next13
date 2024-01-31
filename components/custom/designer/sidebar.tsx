import { FormElements } from "./elements";
import SidebarBtnElement from "./sidebar-btn";

export default function DesignerSidebar() {
    return (
        <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
            <h3 className="text-md font-bold">Elements</h3>
            <SidebarBtnElement formElement={FormElements.TextField} />
        </aside>
    );
}
