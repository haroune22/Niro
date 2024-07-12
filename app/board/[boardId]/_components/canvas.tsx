"use client"

import React, { useCallback, useMemo, useState } from 'react'
import { 
  Camera, 
  CanvasMode, 
  CanvasState, 
  Color, 
  LayerType,
  Point,
  Side,
  XYWH,
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
import { LiveObject } from '@liveblocks/client'

import { CusrsorsPresence } from './CusrsorsPresence'
import { connectionIdtoColor, pointerEventToCanvasPoint, ResizeBounds } from '@/lib/utils'
import { Info } from './Info'
import { Toolbar } from './Tolbar'
import { Participants } from './Participants'
import { LayerPreview } from './LayerPreview'
import { SelectionBox } from './SelectionBox'



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
  

  const translateSelectedLayers = useMutation((
    { storage, self },
    point: Point,
  )=> {

    if(canvasState.mode !== CanvasMode.Translating) {
      return ;
    }

    const offset = {
      x: point.x - canvasState.current.x,
      y: point.y - canvasState.current.y
    }

    const liveLayers = storage.get("layers")

    for(const id of self.presence.selection){
      const layer = liveLayers.get(id)

      if(layer){
        layer.update({
          x: layer.get("x") + offset.x,
          y: layer.get("y") + offset.y,
        })
      }
    }
    
    setCanvasState({mode: CanvasMode.Translating, current: point})

  }, [canvasState]);

  const unselectLayers = useMutation((
    { self, setMyPresence },
  ) => {
    if(self.presence.selection.length > 0) {
      setMyPresence({ selection: []}, { addToHistory: true})
    }
  },[]);

  const resizeSelectedLayer = useMutation((
    { storage, self },
    point: Point,
  ) => {
    if(canvasState.mode !== CanvasMode.Resizing) {
      return ;
    }

    const bounds = ResizeBounds(
      canvasState.initialBounds,
      canvasState.corner,
      point,
    );

    const liveLayers = storage.get("layers")
    const layer = liveLayers.get(self.presence.selection[0])

    if(layer){
      layer.update(bounds)
    }
    
  },[canvasState])

  const onResizeHandlePointerDown = useCallback(( corner: Side, initialBounds: XYWH) => {

    history.pause()
    // console.log({corner, initialBounds})
    setCanvasState({
      mode: CanvasMode.Resizing,
      initialBounds,
      corner,
    });
    console.log(initialBounds, corner);

  }, [history]);


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

    if(canvasState.mode === CanvasMode.Translating) {
      translateSelectedLayers(current)
    } else if(canvasState.mode === CanvasMode.Resizing) {
      resizeSelectedLayer(current)
    };

    setMyPresence({cursor: current});

  },[canvasState, , resizeSelectedLayer, camera, translateSelectedLayers]);


  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({cursor: null});
  },[canvasState]);

  const onPointerDown = useCallback((e:React.PointerEvent) => {

    const point = pointerEventToCanvasPoint(e, camera);

    if(canvasState.mode === CanvasMode.Inserting){
      return ;
    };

    setCanvasState({ origin: point , mode: CanvasMode.Pressing})
  },[canvasState.mode, camera, setCanvasState])

  const onPointerUp = useMutation((
    {},
    e
  )=> {

    const point = pointerEventToCanvasPoint(e,camera);
    // console.log({point,mode:canvasState.mode})

    if(
      canvasState.mode === CanvasMode.None ||
      canvasState.mode === CanvasMode.Pressing
    ) {
      unselectLayers()
      setCanvasState({ mode: CanvasMode.None})
    }else if(canvasState.mode === CanvasMode.Inserting) {
      insertLayer(canvasState.layerType, point)
    } else {
      setCanvasState({
        mode: CanvasMode.None
      })
    };
    history.resume()

  },[camera, canvasState, history, insertLayer, unselectLayers]);

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
          onPointerDown={onPointerDown}
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
          <SelectionBox 
            onResizeHandlePointerDown={onResizeHandlePointerDown}
          />
          <CusrsorsPresence />
          </g>
        </svg>
    </main>
  )
}
