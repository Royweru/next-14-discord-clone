import React from 'react'

import{
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import NavigationSidebar from './navigation/navigation-sidebar'
import ServerSideBar from './server/server-sidebar'
export const MobileToogle = ({
    serverId
}:{serverId:string}) => {
  return (
   <Sheet>
     <SheetTrigger>
        <Button variant="ghost" size="icon" className=' md:hidden ' asChild>
           <Menu />
        </Button>
     </SheetTrigger>
     <SheetContent side="left" className=' p-0 gap-0 flex'>
         <div className=' w-[80px]'>
         <NavigationSidebar />
         </div>
         <ServerSideBar serverId={serverId}/>
     </SheetContent>
   </Sheet>
  )
}
