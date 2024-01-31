import {
    AlertDialogHeader,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@radix-ui/react-alert-dialog";

import { FaSpinner } from "react-icons/fa";
import { MdOutlinePublish } from "react-icons/md";

function PublishFormBtn({ formId }: { formId: number }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
                    <MdOutlinePublish className="h-4 w-4" />
                    Publish
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. After publishing you will
                        not be able to edit this form. <br />
                        <br />
                        <span className="font-medium">
                            By publishing this form you will make it available
                            to the public and you will be able to collect
                            submissions.
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={false}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        Proceed
                        {false && <FaSpinner className="animate-spin" />}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default PublishFormBtn;
