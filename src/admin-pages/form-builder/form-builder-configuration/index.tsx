import MyTabs from "@/components/Tab/Tab";
import { useState } from "react";
import BannerTypeImage from "@/admin-pages/form-builder/form-builder-configuration/components/BannerTypeImage";
import BannerTextSection from "@/admin-pages/form-builder/form-builder-configuration/components/BannerText";
import ThankYouTextSection from "@/admin-pages/form-builder/form-builder-configuration/components/ThankYouText";
import LogoPositionForm from "@/admin-pages/form-builder/form-builder-configuration/components/LogoPositionForm";
import {
  fontOptions,
  logoPositionOptions,
} from "@/mock-data/configurationBuilder";
import PasswordPopUp from "@/admin-pages/form-builder/form-builder-configuration/components/PasswordPopUp";

const FormBuilderConfiguration = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [logoPosition, setLogoPosition] = useState(
    logoPositionOptions[0].value
  );
  const [fontFamily, setFontFamily] = useState(fontOptions[0].value);

  // Define tab options with proper content components
  const tabOptions = [
    {
      id: 0,
      label: "Banner Type Image",
      content: <BannerTypeImage />,
    },
    {
      id: 1,
      label: "Banner Text",
      content: (
        <BannerTextSection key="bannerText" textEditorTitle="bannerText" />
      ), // Replace with actual component
    },
    {
      id: 2,
      label: "Thank You Text",
      content: <ThankYouTextSection />, // Replace with actual component
    },
    {
      id: 3,
      label: "Logo Position",
      content: (
        <LogoPositionForm
          key="logoPosition"
          dropDownTitle="logoPosition"
          selectedValue={logoPosition}
          onValueChange={(selected) => setLogoPosition(selected.value)}
        />
      ),
    },
    {
      id: 4,
      label: "Font Style",
      content: (
        <LogoPositionForm
          key="fontFamily"
          dropDownTitle="fontFamily"
          selectedValue={fontFamily}
          onValueChange={(selected) => setFontFamily(selected.value)}
        />
      ),
    },
    {
      id: 5,
      label: "Password PopUp Text",
      content: <PasswordPopUp />, // Replace with actual component
    },
    {
      id: 6,
      label: "Order Email Message",
      content: (
        <BannerTextSection
          key="orderEmailMessage"
          textEditorTitle="orderEmailMessage"
        />
      ), // Replace with actual component
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4 lg:gap-8 lg:py-8 xl:px-8 px-4 py-8">
      <div className="border border-gray-light dark:border-gray-dark">
        <div className="mb-2">
          <MyTabs
            options={tabOptions}
            activeTab={activeTab}
            onTabClick={setActiveTab}
            variant="scrollable"
          />
        </div>
        {/* Render active tab content */}
        <div>{tabOptions[activeTab].content}</div>
      </div>
    </div>
  );
};

export default FormBuilderConfiguration;
