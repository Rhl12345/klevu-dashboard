import { FC, ReactNode, useEffect, useRef, useState } from "react";
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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

import Modal from "@/components/Modal/Modal";
import Checkbox from "@/components/Checkbox/Checkbox";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

import { IColumn, IEditColumnProps } from "@/components/Table/types";

const SortableItem = ({ column }: { column: IColumn }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    disabled:
      column.header &&
      typeof column.header === "string" &&
      column.header.toLowerCase() === "action"
        ? true
        : false,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex bg-gray-dark dark:bg-gray-dark text-sm text-quaternary-light dark:text-quaternary-light cursor-grab py-1 ${
        isDragging
          ? "bg-gray-dark/80 dark:bg-gray-dark/80 text-sm text-quaternary-light dark:text-quaternary-light"
          : "bg-gray-selected/60 dark:bg-gray-dark/60 text-white"
      }`}
    >
      <SvgIcon name="DragIndicator" />
      {column.header as ReactNode}
    </div>
  );
};

const EditColumn: FC<IEditColumnProps> = (props) => {
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pendingOrderRef = useRef<IColumn[] | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const initializedColumns = props.allColumns.map((column) => ({
      ...column,
      isVisible: column.isVisible ?? true,
    }));
    setColumns(initializedColumns);
  }, [props.allColumns]);

  useEffect(() => {
    if (pendingOrderRef.current) {
      props.changeColumnFormat(pendingOrderRef.current);
      pendingOrderRef.current = null;
    }
  }, [columns]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setColumns((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newOrder = arrayMove(items, oldIndex, newIndex);
        pendingOrderRef.current = newOrder;
        return newOrder;
      });
    }
  };

  const handleColumnVisibilityChange = (columnId: string) => {
    const column = columns.find((col) => col.id === columnId);
    if (
      column?.header &&
      typeof column.header === "string" &&
      column.header.toLowerCase() === "action"
    )
      return; // Prevent toggling Action column

    const updatedColumns = columns.map((col) =>
      col.id === columnId ? { ...col, isVisible: !col.isVisible } : col
    );
    setColumns(updatedColumns);

    const hiddenColumns = updatedColumns
      .filter((col) => !col.isVisible)
      .map((col) => col.id);
    props.setHiddenColumns?.(hiddenColumns);
  };

  return (
    <>
      <Button
        onClick={toggleModal}
        variant="outline-secondary"
        gap={1}
        icon={<SvgIcon name="ViewColumns" />}
      >
        <span className="ml-1">Edit Columns</span>
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        header="Edit Columns"
        content={
          <div className="px-5 pb-1">
            <div className="flex flex-wrap -mx-4">
              {/* Search and Checkbox List */}
              <div className="w-full lg:w-1/2 px-4 border-r border-gray-300">
                <div className="relative mb-4">
                  <Input
                    name="search"
                    type="search"
                    formik={false}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search columns"
                  />
                </div>
                <ul>
                  {columns
                    .filter(
                      (column) =>
                        column.header &&
                        (search === "" ||
                          column.id
                            .toLowerCase()
                            .includes(search.toLowerCase()))
                    )
                    .map((column) => (
                      <li
                        key={column.id}
                        className={`py-1 px-3 ${column.disableShowHide && "opacity-50"}`}
                      >
                        <label className="flex items-center">
                          <Checkbox
                            id={column.id}
                            inputSize="medium"
                            checked={column.isVisible}
                            onChange={() =>
                              handleColumnVisibilityChange(column.id)
                            }
                            disabled={
                              column.disableShowHide ||
                              (typeof column.header === "string" &&
                                column.header.toLowerCase() === "action")
                            }
                          />
                          <span className="text-sm font-medium ml-2">
                            {column.header as string}
                          </span>
                        </label>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Drag-and-Drop Column Order */}
              <div className="w-full lg:w-1/2 px-4 h-full overflow-auto">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                  modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                >
                  <SortableContext
                    items={columns.filter(
                      (column) =>
                        column.header &&
                        typeof column.header === "string" &&
                        column.header.toLowerCase() !== "action"
                    )}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2">
                      {columns
                        .filter(
                          (column) =>
                            column.header &&
                            typeof column.header === "string" &&
                            column.header.toLowerCase() !== "action"
                        )
                        .map((column) => (
                          <SortableItem key={column.id} column={column} />
                        ))}
                    </div>
                  </SortableContext>
                </DndContext>
                {/* Render Action column separately */}
                {columns
                  .filter(
                    (column) =>
                      column.header &&
                      typeof column.header === "string" &&
                      column.header.toLowerCase() === "action"
                  )
                  .map((column) => (
                    <div
                      key={column.id}
                      className="flex bg-gray-selected/60 dark:bg-gray-dark/60 text-white text-sm p-2 mt-2"
                    >
                      {column.header as ReactNode}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default EditColumn;
