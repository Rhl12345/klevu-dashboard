import Button from "@/components/Button/Button";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { IconName } from "@/components/SvgIcons/types";
import { ITabOption, ITabsProps } from "@/components/Tab/types";
import { Tab, TabGroup } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";

const MyTabs = ({
  options,
  activeTab = 0,
  onTabClick,
  isAddMode,
  toDisable,
  pClassName = "flex gap-x-2 text-quaternary-dark dark:text-quaternary-light",
  baseTabClassName = "tag-button outline-none cursor-pointer block font-semibold py-1 lg:py-2 px-2 lg:px-4 rounded-none text-sm text-quaternary-dark dark:text-quaternary-light hover:text-primary-light dark:hover:text-primary-dark hover:bg-white hover:dark:bg-gray-selected [&.active]:bg-gray-selected dark:[&.active]:bg-gray-dark [&.active]:text-white dark:[&.active]:text-white",
  activeTabClassName = "active tag-button outline-none cursor-pointer block font-semibold py-1 lg:py-2 px-2 lg:px-4 rounded-none text-sm text-quaternary-dark dark:text-quaternary-light hover:text-primary-light dark:hover:text-primary-dark hover:bg-white hover:dark:bg-gray-selected [&.active]:bg-gray-selected dark:[&.active]:bg-gray-dark [&.active]:text-white dark:[&.active]:text-white",
  isCount = false,
  scrollAmount = 200,
  leftArrowIcon,
  rightArrowIcon,
  scrollButtonClassName = " bg-gray-selected dark:bg-gray-dark p-1 rounded-none shadow-none text-white",
  variant = "scrollable",
  isListPage = true,
  usedInsideModal = false,
}: ITabsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [showScrollButtons, setShowScrollButtons] = useState(false);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const newScrollPosition =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };
  // Check if scrolling is needed
  useEffect(() => {
    const checkScroll = () => {
      const container = scrollContainerRef.current;
      if (container) {
        const hasHorizontalScroll =
          container.scrollWidth > container.clientWidth;
        setShowScrollButtons(hasHorizontalScroll);
      }
    };

    // Initial check
    checkScroll();

    // Create ResizeObserver to monitor container size changes
    const resizeObserver = new ResizeObserver(checkScroll);
    if (scrollContainerRef.current) {
      resizeObserver.observe(scrollContainerRef.current);
    }

    // Add window resize listener as fallback
    window.addEventListener("resize", checkScroll);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkScroll);
    };
  }, [options]);

  // Convert 0-based index to actual tab index for Headless UI
  const selectedIndex =
    options?.findIndex((tab: ITabOption) => tab.id === activeTab) ?? 0;

  const renderTabs = () => (
    <TabGroup
      selectedIndex={selectedIndex}
      onChange={(index) => {
        const tab = options?.[index];
        if (tab && onTabClick) {
          onTabClick(tab.id);
        }
      }}
      className={pClassName}
    >
      {options?.map((tab: ITabOption, index: number) => (
        <Tab
          key={`${index}-${tab.label}`}
          {...(tab.renderAs && { as: tab.renderAs as any })}
          {...(tab.href && { href: tab.href })}
          disabled={
            (isAddMode && index > 0) ||
            (toDisable && toDisable.indexOf(index) !== -1)
          }
          className={({
            selected,
            disabled,
          }: {
            selected: boolean;
            disabled: boolean;
          }) =>
            `${selected ? activeTabClassName : baseTabClassName} whitespace-nowrap ${tab.icon ? "flex gap-x-2" : ""} ${disabled ? "opacity-50 !cursor-not-allowed" : ""}`
          }
        >
          {tab.icon && (
            <SvgIcon name={tab.icon as IconName} height={24} width={24} />
          )}
          <span>{tab.label}</span>
        </Tab>
      ))}
    </TabGroup>
  );

  if (!options?.length) {
    return null;
  }

  if (variant === "scrollable") {
    return (
      <div
        className={`relative w-full ${usedInsideModal ? "!p-0" : isListPage ? "lg:pt-8 xl:px-8 pt-4 px-4" : "lg:pt-6 lg:px-6 pt-4 px-4"}`}
      >
        <div className="w-full flex flex-wrap bg-gray-default dark:dark:bg-gray-dark/40 border border-gray-light dark:border-gray-dark p-2 relative">
          <div className="w-full flex gap-2">
            {showScrollButtons && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => scroll("left")}
                className={`${scrollButtonClassName} left-0 !px-1`}
                aria-label="Scroll left"
              >
                {leftArrowIcon ? leftArrowIcon : <SvgIcon name="ArrowLeft" />}
              </Button>
            )}
            <div
              className="relative w-full flex flex-wrap rounded-none overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              ref={scrollContainerRef}
              style={{ scrollBehavior: "smooth" }}
            >
              {renderTabs()}
            </div>
            {showScrollButtons && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => scroll("right")}
                className={`${scrollButtonClassName} right-0 !px-1`}
                aria-label="Scroll right"
              >
                {rightArrowIcon ? (
                  rightArrowIcon
                ) : (
                  <SvgIcon name="ArrowRight" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Add variant-specific wrappers
  if (variant === "row-wise") {
    return (
      <div className="bg-body-light dark:bg-secondary-dark border border-gray-light dark:border-gray-dark rounded-none flex max-lg:flex-col gap-4 p-3">
        <div className="flex w-full lg:w-4/12 xl:w-2/12 overflow-x-auto">
          <div className="w-full flex-wrap lg:flex-col">
            <div className="w-full flex flex-wrap mb-1 lg:mb-2 bg-gray-default dark:bg-transparent border border-gray-light dark:border-gray-dark rounded-none p-2 overflow-x-auto">
              {renderTabs()}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-8/12 xl:w-10/12 content border border-gray-light dark:border-gray-dark py-4 px-4">
          <div className="text-sm text-quaternary-dark dark:text-quaternary-light font-normal">
            {options[activeTab]?.content}
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="w-full flex flex-wrap overflow-x-auto xl:px-8 px-4 pt-2 lg:pt-6 pb-2 lg:pb-2">
      <div className="w-full flex flex-wrap bg-gray-default dark:bg-transparent border border-gray-light dark:border-gray-dark rounded-none p-2 overflow-x-auto">
        {renderTabs()}
      </div>
    </div>
  );
};

export default MyTabs;
