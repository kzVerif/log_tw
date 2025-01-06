import { DataTable } from "../Dashboard/data-table";
import { columns } from "../Dashboard/column";
import { Button } from "@/components/ui/button";
import { getData } from "@/utils/actions";

export default async function History() {
  const data = await getData();

  return (
    <div>
      <form action="">
        <Button variant="default" type="submit" className="my-2">
          Reload
        </Button>
        <DataTable columns={columns} data={data.list} />
      </form>
    </div>
  );
}
