import EditOrder from "@/admin-pages/orders/edit";

export const metadata = {
  title: "Edit Order",
  description: "Edit Order",
};

const EditOrderPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <EditOrder id={id} />;
};

export default EditOrderPage;
