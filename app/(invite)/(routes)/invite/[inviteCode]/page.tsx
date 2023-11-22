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

    
  return (
    <div>InviteCodePage</div>
  )
}

export default InviteCodePage