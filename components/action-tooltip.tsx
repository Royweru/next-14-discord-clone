"use client"
import React from 'react'

import{
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
}from "@/components/ui/tooltip"

interface TooltipProps{
    label:string,
    children:React.ReactNode
    side?:"top"|"right"|"left"|"bottom"
    align?:"start"|"center"|"end"
}

const ActionTooltip:React.FC<TooltipProps> = ({
    label,
    children,
    side,
    align
}) => {
  return (
    <TooltipProvider>
        <Tooltip delayDuration={50}>
            <TooltipTrigger>
                {children}
            </TooltipTrigger>
            <TooltipContent side={side} align={align}>
              <p className=' font-semibold text-sm capitalize'>
                 {label.toLowerCase()}
              </p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

export default ActionTooltip 