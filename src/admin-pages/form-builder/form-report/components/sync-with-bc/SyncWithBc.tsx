import React from "react";
import Button from "@/components/Button/Button";
import { Label } from "@/components/Label/Label";
import SyncWithBcList from "@/admin-pages/form-builder/form-report/components/sync-with-bc/SyncWithBcList";

const SyncWithBc = () => {
  return (
    <div>
      <div className="w-full lg:pt-6 lg:px-6 pt-4 px-4 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-6">
          <Label className="items-center">Sync With BC</Label>
          <Button size="sm" variant="primary" type="button">
            Import Bc Order
          </Button>
        </div>
      </div>
      <SyncWithBcList />
    </div>
  );
};

export default SyncWithBc;
