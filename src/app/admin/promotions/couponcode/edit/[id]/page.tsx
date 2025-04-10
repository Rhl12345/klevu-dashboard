import CreateCoupon from "@/admin-pages/couponcode/create";
import React from "react";

export const metadata = {
  title: "Edit Coupon Code",
  description: "Edit Coupon Code",
};

const EditCouponPage = async ({params}: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <CreateCoupon id={id} />;
};

export default EditCouponPage;
