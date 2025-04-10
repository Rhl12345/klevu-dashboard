import ContentTable from "@/admin-pages/content-builder/content-builder-list/components/ContentTable";
import { LANDING_PAGE } from "@/utils/Dummy";

const LandingPage = () => {
  return (
    <div>
      <ContentTable tabName={LANDING_PAGE}/>
    </div>
  )
}

export default LandingPage;
