import AddCustomerQuote from "@/admin-pages/customer-quote/create";

export const metadata = {
  title: "Edit Quote",
  description: "Edit customer quote",
};

// This runs on the server

const mockQuoteData = {
  storeId: "usaa",
  searchBy: "CustomerName",
  customerName: "John Doe",
  products: [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 2,
    },
    {
      id: 2,
      name: "Product 2",
      price: 150,
      quantity: 1,
    },
  ],
  expiryDate: "2024-12-31",
};

const QuoteCustomerEdit = async ({
  params,
}: {
  params: { quoteId: string };
}) => {
  return <AddCustomerQuote quoteId={56} initialQuoteData={mockQuoteData} />;
};

export default QuoteCustomerEdit;
