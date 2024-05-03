"use client"

import React from 'react'
import { 
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogTitle,
    AlertDialogTrigger
} from './ui/alert-dialog'

interface ConfirmModalProps {
    children: React.ReactNode,
    onConfirm: () => void,
    disabled?: boolean,
    header: string,
    description?: string,
}

export const ConfirmModal = ({
    children,
    header,
    onConfirm,
    description,
    disabled
}: ConfirmModalProps) => {

    const hanldeConfirm = () => {
        onConfirm();
    }

  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    {header}
                </AlertDialogTitle>
                <AlertDialogDescription>
                    {description}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                    disabled={disabled}
                    onClick={hanldeConfirm}
                >
                    Confirm
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}
