import { currentProfile } from "@/lib/current-profile"
import {v4 as uuidV4} from "uuid"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function PATCH(
    req:Request,
    {params}:{params:{serverId:string}}
) {
    try {
        const profile = await currentProfile()
        if(!profile){
            return new NextResponse("Unauthorized",{status:401})
        }

        const server = await prisma.server.update({where:{
            id:params.serverId,
            profileId:profile.id
        },
         data:{
            inviteCode:uuidV4()
         }
    })
    return NextResponse.json(server)
    } catch (error) {
        console.log("[SERVER_ID]",error)
        return new NextResponse("internal err",{status:500})
    }
}