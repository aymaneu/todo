import { sql } from "drizzle-orm";
import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

export const foo = sqliteTable("foo", {
  id: text("id")
    .$defaultFn(() => createId())
    .notNull()
    .primaryKey(),
  bar: text("bar").notNull(),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
});
