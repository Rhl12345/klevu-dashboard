import { Label } from "@/components/Label/Label";
import Text from "@/components/Text/Text";
import { ICustomerDetailsProps } from "@/types/customer-quote/customerQuote.type";

const CustomerDetails = ({
  customerName,
  billingAddress,
  shippingAddress,
}: ICustomerDetailsProps) => {
  return (
    <div className="flex flex-col space-y-2 mt-2">
      <div className="flex items-center gap-2">
        <Label size="small">Customer Name :</Label>
        <Text size="sm">{customerName}</Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Billing Address */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-start gap-2">
            <Label size="small">Billing Address :</Label>
            <Text size="sm">
              {billingAddress.street}
              <br />
              {billingAddress.city}, {billingAddress.zipCode}
              <br />
              {billingAddress.country}
              <br />
              {billingAddress.phone}
            </Text>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-start gap-2">
            <Label size="small">Shipping Address :</Label>
            <Text size="sm">
              {shippingAddress.street}
              <br />
              {shippingAddress.city}, {shippingAddress.state},{" "}
              {shippingAddress.zipCode}
              <br />
              {shippingAddress.country}
              <br />
              {shippingAddress.phone}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
