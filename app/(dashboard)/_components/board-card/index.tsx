"use client"

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns"
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./Footer";
import { Skeleton } from "@/components/ui/skeleton";


interface BoardCardProps {
    id:string;
    title: string;
    authorId: string;
    authorName: string;
    createdAt:number;
    imageUrl: string;
    orgId: string;
    isFavorite:boolean;

}

export const BoardCard = ({
    authorId,
    authorName,
    createdAt,
    id,
    imageUrl,
    isFavorite,
    orgId,
    title
}:BoardCardProps) => {

    const { userId } = useAuth()

    const authorLabel = userId === authorId ? "You" : authorName
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true
    });

  return (
    <Link href={`/board/${id}`}>
        <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
            <div className="relative flex-1 bg-amber-50">
                <Image 
                    src={imageUrl}
                    fill
                    alt={title}
                    className="object-fill"
                 />
                <Overlay />
            </div>
            <Footer 
                isFavorite={isFavorite}
                title={title}
                authorLabel={authorLabel}
                createdAtLabel={createdAtLabel}
                onClick={()=>{}}
                disabled={false}
            />
        </div>
    </Link>
  )
}

BoardCard.Skeleton = function BoardCardSkeleton (){
    return (
        <div className="aspect-[100/127] rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full"/>
        </div>
    )
}