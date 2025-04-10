import ContentTable from "@/admin-pages/content-builder/content-builder-list/components/ContentTable";
import { WEBSITE_PAGE } from "@/utils/Dummy";

const WebsitePage = () => {
  return (
    <div>
      <ContentTable tabName={WEBSITE_PAGE} />
    </div>
  );
};

export default WebsitePage;
