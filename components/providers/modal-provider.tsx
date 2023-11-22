"use client"
import React, { useState,useEffect } from 'react'
import CreateServerModal from '../modals/create-server-modal'
import InviteModal from '../modals/invite-modal'



const ModalProvider = () => {

    const [isMounted,setIsMounted] = useState(false)

    useEffect(()=>{
     setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }
  return (
    <>
     <CreateServerModal />
     <InviteModal />
    </>
  )
}

export default ModalProvider