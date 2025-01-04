"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  time: string
  amount: number
  telenumber: string 
  message: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "received_time",
    header: "เวลาที่โอน",
  },
  {
    accessorKey: "amount",
    header: "จำนวน",
  },
  {
    accessorKey: "sender_mobile",
    header: "เบอร์ที่โอน",
  },
  {
    accessorKey: "message",
    header: "ข้อความ",
  },
]
