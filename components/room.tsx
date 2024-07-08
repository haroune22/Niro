"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Color, Layer } from "@/types/canvas";


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
      <RoomProvider 
        initialPresence={{ cursor: null, selection: [] }} 
        initialStorage={{ 
          layers: new LiveMap<string, LiveObject<Layer>>(),
          layerIds: new LiveList<string>([]),
        }} 
        id={roomId}
      >
        <ClientSideSuspense fallback={fallback}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}