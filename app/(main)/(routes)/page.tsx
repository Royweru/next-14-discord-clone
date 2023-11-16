import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <div>
        <UserButton afterSignOutUrl='/' />
       </div>
        <div className=' text-xl font-bold text-blue-500'>
          This is the discord clone
        </div>
    </main>
  )
}
