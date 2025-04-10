import { IContentHeader } from "@/components/CreateAndListPageHeader/types";
import { Label } from "@/components/Label/Label";
import { FC } from "react";

const ContentHeader: FC<IContentHeader> = ({
  children,
  name,
  className,
}) => {
  const titleId = `${name?.toLowerCase()}-list-title`;

  return (
    <>
      <div className={`flex items-center justify-between px-4 lg:px-6 pt-4 xl:pt-6  ${className ?? ""}`}>
        <Label id={titleId}>{name}</Label>

        <div className="flex gap-2" role="toolbar" aria-labelledby={titleId}>
          {children}
        </div>
      </div>
    </>
  );
};

export default ContentHeader;
