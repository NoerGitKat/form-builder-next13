"use client";

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance } from "../elements";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const type: ElementsType = "TextField";

export const extraAttributes = {
    label: "Text field",
    helperText: "Description",
    required: false,
    placeholder: "Placeholder",
};

export const TextFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: MdTextFields,
        label: "Text Field",
    },
    designerComponent: ({
        element: {
            extraAttributes: { label, required, placeholder, helperText },
        },
    }: {
        element: FormElementInstance;
    }) => {
        return (
            <li className="flex flex-col gap-2 w-full">
                <Label>
                    {label} {required && "*"}
                </Label>
                <Input readOnly disabled placeholder={placeholder} />
                {helperText && (
                    <p className="text-muted-foreground text-[0.8rem]"></p>
                )}
            </li>
        );
    },
    formComponent: () => <div>Deisnger</div>,
    propertiesComponent: () => <div>Deisnger</div>,
};
