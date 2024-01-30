"use server";

import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas";
import { UserNotFoundError } from "@/types";
import { currentUser } from "@clerk/nextjs/server";

export async function getFormStats() {
    const user = await currentUser();
    if (!user) throw new UserNotFoundError();

    const stats = prisma.form.aggregate({
        where: {
            userId: user.id,
        },
        _sum: {
            visits: true,
            submissions: true,
        },
    });

    const visits = (await stats)._sum.visits || 0;
    const submissions = (await stats)._sum.submissions || 0;

    let submissionRate = 0;
    let bounceRate = 0;

    if (visits > 0) submissionRate = (submissions / visits) * 100;

    bounceRate = 100 - submissionRate;

    return { visits, submissions, submissionRate, bounceRate };
}

export async function createForm(data: formSchemaType) {
    const isValidated = formSchema.safeParse(data);
    if (!isValidated)
        throw new Error("Form data is not valid. Please try again.");

    const user = await currentUser();
    if (!user) throw new UserNotFoundError();

    const { name, description } = data;

    const form = await prisma.form.create({
        data: {
            userId: user.id,
            name,
            description,
        },
    });

    if (!form) throw new Error("Form couldn't get created.");

    return form.id;
}
