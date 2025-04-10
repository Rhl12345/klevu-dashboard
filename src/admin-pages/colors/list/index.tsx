"use client";
import Button from "@/components/Button/Button";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import DeleteModal from "@/components/Modal/DeleteModal";
import Text from "@/components/Text/Text";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import colorsService from "@/services/colors/colors.service";
import { IColorItem } from "@/types/color/color.type";
import { getErrorMessage } from "@/utils/common.util";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreateColor from "../create";

const ColorFacetList = () => {
  const [data, setData] = useState<IColorItem[]>([]);
  const [colorData, setColorData] = useState<IColorItem | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "add" | "edit" | "delete" | "activeInactive" | null;
  }>({ isOpen: false, type: null });

  const getColorsList = async () => {
    try {
      const response = await colorsService.getAll();
      setData(response.items);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    getColorsList();
  }, []);

  const handleClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
  };

  const handleDelete = () => {
    /* TODO: Implement delete functionality */
  };

  return (
    <>
      <ListPageHeader name={"Add Color Facet"} moduleName={"Color Facets"}>
        <Button
          size="sm"
          onClick={() => {
            setColorData(null);
            setIsModalOpen({ isOpen: true, type: "add" });
            setEditId(null);
          }}
        >
          Add Color
        </Button>
      </ListPageHeader>

      <div className="lg:py-8 xl:px-8 py-4 px-4 w-full">
        <div className="bg-body-light dark:bg-body-dark w-full">
          <div className="grid xl:grid-cols-8 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 lg:gap-8 mb-4 last:mb-0">
            {data.map((color) => {
              return (
                <div key={color.id}>
                  <div
                    className="flex justify-center items-center h-40 w-full text-white border border-gray-light dark:border-gray-dark"
                    style={{
                      backgroundColor: color.hexCode,
                      color: color.name === "White" ? "#000" : "#fff",
                    }}
                  />
                  <div className="flex justify-between">
                    <Text className="text-center">{color.name}</Text>
                    <div className="flex justify-end">
                      <Button
                        size="none"
                        variant="default"
                        icon={<SvgIcon name="Edit" width={24} height={24} />}
                        onClick={() => {
                          setColorData(color);
                          setEditId(color.id.toString());
                          setIsModalOpen({ isOpen: true, type: "edit" });
                        }}
                      />
                      <Button
                        size="none"
                        variant="default"
                        icon={<SvgIcon name="Trash" width={24} height={24} />}
                        onClick={() => {
                          setIsModalOpen({ isOpen: true, type: "delete" });
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {isModalOpen.isOpen && isModalOpen.type === "delete" && (
              <DeleteModal
                key={editId}
                isOpen={true}
                onClose={handleClose}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>

      {isModalOpen.isOpen &&
        (isModalOpen.type === "add" || isModalOpen.type === "edit") && (
          <CreateColor
            colorData={colorData}
            setData={setData}
            openModal={isModalOpen}
            handleClose={handleClose}
          />
        )}
    </>
  );
};

export default ColorFacetList;
