import React from "react";
import Text from "@/components/Text/Text";
import { IUserInfoProps } from "@/types/customer-quote/customerQuote.type";
import { Label } from "@/components/Label/Label";

const UserInfo = ({ customerInfo }: IUserInfoProps) => {
  return (
    <div className="col-span-8 mt-4">
      {/* Basic Info Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Label size="medium">Name:</Label>
          <Text size="base">{customerInfo.name}</Text>
        </div>

        <div className="flex items-center gap-2">
          <Label size="medium">Email:</Label>
          <Text size="base">{customerInfo.email}</Text>
        </div>
      </div>

      {/* Address Section */}
      <div className="mt-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Billing Address */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-start gap-2">
              <Label size="medium">Billing Address:</Label>
              <Text size="base">
                {customerInfo.billingAddress.name}
                <br />
                {customerInfo.billingAddress.street}
                <br />
                {customerInfo.billingAddress.city},{" "}
                {customerInfo.billingAddress.zipCode}
                <br />
                {customerInfo.billingAddress.country}
                <br />
                {customerInfo.billingAddress.phone}
              </Text>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-start gap-2">
              <Label size="medium">Shipping Address:</Label>
              <Text size="base">
                {customerInfo.shippingAddress.name}
                <br />
                {customerInfo.shippingAddress.street}
                <br />
                {customerInfo.shippingAddress.city},{" "}
                {customerInfo.shippingAddress.state},{" "}
                {customerInfo.shippingAddress.zipCode}
                <br />
                {customerInfo.shippingAddress.country}
                <br />
                {customerInfo.shippingAddress.phone}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
