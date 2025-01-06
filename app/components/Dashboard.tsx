
import { Button } from "@/components/ui/button";
import History from "./History";

export default function Dashboard() {
 
  return (
    <div className="md:mx-40 sm:mx-auto">
      <div className="flex-col flex">
        <div className="">
          <p className="py-3 font-semibold">ประวัติการรับเงิน</p>
          <History/>
        </div>
      </div>
    </div>
  );
}
