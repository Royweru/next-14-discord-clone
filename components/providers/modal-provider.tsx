"use client"
import React, { useState,useEffect } from 'react'
import CreateServerModal from '../modals/create-server-modal'
import InviteModal from '../modals/invite-modal'
import EditServerModal from '../modals/edit-server-modal'
import { MembersModal } from '../modals/members-modal'
import { CreateChannelModal } from '../modals/create-channel-modal'
import { LeaveServerModal } from '../modals/leave-server-modal'
import { DeleteServerModal } from '../modals/delete-server-modal'
import { DeleteChannelModal } from '../modals/delete-channel'


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
     <CreateChannelModal/>
     <InviteModal />
     <EditServerModal />
     <MembersModal />
     <LeaveServerModal />
     <DeleteServerModal />
     <DeleteChannelModal />
    </>
  )
}

export default ModalProvider