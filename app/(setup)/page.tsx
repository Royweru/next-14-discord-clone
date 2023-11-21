

import prisma from "@/lib/prismadb"

import { redirect } from 'next/navigation'

import InitialModal from "@/components/modals/initial-modal"
import InitialProfile from "@/lib/initial-profile"

export default async function SetupPage() {

  const profile = await InitialProfile()
  const server = await prisma.server.findFirst({
    where:{
      members:{
        some:{
          profileId:profile.id
        }
      }
    }
  })

  if (server){
    return redirect(`/servers/${server.id}`)
  }
  return (
   <InitialModal />
  )
}
