import { currentProfile } from '@/lib/current-profile'
import { redirect } from 'next/navigation'
import React from 'react'

import prisma from "@/lib/prismadb"
import { ChannelType } from '@prisma/client'
import ServerHeader from './server-header'

interface ServerSideBarProps{
    serverId:string
}
const ServerSideBar:React.FC<ServerSideBarProps> = async({
    serverId
}) => {

    const profile = await currentProfile()

    if(!profile){
        redirect("/")
    }

    const server = await prisma.server.findUnique({
        where:{
            id:serverId
        },
        include:{
            channels:{
                orderBy:{
                    createdAt:"asc"
                }
            },
            members:{
                include:{
                    profile:true
                },
                orderBy:{
                    role:"asc"
                }
            }
        },
        
    })

    const textChannels = server?.channels.filter((channel)=>channel.type=== ChannelType.TEXT)
    const audioChannels = server?.channels.filter((channel)=>channel.type=== ChannelType.AUDIO)
    const videoChannels = server?.channels.filter((channel)=>channel.type=== ChannelType.VIDEO)

    const members = server?.members.filter((member)=>member.profileId !== profile.id)

    if(!server){
        redirect("/")
    }

    const role = server.members.find((member)=>member.profileId === profile.id)?.role

     
  return (
    <div className=' flex flex-col h-full text-primary dark:bg-[#2B2D31] bg-[#F2F3F5]'>
      <ServerHeader server={server} role={role} />
    </div>
  )
}

export default ServerSideBar