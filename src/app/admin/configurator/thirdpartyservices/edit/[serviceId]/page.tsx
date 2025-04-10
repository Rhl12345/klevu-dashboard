import ThirdPartyServiceForm from "@/admin-pages/admin-theme/create";
import { IThirdPartyService } from "@/types/admin-theme/adminTheme.types";
import React from "react";

export const metadata = {
  title: "Edit Third Party",
  description: "Edit third party connection",
};

const ThirdPartyServiceEditPage = async ({
  params,
}: {
  params: { serviceId: string };
}) => {
  // Fetch data on server side
  const sampleInitialValues: IThirdPartyService = {
    name: "Klaviyo",
    thirdPartyServiceId: "1", // Matches the value in thirdPartyServiceOptions
    storeId: "1", // Matches the value in storeOptions
    url: "klaviyo.com",
    username: "klaviyo_user",
    password: "encrypted_password_here@A12",
    key: "klv_key_123456",
    secretkey: "klv_secret_789012",
    redirectUrlToSite: "callback.com",
    thankYouPageUrl: "thank-you.com",
    source: "API Integration",
    certificate:
      "-----BEGIN CERTIFICATE-----\nMIICfzCCAegC...\n-----END CERTIFICATE-----",
    description:
      "<p>Klaviyo integration for email marketing and automation.</p>",
    recStatus: "A",
  };

  return (
    <ThirdPartyServiceForm
      serviceId={params.serviceId}
      initialValues={sampleInitialValues}
    />
  );
};

export default ThirdPartyServiceEditPage;
