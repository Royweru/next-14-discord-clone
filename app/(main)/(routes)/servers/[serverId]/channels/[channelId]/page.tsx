import React from "react";

import { RedirectToSignIn, redirectToSignIn } from "@clerk/nextjs";

import { currentProfile } from "@/lib/current-profile";

import prisma from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await prisma.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });
  const member = await prisma.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    redirect("/");
  }
  return (
    <div className=" bg-white dark:bg-[#313338] flex flex-col min-h-screen">
      <ChatHeader
       name={channel.name}
       serverId={channel.serverId}
       type="channel"
      />
      <div className=" relative flex-1 text-xl text-zinc-300 font-semibold">
       Future Messages!
      </div>
      <ChatInput />
    </div>
  );
};

export default ChannelIdPage;
