import React from 'react'

interface UserAvatarProps{
    src?:string,
    className?:string
}

const UserAvatar:React.FC<UserAvatarProps> = ({
    src,
    className
}) => {
  return (
    <div>UseAvatar</div>
  )
}

export default UserAvatar