"use client";

import { FormElementInstance } from "@/components/custom/designer/elements";
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from "react";

export type DesignerContextType = {
    formElements: FormElementInstance[];
    addElement: (index: number, element: FormElementInstance) => void;
    removeElement: (id: string) => void;
    selectedElement: FormElementInstance | null;
    setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
};

export const designerContext = createContext<DesignerContextType | null>(null);

export function DesignerContextProvider({ children }: { children: ReactNode }) {
    const [formElements, setFormElements] = useState<FormElementInstance[]>([]);
    const [selectedElement, setSelectedElement] =
        useState<FormElementInstance | null>(null);

    const addElement = (index: number, element: FormElementInstance) => {
        setFormElements([...formElements, element]);
    };

    const removeElement = (id: string) => {
        setFormElements((prev) => {
            const updatedElements = prev.filter((el) => el.id !== id);
            return updatedElements;
        });
    };

    return (
        <designerContext.Provider
            value={{
                formElements,
                addElement,
                removeElement,
                selectedElement,
                setSelectedElement,
            }}
        >
            {children}
        </designerContext.Provider>
    );
}
