"use client"
import React from 'react'
import Image from 'next/image'
import { UploadDropzone } from '@/lib/uploadthing'

import "@uploadthing/react/styles.css"
import { X } from 'lucide-react'
interface FileUploadProps{
    onChange:(url?:string)=>void,
    endPoint:"serverImage"|"messageFile"
    value:string
}
const FileUpload:React.FC<FileUploadProps> = ({
    onChange,
    value,
    endPoint
}) => {
    const fileType = value?.split(".").pop()

    if(value && fileType !== "pdf"){
        return(
            <div className=' relative h-20 w-20'>
                <Image
                 fill
                 alt='upload'
                 src={value}
                 className=' rounded-full '
                 />
                 <button
                  className=' bg-rose-500 text-white p-1 rounded-full absolute top-0 shadow-sm right-0 '
                  type='button'
                 >
                  <X className=' w-4 h-4'/>
                 </button>
            </div>
        )
    }
  return (
   <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res)=>{
        onChange(res?.[0].url)
      }}
      onUploadError={(err:Error)=>{console.error(err)}}
   />
  )
}

export default FileUpload