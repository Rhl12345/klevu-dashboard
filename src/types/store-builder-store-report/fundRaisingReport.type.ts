export interface IFundRaisingReport {
  sku: string;
  product_name: string;
  qty: number;
  total: number;
  fundraising_amount: number;
  total_fundraising_amount: number;
  order_number: string;
}
export interface IDetailedBreakdown {
  fundraising_collected: string;
  total_fundraising_collected: number;
  parsonskellogg_fees: string;
  total_parsonskellogg_fees: number;
  card_processing_fees: string;
  total_card_processing_fees: number;
  net_fundraising: string;
  total_net_fundraising: number;
}

export interface ICONTACT_INFO_TAB {
  value: number;
  label: string;
}
