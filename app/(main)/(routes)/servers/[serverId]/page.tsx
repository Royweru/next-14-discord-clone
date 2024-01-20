import { ModeToggle } from '@/components/mode-toggle'
import { currentProfile } from '@/lib/current-profile'
import { redirectToSignIn } from '@clerk/nextjs'
import React from 'react'

import prisma from '@/lib/prismadb'
import { redirect } from 'next/navigation'
interface ServerIdPageProps{
  params:{
    serverId:string
  }
}
const RootPage =async ({
  params
}:ServerIdPageProps) => {

  const profile = await currentProfile()

  if(!profile){
    return redirectToSignIn()
  }

  const server = await prisma.server.findUnique({
    where:{
      id:params.serverId,
      members:{
        some:{
          profileId:profile.id
        }
      }
    },
    include:{
      channels:{
        where:{
          name:"general"
        },
        orderBy:{
          createdAt:"asc"
        }
      },
    }
  })
  const initialChannel = server?.channels[0]

  if(initialChannel?.name !=="general") {
    return null;
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`)
}

export default RootPage