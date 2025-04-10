"use client";
import React, { useState } from "react";
import { PageRoutes } from "@/admin-pages/routes";
import { IPermissionData } from "@/types/profile/myAccount.type";
import { PERMISSION_DATA } from "@/mock-data/permissionUser";
import Button from "@/components/Button/Button";
import { ITableColumn } from "@/components/Table/types";
import ReactTable from "@/components/Table/ReactTable";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import { toast } from "react-toastify";
import Checkbox from "@/components/Checkbox/Checkbox";

const CreateRole = ({ id = 0 }: { id?: number }) => {
  const [permissions, setPermissions] = useState(PERMISSION_DATA);

  // Helper function to check if all children have the same permission state
  const checkChildrenPermissions = (
    items: IPermissionData[],
    permissionType: "view" | "edit" | "delete"
  ): boolean | null => {
    if (!items || items.length === 0) return null;

    const firstValue = items[0].permissions[permissionType];
    return items.every(
      (item) => item.permissions[permissionType] === firstValue
    )
      ? firstValue
      : null;
  };

  // Helper function to update parent permissions based on children
  const updateParentPermissions = (
    items: IPermissionData[],
    parentId: string | null,
    permissionType: "view" | "edit" | "delete"
  ) => {
    if (!parentId) return;

    const updateParent = (
      items: IPermissionData[],
      targetId: string
    ): boolean => {
      for (let item of items) {
        if (item.id === targetId) {
          if (item.subRows) {
            const childrenState = checkChildrenPermissions(
              item.subRows,
              permissionType
            );
            if (childrenState !== null) {
              item.permissions[permissionType] = childrenState;
            }
          }
          return true;
        }
        if (item.subRows && updateParent(item.subRows, targetId)) {
          const parentState = checkChildrenPermissions(
            item.subRows,
            permissionType
          );
          if (parentState !== null) {
            item.permissions[permissionType] = parentState;
          }
          return true;
        }
      }
      return false;
    };

    updateParent(items, parentId);
  };

  // Modified findAndUpdatePermission to update parents
  const findAndUpdatePermission = (
    items: IPermissionData[],
    targetId: string,
    permissionType: "view" | "edit" | "delete",
    checked: boolean
  ): boolean => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.id === targetId) {
        item.permissions[permissionType] = checked;
        // Update parent after changing child
        updateParentPermissions(permissions, item.parentId, permissionType);
        return true;
      }

      if (
        item.subRows?.length &&
        findAndUpdatePermission(item.subRows, targetId, permissionType, checked)
      ) {
        // Update this parent after child updates
        const childrenState = checkChildrenPermissions(
          item.subRows,
          permissionType
        );
        if (childrenState !== null) {
          item.permissions[permissionType] = childrenState;
        }
        return true;
      }
    }
    return false;
  };

  // Add columns definition
  const COLUMNS: ITableColumn<IPermissionData>[] = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
      id: "enable",
      header: "Enable",
      accessorKey: "enable",
      cell: ({ row }) => (
        <div className="flex items-center">
          {row.original.hasChildren ? (
            <Checkbox
              id={`module-${row.original.id}`}
              name={`module-${row.original.id}`}
              checked={
                row.original.permissions.view &&
                row.original.permissions.edit &&
                row.original.permissions.delete
              }
              onChange={(e) => {
                const updatedPermissions = [...permissions];
                // Single recursive function to handle both finding and updating
                const updatePermissionTree = (
                  items: IPermissionData[],
                  targetId: string,
                  checked: boolean
                ): boolean => {
                  for (let i = 0; i < items.length; i++) {
                    const item = items[i];

                    if (item.id === targetId) {
                      // Update the entire subtree starting from this node
                      const updateSubtree = (node: IPermissionData) => {
                        node.permissions = {
                          view: checked,
                          edit: checked,
                          delete: checked,
                        };

                        if (node.subRows?.length) {
                          node.subRows.forEach(updateSubtree);
                        }
                      };

                      updateSubtree(item);
                      return true;
                    }

                    if (
                      item.subRows?.length &&
                      updatePermissionTree(item.subRows, targetId, checked)
                    ) {
                      return true;
                    }
                  }
                  return false;
                };

                updatePermissionTree(
                  updatedPermissions,
                  row.original.id,
                  e.target.checked
                );
                setPermissions([...updatedPermissions]);
              }}
            />
          ) : (
            <></>
          )}
        </div>
      ),
    },
    {
      id: "view",
      header: "View",
      accessorKey: "permissions.view",
      cell: ({ row }) => (
        <div className="flex items-center">
          {!row.original.hasChildren ? (
            <Checkbox
              id={`module-${row.original.id}`}
              name={`module-${row.original.id}`}
              checked={row.original.permissions.view}
              onChange={(e) => {
                const updatedPermissions = [...permissions];
                findAndUpdatePermission(
                  updatedPermissions,
                  row.original.id,
                  "view",
                  e.target.checked
                );
                setPermissions([...updatedPermissions]);
              }}
            />
          ) : (
            <Button variant="primary">View</Button>
          )}
        </div>
      ),
    },
    {
      id: "edit",
      header: "Edit",
      accessorKey: "permissions.edit",
      cell: ({ row }) => (
        <div className="flex items-center">
          {!row.original.hasChildren ? (
            <Checkbox
              id={`module-${row.original.id}`}
              name={`module-${row.original.id}`}
              checked={row.original.permissions.edit}
              onChange={(e) => {
                const updatedPermissions = [...permissions];
                findAndUpdatePermission(
                  updatedPermissions,
                  row.original.id,
                  "edit",
                  e.target.checked
                );
                setPermissions([...updatedPermissions]);
              }}
            />
          ) : (
            <Button variant="primary">Edit</Button>
          )}
        </div>
      ),
    },
    {
      id: "delete",
      header: "Delete",
      accessorKey: "permissions.delete",
      cell: ({ row }) => (
        <div className="flex items-center">
          {!row.original.hasChildren ? (
            <Checkbox
              id={`module-${row.original.id}`}
              name={`module-${row.original.id}`}
              checked={row.original.permissions.delete}
              onChange={(e) => {
                const updatedPermissions = [...permissions];
                findAndUpdatePermission(
                  updatedPermissions,
                  row.original.id,
                  "delete",
                  e.target.checked
                );
                setPermissions([...updatedPermissions]);
              }}
            />
          ) : (
            <Button variant="primary">Delete</Button>
          )}
        </div>
      ),
    },
  ];

  const getRowCanExpand = (row: any) => {
    return row.original.hasChildren === true;
  };

  return (
    <>
      <ListPageHeader
        navigateUrl={PageRoutes.ROLES.LIST}
        moduleName={`${id ? "Edit" : "Create"} Roles`}
        showBackButton
      >
        <Button
          onClick={() => {
            if (id) {
              toast.success("Roles updated successfully");
            } else {
              toast.success("Roles created successfully");
            }
          }}
        >
          Save
        </Button>
      </ListPageHeader>

      <ReactTable
        COLUMNS={COLUMNS}
        DATA={permissions}
        getRowCanExpand={getRowCanExpand}
        showEditColumns={false}
        showMoreFilters={false}
        displaySearch={false}
      />
    </>
  );
};

export default CreateRole;
