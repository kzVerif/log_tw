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
    accessorKey: "amount",
    header: "จำนวน",
  },
  {
    accessorKey: "eventType",
    header: "ช่องทางการโอน",
  },
  {
    accessorKey: "sender",
    header: "เบอร์คนโอน",
  },
  {
    accessorKey: "channel",
    header: "Channel",
  },
  {
    accessorKey: "received_time",
    header: "เวลาที่โอน",
  },
]
// "received_time": "2022-01-31T13:02:23+0700",
//             "eventType": "DIRECT_TOPUP",
//             "amount": 10000,
//             "channel": "7-Eleven"