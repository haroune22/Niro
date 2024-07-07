"use client"

import { useOthers , useSelf } from "@liveblocks/react/suspense"
import { UserAvatar } from "./userAvatar"
import { connectionIdtoColor } from "@/lib/utils";

const MAX_SHOWN_USERS = 2;

export const Participants = () => {

  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
        <div className="flex gap-y-2 gap-x-2">
          {users.slice(0, MAX_SHOWN_USERS).map(({connectionId, info}) => {
            return (
              <UserAvatar
                borderColor={connectionIdtoColor(connectionId)}
                fallback={info?.name?.[0] || "T"}
                key={connectionId}
                name={info?.name}
                src={info?.picture}
              />
            )
          })}
          {currentUser && (
              <UserAvatar
                borderColor={connectionIdtoColor(currentUser.connectionId)}
                fallback={currentUser?.info?.name?.[0] || "T"}
                key={currentUser?.connectionId}
                name={currentUser?.info?.name}
                src={currentUser?.info?.picture}
              />
            )
          }
          {hasMoreUsers && (
            <UserAvatar
              borderColor=""
              fallback={`+ ${users.length - MAX_SHOWN_USERS}`}
              name={`${users.length - MAX_SHOWN_USERS} more`}
            />
          )}
        </div>
    </div>
  )
}

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px] "/>
  )
}