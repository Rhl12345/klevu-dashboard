import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { ISortableItemProps } from "@/types/main-dashboard/mainDashboard.type"; 
import Button from "@/components/Button/Button";
import Image from "@/components/Image/Image";

const SortableItem = (props: ISortableItemProps) => {
  const { item, droppedWidgets, setDroppedWidgets } = props;
  const isDropped = droppedWidgets.includes(item.id);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    disabled: isDropped,
  });

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setDroppedWidgets((prev) => {
      const updatedWidgets = prev.filter((widgetId) => widgetId !== item.id);
      return [...updatedWidgets];
    });
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isDropped ? {} : { ...attributes })}
      {...(isDropped ? {} : { ...listeners })}
      className={`
        relative p-4 bg-body-light dark:bg-body-dark 
        border border-gray-light dark:border-gray-dark 
        transition-all duration-200
      `}
    >
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-2 justify-center items-center ">
          <SvgIcon
            name="dots-grid"
            className="w-5 h-5 text-quaternary-dark dark:text-quaternary-light"
          />

          {isDropped && (
            <Button
              onClick={(e) => {
                handleDelete(e);
              }}
              variant="default"
            >
              <SvgIcon name="Trash" className="w-6 h-6" />
            </Button>
          )}
        </div>
        <div className="w-60 h-40">
          <Image
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
            variant="next"
            width={240}
            height={160}
          />
        </div>
      </div>
      <div className="mt-2 text-center text-sm font-semibold text-quaternary-dark dark:text-quaternary-light">
        {item.title}
      </div>
    </div>
  );
};

export default SortableItem;
