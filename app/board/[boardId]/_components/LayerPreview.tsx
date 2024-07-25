"use client"

import { LayerType } from "@/types/canvas"
import { useStorage } from "@liveblocks/react/suspense"
import { memo } from "react"
import { Rectangle } from "./Rectangle"
import { Ellipse } from "./Ellipse"
import { Text } from "./Text"
import { Note } from "./Note"
import { Path } from "./Path"
import { colorToCss } from "@/lib/utils"







interface LayerPreviewProps {
    id:string,
    onLayerPointerDown: (e:React.PointerEvent, layerId: string)=> void,
    selectionColor?:string
}


export const LayerPreview = memo(({
    id,
    onLayerPointerDown,
    selectionColor
}:LayerPreviewProps) => {

    const layer = useStorage((root) => root.layers.get(id))
    // console.log(layer,id)
    
    if(!layer){
        return null;
    };

    switch(layer.type){
        case LayerType.Path:
            return (
                    <Path
                        key={id}
                        points={layer.points}
                        onPointerDown={(e) =>onLayerPointerDown(e, id)}
                        stroke={selectionColor}
                        x={layer.x}
                        y={layer.y}
                        fill={layer.fill ? colorToCss(layer.fill) : "#000"}
                    />
            );
        case LayerType.Ellipse:
            return (
                <>
                    <Ellipse
                        id={id}
                        layer={layer}
                        onPointerDown={onLayerPointerDown}
                        selectionColor={selectionColor}
                    />
                </>
            );
        case LayerType.Text:
            return (
                <>J
                    <Text
                        id={id}
                        layer={layer}
                        onPointerDown={onLayerPointerDown}
                        selectionColor={selectionColor}
                    />
                </>
            );
        case LayerType.Note:
            return (
                <>
                    <Note
                        id={id}
                        layer={layer}
                        onPointerDown={onLayerPointerDown}
                        selectionColor={selectionColor}
                    />
                </>
            );
        case LayerType.Rectangle:
            return (
                <>
                    <Rectangle
                        id={id}
                        layer={layer}
                        onPointerDown={onLayerPointerDown}
                        selectionColor={selectionColor}
                    />
                </>
            );
        default: 
            // console.log("Unknown layer type")
            return null
        
    }
})

LayerPreview.displayName = 'LayerPreview'
