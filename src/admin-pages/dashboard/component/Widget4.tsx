import { getThemeFromLocalStorage } from "@/utils/localStorage.utlis";
import { COUNTRY_DATA } from "@/mock-data/customerDashboard";
import GeoChart from "@/components/charts/geo-chart/GeoChart";

const Widget4 = () => {
  return (
    <GeoChart
      title="Customer By State"
      data={COUNTRY_DATA}
      region="US"
      className="h-full"
      theme={getThemeFromLocalStorage()}
    />
  );
};

export default Widget4;
