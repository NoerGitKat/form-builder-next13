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
    designerComponent: DesignerComponent,
    formComponent: () => <div>Designer</div>,
    propertiesComponent: PropertiesComponent,
};

function DesignerComponent({
    element: {
        extraAttributes: { label, required, placeholder, helperText },
    },
}: {
    element: FormElementInstance;
}) {
    return (
        <li className="flex flex-col gap-2 w-full">
            <Label>
                {label} {required && "*"}
            </Label>
            <Input readOnly disabled placeholder={placeholder} />
            {helperText && (
                <p className="text-muted-foreground text-[0.8rem]">
                    {helperText}
                </p>
            )}
        </li>
    );
}

function PropertiesComponent({
    element: {
        extraAttributes: { label, required, placeholder, helperText },
    },
}: {
    element: FormElementInstance;
}) {
    return (
        <div>
            Properties for <b>{label}</b>
        </div>
    );
}
