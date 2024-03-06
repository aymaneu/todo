import CreateTodo from "@/components/create-todo";

import PostsList from "@/components/posts-list";
import { db } from "../../drizzle/db";
import { foo } from "../../drizzle/schema";
import { desc } from "drizzle-orm";

export default async function Home() {
  const data = await db.select().from(foo).orderBy(desc(foo.createdAt)).all();
  return (
    <main className="container flex flex-col gap-5 mx-auto mt-24">
      <CreateTodo />

      <PostsList data={data} />
    </main>
  );
}
