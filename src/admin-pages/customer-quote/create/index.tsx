"use client";
import { PageRoutes } from "@/admin-pages/routes";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import UserInfo from "./components/UserInfo";
import { CUSTOER_DATA } from "@/mock-data/customerQuoteList";
import { IAddCustomerQuoteProps } from "@/types/customer-quote/customerQuote.type";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import { toast } from "react-toastify";
import ContentPageHeader from "@/components/CreateAndListPageHeader/ContentPageHeader";
import { useState } from "react";
import { Form, Formik } from "formik";
import { createQuoteValidationSchema } from "@/utils/validations/customerQuote.validation";
import ProductTable from "./components/ProductTable";
import AddNewProduct from "./components/AddNewProduct";
import AddExistingProduct from "./components/AddExistingProduct";
import DatePicker from "@/components/DatePicker/DatePicker";
import { Label } from "@/components/Label/Label";

const AddCustomerQuote = ({
  initialQuoteData,
  quoteId = 0,
}: IAddCustomerQuoteProps) => {
  const isEditMode = !!quoteId;
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddExistingProductModalOpen, setIsAddExistingProductModalOpen] =
    useState(false);
  // Add new state for products
  const [displayProducts, setDisplayProducts] = useState(
    initialQuoteData?.products || []
  );

  // Initial form values - use props data if available
  const initialValues = initialQuoteData || {
    storeId: "usaa",
    searchBy: "CustomerName",
    customerName: "",
    products: [],
    expiryDate: "",
  };

  // Mock options - replace with actual data
  const storeOptions = [{ value: "usaa", label: "Usaa Punchout" }];

  const searchByOptions = [
    { value: "CustomerName", label: "Customer Name" },
    { value: "ProductName", label: "Product Name" },
  ];

  // Add this function to find the selected option
  const getSelectedSearchByOption = (value: string) => {
    return (
      searchByOptions.find((option) => option.value === value) ||
      searchByOptions[0]
    );
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      // Check if products array is empty
      if (!values.products.length) {
        toast.error("Please add at least one product");
        return;
      }

      if (isEditMode) {
        // Handle edit submission
        toast.success("Updated successfully"); // Add your update API call here
      } else {
        // Handle create submission
        toast.success("Created successfully"); // Add your create API call here
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleAddNewProduct = (productData: any) => {
    return ({ values, setFieldValue }: { values: any; setFieldValue: any }) => {
      const updatedProducts = [...displayProducts, productData];
      setDisplayProducts(updatedProducts);
      setFieldValue("products", updatedProducts);
      toast.success("New product added successfully");
      setIsAddProductModalOpen(false);
    };
  };

  const handleDeleteProduct = (index: number) => {
    return ({ values, setFieldValue }: { values: any; setFieldValue: any }) => {
      const updatedProducts = displayProducts.filter(
        (product: any, i: number) => i !== index
      );
      setDisplayProducts(updatedProducts);
      setFieldValue("products", updatedProducts);
      toast.success("Product removed successfully");
    };
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createQuoteValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue, validateForm, errors }) => (
        <Form>
          <div>
            <CreatePageHeader
              navigateUrl={`${PageRoutes.CUSTOMER.QUOTE_LIST}`}
              module={`${!isEditMode ? "Add Customer Quote" : "Edit Customer Quote"}`}
              validateForm={async () => {
                const errors = await validateForm();
                if (errors.products) {
                  toast.error("Please add at least one product");
                  return false;
                }
                return Object.keys(errors).length === 0;
              }}
              buttonType="submit"
            />
          <div className="flex flex-col gap-4 lg:gap-8 p-4 lg:p-8">
              <div className="border border-gray-light dark:border-gray-dark p-4 lg:p-6">
                <div className="flex flex-col gap-4 lg:gap-6">
                  <div className="w-full flex flex-col gap-4 lg:gap-6">
                    <div className="w-full">
                      <Dropdown
                        name="storeId"
                        label="Store Name"
                        options={storeOptions}
                        defaultValue={values.storeId}
                        onChange={(option: any) =>
                          setFieldValue("storeId", option.value)
                        }
                        asterisk
                        isDisabled={true}
                      />                    
                    </div>
                    <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
                      <div className="w-full lg:w-1/4">
                        <Dropdown
                          label="Search By"
                          name="searchBy"
                          options={searchByOptions}
                          value={getSelectedSearchByOption(values.searchBy)}
                          onChange={(option: any) => {
                            setFieldValue("searchBy", option.value);
                          }}
                        />
                      </div>
                      <div className="w-full lg:w-1/4">
                        <Label className="hidden lg:block">&nbsp;</Label>
                        <Input
                          name="customerName"
                          placeholder="Enter Customer Name"
                          asterisk
                        />
                      </div>
                      
                      <div className="w-full lg:w-1/4">
                      <Label className="hidden lg:block">&nbsp;</Label>
                      <Button
                          variant="primary"
                          type="button"
                          size="md"
                          onClick={() => {
                            // Handle search functionality
                          }}
                        >
                          Search
                        </Button>
                      </div>


                    </div>

                    {isEditMode && <UserInfo customerInfo={CUSTOER_DATA} />}
                    {/* Replace Input with DatePicker for expiry date */}
                    <div className="flex items-center w-full lg:w-96">
                      <DatePicker
                        disabledLogo={false}
                        label="Expiry Date"
                        onChange={(date: Date) => {
                          setFieldValue("expiryDate", date);
                        }}
                        asterisk
                        name="expiryDate"
                        defaultDate={
                          values.expiryDate ? new Date(values.expiryDate) : null
                        }
                        
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark">
                <ContentPageHeader name="Products">
                  <div className="flex gap-2 self-end">
                    <Button
                      variant="primary"
                      type="button"
                      onClick={() => setIsAddExistingProductModalOpen(true)}
                    >
                      Add Existing Products(s)
                    </Button>
                    <Button
                      variant="primary"
                      type="button"
                      onClick={() => setIsAddProductModalOpen(true)}
                    >
                      Add New Product
                    </Button>
                  </div>
                </ContentPageHeader>

                <ProductTable
                  products={displayProducts}
                  onDelete={(index) =>
                    handleDeleteProduct(index)({ values, setFieldValue })
                  }
                  onQuantityChange={() => {}}
                  onPriceChange={() => {}}
                  onNotesChange={() => {}}
                  total={displayProducts
                    .reduce(
                      (sum, product) =>
                        sum + Number(product.price) * Number(product.quantity),
                      0
                    )
                    .toFixed(2)}
                />
              </div>
            </div>
            
          </div>
          <AddNewProduct
            isOpen={isAddProductModalOpen}
            onClose={() => setIsAddProductModalOpen(false)}
            onSave={(productData) =>
              handleAddNewProduct(productData)({
                values,
                setFieldValue,
              })
            }
          />
          <AddExistingProduct
            isOpen={isAddExistingProductModalOpen}
            onClose={() => setIsAddExistingProductModalOpen(false)}
          />
        </Form>
      )}
    </Formik>
  );
};

export default AddCustomerQuote;
