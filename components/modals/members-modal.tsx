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
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
  DropdownMenuSub,
} from "../ui/dropdown-menu";
import { DropdownMenuSubContent } from "@radix-ui/react-dropdown-menu";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className=" h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className=" h-4 w-4 text-rose-500" />,
};

const MembersModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [loadingId, setLoadingId] = useState("");
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
            <div key={member.id} className=" flex  items-center gap-x-4 mb-6">
              <UserAvatar src={member.profile.imageUrl} />
              <div className=" flex flex-col gap-y-1">
                <div className=" text-xs font-semibold flex items-center text-neutral-800">
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>
                <p className=" text-xs text-zinc-500">{member.profile.email}</p>
              </div>
              {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className=" w-4 h-4 text-zinc-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className=" flex items-center">
                            <ShieldQuestion className=" w-4 h-4 mr-2 " />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem>
                                <Shield className=" h-4 w-4 mr-2" />
                                Guest
                                {member.role === "GUEST" && (
                                  <Check className=" h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Gavel className=" h-4 w-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {loadingId === member.id && (
                <Loader2 className=" animate-spin text-zinc-500 ml-auto w-4 h-4" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
