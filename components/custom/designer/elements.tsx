import { ElementType } from "react";
import { TextFieldFormElement, extraAttributes } from "./fields/text-field";

export type ElementsType = "TextField";

export type FormElement = {
    type: ElementsType;

    construct: (id: string) => FormElementInstance;
    designerBtnElement: {
        icon: ElementType;
        label: string;
    };
    designerComponent: React.FC<{
        element: FormElementInstance;
    }>;
    formComponent: React.FC<{
        element: FormElementInstance;
    }>;
    propertiesComponent: React.FC<{
        element: FormElementInstance;
    }>;
};

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes: typeof extraAttributes;
};

type FormElementsType = {
    [key in ElementsType]: FormElement;
};
export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement,
};
