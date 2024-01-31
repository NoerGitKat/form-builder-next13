"use client";

import { DndContext } from "@dnd-kit/core";
import Designer from "../designer";
import PreviewDialogBtn from "./buttons/preview-form";
import PublishFormBtn from "./buttons/publish-form";
import SaveFormBtn from "./buttons/save-form";
import { Form } from "@prisma/client";
import DragOverlayWrapper from "../designer/drag-overlay-wrapper";

export default function FormBuilder({
    form: { name, id, published },
}: {
    form: Form;
}) {
    return (
        <DndContext>
            <main className="flex flex-col w-full">
                <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
                    <h2 className="truncate font-medium">
                        <span className="text-muted-foreground mr-2">
                            Form:
                        </span>
                        {name}
                    </h2>
                    <div className="flex items-center gap-2">
                        {/* <PreviewDialogBtn /> */}
                        {!published && (
                            <>
                                <SaveFormBtn formId={id} />
                                <PublishFormBtn formId={id} />
                            </>
                        )}
                    </div>
                </nav>
                <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
                    <Designer />
                </div>
            </main>
            <DragOverlayWrapper />
        </DndContext>
    );
}
