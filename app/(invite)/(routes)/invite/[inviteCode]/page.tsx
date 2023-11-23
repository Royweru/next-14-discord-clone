import { currentProfile } from '@/lib/current-profile'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import prisma from "@/lib/prismadb"

import React from 'react'


interface InviteCodePageProps{
    params:{
        inviteCode:string
    }
}
const InviteCodePage =async ({
    params
}:InviteCodePageProps) => {

    const profile = await currentProfile()
    if(!profile){
        return redirectToSignIn()
    }
    if(!params.inviteCode){
        return redirect("/")
    }

    const exsistingServer = await prisma.server.findFirst({
        where:{
            inviteCode:params.inviteCode,
            members:{
                some:{
                    profileId:profile.id
                }
            }
        }
    });

    if(exsistingServer){
        return redirect(`/servers/${exsistingServer.id}`)
    }

    const server = await prisma.server.update({
        where:{
            inviteCode:params.inviteCode
        },
        data:{
            members:{
                create:[
                    {
                        profileId:profile.id
                    }
                ]
            }
        }
    })

    if(server){
        return redirect(`/servers/${server.id}`)
    }
  return null
}

export default InviteCodePage