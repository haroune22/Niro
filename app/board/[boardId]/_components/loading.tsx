
import { Loader } from "lucide-react"
import { InfoSkeleton } from "./Info"
import { ParticipantsSkeleton } from "./Participants"
import { TolbarSkeleton } from "./Tolbar"

export const Loading = () => {
  return (
    <main className='h-full w-full flex items-center justify-center relative bg-neutral-100 touch-none' >
        <Loader className="h-6 w-6 text-muted-foreground animate-spin"/>
        <InfoSkeleton />
        <ParticipantsSkeleton />
        <TolbarSkeleton />
    </main>
  )
}
