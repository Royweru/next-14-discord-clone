import { currentProfile } from "@/lib/current-profile";
import {v4 as uuidV4} from 'uuid'
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";


export async function POST(req:Request) {
    try {
       const {name,imageUrl} = await req.json()
       
       const profile = await currentProfile()
       if(!profile){
        return new NextResponse("Unauthorized",{status:401})
       }

       const server = await prisma.server.create({
        data:{
            profileId:profile.id,
            name,
            imageUrl,
            inviteCode:uuidV4(),
            channels:{
                create:[
                    {name:"general",profileId:profile.id}
                ]
            },
            members:{
                create:[
                    {role:MemberRole.ADMIN,profileId:profile.id}
                ]
            }
        }
       })

       return NextResponse.json(server)
    } catch (error) {
        console.log("[SERVERS_POST]",error)
        return new NextResponse("Internal error",{status:500})
    }
    
}