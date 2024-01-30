import { StatsCardsWrapper } from "@/components/custom/cards";
import {
    FormCardSkeleton,
    FormCards,
} from "@/components/custom/cards/forms-card";
import CreateFormButton from "@/components/custom/create-form-button";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

export default function Home() {
    const fallbackForms = [1, 2, 3, 4];
    return (
        <main className="container pt-4">
            <Suspense>
                <StatsCardsWrapper />
            </Suspense>
            <Separator className="my-6" />
            <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
            <Separator className="my-6" />
            <aside className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CreateFormButton />
                <Suspense
                    fallback={fallbackForms.map((fallbackForm) => (
                        <FormCardSkeleton key={fallbackForm} />
                    ))}
                >
                    <FormCards />
                </Suspense>
            </aside>
        </main>
    );
}
