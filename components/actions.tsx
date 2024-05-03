"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "./ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { remove } from "@/convex/board";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";


interface ActionProps {
    children:React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps['sideOffset'];
    id:string;
    title:string;
}


export const Actions = ({
    children,
    id,
    title,
    side,
    sideOffset
}: ActionProps) => {

    const { mutate,pending } = useApiMutation(api.board.remove);
    const { onOpen } = useRenameModal()

    const onDelete = ()=> {
        mutate({id})
        .then(() => toast.success("Board deleted"))
        .catch(()=> toast.error("Faied to delete board"))
    };

    const onCopyLink = ()=> {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`,
        )
        .then(() => toast.success("Link Copied"))
        .catch(()=> toast.error("Faied to copy link"))
    };

  return (
    <div className="absolute z-50 top-1 right-1">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                side={side} 
                sideOffset={sideOffset}
                onClick={(e)=> e.stopPropagation()}
                className="w-60"
            >
                <DropdownMenuItem onClick={onCopyLink} className="p-3 cursor-pointer">
                    <Link2 className="h-4 w-4 mr-2"/>
                    Copy board link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>onOpen(id,title)} className="p-3 cursor-pointer">
                    <Pencil className="h-4 w-4 mr-2"/>
                    Rename
                </DropdownMenuItem>
                <ConfirmModal
                    header="Delete board?"
                    description="this will delete the board and all of its content"
                    disabled={pending}
                    onConfirm={onDelete}
                 >
                    <Button
                        variant="ghost"
                        // disabled={pending} 
                        // onClick={onDelete} 
                        className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
                    >
                        <Trash2 className="h-4 w-4 mr-2"/>
                        Delete
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
