import React from "react";

import Button from "@/components/Button/Button";
import { Label } from "@/components/Label/Label";

const VendorCatalog = () => {
  return (
    <div className="w-full rounded-none border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark">
      <div className="flex flex-col gap-4 lg:gap-6 p-4 lg:p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between gap-2">
          <Label>Catalog Changes</Label>
          <Button type="button" size="md" variant="primary">
            {"Add Catalog"}
            <Label className="sr-only">Add Catalog</Label>
          </Button>
        </div>

        {/* Table Section */}
        <table className="w-full text-sm text-quaternary-dark dark:text-quaternary-light">
          <tbody>
            <tr>
              <td className="flex items-center uppercase font-bold text-danger">
                <span className="mr-2" aria-hidden="true">
                  *
                </span>
                No Data yet, please add some!
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorCatalog;
