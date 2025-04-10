import React from 'react'
import ProductTable from '@/admin-pages/company/components/ProductTable'

const AllProducts = () => {
  return (
    <div>
    <ProductTable
        columnHeaderDate={"Viewed Date"}
        columnHeaderCount={"Viewed Count"}
        accessorDate={"viewedDate"}
        columnNameDate={"viewedDate"}
        accessorViewCount={"viewedCount"}
        columnNameCount={"viewedCount"}
      />
    </div>
  )
}

export default AllProducts
