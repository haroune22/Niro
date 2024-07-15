import { cn, colorToCss } from "@/lib/utils"
import { Kalam } from "next/font/google"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import { TextLayer } from "@/types/canvas"
import { useMutation } from "@liveblocks/react"



const font = Kalam({
    subsets:["latin"],
    weight: ["400"]
})

interface TextProps {
    id: string,
    layer: TextLayer,
    onPointerDown: (e: React.PointerEvent, id:string) => void,
    selectionColor?: string,
}

const calculateFontSize = (width:number, height: number) => {
    
    const maxFontSize = 96
    const scaleFactor = 0.5
    const fontSizeBasedOnHeight = height * scaleFactor
    const fontSizeBasedOnWidth = width * scaleFactor

    return Math.min(
        fontSizeBasedOnHeight,
        fontSizeBasedOnWidth,
        maxFontSize
    )
};

export const Text = ({
    id,
    layer,
    onPointerDown,
    selectionColor
}:TextProps) => {

    const { x, y, width, height, fill, value } = layer;

    const updateValue = useMutation((
        { storage },
        newValue: string,
    )=> {

        const liveLayers = storage.get('layers')

        liveLayers.get(id)?.set('value', newValue)

    }, []);

    const handleChange = (e:ContentEditableEvent) => {
        updateValue(e.target.value)
    };

  return (
    <foreignObject
        x={x}
        y={y}
        width={width}
        height={height}
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{
            outline: selectionColor ? `1px solid ${selectionColor}`: "none",
        }}
    >
        <ContentEditable   
            html={value || ""}
            className={cn(
                'h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none',
                font.className
            )}
            style={{
                fontSize: calculateFontSize(width, height),
                color: fill ? colorToCss(fill) : '#000'
            }}
            onChange={handleChange}
        />
    </foreignObject>
  )
}
