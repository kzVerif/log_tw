"use client";
import React, { useEffect, useState } from "react";

export default function LastTransaction() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/data");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setError(null); // Clear any previous error
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData(); // Initial fetch

    const interval = setInterval(() => {
      fetchData(); // Periodic fetching
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  const handleClear = async (e: any) => {
    try {
      const response = await fetch("http://localhost:3002/clear", {
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
    <div className="">
      <div className="flex items-center justify-center">
        {/* <button onClick={handleClear}>Clear</button> */}
      </div>
      {data
        .filter((item) => item !== null)
        .map((item, index) => (
          <div
            key={index}
            className="border my-3 p-3 rounded-md border-amber-600 shadow-md"
          >
            <p>เวลาที่โอน: {item.received_time}</p>
            <p>จำนวน: {item.amount}</p>
            <p>เบอร์ที่โอน: {item.sender_mobile}</p>
            <p>ข้อความ: {item.message}</p>
          </div>
        ))}
    </div>
  );
}
