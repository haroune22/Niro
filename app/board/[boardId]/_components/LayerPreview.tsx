"use client"

import { LayerType } from "@/types/canvas"
import { useStorage } from "@liveblocks/react/suspense"
import { memo } from "react"
import { Rectangle } from "./Rectangle"







interface LayerPreviewProps {
    id:string,
    onLayerPointerDown: ()=> void,
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
            console.log("Unknown layer type")
            return null
        
    }
})

LayerPreview.displayName = 'LayerPreview'
