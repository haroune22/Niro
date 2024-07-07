"use client"
import React, { useCallback, useState } from 'react'
import { Info } from './Info'
import { Participants } from './Participants'
import { Toolbar } from './Tolbar'
import { Camera, CanvasMode, CanvasState } from '@/types/canvas'
import { 
  useHistory, 
  useCanRedo, 
  useCanUndo,
  useMutation
} from '@liveblocks/react/suspense'
import { CusrsorsPresence } from './CusrsorsPresence'
import { pointerEventToCanvasPoint } from '@/lib/utils'


interface CanvasProps {
  boardId:string
};


export const Canvas = ({
  boardId
}:CanvasProps) => {

  const [canvasState,setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  })
  const [camera,setCamera] = useState<Camera>({x:0, y:0})

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const onWheel = useCallback((e:React.WheelEvent) => {
    // console.log({
    //   Whellx:e.deltaX,
    //   Wheely:e.deltaY
    // })
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY
    }))
  },[]);

  const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault();

    const current = pointerEventToCanvasPoint(e,camera);
    // console.log({camera, current});
    setMyPresence({cursor: current});
  },[]);

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({cursor: null});
  },[]);

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
        <svg 
          onWheel={onWheel}
          onPointerMove={onPointerMove} 
          onPointerLeave={onPointerLeave}
          className='h-[100vh] w-[100vw]'
        >
          <g>
            <CusrsorsPresence />
          </g>
        </svg>
    </main>
  )
}
