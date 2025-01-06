"use client"
import { Button } from "@/components/ui/button";
import React from "react";

export default function ClearButton() {
  const handleClear = async (e: any) => {
    try {
      const response = await fetch("http://localhost:3000", {
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
    <div>
      <Button variant="destructive" type="submit" className="my-2" onClick={handleClear}>
        ล้างข้อมูลการรับเงิน
      </Button>
    </div>
  );
}
