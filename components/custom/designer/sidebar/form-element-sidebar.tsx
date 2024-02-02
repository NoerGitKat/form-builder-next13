import React from "react";
import SidebarBtnElement from "./sidebar-btn";
import { FormElements } from "../elements";

export default function FormElementSidebar() {
    return (
        <div>
            <SidebarBtnElement formElement={FormElements.TextField} />
        </div>
    );
}
