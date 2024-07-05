"use client"
import React, { useState } from 'react'
import { Info } from './Info'
import { Participants } from './Participants'
import { Toolbar } from './Tolbar'
import { CanvasMode, CanvasState } from '@/types/canvas'
import { useHistory, useCanRedo, useCanUndo } from '@liveblocks/react/suspense'


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
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  return (
    <main 
        className='h-full w-full relative bg-neutral-100 touch-none'
    >
        <Info boardId={boardId} />
        <Participants/>
        <Toolbar 
            canvaState={canvasState}
            canRedo={canRedo}
            canUndo={canUndo}
            setCanvasState={setCanvasState}
            redo={history.redo}
            undo={history.undo}
          />
    </main>
  )
}
