"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter,
} from "../ui/dialog";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "../ui/button";
import {
    FormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";

const formSchema = z.object({
    name: z.string().min(4),
    description: z.string().optional(),
});

type formSchemaType = z.infer<typeof formSchema>;

export default function CreateFormButton() {
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const handleFormData = (values: formSchemaType) => {
        console.log("values are", values);

        try {
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong, please try again later.",
                variant: "destructive",
            });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create new form</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create form</DialogTitle>
                    <DialogDescription>
                        Create a form to start collecting data!
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleFormData)}
                        className="space-y-2"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="..."
                                            rows={5}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={form.formState.isSubmitting}
                            type="submit"
                            className="w-full mt-4"
                        >
                            {form.formState.isSubmitting ? (
                                <ImSpinner2 className="animate-spin" />
                            ) : (
                                <span>Save</span>
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
