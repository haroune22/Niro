"use client"

import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo, Undo2 } from "lucide-react"
import { ToolButton } from "./ToolButton"
import { CanvasState } from "@/types/canvas";


interface ToolbarProps {
  canvaState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: ()=> void;
  redo: ()=> void;
  canUndo: boolean;
  canRedo: boolean;
};


export const Toolbar = ({
    canRedo,
    canUndo,
    canvaState,
    redo,
    setCanvasState,
    undo
}: ToolbarProps) => {
  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 '>
        <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
          <ToolButton
            label="Select"
            icon={MousePointer2}
            onClick={()=>{}}
            isActive={false}
           />
          <ToolButton
            label="Text"
            icon={Type}
            onClick={()=>{}}
            isActive={false}
           />
          <ToolButton
            label="Sticky note"
            icon={StickyNote}
            onClick={()=>{}}
            isActive={false}
           />
          <ToolButton
            label="Rectangle"
            icon={Square}
            onClick={()=>{}}
            isActive={false}
           />
          <ToolButton
            label="Elipse"
            icon={Circle}
            onClick={()=>{}}
            isActive={false}
           />
          <ToolButton
            label="Pen"
            icon={Pencil}
            onClick={()=>{}}
            isActive={false}
           />
        </div>
        <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
          <ToolButton
            label="Undo"
            icon={Undo2}
            onClick={()=>{}}
            isActive={false}
            isDisabled={true}
          />
          <ToolButton
            label="Redo"
            icon={Redo2}
            onClick={()=>{}}
            isActive={false}
            isDisabled={true}
          />
        </div>
    </div>
  )
}

export const TolbarSkeleton = () => {
  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md'/>
  )
}
