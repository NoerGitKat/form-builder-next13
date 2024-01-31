"use client";

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement } from "../elements";

const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: {
            label: "Text field",
            helperText: "Description",
            required: false,
            placeholder: "Placeholder",
        },
    }),
    designerBtnElement: {
        icon: MdTextFields,
        label: "Text Field",
    },
    designerComponent: () => <div>Deisnger</div>,
    formComponent: () => <div>Deisnger</div>,
    propertiesComponent: () => <div>Deisnger</div>,
};
