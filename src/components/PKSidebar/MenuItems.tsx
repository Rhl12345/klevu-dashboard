import { MenuItem } from "@/components/Sidebar/types";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Link from "next/link";

export const RecursiveMenuItem = ({
  item,
  level = 0,
  expandedItems,
  selectedItem,
  onItemSelect,
  onToggleExpand,
  setIsMobileMenuOpen,
}: {
  item: MenuItem;
  level?: number;
  expandedItems: Set<string>;
  selectedItem: string;
  onItemSelect: (id: string) => void;
  onToggleExpand: (id: string) => void;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}) => {
  const isExpanded = expandedItems.has(item.id);
  const isSelected = selectedItem === item.id;
  const hasSelectedChild = (item: MenuItem): boolean => {
    if (selectedItem === item.id) return true;
    if (!item.subItems) return false;
    return item.subItems.some((subItem) => hasSelectedChild(subItem));
  };
  const isActive = hasSelectedChild(item);

  return (
    <li>
      <div>
        <Link
          prefetch={false}
          href={item.href || ""}
          onClick={(e) => {
            if (item.subItems) {
              e.preventDefault();
              onToggleExpand(item.id);
            } else {
              setIsMobileMenuOpen(false);
            }
            onItemSelect(item.id);
          }}
          className={`group w-full items-center flex justify-between rounded-none ${level === 0 ? "px-3 py-2" : level === 1 ? "py-2 pr-4 pl-16" : level === 2 ? "py-2 pr-4 pl-20" : "py-2 pr-4 pl-24"} text-sm text-quaternary-dark dark:text-quaternary-light hover:text-primary-light dark:hover:text-quaternary-dark hover:bg-gray-pointer [&.active]:text-white [&.active]:hover:text-white dark:[&.active]:text-white [&.active]:font-semibold 
            ${
              isSelected || isActive
                ? level === 0
                  ? "bg-gray-selected dark:bg-gray-dark text-white [&.active]:hover:bg-gray-selected dark:[&.active]:hover:bg-gray-dark active"
                  : level === 1
                    ? "bg-gray-selected dark:bg-gray-dark text-white [&.active]:hover:bg-gray-selected dark:[&.active]:hover:bg-gray-dark active"
                    : "bg-gray-selected/60 dark:bg-gray-dark/60 hover:bg-gray-selected/60 dark:hover:bg-gray-dark/60 hover:text-white text-white active"
                : ""
            }`}
        >
          <span className="flex items-center gap-2">
            {item.icon && <SvgIcon name={item.icon as any} />}
            <span>{item.label}</span>
          </span>
          {item.subItems && (
            <span className="toggle-icon transition-all duration-500">
              <SvgIcon name={isExpanded ? "ArrowDown" : "ArrowRight"} />
            </span>
          )}
        </Link>
        {item.subItems && isExpanded && (
          <ul className="mt-1">
            {item.subItems.map((subItem) => (
              <RecursiveMenuItem
                key={subItem.id}
                item={subItem}
                level={level + 1}
                expandedItems={expandedItems}
                selectedItem={selectedItem}
                onItemSelect={onItemSelect}
                onToggleExpand={onToggleExpand}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};
