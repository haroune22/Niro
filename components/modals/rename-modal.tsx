"use client"

import { useRenameModal } from "@/store/use-rename-modal"
import { 
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog"


export const RenameModal = () => {

  const {
    initialValues,
    isOpen,
    onClose,
    onOpen
  } = useRenameModal();


  return (

    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit board title
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Enter an new title for this board
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
