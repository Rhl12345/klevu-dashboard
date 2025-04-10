import Image from "@/components/Image/Image";
import InputNumber from "@/components/Input/InputNumber";
import { IProduct } from "@/types/stores/ecommerce/product-order/productOrder.type";
import { Formik, Form } from "formik";

const ProductSequenceItem = ({
  product,
  index,
}: {
  product: IProduct;
  index: number;
}) => {
  return (
    <div className="w-full bg-body-light dark:bg-body-dark text-quaternary-dark dark:text-quaternary-light">
      <div className="border border-gray-light dark:border-gray-dark p-4">
        <Formik initialValues={{ displayOrder: index + 1 }} onSubmit={() => {}}>
          {({ values, setFieldValue }) => (
            <Form className="w-full flex flex-col items-center justify-center gap-4 lg:gap-6">
              <div className="flex items-center justify-between w-full relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_MEDIA_BASE_URL_ADMIN}${product?.image}`}
                  alt={`Product ${product?.productId}`}
                  className="w-full max-w-xs mx-auto h-auto object-contain"
                />
              </div>
              <div className="h-20 max-w-xs mx-auto text-center">
                {product?.productName}
              </div>
              <div className="text-sm font-normal">Price: ${product?.msrp}</div>
              <div className="text-sm font-normal">
                Our SKU: {product?.ourSku}
              </div>
              <div className="flex items-center justify-center text-sm gap-2">
                <InputNumber
                  label="Display Order"
                  name="displayOrder"
                  value={values.displayOrder}
                  onChange={(e: any) => {
                    setFieldValue("displayOrder", e.target.value);
                  }}
                  wrapperClassName="items-center justify-center mt-2 text-sm"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProductSequenceItem;
