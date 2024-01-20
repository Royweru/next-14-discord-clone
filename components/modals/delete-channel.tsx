"use client";
import React, { useEffect, useState } from "react";

import axios from "axios";
import qs from 'query-string'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";


import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useOrigin } from "@/hooks/use-origin";
import { useParams, useRouter } from "next/navigation";

export const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const params = useParams()
const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const origin = useOrigin();

  const isModalOpen = isOpen && type == "deleteChannel";
  const { server,channel } = data;



const onClick =async ()=>{
  try {
    setIsLoading(true)
    const url = qs.stringifyUrl({
        url:`/api/channels/${channel?.id}`,
        query:{
            serverId:server?.id
        }
    })
    await axios.delete(url)

    onClose()
    router.refresh()
    router.push(`/servers/${server?.id}`)
  } catch (error) {
    console.log(error)
  }finally{
    setIsLoading(false)
  }
}

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className=" p-0 overflow-hidden bg-slate-300">
        <DialogHeader className=" pt-8 px-6">
          <DialogTitle className=" text-2xl text-center font-bold text-zinc-700">
            Delete Channel
          </DialogTitle>
          <DialogDescription className=" text-center text-zinc-500">
             Are you sure want to do this? <br />
             <span className=" text-indigo-500 font-semibold">
                #{channel?.name} will permanetly be deleted
             </span>
          </DialogDescription>
        </DialogHeader>
       <DialogFooter className=" bg-gray-100 px-6 py-4">
            <div className=" flex justify-between items-center w-full">
                <Button
                  disabled
                  onClick={()=>{}}
                  variant="ghost"
                  className=" text-black"
                  >
                    cancel
                  </Button>
                  <Button
                   disabled={isLoading}
                   variant="primary"
                   onClick={onClick}
                  >
                   Confirm
                  </Button>
            </div>
       </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


