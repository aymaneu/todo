import { useQuery } from "@tanstack/react-query";
import { db } from "../../drizzle/db";
import { foo } from "../../drizzle/schema";
export function useGetTodos() {
  return useQuery({
    queryFn: () => db.select().from(foo).all(),
    queryKey: ["todolist"],
  });
}
