"use client"

import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo, Undo2 } from "lucide-react"
import { ToolButton } from "./ToolButton"
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";


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
            onClick={()=>setCanvasState({mode: CanvasMode.None})}
            isActive={
              canvaState.mode === CanvasMode.None ||
              canvaState.mode === CanvasMode.Translating ||
              canvaState.mode === CanvasMode.SelectionNet ||
              canvaState.mode === CanvasMode.Pressing ||
              canvaState.mode === CanvasMode.Resizing 
            }
           />
          <ToolButton
            label="Text"
            icon={Type}
            onClick={()=>setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text
            })}
            isActive={
              canvaState.mode === CanvasMode.Inserting &&
              canvaState.layerType === LayerType.Text
            }
           />
          <ToolButton
            label="Sticky note"
            icon={StickyNote}
            onClick={()=>setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note
            })}
            isActive={
              canvaState.mode === CanvasMode.Inserting &&
              canvaState.layerType === LayerType.Note
            }
           />
          <ToolButton
            label="Rectangle"
            icon={Square}
            onClick={()=>setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle
            })}
            isActive={
              canvaState.mode === CanvasMode.Inserting &&
              canvaState.layerType === LayerType.Rectangle
            }
           />
          <ToolButton
            label="Ellipse"
            icon={Circle}
            onClick={()=>setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse
            })}
            isActive={
              canvaState.mode === CanvasMode.Inserting &&
              canvaState.layerType === LayerType.Ellipse
            }
           />
          <ToolButton
            label="Pen"
            icon={Pencil}
            onClick={()=>setCanvasState({
              mode: CanvasMode.Pencil
            })}
            isActive={
              canvaState.mode === CanvasMode.Pencil
            }
           />
        </div>
        <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
          <ToolButton
            label="Undo"
            icon={Undo2}
            onClick={undo}
            isActive={false}
            isDisabled={!canUndo}
          />
          <ToolButton
            label="Redo"
            icon={Redo2}
            onClick={redo}
            isActive={false}
            isDisabled={!canRedo}
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
