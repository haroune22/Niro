"use client"

import React, { useCallback, useMemo, useState } from 'react'
import { 
  Camera, 
  CanvasMode, 
  CanvasState, 
  Color, 
  LayerType,
  Point,
} from '@/types/canvas'
import { 
  useHistory, 
  useCanRedo, 
  useCanUndo,
  useMutation,
  useStorage,
  useOthersMapped
} from '@liveblocks/react/suspense'
import { nanoid } from "nanoid"

import { CusrsorsPresence } from './CusrsorsPresence'
import { connectionIdtoColor, pointerEventToCanvasPoint } from '@/lib/utils'
import { Info } from './Info'
import { Participants } from './Participants'
import { Toolbar } from './Tolbar'
import { LiveObject } from '@liveblocks/client'
import { LayerPreview } from './LayerPreview'



const MAX_LAYERS = 100;

interface CanvasProps {
  boardId:string
};


export const Canvas = ({
  boardId
}:CanvasProps) => {

  const layerIds = useStorage((root) => root.layerIds);

  const [canvasState,setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  });

  const [camera,setCamera] = useState<Camera>({x:0, y:0});

  const [lastUsedColor,setLastUsedColor] = useState<Color>({
    r:255,
    g:255,
    b:255,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const insertLayer = useMutation((
    { storage, setMyPresence },
    layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
    position: Point,
  ) => {

      const liveLayers = storage.get('layers')
      if(liveLayers.size >= MAX_LAYERS){
        return;
      }

      const liveLayerIds = storage.get('layerIds');
      const layerId = nanoid();
      
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });
      
      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId]}, { addToHistory: true } );
      setCanvasState({ mode: CanvasMode.None });

  },[lastUsedColor]);
  

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

  const onPointerUp = useMutation((
    {},
    e
  )=> {

    const point = pointerEventToCanvasPoint(e,camera);
    // console.log({point,mode:canvasState.mode})

    if(canvasState.mode === CanvasMode.Inserting) {
      insertLayer(canvasState.layerType, point)
    } else {
      setCanvasState({
        mode: CanvasMode.None
      })
    };
    history.resume()

  },[camera, canvasState, history, insertLayer]);

  const selections = useOthersMapped((other) => other.presence.selection);

  const onLayerPointerDown = useMutation((
    { self, setMyPresence },
    e:React.PointerEvent,
    layerId: string,
  ) => {
    if(
      canvasState.mode === CanvasMode.Pencil ||
      canvasState.mode === CanvasMode.Inserting
    ) {
      return ;
    }

    history.pause();
    e.stopPropagation();

    const point = pointerEventToCanvasPoint(e, camera)

    if(!self.presence.selection.includes(layerId)){
      setMyPresence({selection: [layerId]}, { addToHistory: true})
    };

    setCanvasState({ mode: CanvasMode.Translating, current: point});



  },[setCanvasState, camera, history, canvasState.mode])

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection : Record<string, string> = {};

    for(const user of selections) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdtoColor(connectionId);
      }
    }
    return layerIdsToColorSelection;

  },[selections])

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
          onPointerUp={onPointerUp}
        >
          <g style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
          {layerIds.map((layerId)=> (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
            <CusrsorsPresence />
          </g>
        </svg>
    </main>
  )
}
