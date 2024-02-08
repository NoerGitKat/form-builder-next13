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
    updateElement: (id: string, element: FormElementInstance) => void;
};

export const designerContext = createContext<DesignerContextType | null>(null);

export function DesignerContextProvider({ children }: { children: ReactNode }) {
    const [formElements, setFormElements] = useState<FormElementInstance[]>([]);
    const [selectedElement, setSelectedElement] =
        useState<FormElementInstance | null>(null);

    const addElement = (index: number, element: FormElementInstance) => {
        setFormElements((prev) => {
            const newElements = [...prev];
            newElements.splice(index, 0, element);
            return newElements;
        });
    };

    const removeElement = (id: string) => {
        setFormElements((prev) => prev.filter((el) => el.id !== id));
    };

    const updateElement = (id: string, element: FormElementInstance) => {
        setFormElements((prev) => {
            const updatedElements = [...prev];
            const elIndex = updatedElements.findIndex((el) => el.id === id);
            updatedElements[elIndex] = element;
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
                updateElement,
            }}
        >
            {children}
        </designerContext.Provider>
    );
}
