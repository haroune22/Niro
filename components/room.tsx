"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

export function Room({ 
  children,
  roomId, 
  fallback 
}: { 
  children: ReactNode, 
  roomId:string, 
  fallback: NonNullable<ReactNode> | null 
}) {
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_eugxl0Mm3eyLWek1itmiGRK0fRj2feO9AvTEAQQ9Qg_Fr2A8mXD7zv5BWvpvI3_a"}>
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={fallback}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}