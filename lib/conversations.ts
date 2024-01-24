import prisma from "@/lib/prismadb"



export const getOrCreateConversation =async (memeberOneId:string,memberTwoId:string) => {
 let conversation = await findConversation(memeberOneId,memberTwoId)||await findConversation(memberTwoId,memeberOneId)
 
 if(!conversation){
    conversation = await createNewConversation(memeberOneId,memberTwoId)
 }
 return conversation
}
const findConversation =async (memberOneId:string,memberTwoId:string) => {
 try {
    return await prisma.conversation.findFirst({
        where:{
            AND:[
                {memberOneId:memberOneId},
                {memberTwoId:memberTwoId}
            ],
        },
        include:{
            memberOne:{
                include:{
                    profile:true
                }
            },
            memberTwo:{
                include:{
                    profile:true
                }
            }
        },
        
    })
 } catch (error) {
    return null
 }
    
    
}

const createNewConversation =async (memberOneId:string,memberTwoId:string) => {
    try {
        return await prisma.conversation.create({
            data:{
                memberOneId,
                memberTwoId
             },
             include:{
                memberOne:{
                    include:{
                        profile:true
                    }
                },
                memberTwo:{
                    include:{
                        profile:true
                    }
                }
             },
             
        })
    } catch (error) {
        return null
    }
}