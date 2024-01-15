import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { MemberRole } from "@prisma/client";

export async function DElETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!serverId) {
      return new NextResponse("Server ID is missing", { status: 400 });
    }
    if (!params.channelId) {
      return new NextResponse("Channel ID is missing", { status: 400 });
    }

    const server = await prisma.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[CHANNEL_ID_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
