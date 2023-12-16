"use client";
import React, { useEffect, useState } from "react";

import UserAvatar from "../user-avatar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";

const MembersModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type == "members";
  const { server } = data as { server: ServerWithMembersWithProfiles };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className=" p-0 overflow-hidden bg-white">
        <DialogHeader className=" pt-8 px-6">
          <DialogTitle className=" text-2xl text-center font-bold text-zinc-700">
            Manage members
          </DialogTitle>
          <DialogDescription className=" text-center text-zinc-500">
            {server?.members?.length} members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className=" mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className=" flex  items-center gap-x-2 mb-6">
              <UserAvatar src={member.profile.imageUrl} />
              <div className=" flex flex-col gap-y-1">
                <div className=" text-xs font-semibold flex items-center">
                   {member.profile.name}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
