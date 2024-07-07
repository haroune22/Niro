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
    <LiveblocksProvider throttle={16} authEndpoint="/api/liveblocks-auth">
      <RoomProvider initialPresence={{cursor:null}} id={roomId}>
        <ClientSideSuspense fallback={fallback}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}