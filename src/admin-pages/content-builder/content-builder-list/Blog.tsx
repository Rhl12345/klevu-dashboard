import ContentTable from "@/admin-pages/content-builder/content-builder-list/components/ContentTable";
import { BLOG } from "@/utils/Dummy";

const Blog = () => {
  return (
    <div>
      <ContentTable tabName={BLOG} />
    </div>
  );
};

export default Blog;
