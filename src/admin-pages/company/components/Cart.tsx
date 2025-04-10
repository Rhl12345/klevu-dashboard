import React from 'react'
import ProductTable from '@/admin-pages/company/components/ProductTable'

const Carts = () => {
  return (
    <div>
     <ProductTable
        columnHeaderDate={"Added To Cart Date"}
        columnHeaderCount={"Added To Cart Count"}
        accessorDate={"createdDate"}
        columnNameDate={"createdDate"}
        accessorViewCount={""}
        columnNameCount={""}
      />
      
    </div>
  )
}

export default Carts
