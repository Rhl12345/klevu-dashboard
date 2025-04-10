import CustomerQuoteView from "@/admin-pages/customer-quote/view";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "View Quote",
  description: "View Quote",
};

const ViewQuotePage = async ({
  params,
}: {
  params: Promise<{ quoteId: string }>;
}) => {
  const { quoteId } = await params;
  return (
    <CustomerQuoteView
      quoteNumber={quoteId}
      customerName="Janet Smith"
      billingAddress={{
        street: "15624 Atlantic Rd",
        city: "Milton",
        zipCode: "64056",
        country: "United States",
        phone: "8888888888",
      }}
      shippingAddress={{
        street: "test",
        city: "Waltham",
        state: "Massachusetts",
        zipCode: "2451",
        country: "United States",
        phone: "1111111111",
      }}
      products={[
        {
          name: "Men's Port Authority Pique Knit Polo",
          options: "Size: Black, SM",
          sku: "US0A004LC",
          quantity: 1,
          price: 20.0,
        },
        // ... other products
      ]}
    />
  );
};

export default ViewQuotePage;
