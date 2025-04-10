import React from 'react'
import ProductTable from '@/admin-pages/company/components/ProductTable'

const Wishlist = () => {
  return (
    <div>
     <ProductTable
        columnHeaderDate={"Wishlist Date"}
        columnHeaderCount={"Wishlist Count"}
        accessorDate={"createdDate"}
        columnNameDate={"createdDate"}
      />
    </div>
  )
}

export default Wishlist
