import { getForms } from "@/actions";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Form } from "@prisma/client";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { FaEdit, FaWpforms } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import { BiRightArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui/button";

export function FormCardSkeleton() {
    return (
        <Skeleton className="border-2 border-primary-2/20 h-[190px] w-full" />
    );
}

export async function FormCards() {
    const forms = await getForms();

    return (
        <>
            {forms.length > 0
                ? forms.map((form) => <FormCard key={form.id} form={form} />)
                : null}
        </>
    );
}

function FormCard({
    form: { id, name, createdAt, published, visits, submissions, description },
}: {
    form: Form;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-between">
                    <span className="truncate font-bold">{name}</span>
                    <Badge variant={published ? "default" : "outline"}>
                        {published ? "Published" : "Draft"}
                    </Badge>
                </CardTitle>
                <CardDescription>
                    <span>
                        {formatDistance(createdAt, new Date(), {
                            addSuffix: true,
                        })}
                    </span>
                    {published && (
                        <aside className="flex items-center gap-2">
                            <LuView className="text-muted-foreground" />
                            <span>{visits.toLocaleString()}</span>
                            <FaWpforms className="text-muted-foreground" />
                            <span>{submissions.toLocaleString()}</span>
                        </aside>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="truncate text-sm text-muted-foreground">
                {description || <span className="italic">No description</span>}
            </CardContent>
            <CardFooter>
                {published && (
                    <Button asChild className="w-full mt-2 text-md gap-4">
                        <Link href={`/forms/${id}`}>
                            View submissions <BiRightArrowAlt />
                        </Link>
                    </Button>
                )}
                {!published && (
                    <Button
                        asChild
                        variant="secondary"
                        className="w-full mt-2 text-md gap-4"
                    >
                        <Link href={`/builder/${id}`}>
                            Edit form <FaEdit />
                        </Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
