import { Button } from "@/components/ui/button";
import { FaSpinner } from "react-icons/fa";
import { HiSaveAs } from "react-icons/hi";

function SaveFormBtn({ formId }: { formId: number }) {
    return (
        <Button
            variant={"outline"}
            className="gap-2"
            disabled={false}
            onClick={() => {
                alert("Click!");
            }}
        >
            <HiSaveAs className="h-4 w-4" />
            Save
            {false && <FaSpinner className="animate-spin" />}
        </Button>
    );
}

export default SaveFormBtn;
