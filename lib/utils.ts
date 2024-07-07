import { Camera } from "@/types/canvas";
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