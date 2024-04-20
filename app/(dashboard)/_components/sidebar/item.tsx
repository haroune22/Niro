"use client"

import { Hint } from "@/components/hint"
import { action } from "@/convex/_generated/server"
import { cn } from "@/lib/utils"
import { useOrganization, useOrganizationList } from "@clerk/nextjs"
import Image from "next/image"


interface ItmeProps {
    id:string,
    name:string,
    imageUrl:string,
}
export const Item = ({
    id,
    imageUrl,
    name
}:ItmeProps) => {

    const { organization }  = useOrganization();
    const { setActive } = useOrganizationList();
    
    const isActive = id === organization?.id

    const onClick = () => {
        if(!setActive) return;

        setActive({organization:id})
    }

  return (
    <div className="aspect-square relative">
        <Hint 
                label={name}
                align="start"
                sideOffset={18}
                side="right"
            >
            <Image
                alt={name}
                src={imageUrl}
                fill
                onClick={onClick}
                className={cn(
                    "rounded-md cursor-pointer opacity-75 hover:opacity-100 trnasition",
                    isActive && "opacity-100"
                )}
            />
        </Hint>
    </div>
  )
}
