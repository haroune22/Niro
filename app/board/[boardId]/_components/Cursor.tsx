'use client'

import { connectioIdtoColor } from "@/lib/utils"
import { useOther } from "@liveblocks/react/suspense";
import { MousePointer2 } from "lucide-react"
import { memo } from "react"

interface Cursorprops {
    connectionId: number;
}
export const Cursor = memo(({
    connectionId
}:Cursorprops) => { 

    const info = useOther(connectionId, (user)=> user?.info);
    const cursor = useOther(connectionId, (user)=> user?.presence.cursor);

    const name = info?.name || "Teammate";
    
    console.log({info, cursor});

    if(!cursor) {
        return null;
    }

    const { x, y } = cursor

  return (
    <foreignObject
        style={{
            transform: `translateX(${x}px) translateY(${y}px)`
        }}
        height={50}
        width={50}
        className="relative drop-shadow-md"
    >
        <MousePointer2 
            className="h-5 w-5" 
            style={{
                fill:connectioIdtoColor(connectionId),
                color:connectioIdtoColor(connectionId),
            }}
        />
    </foreignObject>
  )
})

Cursor.displayName = "Cursor"