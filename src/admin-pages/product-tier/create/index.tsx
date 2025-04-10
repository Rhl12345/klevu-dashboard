"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { PageRoutes } from "@/admin-pages/routes";
import ProductTierForm from "@/admin-pages/product-tier/create/components/ProductTierForm";
import {
  ICreateEditProductTierProps,
  IProductTierFormValues,
} from "@/types/product-tier/productTier.type";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import Loader from "@/components/common/Loader";
import { getProductTierById } from "@/services/product-tier/productTier.service";
import { toast } from "react-toastify";
import { validationSchema } from "@/utils/validations/tier.validation";

const CreateEditProductTier: React.FC<ICreateEditProductTierProps> = ({
  id,
}) => {
  const [productTier, setProductTier] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: IProductTierFormValues) => {
    try {
      setIsLoading(true);
      // Handle form submission
      // await submitProductTier(values);
      toast.success("Product tier saved successfully");
    } catch (err) {
      toast.error("Error saving product tier");
    } finally {
      setIsLoading(false);
    }
  };

  const initialValues = {
    storeName: productTier?.storeName || "",
    tierName: productTier?.tierName || "",
    tier: productTier?.tier || "",
  };

  useEffect(() => {
    if (id) {
      const fetchProductTier = async () => {
        try {
          setIsLoading(true);
          // Fetch product tier data
          const tierData = await getProductTierById(id);
          setProductTier(tierData);
          toast.success("Product tier fetched successfully");
        } catch (err) {
          toast.error("Failed to fetch product tier");
        } finally {
          setIsLoading(false);
        }
      };
      fetchProductTier();
    }
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(formik) => (
        <Form id="product-tier-form">
          <CreatePageHeader
            module={`${id ? "Edit" : "Add"} Product Tier`}
            navigateUrl={PageRoutes.PRODUCT_TIER.LIST}
            cancelButtonName="Cancel"
            buttonType="submit"
            validateForm={formik.validateForm}
          />
          <div className="w-full flex max-lg:flex-wrap gap-4 lg:gap-8 lg:py-8 xl:px-8 py-4 px-4">
            <ProductTierForm formik={formik} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateEditProductTier;
