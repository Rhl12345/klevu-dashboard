import Transition from "@/utils/Transition";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import React, { useState } from "react";
import Button from "@/components/Button/Button";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "@/admin-pages/dashboard/component/SortableItem";
import { widgets } from "@/utils/Dummy";
import { IDashboardWidgetModalProps } from "@/types/main-dashboard/mainDashboard.type";

const DashboardWidgetModal = (props: IDashboardWidgetModalProps) => {
  const { droppedWidgets, setDroppedWidgets } = props;

  const [show, setShow] = useState(false);
  const [items] = useState(widgets);

  const handleOpenModal = () => {
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    <div className="relative inline-flex">
      <Button
        gap={1}
        variant="primary"
        onClick={handleOpenModal}
      >
        Add Dashboard Widget
      </Button>

      <Transition
        appear
        show={show}
        className="fixed inset-0 flex justify-end z-50"
        enter="transition ease-out duration-300"
        enterStart="opacity-0 translate-x-full"
        enterEnd="opacity-100 translate-x-0"
        leave="transition ease-in duration-300"
        leaveStart="opacity-100 translate-x-0"
        leaveEnd="opacity-0 translate-x-full"
      >
        <div className="w-full max-w-xs h-full bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark">
          <div className="flex justify-between items-center p-4 border-b border-gray-light dark:border-gray-dark">
            <div className="font-semibold text-quaternary-dark dark:text-quaternary-light">
              Dashboard Widget
            </div>
            
            <Button
              variant="default"
              onClick={handleCloseModal}
              icon={<SvgIcon name="CrossIcon" className="w-5 h-5" />}
            />
          </div>
          <div className="p-6 flex flex-col items-center space-y-4 overflow-y-auto overflow-x-hidden h-full hide-scrollbar">
            <SortableContext items={items} strategy={rectSortingStrategy}>
              <div className="w-full space-y-4">
                {items.map(({ id, imageUrl, title }) => (
                  <SortableItem
                    key={
                      droppedWidgets.includes(id) ? id : id + `disabled-${id}`
                    }
                    item={{ id, imageUrl, title }}
                    droppedWidgets={droppedWidgets}
                    setDroppedWidgets={setDroppedWidgets}
                  />
                ))}
              </div>
            </SortableContext>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default DashboardWidgetModal;
