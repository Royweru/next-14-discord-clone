"use client";
import React, {useEffect, useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from 'axios'
import * as z from "zod";
import qs from 'query-string'

import {
  Dialog,
  DialogContent,
 
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue
} from "../ui/select"
import { ChannelType } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "server name is required",
  }).refine(
    name=>name !=="general",
    {
      message:"Channel name cannot be 'general'"
    }
  ),
  type:z.nativeEnum(ChannelType)
   
});
export const CreateChannelModal = () => {
   const {isOpen,onClose,type} = useModal()
    const router = useRouter()
    const params = useParams()
  const isModalOpen = isOpen && type =="createChannel"
  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues: {
      name: "",
      type:ChannelType.TEXT,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

      const url = qs.stringifyUrl({
        url:"/api/channels",
        query:{
          serverId:params?.serverId
        }
      })
      await axios.post(url ,values)
      form.reset()
      router.refresh()
      onClose()
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  };

  const isLoading = form.formState.isSubmitting;

 const onHandleClose = ()=>{
  form.reset()
  onClose()
 }  
  return (
    <Dialog open={isModalOpen} onOpenChange={onHandleClose}>
      <DialogContent className=" p-0 overflow-hidden  bg-slate-400">
        <DialogHeader className=" pt-8 px-6">
          <DialogTitle className=" text-2xl text-center font-bold text-zinc-700">
            Create channel
          </DialogTitle>
         
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-8"
          >
            <div className=" space-y-8 px-6">
              
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                     Channel Name:
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="enter name of the channel"
                        className=" bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
               name="type"
               control={form.control}
               render={({field})=>(
                <FormItem>
                  <FormLabel>
                    Channel Type
                  </FormLabel>
                    <Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
                      <FormControl>
                         <SelectTrigger 
                         className=" bg-zinc-300/50 border-0 focus:ring-0 
                         ring-offset-0 ring-0 focus:ring-offset-0 outline-none"
                         >
                          <SelectValue placeholder="Select a channel type"/>
                         </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ChannelType).map((type)=>(
                          <SelectItem key={type} value={type} className=" capitalize">
                            {type.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                </FormItem>
               )}
               />
            </div>
            <DialogFooter className=" bg-gray-100 px-6 py-4">
                <Button disabled={isLoading} variant="primary" type="submit">
                  Create
                </Button>
            </DialogFooter> 
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};


