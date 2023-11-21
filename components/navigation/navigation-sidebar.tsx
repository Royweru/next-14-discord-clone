import { currentProfile } from '@/lib/current-profile'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prismadb'
import React from 'react'

const NavigationSidebar =async () => {
  const profile = await currentProfile()

  if(!profile){
    return redirect('/')
  }

  const servers = await prisma.server.findMany({
    where:{
      members:{
        some:{
          profileId:profile.id
        }
      }
    }
  })
  return (
    <div className=' space-y-4 flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3'>
      Navigation sidebar
    </div>
  )
}

export default NavigationSidebar