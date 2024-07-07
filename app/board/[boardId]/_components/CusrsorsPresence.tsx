"use client";

import { useOthersConnectionIds } from "@liveblocks/react/suspense";
import { memo } from "react";
import { Cursor } from "./Cursor";

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

export const CusrsorsPresence = memo(() => {
  return (
    <>
        <Cusrsors />
    </>
  )
});

CusrsorsPresence.displayName = "CusrsorsPresence";
