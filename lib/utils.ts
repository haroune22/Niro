import { Camera, Color, Point, Side, XYWH } from "@/types/canvas";
import { type ClassValue, clsx } from "clsx"
import React from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const COLORS = [
  "#5d2fa4",
  "#bce319",
  "#ff0993",
  "#c68cbb",
  "#705cf1",
  "#635d4f",
  "#0417ad",
  "#9d6649",
  "#235c87",
  "#39f4f2"
];
export function connectionIdtoColor (connectioId: number): string { 
  return COLORS[connectioId % COLORS.length];
}

export function pointerEventToCanvasPoint (e:React.PointerEvent, camera:Camera){
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y
  }
}

export function colorToCss(color: Color): string {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

export function ResizeBounds (bounds: XYWH, corner: Side, point:Point ): XYWH{

  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };

  if((corner & Side.Left ) === Side.Left){
    result.x = Math.min(point.x, bounds.x + bounds.width)
    result.width = Math.abs(bounds.x + bounds.width - point.x)
  };

  if((corner & Side.Right ) === Side.Right){
    result.x = Math.min(point.x, bounds.x)
    result.width = Math.abs(point.x - bounds.x)
  };

  if((corner & Side.Top ) === Side.Top){
    result.y = Math.min(point.y, bounds.y + bounds.height)
    result.height = Math.abs(bounds.y + bounds.height - point.y)
  };

  if((corner & Side.Bottom ) === Side.Bottom){
    result.y = Math.min(point.y, bounds.y)
    result.height = Math.abs(point.y - bounds.y)
  };

  
  return result 
}
