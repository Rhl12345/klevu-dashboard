import { TOP_CUSTOMERS_DATA } from "@/mock-data/customerDashboard";
import ReactTable from "@/components/Table/ReactTable";
import ContentHeader from "@/components/CreateAndListPageHeader/ContentPageHeader";
import { ITableColumn } from "@/types/company/abandonedCart.type";

const Widget5 = () => {
  const customerColumns: ITableColumn[] = [
    { id: "index", header: "#", accessorKey: "id" },
    { id: "name", header: "Customer Name", accessorKey: "name" },
    { id: "profit", header: "Total Profit ($)", accessorKey: "profit" },
  ];
  return (
    <div className="border border-gray-light dark:border-gray-dark w-full">
      <ContentHeader name="Top Customer By Profitability" />
      <ReactTable
        isListPage={false}
        COLUMNS={customerColumns}
        DATA={TOP_CUSTOMERS_DATA}
        totalCount={TOP_CUSTOMERS_DATA.length}
        noData="No data found as of now."
      />
    </div>
  );
};

export default Widget5;
