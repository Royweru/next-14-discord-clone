"use client"
import React from 'react'

import { useSocket } from './providers/socket-provider'

export const SocketIndicator = () => {
    const {isConnected} = useSocket()

    if(!isConnected){
        return(
            <div>
               Fallback:polling every 1s 
            </div>
        )
    }
  return (
    <div>
        live now
    </div>
  )
}
