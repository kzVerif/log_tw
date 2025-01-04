"use client";
import React, { useState, useEffect } from "react";
import { Payment, columns } from "../Dashboard/column";
import { DataTable } from "../Dashboard/data-table";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [balance, setBalance] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // ฟังก์ชันเพื่อดึงข้อมูล LastTransaction
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://185.84.160.121:3002/data");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setTransactions(result);
        setError(null); // Clear any previous error
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchTransactions(); // Initial fetch

    const interval = setInterval(() => {
      fetchTransactions(); // Periodic fetching
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  // ฟังก์ชันเพื่อดึงข้อมูล Balance
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = "f0d857b588c0b8acff8861c89bbaeb06";
        const response = await fetch(
          "https://apis.truemoneyservices.com/account/v1/balance",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (
          result.data.balance.length === 2 ||
          result.data.balance.length === 1
        ) {
          result.data.balance = "0." + result.data.balance;
          result.data.balance = +result.data.balance;
        } else {
          result.data.balance = result.data.balance.toString();
          result.data.balance =
            result.data.balance.slice(0, -2) +
            "." +
            result.data.balance.slice(-2);
          result.data.balance = +result.data.balance;
        }
        setBalance(result);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchBalance(); // Initial fetch

    const interval = setInterval(() => {
      fetchBalance(); // Periodic fetching
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }
  const handleClear = async (e: any) => {
    try {
      const response = await fetch("http://185.84.160.121:3002/clear", {
        method: "DELETE", // Specify the HTTP method
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
    } catch (error) {
      console.error("Error clearing data:", error);
    }
  };

  return (
    <div className="md:mx-40 sm:mx-auto">
      <div className="flex-col flex">
        {/* Balance Section */}
        {balance?.status === "ok" ? (
          <div className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow my-1">
            <p>ยอดคงเหลือ: {balance.data.balance}</p>
            <p>เบอร์โทร: {balance.data.mobile_no}</p>
            <p>เวลาที่อัพเดต: {balance.data.updated_at}</p>
            <br />
            <Button variant="destructive" size="sm" onClick={handleClear}>
              ล้างข้อมูลการับโอน
            </Button>
          </div>
        ) : (
          <p>ไม่พบข้อมูล</p>
        )}

        {/* Transactions Section */}
        <div className="">
          <p className="py-3 font-semibold">ประวัติการรับเงิน</p>
          <DataTable columns={columns} data={transactions} />
          {/* {transactions
            .filter((item) => item !== null)
            .map((item, index) => (
              <div key={index} className="transaction-card">
                <p>เวลาที่โอน: {item.received_time}</p>
                <p>จำนวน: {item.amount}</p>
                <p>เบอร์ที่โอน: {item.sender_mobile}</p>
                <p>ข้อความ: {item.message}</p>
              </div>
            ))} */}
        </div>
      </div>
    </div>
  );
}
