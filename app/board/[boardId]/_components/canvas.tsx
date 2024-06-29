"use client"
import React from 'react'
import { Info } from './Info'
import { Participants } from './Participants'
import { Tolbar } from './Tolbar'
import { useSelf } from '@liveblocks/react/suspense'
interface CanvasProps {
  boardId:string
}
export const Canvas = ({
  boardId
}:CanvasProps) => {

  const info = useSelf((me) => me.info);
  console.log(info)
  return (
    <main 
        className='h-full w-full relative bg-neutral-100 touch-none'
    >
        <Info/>
        <Participants/>
        <Tolbar/>
    </main>
  )
}
