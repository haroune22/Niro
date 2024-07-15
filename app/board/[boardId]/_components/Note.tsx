import { cn, colorToCss, getContrastinTextColor } from "@/lib/utils"
import { Kalam } from "next/font/google"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import { NoteLayer } from "@/types/canvas"
import { useMutation } from "@liveblocks/react"



const font = Kalam({
    subsets:["latin"],
    weight: ["400"]
})

interface NoteProps {
    id: string,
    layer: NoteLayer,
    onPointerDown: (e: React.PointerEvent, id:string) => void,
    selectionColor?: string,
}

const calculateFontSize = (width:number, height: number) => {

    const maxFontSize = 96
    const scaleFactor = 0.15
    const fontSizeBasedOnHeight = height * scaleFactor
    const fontSizeBasedOnWidth = width * scaleFactor

    return Math.min(
        fontSizeBasedOnHeight,
        fontSizeBasedOnWidth,
        maxFontSize
    )
};

export const Note = ({
    id,
    layer,
    onPointerDown,
    selectionColor
}:NoteProps) => {

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
        
        className="shadow-md drop-shadow-xl"
    >
    <div
        style={{
            outline: selectionColor ? `1px solid ${selectionColor}` : "none",
            backgroundColor: fill ? colorToCss(fill) : "#fff", // Apply background color here
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <ContentEditable   
            html={value || ""}
            className={cn(
                'h-full w-full flex items-center justify-center text-center outline-none',
                font.className
            )}
            style={{
                fontSize: calculateFontSize(width, height),
                color: fill ? getContrastinTextColor(fill) : "#000"
            }}
            onChange={handleChange}
        />
    </div>
    </foreignObject>
  )
}
