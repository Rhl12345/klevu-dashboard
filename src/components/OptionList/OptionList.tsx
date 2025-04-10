import React, { Fragment, useEffect, useRef, useState } from 'react';
import { iOptionListProps } from './types';
import { twMerge } from 'tailwind-merge';
import SvgIcon from '../SvgIcons/SvgIcon';

const OptionList: React.FC<iOptionListProps> = ({
  itemsArray,
  wrapperClassName,
  optionTextClassName,
  buttonClassName,
  inputCheckBoxClassName,
  inputLabelClassName,
  wrapperSectionsItemsClassName,
  withSectionsTitleClassName,
  popUpWrapperClassName,
  popUpTitle,
  popUpTitleClassName,
  popUpOptionsWrapperClassName,
  popUpOptionTitle,
  popUpOptionTitleClassName,
  type,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [selectedItems, setSelectedItems] = useState<string>('');
  const [popUp, setPopUp] = useState<boolean>(false);

  const typeEnum = {
    default: 'default',
    multiple: 'multiple',
    multipleWithDisabledOption: 'multipleWithDisabledOption',
    withSections: 'withSections',
    inAPopover: 'inAPopover',
  };

  const renderOptions = () =>
    itemsArray.map((i) => (
      <button
        key={i.id}
        role="menuitem"
        className={twMerge(
          'py-1 px-2 rounded-lg gap-4 lg:gap-6 w-full text-left flex justify-between items-center hover:bg-gray-light hover:text-secondary-dark dark:text-secondary-light',
          buttonClassName
        )}
        onClick={() => {
          setSelectedItems(
            selectedItems === i.value ? '' : (i.value as string) || ''
          );
        }}
      >
        <div
          className={twMerge(
            'text-sm text-secondary-dark',
            optionTextClassName
          )}
        >
          {i?.label}
        </div>
        {selectedItems === i?.value && (
          <span id="selected-indicator">
            <SvgIcon
              name="SuccessCheckmark"
              width={20}
              height={20}
              className="text-secondary-dark"
            />
            {/* <svg
              viewBox="0 0 20 20"
              width="20"
              height="20"
              className="Polaris-Icon__Svg"
              focusable="false"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M15.78 5.97a.75.75 0 0 1 0 1.06l-6.5 6.5a.75.75 0 0 1-1.06 0l-3.25-3.25a.75.75 0 1 1 1.06-1.06l2.72 2.72 5.97-5.97a.75.75 0 0 1 1.06 0Z"
              ></path>
            </svg> */}
          </span>
        )}
      </button>
    ));

  // Handle clicks outside the popup
  useEffect(() => {
    const handleEvent = (event: MouseEvent | KeyboardEvent) => {
      // Check if Escape key was pressed or click was outside the popup
      if (
        (event.type === 'keydown' &&
          (event as KeyboardEvent).key === 'Escape') ||
        (event.type === 'mousedown' &&
          popupRef.current &&
          !popupRef.current.contains(event.target as Node))
      ) {
        setPopUp(false);
      }
    };

    // Attach both listeners
    document.addEventListener('mousedown', handleEvent);
    document.addEventListener('keydown', handleEvent);

    return () => {
      // Cleanup listeners
      document.removeEventListener('mousedown', handleEvent);
      document.removeEventListener('keydown', handleEvent);
    };
  }, []);

  return (
    <>
      {typeEnum.default === type && (
        <>
          {/* Title Section */}
          <div className="text-sm text-secondary-dark dark:text-secondary-light font-semibold pb-2">
            Inventory Location
          </div>

          {/* Options Wrapper */}
          <div
            className={twMerge(
              'text-tertiary-dark dark:text-tertiary-light grid gap-1',
              wrapperClassName
            )}
          >
            {itemsArray &&
              itemsArray.length > 0 &&
              itemsArray.map((item) => (
                <button
                  key={item.id}
                  className={twMerge(
                    `p-2 rounded-lg w-full text-left flex justify-between items-center 
              ${item.isDisabled ? '' : 'hover:bg-gray-light'} 
              ${selectedItems === item.value ? 'bg-gray-light' : ''} 
              hover:text-secondary-dark dark:text-secondary-light`,
                    buttonClassName
                  )}
                  id={`toggleButton-${item.id}`}
                  onClick={() =>
                    setSelectedItems(
                      selectedItems === item.value
                        ? ''
                        : (item.value as string) || ''
                    )
                  }
                  disabled={item.isDisabled}
                >
                  {/* Option Label */}
                  <div
                    className={twMerge(
                      `text-sm ${item.isDisabled ? 'text-tertiary-light' : ''}`,
                      optionTextClassName
                    )}
                  >
                    {item.label}
                  </div>

                  {/* Check Icon */}
                  <span
                    id="toggleSpan"
                    className={selectedItems === item.value ? '' : 'hidden'}
                  >
                    <SvgIcon
                      name="SuccessCheckmark"
                      width={20}
                      height={20}
                      className="text-secondary-dark"
                    />
                  </span>
                </button>
              ))}
          </div>
        </>
      )}

      {typeEnum.multiple === type && (
        <>
          <div className="text-sm text-secondary-dark dark:text-secondary-light font-semibold pb-2">
            Manage sales channels availability
          </div>
          <div className="grid gap-1">
            {itemsArray?.length > 0 &&
              itemsArray.map((i, index) => (
                <div
                  key={i.id || index}
                  className={twMerge(
                    'flex space-x-3 items-center p-2 rounded-lg w-full hover:bg-gray-light text-tertiary-dark hover:text-tertiary-dark dark:text-tertiary-light',
                    wrapperClassName
                  )}
                >
                  <label className="flex items-center cursor-pointer relative">
                    <input
                      id={`checkbox${index}`}
                      type="checkbox"
                      className={twMerge(
                        'peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-gray-dark checked:bg-primary-light checked:border-primary-light',
                        inputCheckBoxClassName
                      )}
                      aria-labelledby={`checkbox-label-${index}`}
                    />
                  </label>
                  <div className="flex flex-col">
                    <label
                      htmlFor={`checkbox${index}`}
                      id={`checkbox-label-${index}`}
                      className={twMerge('text-sm', inputLabelClassName)}
                    >
                      {i?.label}
                    </label>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}

      {typeEnum.multipleWithDisabledOption === type && (
        <>
          <div className="text-sm font-semibold text-secondary-dark pb-2">
            Manage sales channels availability
          </div>
          <div className="grid gap-1">
            {itemsArray &&
              itemsArray?.length > 0 &&
              itemsArray.map((i, index) => {
                return (
                  <Fragment key={i.id || index}>
                    <label
                      className={twMerge(
                        `flex space-x-3 items-center p-2 rounded-lg w-full ${i?.isDisabled ? '' : 'hover:bg-gray-light'
                        } text-tertiary-dark hover:text-tertiary-dark dark:text-tertiary-light cursor-pointer`,
                        wrapperClassName
                      )}
                    >
                      <input
                        id={`checkbox${index}`}
                        type="checkbox"
                        className={twMerge(
                          `${i?.isDisabled
                            ? 'bg-gray-light border-gray-light'
                            : ''
                          } peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border ${i?.isDisabled ? '' : 'border-gray-dark'
                          } checked:bg-primary-light checked:border-primary-light`,
                          inputCheckBoxClassName
                        )}
                        disabled={i?.isDisabled}
                      />
                      <span
                        className={twMerge(
                          `text-sm ${i?.isDisabled ? 'text-tertiary-light' : ''}`,
                          inputLabelClassName
                        )}
                      >
                        {i?.label}
                      </span>
                    </label>
                  </Fragment>
                );
              })}
          </div>
        </>
      )}

      {typeEnum.withSections === type && (
        <>
          <div className={twMerge('p-5 grid gap-4 lg:gap-6', wrapperClassName)}>
            {itemsArray &&
              itemsArray?.length > 0 &&
              itemsArray.map((i, pIndex) => {
                return (
                  <Fragment key={i.id}>
                    <div className="grid gap-1">
                      <div
                        className={twMerge(
                          'text-sm font-semibold pb-1 text-secondary-dark',
                          withSectionsTitleClassName
                        )}
                      >
                        {i?.title}
                      </div>
                      {i?.items &&
                        i?.items?.length > 0 &&
                        i?.items.map((child, cIndex) => {
                          return (
                            <Fragment key={child.id}>
                              <label
                                className={twMerge(
                                  'flex space-x-3 items-center p-2 rounded-lg w-full hover:bg-gray-light text-tertiary-dark hover:text-tertiary-dark dark:text-tertiary-light cursor-pointer',
                                  wrapperSectionsItemsClassName
                                )}
                              >
                                <input
                                  id={`checkbox${cIndex}`}
                                  type="checkbox"
                                  className={twMerge(
                                    'peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-gray-dark checked:bg-primary-light checked:border-primary-light',
                                    inputCheckBoxClassName
                                  )}
                                />
                                <span
                                  className={twMerge(
                                    'text-sm',
                                    inputLabelClassName
                                  )}
                                >
                                  {child?.label}
                                </span>
                              </label>
                            </Fragment>
                          );
                        })}
                    </div>
                  </Fragment>
                );
              })}
          </div>
        </>
      )}

      {typeEnum.inAPopover === type && (
        <>
          <div ref={popupRef}>
            <button
              className={twMerge(
                'btn btn-secondary flex justify-between items-center gap-4 lg:gap-6',
                popUpWrapperClassName
              )}
              onClick={() => setPopUp((prev) => !prev)}
              aria-expanded={popUp}
              aria-controls="popover-menu"
              aria-haspopup="menu"
            >
              <span className={twMerge('', popUpTitleClassName)}>
                {popUpTitle}
              </span>
              <SvgIcon
                name="ArrowDown"
                width={15}
                height={15}
                className="text-secondary-dark"
              />
            </button>
            {popUp && (
              <div
                id="popover-menu"
                role="menu"
                className={twMerge(
                  'bg-secondary-light dark:bg-secondary-dark p-3 rounded-lg border border-gray-light max-w-fit mt-2 shadow-md',
                  popUpOptionsWrapperClassName
                )}
              >
                <div
                  className={twMerge(
                    'text-sm font-semibold pb-2 text-secondary-dark',
                    popUpOptionTitleClassName
                  )}
                >
                  {popUpOptionTitle}
                </div>
                <div className="grid gap-1" role="none">
                  {renderOptions()}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default OptionList;
