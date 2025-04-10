import ItemSaleByMarketList from "@/admin-pages/reports/product-reports/ItemSaleByMarket";
import MailLog from "@/admin-pages/reports/product-reports/MailLog";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import LowInventoryReport from "@/admin-pages/reports/product-reports/LowInventoryReport";
import BusinessIntelligenceReport from "@/admin-pages/reports/product-reports/BusinessIntelligenceReport";
import BrandWiseProductReport from "@/admin-pages/reports/product-reports/BrandWiseProductReport";
import InquiriesListReport from "@/admin-pages/reports/product-reports/InquiriesListReport";
import OrderStatisticsReport from "@/admin-pages/reports/product-reports/OrderStatisticsReport";
import OrderNumberSaleTaxReport from "@/admin-pages/reports/product-reports/OrderNumberSaleTaxReportList";
import OrderStateTaxReport from "@/admin-pages/reports/product-reports/OrderStateTaxReportList";
import RevenueSummary from "@/admin-pages/reports/product-reports/RevenueSummary";
import ProductStatusReport from "@/admin-pages/reports/product-reports/ProductStatusReport";
import VendorWiseProductReport from "@/admin-pages/reports/product-reports/VanderWiseProductReport";
import ProductSummaryReport from "@/admin-pages/reports/product-reports/ProductSummaryReport";
import ProductCalculationReportList from "@/admin-pages/reports/product-reports/ProductCalculationReport";
import ComparativeSalesReport from "@/admin-pages/reports/product-reports/ComparativeSalesReport";
import Top100SellingProducts from "@/admin-pages/reports/product-reports/Top100SellingProducts";
import SalesSummaryByStoreReport from "@/admin-pages/reports/business-accounting-reports/SalesSummaryByStoreReport";
import OrderBeneficialReport from "@/admin-pages/reports/product-reports/OrderBeneficialReport";
import ProductListingReport from "@/admin-pages/reports/product-reports/ProductListingReport";
import SalesSummaryByStoreShippedDate from "@/admin-pages/reports/product-reports/SalesSummaryByStore";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const reportSlug = await params;
  if (reportSlug.slug.length === 1) {
    switch (reportSlug.slug[0]) {
      case "report-table":
        return {
          title: "Item Sale By Market List",
          description: "Item Sale By Market List",
        };
      case "low-inventory":
        return {
          title: "Low Inventory",
          description: "Low Inventory Report",
        };
      case "order-statistics":
        return {
          title: "Order Statistics",
          description: "Order Statistics Report",
        };
      case "brand-wise-product-report":
        return {
          title: "Brandwise Product Report",
          description: "Brandwise Product Report",
        };
      case "inquiries-list-report":
        return {
          title: "Inquiries List Report",
          description: "Inquiries List Report",
        };
      case "order-state-tax-report":
        return {
          title: "Order State Tax Report",
          description: "Order State Tax Report",
        };
      case "order-number-sale-tax-report":
        return {
          title: "Order Number Sale Tax Report",
          description: "Order Number Sale Tax Report",
        };

      case "revenue-summary":
        return {
          title: "Revenue Summary",
          description: "Revenue Summary",
        };

      case "sales-summary-by-store-shipped-date":
        return {
          title: "Sales Summary By Store Shipped Date",
          description: "Sales Summary By Store Shipped Date",
        };

      case "business-intelligence":
        return {
          title: "Business Intelligence",
          description: "Business Intelligence Report",
        };
      case "mail-log":
        return {
          title: "Mail Log",
          description: "Mail Log",
        };
      case "product-status-report":
        return {
          title: "Product Status Report",
          description: "Product Status Report",
        };
      case "vendor-wise-product-report":
        return {
          title: "Vendor Wise Product Report",
          description: "Vendor Wise Product Report",
        };
      case "product-summary":
        return {
          title: "Product Summary Report",
          description: "Product Summary Report",
        };
      case "sales-summary-by-store":
        return {
          title: "Sales Summary By Store (Received Orders)",
          description: "Sales Summary By Store (Received Orders)",
        };
      case "product-calculation-report":
        return {
          title: "Product Calculation Report",
          description: "Product Calculation Report",
        };
      case "comparative-sales-report":
        return {
          title: "Comparative Sales Report",
          description: "Comparative Sales Report",
        };
      case "order-beneficial-report":
        return {
          title: "Order Beneficial Report",
          description: "Order Beneficial Report",
        };
      case "product-listing-report":
        return {
          title: "Product Listing Report",
          description: "Product Listing Report",
        };
      case "top-100-selling-products":
        return {
          title: "Top 100 selling products",
          description: "Top 100 selling products",
        };
    }
  }
  return {
    title: "Reports",
    description: "Reports Dashboard",
  };
}

const ReportsPage = async ({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) => {
  const reportSlug = await params;

  if (reportSlug.slug.length === 1) {
    switch (reportSlug.slug[0]) {
      case "report-table":
        return <ItemSaleByMarketList />;
      case "low-inventory":
        return <LowInventoryReport />;
      case "business-intelligence":
        return <BusinessIntelligenceReport />;
      case "order-statistics":
        return <OrderStatisticsReport />;
      case "brand-wise-product-report":
        return <BrandWiseProductReport />;
      case "mail-log":
        return <MailLog />;
      case "inquiries-list-report":
        return <InquiriesListReport />;
      case "order-state-tax-report":
        return <OrderStateTaxReport />;
      case "order-number-sale-tax-report":
        return <OrderNumberSaleTaxReport />;
      case "revenue-summary":
        return <RevenueSummary />;
      case "sales-summary-by-store-shipped-date":
        return <SalesSummaryByStoreShippedDate />;
      case "product-status-report":
        return <ProductStatusReport />;
      case "vendorwise-product-report":
        return <VendorWiseProductReport />;
      case "product-summary":
        return <ProductSummaryReport />;
      case "product-calculation-report":
        return <ProductCalculationReportList />;
      case "comparative-sales-report":
        return <ComparativeSalesReport />;
      case "top-100-selling-products":
        return <Top100SellingProducts />;
      case "sales-summary-by-store":
        return <SalesSummaryByStoreReport />;
      case "order-beneficial-report":
        return <OrderBeneficialReport />;
      case "product-listing-report":
        return <ProductListingReport />;
      default:
        return notFound();
    }
  }
  return notFound();
};

export default ReportsPage;
