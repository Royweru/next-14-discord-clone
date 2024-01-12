import { currentProfile } from '@/lib/current-profile'
import { redirect } from 'next/navigation'
import React from 'react'

import prisma from "@/lib/prismadb"
import { ChannelType, MemberRole } from '@prisma/client'
import { ScrollArea } from '../ui/scroll-area'

import ServerHeader from './server-header'
import { ServerSearch } from '../server-search'
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react'
interface ServerSideBarProps{
    serverId:string
}

const iconMap ={
    [ChannelType.TEXT]:<Hash className=' mr-2 h-4 w-4'/>,
    [ChannelType.AUDIO]:<Mic className=' mr-2 h-4 w-4'/>,
    [ChannelType.VIDEO]:<Video className=' mr-2 h-4 w-4'/>
}

const roleIconMap = {
    [MemberRole.GUEST]:null,
    [MemberRole.MODERATOR]:<ShieldCheck className=' h-4 w-4 mr-2 text-indigo-500'/>,
    [MemberRole.ADMIN]:<ShieldAlert className=' h-4 w-4 mr-2 text-rose-500'/>
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
      <ScrollArea className=' flex-1 px-3'>
           <ServerSearch
            data={[
                {
                    label:"Text Chnannels",
                    type:"channel",
                    data:textChannels?.map(channel=>(
                        {
                            id:channel.id,
                            name:channel.name,
                            icon:iconMap[channel.type]
                        }
                    ))
                },
                {
                    label:"Voice Chnannels",
                    type:"channel",
                    data:videoChannels?.map(channel=>(
                        {
                            id:channel.id,
                            name:channel.name,
                            icon:iconMap[channel.type]
                        }
                    ))
                },
                {
                    label:"Audio Chnannels",
                    type:"channel",
                    data:audioChannels?.map(channel=>(
                        {
                            id:channel.id,
                            name:channel.name,
                            icon:iconMap[channel.type]
                        }
                    ))
                },
                {
                    label:"Members",
                    type:"member",
                    data:members?.map(member=>(
                        {
                            id:member.id,
                            name:member.profile.name,
                            icon:roleIconMap[member.role]
                        }
                    ))
                }
            ]}
           />
      </ScrollArea>
    </div>
  )
}

export default ServerSideBar