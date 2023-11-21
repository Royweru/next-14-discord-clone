import { auth } from "@clerk/nextjs";

import prisma from "@/lib/prismadb"

export const currentProfile = async ()=>{
    const {userId} = auth()

    if(!userId){
        return null 
    }

    const profile = await prisma.profile.findUnique({
        where:{
            userId
        }
    })
    return profile
}