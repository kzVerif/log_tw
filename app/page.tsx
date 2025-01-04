
import Dashboard from "./components/Dashboard";

export default async function Home() {
  return (
    <div className="">

      <div className="flex items-center justify-center p-4">
          <p className="text-xl font-semibold">
            แจ้งเตือนการรับโอนเงิน Truewallet
          </p>
      </div>

      <div>
        <Dashboard />
      </div>

    </div>
  );
}
