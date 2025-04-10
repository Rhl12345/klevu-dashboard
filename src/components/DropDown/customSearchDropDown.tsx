import React, { useState } from "react";
import Select from "react-select";
import { IDropdownProps } from "./types";

const CustomSearchDropDown = (props: IDropdownProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDropDownValue = (event: string) => {
    if (typeof event === "string" && event.length > 0) {
      setMenuOpen(true);
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <Select
      {...props}
      isSearchable
      onInputChange={handleDropDownValue}
      menuIsOpen={menuOpen}
    />
  );
};

export default CustomSearchDropDown;
