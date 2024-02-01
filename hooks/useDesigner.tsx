"use client";

import { designerContext } from "@/context";
import { useContext } from "react";

function useDesigner() {
    const context = useContext(designerContext);

    if (!context)
        throw new Error(
            "useDesigner must be used within a DesignerContextProvider",
        );

    return context;
}

export default useDesigner;
