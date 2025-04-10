import React, { useState } from 'react'
import ProductPrimarySelection from './components/ProductPrimarySelection';
import ProductPrimarySelectionClone from './components/ProductPrimarySelectionClone';
import { IPrimarySelectGroupProduct } from '@/types/primary-selection-group/primarySelectionGroup.type';

const FixedProducts = ({ id, storeName }: { id: string, storeName: string }) => {
  const [addedProductData, setAddedProductData] = useState<
    IPrimarySelectGroupProduct[]
  >([]);
  return (
    <div>
      <ProductPrimarySelection addedProductData={addedProductData} setAddedProductData={setAddedProductData} />
      <ProductPrimarySelectionClone addedProductData={addedProductData} setAddedProductData={setAddedProductData} storeName={storeName} id={id} />
    </div>
  )
}

export default FixedProducts;
