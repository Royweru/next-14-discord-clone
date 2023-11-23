"use client"
import React, { useState,useEffect } from 'react'
import CreateServerModal from '../modals/create-server-modal'
import InviteModal from '../modals/invite-modal'
import EditServerModal from '../modals/edit-server-modal'



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
     <EditServerModal />
    </>
  )
}

export default ModalProvider