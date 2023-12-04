"use client";
import React, { useEffect, useState } from "react";


import axios from "axios";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";



import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";


const InviteModal = () => {
  const { isOpen, onOpen, onClose, type, data } = useModal();
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const origin = useOrigin();

  const isModalOpen = isOpen && type == "invite";
  const { server } = data;

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);
      onOpen("invite", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className=" p-0 overflow-hidden bg-white">
        <DialogHeader className=" pt-8 px-6">
          <DialogTitle className=" text-2xl text-center font-bold text-zinc-700">
            Invite friends
          </DialogTitle>
          <DialogDescription className=" text-center text-zinc-500">
            Give your server a personality with a name and an image. You can
            always change later.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          <Label className=" uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server inivite link
          </Label>
          <div className=" flex items-center mt-2 gap-x-2">
            <Input
              className=" bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
              disabled={isLoading}
            />
            <Button disabled={isLoading} onClick={onCopy} size="icon">
              {copied ? <Check /> : <Copy className=" h-4 w-4" />}
            </Button>
          </div>
          <Button
            disabled={isLoading}
            onClick={onNew}
            className="text-xs text-zinc-500 mt-4"
            size="sm"
            variant="link"
          >
            Generate a new link
            <RefreshCw className=" w-4 h-4 mr-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
