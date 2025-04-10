import ThirdPartyServiceForm from "@/admin-pages/admin-theme/create";
import React from "react";

export const metadata = {
  title: "Create Third Party",
  description: "Create a third party connection",
};

const ThirdPartyServiceCreatePage = () => {
  return <ThirdPartyServiceForm />;
};

export default ThirdPartyServiceCreatePage;
