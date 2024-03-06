"use server";

import { revalidatePath } from "next/cache";
import { db } from "../../drizzle/db";
import { foo } from "../../drizzle/schema";

export const createTodo = async ({ bar }: { bar: string }) => {
  const response = await db.insert(foo).values({ bar: bar });
  revalidatePath("/");
  return response;
};
