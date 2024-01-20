"use client";
import React, { useEffect, useState } from "react";

import axios from "axios";

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
import { useRouter } from "next/navigation";

export const DeleteServerModal = () => {
  const { isOpen, onOpen, onClose, type, data } = useModal();
const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const origin = useOrigin();

  const isModalOpen = isOpen && type == "deleteServer";
  const { server } = data;



const onClick =async ()=>{
  try {
    setIsLoading(true)
    await axios.delete(`/api/servers/${server?.id}`)

    onClose()
    router.refresh()
    router.push("/")
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
            Delete server
          </DialogTitle>
          <DialogDescription className=" text-center text-zinc-500">
             Are you sure want to do this? <br />
             <span className=" text-indigo-500 font-semibold">
                {server?.name} will permanetly be deleted
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

