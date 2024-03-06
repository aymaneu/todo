"use client";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTodo } from "@/server/todo";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

const IFormInput = z.object({
  todo: z
    .string()
    .min(3, { message: "you must have at least 3 character" })
    .max(20, { message: "dont go above 20 character" }),
});

const CreateTodo = () => {
  const form = useForm<z.infer<typeof IFormInput>>({
    resolver: zodResolver(IFormInput),
    defaultValues: {
      todo: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof IFormInput>) => {
    console.log(data);
    await createTodo({ bar: data.todo });
    void form.reset();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className=" flex flex-col gap-3"
    >
      <SignedIn>
        <Controller
          name="todo"
          control={form.control}
          render={({ field }) => (
            <Input
              errorMessage={
                form.watch("todo").split("").length < 3
                  ? `${form.watch("todo").split("").length}/3`
                  : false
              }
              maxLength={20}
              minLength={3}
              isRequired
              placeholder="New to-do"
              {...field}
            />
          )}
        />
        <div className="grid grid-cols-2 gap-3">
          <Button
            color="primary"
            isLoading={form.formState.isSubmitting}
            type="submit"
            isDisabled={form.watch("todo").split("").length < 3}
          >
            submit
          </Button>
          <SignOutButton>
            <Button color="danger" className="w-full">
              Sign out
            </Button>
          </SignOutButton>
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button className="mb-5" color="success">
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </form>
  );
};

export default CreateTodo;
