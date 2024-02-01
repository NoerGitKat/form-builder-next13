"use client";

import { FormElementInstance } from "@/components/custom/designer/elements";
import { ReactNode, createContext, useState } from "react";

export type DesignerContextType = {
    formElements: FormElementInstance[];
    addElement: (index: number, element: FormElementInstance) => void;
};

export const designerContext = createContext<DesignerContextType | null>(null);

export function DesignerContextProvider({ children }: { children: ReactNode }) {
    const [formElements, setFormElements] = useState<FormElementInstance[]>([]);

    const addElement = (index: number, element: FormElementInstance) => {
        setFormElements([...formElements, element]);
    };

    return (
        <designerContext.Provider value={{ formElements, addElement }}>
            {children}
        </designerContext.Provider>
    );
}
