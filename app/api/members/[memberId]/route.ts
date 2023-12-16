import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"


export async function DELETE(
    req:Request,
    {params}:{params: {memberId:string}}
) {
    try {
        const profile = await currentProfile()
        const {searchParams} = new URL(req.url)

        const serverId = searchParams.get("serverId")
        if(!profile){
            return new NextResponse("unauthorized", {status:401})
        }
        if(!serverId){
            return new NextResponse("Server ID is missing", {status:400})
        }

        if(!params.memberId){
            return new NextResponse("Member ID is missing",{status:400})
        }
        const server = await prisma.server.update({
            where:{
                id:serverId,
                profileId:profile.id
            },
            data:{
                members:{
                    deleteMany:{
                        id:params.memberId,
                        profileId:{
                            not:profile.id
                        }
                    }
                }
            },
            include:{
                members:{
                    include:{
                        profile:true
                    },
                    orderBy:{
                        role:"asc"
                    }
                },
            },
        })
        return NextResponse.json(server)
    } catch (error) {
        console.log("[MEMBER_ID_DELETE",error)
        return new NextResponse("internal error", {status:500})
    }
}
export async function PATCH(
    req:Request,
    {params}:{params:{memberId:string}}
) {
    try {
        const{searchParams} = new URL(req.url)
        const profile = await currentProfile()
         const serverId = searchParams.get("serverId")
         const{role} = await req.json()
        if(!profile){
            return new NextResponse("Unauthorized",{status:401})
        }
        if(!serverId){
            return new NextResponse("Server id is missing",{status:400})
        }
        if(!params.memberId){
            return new NextResponse("Member Id is missing",{status:400})
        }

        const server = await prisma.server.update({
            where:{
                id:serverId,
                profileId:profile.id
            },
            data:{
                members:{
                    update:{
                        where:{
                            id:params.memberId,
                            profileId:{
                                not:profile.id
                            }
                        },
                        data:{
                            role:role
                        }
                    }
                }
            },
            include:{
                members:{
                    include:{
                        profile:true
                    },
                    orderBy:{
                        role:"asc"
                    }
                }
            }
        })
        return NextResponse.json(server)
    } catch (error) {
        console.log("[MEMBERS_ID_PATCH]",error)
        return new NextResponse("internal error", {status:500})
    }
}