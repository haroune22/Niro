"use client"
import React from 'react'
import { Info } from './Info'
import { Participants } from './Participants'
import { Tolbar } from './Tolbar'

interface CanvasProps {
  boardId:string
}
export const Canvas = ({
  boardId
}:CanvasProps) => {

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
