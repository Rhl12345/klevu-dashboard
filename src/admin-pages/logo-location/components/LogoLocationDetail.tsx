"use client";
import Button from "@/components/Button/Button";
import TableActionPanel from "@/components/common/TableActionPanel";
import Status from "@/components/DisplayStatus/Status";
import DeleteModal from "@/components/Modal/DeleteModal";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import {
  ILogoLocationDetailsProps,
  ILogoLocationItem,
} from "@/types/logo-location/logo-location.type";
import React, { useEffect, useState } from "react";
import ManageLogoLocation from "@/admin-pages/logo-location/components/ManageLogoLocation";
import RenderLogoImage from "@/admin-pages/logo-location/components/RenderLogoImage";

const LogoLocationDetails: React.FC<ILogoLocationDetailsProps> = (props) => {
  const [manageLogoLocation, setManageLogoLocation] = useState(false);
  const [disableAddCatalog, setDisableCatalog] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "delete" | "edit" | null;
  }>({ isOpen: false, type: null });

  const columns: ITableColumn<ILogoLocationItem>[] = [
    {
      id: "logoLocationName",
      header: "LOGO LOCATION NAME",
      accessorKey: "name",
      cell: ({ row }) => {
        const logo = row?.original;
        return (
          <Button
            variant="default"
            onClick={() => {
              props.openCreateLogoLocationModal(logo?.id.toString());
              props.setLogoLocationDetail(logo);
            }}
          >
            {logo?.name}
          </Button>
        );
      },
    },
    {
      id: "locationImage",
      header: "LOCATION IMAGE",
      accessorKey: "imageUrl",
      cell: ({ row }) => {
        return <RenderLogoImage imagePath={row?.original?.imageUrl} />;
      },
    },
    {
      id: "3dImage",
      header: "3D IMAGE",
      accessorKey: "threeDImageURL",
      cell: ({ row }) => {
        return <RenderLogoImage imagePath={row?.original?.threeDImageURL} />;
      },
    },
    {
      id: "3DLogoLocationClass",
      header: "3D LOGO LOCATION CLASS",
      accessorKey: "threeDLogoLocationClass",
    },
    {
      id: "price",
      header: "PRICE ($)",
      accessorKey: "price",
    },
    {
      id: "cost",
      header: "COST ($)",
      accessorKey: "cost",
    },
    {
      id: "recStatus",
      header: "STATUS",
      accessorKey: "recStatus",
      cell: (props: { getValue: () => string }) => {
        if (props.getValue()) {
          return <Status type={props.getValue()} />;
        } else {
          return null;
        }
      },
    },
    {
      id: "id",
      header: "MANAGE LOGO LOCATION",
      accessorKey: "recStatus",
      cell: ({ row }) => {
        return (
          <Button
            className="text-indigo-500 inline-block"
            data-modal-toggle="ManageLocationModal"
            variant="outline-primary"
            onClick={() => {
              props.setLocationId(row?.original?.id.toString());
              setManageLogoLocation(true);
            }}
          >
            {"Manage Logo Location"}
          </Button>
        );
      },
    },
    {
      id: "action2",
      accessorKey: "action2",
      header: "Action",
      enableSorting: false,
      cell: ({ row }) => {
        const logo = row?.original;
        return (
          <TableActionPanel
            edit={{
              show: true,
              onClick: () => {
                handleModalOpen("edit", logo);
                props.openCreateLogoLocationModal(logo?.id.toString());
              },
            }}
            remove={{
              show: true,
              onClick: () => handleModalOpen("delete"),
            }}
          />
        );
      },
    },
  ];

  const handleModalOpen = (
    type: "delete" | "edit",
    data?: ILogoLocationItem
  ) => {
    setIsModalOpen({ isOpen: true, type });
    if (data) {
      props.setLogoLocationDetail(data);
    }
  };

  const handleClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setManageLogoLocation(false);
  };

  useEffect(() => {
    if (props.id) {
      setDisableCatalog(props.id);
      props.fetchLogoLocationDetails();
    }
  }, [props.id]);

  return (
    <>
      <ReactTable
        isListPage={false}
        displaySearch={false}
        totalCount={10}
        showFilter={false}
        COLUMNS={columns}
        DATA={props.logoLocationsDetails}
      />

      {isModalOpen.isOpen && isModalOpen.type === "delete" && (
        <DeleteModal isOpen onClose={handleClose} onDelete={() => {}} />
      )}

      {manageLogoLocation && (
        <ManageLogoLocation
          locationId={props.locationId || ""}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default LogoLocationDetails;
