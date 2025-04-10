import { widgets } from "@/utils/Dummy";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Image from "@/components/Image/Image";

const ActiveWidgetForModal = ({ activeId }: { activeId: string | null }) => {
  const activeWidget = widgets.find((widget) => widget.id === activeId);
  const { imageUrl, title } = activeWidget || {};

  return (
    <div
      className="relative p-4 bg-body-light dark:bg-body-dark
        border border-gray-light dark:border-gray-dark 
        transition-all duration-200"
    >
      <div className="flex items-center space-x-2">
        <SvgIcon name="anchor" className="w-5 h-5 text-quaternary-dark dark:text-quaternary-light" />
        <div className="w-60 h-40">
          <Image
            src={imageUrl || ""}
            alt={title || ""}
            className="w-full h-full object-cover"
            variant="next"
            width={240}
            height={160}
          />
        </div>
      </div>
      <div className="mt-2 text-center text-sm font-semibold text-quaternary-dark dark:text-quaternary-light">
        {title || ""}
      </div>
    </div>
  );
};

export default ActiveWidgetForModal;
