"use client"

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns"
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";

import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";


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

    const { 
        mutate: onFavorite,
        pending: pendingFavorite
    } = useApiMutation(api.board.favorite);

    const { 
        mutate: onUnfavorite,
        pending: pendingUnfavorite
    } = useApiMutation(api.board.unfavorite);


    const toggleFavorite = () => {
        if(isFavorite){
            onUnfavorite({id})
            .catch(()=> toast.error('failed to unfavorite'))
        }else{
            onFavorite({id, orgId})
            .catch(()=> toast.error('failed to favorite'))
        }
    }

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
                <Actions
                    id={id}
                    title={title}
                    side="right"
                 >
                    <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                        <MoreHorizontal className="text-white opcaity-75 hover:opacity-100 transition-opacity"/>
                    </button>
                 </Actions>
            </div>
            <Footer 
                isFavorite={isFavorite}
                title={title}
                authorLabel={authorLabel}
                createdAtLabel={createdAtLabel}
                onClick={toggleFavorite}
                disabled={pendingFavorite || pendingUnfavorite}
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