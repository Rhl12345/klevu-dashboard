"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form as FormikForm } from "formik";
import CouponCodeForm from "@/admin-pages/couponcode/create/components/CouponCodeForm";
import { PageRoutes } from "@/admin-pages/routes";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ICouponFormValues } from "@/types/promotions/promotions.type";
import { getInitialValues, couponCodeValidationSchema  } from "@/utils/validations/couponcode.validation";
import { getCouponCodeById } from "@/services/couponcode/couponcode.service";

const CreateCoupon: React.FC<{ id?: string }> = ({ id }) => {
  const [couponCode, setCouponCode] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchCouponCode = async () => {
        const couponCode = await getCouponCodeById(id);
        setCouponCode(couponCode);
      };
      fetchCouponCode();
    }
  }, [id]);

  const handleSubmit = async (values: ICouponFormValues) => {
    try {
      // API call logic here
      // Add toast or notification for success
      toast.success("Coupon code created successfully");
      router.push(PageRoutes.COUPON_CODE.LIST);
    } catch (error) {
      toast.error("Failed to submit form. Please try again.");
    }
  };

  return (
    <>
      <Formik
        initialValues={getInitialValues(couponCode)}
        validationSchema={couponCodeValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {(formik) => {
          return (
            <FormikForm
              aria-label="Create Coupon Form"
              data-testid="coupon-create-form"
            >
              {/* Header */}
              <CreatePageHeader
                module={`${id ? "Edit" : "Add"} Coupon Code`}
                navigateUrl={PageRoutes.COUPON_CODE.LIST}
                buttonType="submit"
                validateForm={formik.validateForm}
              />

              {/* Form Content */}
              <div
                className="w-full flex max-lg:flex-wrap gap-4 lg:gap-8 lg:py-8 xl:px-8 py-4 px-4"
                role="main"
                data-testid="coupon-form-container"
              >
                <CouponCodeForm />
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
};

export default CreateCoupon;
