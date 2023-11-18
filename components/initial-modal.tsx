"use client";
import React, {useEffect, useState} from "react";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { useForm } from "react-hook-form";
import { Input } from "./input";
import { Button } from "./button";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "server name is required",
  }),
  imageUrl: z.string().min(1, {
    message: "image url is required",
  }),
});
const InitialModal = () => {
    const [isMounted,setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const isLoading = form.formState.isSubmitting;

  if(!isMounted){
    return null
  }
  return (
    <Dialog open >
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
              <div className=" flex items-center justify-center text-center">
                TODO: Image Upload
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

export default InitialModal;
