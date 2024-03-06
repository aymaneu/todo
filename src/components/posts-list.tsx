"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { foo } from "../../drizzle/schema";
import { format } from "date-fns";
const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "message",
    label: "Message",
  },
  {
    key: "date",
    label: "Date",
  },
];
type dataInfo = typeof foo.$inferInsert;
export default function App({ data }: { data: dataInfo[] }) {
  const fixedStructure = data.flatMap((item) => [
    {
      id: item.id,
      message: item.bar,
      date: item.createdAt && format(new Date(item.createdAt), "dd/MM/yyyy"),
    },
  ]);
  return (
    <Table isStriped aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={"No rows to display."} items={fixedStructure}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
