import React from "react";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Collapsible from "@/components/Collapsible/Collapsible";
import { ICheckBoxAction } from "@/types/common/common.type";

const CheckBoxAction = (props: ICheckBoxAction) => {
  const {
    selectedFlatRows,
    attributeClone,
    cloneMultiple,
    productDiscontinue,
  } = props;
  if (!selectedFlatRows || selectedFlatRows.length === 0) return null;

  return (
    <>
      <Collapsible
        initialOpen={true}
        trigger={<SvgIcon name="EllipsisVertical" />}
        contentClassName="z-50 absolute top-8 left-6"
      >
        <div className="z-40 lg:w-44  flex flex-col bg-body-light dark:bg-dark-body-bg border border-gray-light dark:border-gray-dark  rounded-none p-0 w-36 text-left overflow-hidden relative">
            {/* <div className="bg-white px-4 h-8 flex items-center">
              {selectedFlatRows.length}
            </div> */}
            {selectedFlatRows.length === 1 && attributeClone?.show && (
              <button
                className="px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0"
                data-modal-toggle="cloneattribute"
                onClick={attributeClone.onClick}
              >
                Create Listing / Clone
              </button>
            )}
            {selectedFlatRows.length > 0 && cloneMultiple?.show && (
              <button
                className="px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0"
                data-modal-toggle="clonemultibox"
                onClick={cloneMultiple.onClick}
              >
                Clone Multiple
              </button>
            )}
            {selectedFlatRows.length > 0 && productDiscontinue?.show && (
              <button
                className="px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0"
                data-modal-toggle="discontinuebox"
                onClick={productDiscontinue.onClick}
              >
                Discontinue
              </button>
            )}
        </div>
      </Collapsible>
    </>
  );
}

export default CheckBoxAction;
