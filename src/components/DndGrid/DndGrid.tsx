import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Grid from "@/components/Grid/Grid";
import { IDndGridProps, ISortableItemProps } from "@/components/DndGrid/types";

const SortableItem: React.FC<ISortableItemProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 99999 : "auto",
  };

  const modifiedListeners = {
    ...listeners,
    onPointerDown: (e: React.PointerEvent) => {
      if (
        e.target instanceof Element &&
        (e.target.tagName.toLowerCase() === "input" ||
          e.target.tagName.toLowerCase() === "button" ||
          e.target.tagName.toLowerCase() === "select")
      ) {
        return;
      }
      listeners?.onPointerDown(e);
    },
  };

  return (
    <div
      className="demo-class"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...modifiedListeners}
    >
      {children}
    </div>
  );
};

function DndGrid({
  items,
  setItems,
  renderItem,
  className = "grid xl:grid-cols-12 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 lg:gap-6 lg:px-8 px-4 py-4 lg:py-8",
  sortableKey,
}: IDndGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex(
        (item) => `${item[sortableKey]}-${item.index}` === active.id
      );
      const newIndex = items.findIndex(
        (item) => `${item[sortableKey]}-${item.index}` === over.id
      );

      if (oldIndex !== -1 && newIndex !== -1) {
        const newItems = [...items];
        const [removed] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, removed);
        setItems(newItems);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => `${item.productId}-${item.index}`)}
        strategy={rectSortingStrategy}
      >
        <Grid className={className}>
          {items.map((item, index) => (
            <SortableItem
              key={`${item[sortableKey]}-${item.index}`}
              id={`${item[sortableKey]}-${item.index}`}
            >
              {renderItem(item, index)}
            </SortableItem>
          ))}
        </Grid>
      </SortableContext>
    </DndContext>
  );
}

export default DndGrid;
