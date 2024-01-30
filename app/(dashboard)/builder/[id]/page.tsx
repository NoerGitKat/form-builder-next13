import { getFormById } from "@/actions";
import FormBuilder from "@/components/custom/form-builder";

async function BuilderPage({
    params: { id: formId },
}: {
    params: {
        id: string;
    };
}) {
    const form = await getFormById(Number(formId));
    if (!form) throw new Error("Form not found!");

    return <FormBuilder form={form} />;
}

export default BuilderPage;
