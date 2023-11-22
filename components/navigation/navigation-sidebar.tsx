import { currentProfile } from '@/lib/current-profile'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prismadb'
import React from 'react'
import NavigationAction from './navigation-action'
import NavigationItem from './navigation-item'
import { Separator } from '../ui/separator'
import { ScrollArea } from '../ui/scroll-area'
import { ModeToggle } from '../mode-toggle'
import { UserButton } from '@clerk/nextjs'

const NavigationSidebar:any =async () => {
 
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
    <div className=' space-y-4 flex-col items-center h-full text-primary w-full bg-[#1E1F22] py-3'>
      <NavigationAction />
      <Separator className=' h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto' />
      <ScrollArea className=' flex flex-1 w-full'>
          {servers.map(server=>(
            <div key={server.id} className=' mb-4'>
              <NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl} />
            </div>
          ))}
      </ScrollArea>
      <div className=' pb-3 mt-auto flex items-center flex-col gap-y-4'>
         <ModeToggle />
         <UserButton afterSignOutUrl='/'
          appearance={{
            elements:{
              avatarBox:'h-[48px] w-[48px]'
            }
          }}
         />
      </div>
    </div>
  )
}

export default NavigationSidebar