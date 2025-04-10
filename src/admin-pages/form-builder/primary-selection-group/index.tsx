import React, { useState } from 'react'
import BrandPrimarySelection from '@/admin-pages/form-builder/primary-selection-group/components/BrandPrimarySelection'
import BrandPrimarySelectionClone from '@/admin-pages/form-builder/primary-selection-group/components/BrandPrimarySelectionClone';
import { IPrimarySelectGroupProduct } from '@/types/primary-selection-group/primarySelectionGroup.type';

const PrimarySelectionGroup = ({ id, storeName }: { id: string, storeName: string }) => {
  const [addedBrandData, setAddedBrandData] = useState<
    IPrimarySelectGroupProduct[]
  >([]);
  return (
    <div>
      <BrandPrimarySelection addedBrandData={addedBrandData} setAddedBrandData={setAddedBrandData} />
      <BrandPrimarySelectionClone addedBrandData={addedBrandData} setAddedBrandData={setAddedBrandData} storeName={storeName} id={id} />
    </div>
  )
}

export default PrimarySelectionGroup;
