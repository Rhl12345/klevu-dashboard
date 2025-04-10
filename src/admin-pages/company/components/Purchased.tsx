import React from 'react'
import ProductTable from '@/admin-pages/company/components/ProductTable'

const Purchased = () => {
  return (
    <div>
     <ProductTable
        columnHeaderDate={"Purchased Date"}
        columnHeaderCount={"Purchased Count"}
        accessorDate={"createdDate"}
        columnNameDate={"createdDate"}
        accessorViewCount={"purchaseCount"}
        columnNameCount={"purchaseCount"}
      />  
    </div>
  )
}

export default Purchased
