import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";


// Example transaction data
// {
//     "event_type": "PROMPTPAY_IN",
//     "received_time": "2022-01-31T13:02:23+0700",
//     "amount": 10000,
//     "sender_mobile": "0123456789",
//     "message": "",
//     "channel": ""
// }
let transac = [];

export async function GET() {
  // Trigger revalidation for the homepage or other paths
  revalidatePath('/');

  // Return the current transaction data
  return NextResponse.json({
    list: transac,
  });
}

export async function DELETE() {
  transac = []
  revalidatePath('/')
  return NextResponse.json({
      message: 'Success',
    });
}

export async function POST(req) {
  try {
    // อ่านข้อมูลจาก body
    const data = await req.json();

    // ตรวจสอบว่า message มีข้อมูลหรือไม่
    if (!data.message) {
      return NextResponse.json(
        { error: "Invalid request, 'message' field is required" },
        { status: 400 }
      );
    }


    const decode = jwt.decode(data.message);
    // {
    //     "event_type": "PROMPTPAY_IN",
    //     "received_time":
    //     "2022-01-31T13:02:23+0700",
    //     "amount": 10000,
    //     "sender_mobile": "0123456789",
    //     "message": "",
    //     "channel": ""
    //     }
    // ตรวจสอบว่า decode สำเร็จหรือไม่
    if (!decode) {
      return NextResponse.json({ error: "Invalid JWT token" }, { status: 400 });
    }

    // console.log(decode.amount.toString());
    if (decode.amount.toString().length === 2 || decode.amount.toString().length === 1) {
        decode.amount = "0." + decode.amount.toString();  // เปลี่ยนให้เป็นทศนิยม
        decode.amount = +decode.amount;  // แปลงให้เป็นตัวเลข
    } else {
        const amountStr = decode.amount.toString();
        // ใช้ slice เพื่อตัดเลข 2 ตัวสุดท้ายและแทรกจุดทศนิยม
        decode.amount = amountStr.slice(0, -2) + '.' + amountStr.slice(-2);
        decode.amount = +decode.amount;  // แปลงให้เป็นตัวเลข
    }
    

    // ตรวจสอบประเภทของ event และจัดการ
    const sender = decode.sender_mobile
    const eventType = decode.event_type;
    const amount = decode.amount;
    const channel = decode.channel || "ไม่ระบุ";
    transac.unshift({
        received_time: decode.received_time,
        eventType: eventType,
        amount: amount,
        channel: channel,
        sender: sender
    });
    revalidatePath('/')

    switch (eventType) {
      case "DIRECT_TOPUP":
        return NextResponse.json({
          message: `รับเงินจำนวน ${amount} สำเร็จจากช่องทาง ${channel}`,
        });

      case "PROMPTPAY_IN":
        return NextResponse.json({
          message: `รับเงินจำนวน ${amount} สำเร็จจากช่องทาง PROMPTPAY`,
        });

      case "P2P":
        return NextResponse.json({
          message: `รับเงินจำนวน ${amount} สำเร็จจากช่องทาง P2P`,
        });

      case "MONEY_LINK":
        return NextResponse.json({
          message: `รับเงินจำนวน ${amount} สำเร็จจากช่องทาง MONEY LINK`,
        });

      default:
        return NextResponse.json({
          message: "ไม่สามารถระบุประเภทการรับเงินได้",
        });
    }
  } catch (error) {
    // จัดการข้อผิดพลาด
    console.error("Error:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
