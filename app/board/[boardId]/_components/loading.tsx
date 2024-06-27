
import { Loader } from "lucide-react"
import { Info } from "./Info"
import { Participants } from "./Participants"
import { Tolbar } from "./Tolbar"

export const Loading = () => {
  return (
    <main className='h-full w-full flex items-center justify-center relative bg-neutral-100 touch-none' >
        <Loader className="h-6 w-6 text-muted-foreground animate-spin"/>
        <Info.Skeleton />
        <Participants.Skeleton />
        <Tolbar.Skeleton />
    </main>
  )
}
