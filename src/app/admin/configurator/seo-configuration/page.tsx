import SeoConfigurator from "@/admin-pages/seo-configuration";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seo Configurator",
  description: "Seo Configurator",
};

const SeoConfiguratorPage = () => {
  return <SeoConfigurator />;
};

export default SeoConfiguratorPage;
