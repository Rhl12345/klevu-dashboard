import CustomerGiftCardList from "@/admin-pages/customer-gift-card";

export const metadata = {
  title: "Gift Card | Admin Dashboard",
  description: "Manage and view customer gift cards and their transaction details in the admin dashboard",
};

const GiftCardCustomerListPage = (): JSX.Element => {
  return <CustomerGiftCardList />;  
};

export default GiftCardCustomerListPage;
