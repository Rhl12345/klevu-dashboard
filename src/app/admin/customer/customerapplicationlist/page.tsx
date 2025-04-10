import React from 'react'
import Index from '@/admin-pages/customer-application-list/list'
import { Metadata } from 'next';

    export const metadata: Metadata = {
      title: "Customer Application List",
      description: "Customer Application List",
    };
const Page = () => {
  return (
   <Index/>
  )
}

export default Page
