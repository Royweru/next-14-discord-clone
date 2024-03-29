import { Server as NetServer,Socket } from "net";
import { Member, Profile, Server } from "@prisma/client";
import { NextApiResponse } from "next";
import {Server as SocketIOServer} from 'socket.io'

type ServerWithMembersWithProfiles = Server&{
    members:(Member &{profile:Profile})[];
}


type NextApiResponseServerIo = NextApiResponse &{
    socket:Socket &{
        server:NetServer&{
            io:SocketIOServer
        }
    }
}