import React from 'react'

interface UserAvatarProps{
    src?:string,
    className?:string
}

const UseAvatar:React.FC<UserAvatarProps> = ({
    src,
    className
}) => {
  return (
    <div>UseAvatar</div>
  )
}

export default UseAvatar