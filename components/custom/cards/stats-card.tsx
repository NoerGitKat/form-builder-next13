import { getFormStats } from "@/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";

export default async function StatsCardsWrapper() {
    const stats = await getFormStats();

    return <StatsCards isLoading={false} stats={stats} />;
}

type StatsCardsProps = {
    stats: Awaited<ReturnType<typeof getFormStats>>;
    isLoading: boolean;
};

function StatsCards({ stats, isLoading }: StatsCardsProps) {
    return (
        <ul className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
                title="Total visits"
                icon={<LuView className="text-blue-600" />}
                helperText="All time form visits"
                value={stats?.visits.toLocaleString() || ""}
                isLoading={isLoading}
                className="shadow-md shadow-blue-600"
            />

            <StatsCard
                title="Total submissions"
                icon={<FaWpforms className="text-yellow-600" />}
                helperText="All time form submissions"
                value={stats?.submissions.toLocaleString() || ""}
                isLoading={isLoading}
                className="shadow-md shadow-yellow-600"
            />

            <StatsCard
                title="Submission rate"
                icon={<HiCursorClick className="text-green-600" />}
                helperText="Visits that result in form submission"
                value={stats?.submissionRate.toLocaleString() + "%" || ""}
                isLoading={isLoading}
                className="shadow-md shadow-green-600"
            />

            <StatsCard
                title="Bounce rate"
                icon={<TbArrowBounce className="text-red-600" />}
                helperText="Visits that leaves without interacting"
                value={stats?.submissionRate.toLocaleString() + "%" || ""}
                isLoading={isLoading}
                className="shadow-md shadow-red-600"
            />
        </ul>
    );
}

type StatsCardProps = {
    title: string;
    icon: ReactNode;
    helperText: string;
    value: string;
    isLoading: boolean;
    className: string;
};

function StatsCard({
    title,
    icon,
    helperText,
    value,
    isLoading,
    className,
}: StatsCardProps) {
    return (
        <li>
            <Card className={className}>
                <CardHeader className="flex flex-row justify-between pb-2">
                    <CardTitle>{title}</CardTitle>
                    {icon}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {isLoading ? (
                            <Skeleton>
                                <span>0</span>
                            </Skeleton>
                        ) : (
                            value
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground pt-1">
                        {helperText}
                    </p>
                </CardContent>
            </Card>
        </li>
    );
}
