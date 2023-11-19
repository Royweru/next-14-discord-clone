"use client"
import React from 'react'


interface FileUploadProps{
    onChange:(url?:string)=>void,
    endPoint:"serverImage"|"messageFile"
    value:string
}
const FileUpload:React.FC<FileUploadProps> = ({
    onChange
}) => {
  return (
    <div>FileUpload!</div>
  )
}

export default FileUpload