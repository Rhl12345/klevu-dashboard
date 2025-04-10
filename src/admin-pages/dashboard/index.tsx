"use client";
import Dropdown from "@/components/DropDown/DropDown";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import React, { useState } from "react";
import { dashboardData, storeOptions } from "@/utils/Dummy";
import { toast } from "react-toastify";
import { IDropdownOption } from "@/types/common/common.type";
import DashboardCard from "@/admin-pages/dashboard/component/DashboardCard";
import DashboardWidgetModal from "@/admin-pages/dashboard/component/DashboardWidgetModal";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import DroppableArea from "@/admin-pages/dashboard/component/DroppableArea";
import ActiveWidgetForModal from "@/admin-pages/dashboard/component/ActiveWidgetOverlay";

const MainDashboard = () => {
  const [selectedStore, setSelectedStore] = useState<string>(
    storeOptions[0].value
  );
  const [droppedWidgets, setDroppedWidgets] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOver, setIsOver] = useState<boolean>(false);

  const handleStoreSelect = (value: IDropdownOption) => {
    setSelectedStore(value.value);
    toast.info(`Filtering gift cards for ${value.label}`);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsOver(false);
    const { active, over } = event;

    if (!active || !over) {
      return;
    }

    if (over && over.id === `droppable-area`) {
      setDroppedWidgets((prev) => {
        if (!prev.includes(active.id as string)) {
          return [active.id as string, ...prev];
        }
        return prev;
      });
    } else if (over) {
      setDroppedWidgets((prev) => {
        const oldIndex = prev.indexOf(active.id as string);
        const newIndex = prev.indexOf(over.id as string);

        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
          return prev;
        }

          return arrayMove(prev, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const id = event.active.id as string;
    setActiveId(id);
    setIsOver(!droppedWidgets.includes(id));
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToWindowEdges]}
    >
      <div className="mx-auto">
        <ListPageHeader name={"Dashboard"} moduleName={"Dashboard"}>
          <Dropdown
            options={storeOptions}
            value={storeOptions.find(
              (option) => option.value === selectedStore
            )}
            placeholder="All Stores"
            onChange={(newValue) =>
              handleStoreSelect(newValue as IDropdownOption)
            }
          />
          <DashboardWidgetModal
            droppedWidgets={droppedWidgets}
            setDroppedWidgets={setDroppedWidgets}
          />
        </ListPageHeader>

        <div className="p-6 lg:p-8 w-full mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardData.map((card) => (
              <DashboardCard
                key={card.id}
                title={card.title}
                description={card.description}
                icon={card.icon}
              />
            ))}
          </div>

          <div className="mt-10">
            <DroppableArea droppedWidgets={droppedWidgets} isOver={isOver} />
          </div>
        </div>
      </div>

      {isOver && (
        <DragOverlay>
          {activeId && <ActiveWidgetForModal activeId={activeId} />}
        </DragOverlay>
      )}
    </DndContext>
  );
};

export default MainDashboard;
