"use client"
import React, { useState } from 'react'
import { Info } from './Info'
import { Participants } from './Participants'
import { Toolbar } from './Tolbar'
import { CanvasMode, CanvasState } from '@/types/canvas'
import { useHistory } from '@liveblocks/react/suspense'


interface CanvasProps {
  boardId:string
};


export const Canvas = ({
  boardId
}:CanvasProps) => {

  const [canvasState,setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  })

  const history = useHistory()

  return (
    <main 
        className='h-full w-full relative bg-neutral-100 touch-none'
    >
        <Info boardId={boardId} />
        <Participants/>
        <Toolbar 
            canvaState={canvasState}
            canRedo={false}
            canUndo={false}
            setCanvasState={setCanvasState}
            redo={()=>{}}
            undo={()=>{}}
          />
    </main>
  )
}
