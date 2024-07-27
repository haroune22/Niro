"use client";
import { shallow } from "@liveblocks/client"
import { useOthersConnectionIds, useOthersMapped } from "@liveblocks/react/suspense";
import { memo } from "react";
import { Cursor } from "./Cursor";
import { Path } from "./Path";
import { colorToCss } from "@/lib/utils";

const Cusrsors  = () => {
    const ids = useOthersConnectionIds();

    return (
        <>
            {ids.map((connectionId) => (
                <Cursor    
                    key={connectionId}
                    connectionId={connectionId}
                />
            ))}
        </>
    )
}
const Drafts  = () => {
    const others = useOthersMapped((other)=> ({
        pencilDraft: other.presence.pencilDraft,
        penColor: other.presence.penColor,
    }), shallow);

    return (
        <>
           {others.map(([key, other])=> {
            if(other.pencilDraft){
                return (
                    <Path
                        key={key}
                        x={0}
                        y={0}
                        points={other.pencilDraft}
                        fill={other.penColor ? colorToCss(other.penColor) : '#000'}
                    />
                )
            }
            return null;
           })}
        </>
    )
}

export const CusrsorsPresence = memo(() => {
  return (
    <>
        <Drafts/>
        <Cusrsors />
    </>
  )
});

CusrsorsPresence.displayName = "CusrsorsPresence";
