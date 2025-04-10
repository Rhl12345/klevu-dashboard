import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import Widget1 from "@/admin-pages/dashboard/component/Widget1";
import Widget2 from "@/admin-pages/dashboard/component/Widget2";
import Widget3 from "@/admin-pages/dashboard/component/Widget3";
import Widget4 from "@/admin-pages/dashboard/component/Widget4";
import Widget5 from "@/admin-pages/dashboard/component/Widget5";

const SortableWidget = (props: { id: string; children: React.ReactNode }) => {
  const { id, children } = props;
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
    transition: transition || "transform 250ms ease",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex"
    >
      {children}
    </div>
  );
};

const DroppableArea = ({
  droppedWidgets,
  isOver,
}: {
  droppedWidgets: string[];
  isOver: boolean;
}) => {
  const { setNodeRef } = useDroppable({
    id: `droppable-area`,
  });

  const allWidgets = {
    "widget-1": <Widget1 />,
    "widget-2": <Widget2 />,
    "widget-3": <Widget3 />,
    "widget-4": <Widget4 />,
    "widget-5": <Widget5 />,
  };

  return (
    <div
      ref={setNodeRef}
      className={`p-4 lg:p-6 border-2 border-dashed border-gray-light dark:border-gray-dark transition-colors duration-300 min-h-80 flex items-center justify-center ${isOver ? "highlight" : ""}`}
    >
      <SortableContext items={droppedWidgets}>
        {droppedWidgets.length === 0 ? (
          <div className="text-center text-xl h-full font-semibold text-quaternary-dark dark:text-quaternary-light w-full">
            {isOver ? (
              // TODO: Need to remove height
              <div className="h-[600px] flex items-center justify-center">
                Release to drop
              </div>
            ) : (
              <div>Drag widget here</div>
            )}
          </div>
        ) : (
          <div className="text-center text-xl h-full font-semibold text-quaternary-dark dark:text-quaternary-light w-full">
            {isOver && (
              // TODO: Need to remove height
              <div className="h-[600px] flex items-center justify-center">
                Release to drop
              </div>
            )}
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6`}>
              {droppedWidgets.map((id) => (
                <SortableWidget key={
                  droppedWidgets.includes(id) ? id : id + `disabled-${id}`
                } id={id}>
                  {allWidgets[id as keyof typeof allWidgets]}
                </SortableWidget>
              ))}
            </div>
          </div>
        )}
      </SortableContext>
    </div>
  );
};

export default DroppableArea;
