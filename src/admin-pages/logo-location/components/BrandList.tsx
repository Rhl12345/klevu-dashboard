"use client";
import Checkbox from "@/components/Checkbox/Checkbox";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import { manageLogoLocation } from "@/services/logo-location/logoLocation.service";
import {
  IBrands,
  IBrandsDropDownData,
  ILogoLocationBrand,
} from "@/types/logo-location/logo-location.type";
import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";

const BrandsList = ({
  logoLocationDetailsId,
  selectedBrands,
}: ILogoLocationBrand) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [brands, setBrands] = useState<IBrandsDropDownData[]>([]);
  const [mainbrands, setMainBrands] = useState<IBrandsDropDownData[]>([]);
  const { setFieldValue, values } = useFormikContext<IBrands>();

  const getManageLogoLocationList = async () => {
    try {
      const response = await manageLogoLocation();
      setBrands(response);
      setMainBrands(response);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getManageLogoLocationList();
  }, [logoLocationDetailsId]);

  const searchBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
    var search = e.target.value.trim();
    setSearchValue(search);

    if (search !== "") {
      setBrands(() => {
        let temp: IBrandsDropDownData[] = [];
        mainbrands.forEach((brandId) => {
          if (brandId.label.toLowerCase().includes(search.toLowerCase())) {
            temp = [...temp, brandId];
          }
        });
        return temp;
      });
    } else {
      setBrands(mainbrands);
    }
  };

  const setAllBrandsValue = (
    brands: number[],
    e: React.ChangeEvent<HTMLInputElement>,
    brandsId: IBrandsDropDownData[]
  ) => {
    if (e.target.checked) {
      let brandData = brandsId.map((brand) => parseInt(brand.value));
      return brandData;
    } else {
      return [];
    }
  };

  const setBrandsValue = (
    brands: number[],
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      return [...brands, parseInt(e.target.value)];
    } else {
      const index = brands.indexOf(parseInt(e.target.value) as never);
      if (index > -1) {
        brands.splice(index, 1); // 2nd parameter means remove one item only
      }
      return brands;
    }
  };

  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden max-h-60 border border-gray-light dark:border-gray-dark">
        <div className="flex items-center gap-4 py-1 px-3 sticky z-10 top-0 bg-body-light dark:bg-body-dark">
          <div className="h-14 mt-1 left-3 top-0 flex gap-2 items-center">
            <Checkbox
              id="AllBrandsValue"
              name="AllBrandsValue"
              value={values?.brandId ? values?.brandId : []}
              onChange={(e) => {
                setFieldValue(
                  `brandId`,
                  setAllBrandsValue(values?.brandId, e, brands)
                );
              }}
              checked={values?.brandId?.length === brands?.length || false}
            />
            <Label>All</Label>
          </div>
          <div className="relative w-full">
            <Input
              type="search"
              name="search"
              value={searchValue}
              formik={false}
              onChange={searchBrand}
            />
          </div>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2">
          {brands.map((brand, index) => {
            return (
              <li className="py-1 px-3" key={brand.value}>
                <Checkbox
                  id={`brandId.${index}`}
                  label={brand.label}
                  inputSize="medium"
                  name="brandId"
                  onChange={(e) => {
                    setFieldValue(
                      `brandId`,
                      setBrandsValue([...(values?.brandId || [])], e)
                    );
                  }}
                  value={brand.value || ""}
                  checked={
                    values?.brandId?.includes(Number(brand.value)) || false
                  }
                />
              </li>
            );
          })}
          {brands.length === 0 && (
            <li className="text-center">No Data Found.</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default BrandsList;
