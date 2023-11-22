"use client";
import React, {useEffect, useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from 'axios'
import * as z from "zod";

import FileUpload from "../file-upload";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "server name is required",
  }),
  imageUrl: z.string().min(1, {
    message: "image url is required",
  }),
});
const CreateServerModal = () => {
   const {isOpen,onClose,type} = useModal()
    const router = useRouter()
  const isModalOpen = isOpen && type =="createServer"
  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/servers',values)
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
      <DialogContent className=" p-0 overflow-hidden bg-white">
        <DialogHeader className=" pt-8 px-6">
          <DialogTitle className=" text-2xl text-center font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className=" text-center text-zinc-500">
            Give your server a personality with a name and an image. You can
            always change later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-8"
          >
            <div className=" space-y-8 px-6">
              <div className=" flex items-center justify-center text-center w-full">
               <FormField 
                  name="imageUrl"
                  control={form.control}
                  render={({field})=>(
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          onChange={field.onChange}
                          endPoint="serverImage"
                          value={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
               />
              </div>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Name:
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="enter name of the server"
                        className=" bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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

export default CreateServerModal;
