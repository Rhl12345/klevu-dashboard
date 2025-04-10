import React from "react";

export interface IDashboardCardProps {
    title: string;
    description?: string;
    icon: React.ReactNode;
  }


  export interface ISortableItemProps {
    item: {
      id: string;
      imageUrl: string;
      title: string;
    };
    droppedWidgets: string[];
    setDroppedWidgets: React.Dispatch<React.SetStateAction<string[]>>;
  }

  export interface IDashboardWidgetModalProps {
    droppedWidgets: string[];
    setDroppedWidgets: React.Dispatch<React.SetStateAction<string[]>>;
  }



  export interface IDashboardCard {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
  }

