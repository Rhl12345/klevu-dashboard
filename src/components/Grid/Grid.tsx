import React from "react";
import { IGridProps } from "@/components/Grid/types";

const Grid: React.FC<IGridProps> = ({
  children,
  className = "flex flex-col gap-4",
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div role="grid" aria-label="Content Grid" className={className}>
      {childrenArray.map((child, cellIndex) => (
        <div role="gridcell" key={`cell-${cellIndex}`}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default Grid;
