import Button from "@/components/Button/Button";
import { Label } from "@/components/Label/Label";
import UploadImage from "@/components/UploadImage/UploadImage";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import FormErrorMessage from "@/components/FormErrorMessage/FormErrorMessage";
import { bannerImageValidationSchema } from "@/utils/validations/form-builder-validation/formConfig.validation";
import { IBannerFormConfigValues } from "@/types/form-builder/formBuilderConfiguration.type";

const BannerTypeImage = () => {
  const formik = useFormik<IBannerFormConfigValues>({
    initialValues: {
      bannerImage: null,
    },
    validationSchema: bannerImageValidationSchema,
    onSubmit: async (values) => {
      try {
        // Handle form submission here
        // Make your API call here
        toast.success("Banner image saved successfully!");
      } catch (error) {
        toast.error("Failed to save banner image");
      }
    },
  });

  const handleImageUpload = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      formik.setFieldValue("bannerImage", file);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 lg:gap-8 lg:py-4 xl:px-8 px-4 py-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="col-span-4 lg:col-span-2">
          <div className="flex flex-col gap-4">
            <div className="flex-1">
              <Label>Banner Type Image</Label>
              <div className="col-span-full xl:col-span-6 mt-2">
                <UploadImage
                  onUpload={handleImageUpload}
                  maxImages={1}
                  aspectRatio="auto"
                  objectFit="contain"
                />
                {formik.errors.bannerImage && (
                  <FormErrorMessage>
                    {formik.errors.bannerImage}
                  </FormErrorMessage>
                )}
              </div>
            </div>
            <div>
              <Button size="sm" type="submit" variant="primary">
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BannerTypeImage;
