import React, { useState, useEffect, useRef, CSSProperties } from "react";
import {
  SketchPicker,
  ColorResult,
  SketchPickerProps,
  Color,
} from "react-color";
import reactCSS from "reactcss";
import Input from "@/components/Input/Input";
import { IColorPickerProps } from "@/components/Colorpicker/types";
import { useFormikContext } from "formik";
import { IInputComponentType } from "@/components/Input/types";
import { twMerge } from "tailwind-merge";
import { Label } from "@/components/Label/Label";

const ColorPicker = ({ isFormik = true, ...props }: IColorPickerProps) => {
  const formik = useFormikContext();
  const [color, setColor] = useState(
    (props.value ||
      formik?.values?.[props.name as keyof typeof formik.values] ||
      "#2d8bf1") as Color
  );
  const [displayPicker, setDisplayPicker] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputProps = props as IInputComponentType;
  const colorPickerProps = props as SketchPickerProps;

  const handleClickOutside = (event: Event) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setDisplayPicker(false);
    }
  };

  const handleClick = () => {
    setDisplayPicker(!displayPicker);
  };

  const handleChange = (
    color: ColorResult,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (props.onChange instanceof Function) {
      props.onChange(color, event);
    }
    setColor(color.hex);
    if (formik) {
      formik.setFieldValue(props.name || "", color.hex);
    }
  };

  const styles = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `${color}`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
        right: 0,
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <React.Fragment>
      <Label htmlFor={props.id} className={twMerge(props.labelClassName)}>
        {props.label}{" "}
        {props.required ? (
          <span className="text-red-500">*</span>
        ) : (
          <span className="text-red-500"></span>
        )}
      </Label>
      <div className={`flex`}>
        <div className="flex-grow">
          <Input
            {...inputProps}
            formik={isFormik}
            label={undefined}
            className={`block w-full bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark hover:border-gray-light dark:hover:border-gray-dark focus:border-gray-light dark:focus:border-gray-dark focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md ${
              props.disabled ? "bg-gray-100" : ""
            } ${props.className}`}
            disabled={true}
            value={
              props.value ||
              formik?.values?.[props.name as keyof typeof formik.values] ||
              ""
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              formik
                ? formik.setFieldValue(props.name || "", e.target.value)
                : undefined
            }
          />
        </div>
        <div
          className="relative ml-3"
          id={`colorPickerParent`}
          ref={wrapperRef}
        >
          <button
            type="button"
            id={`colorPickerParent`}
            onClick={handleClick}
            className="w-10 h-10 rounded-full focus:outline-none focus:shadow-outline inline-flex p-2 shadow"
            style={{
              background: `${color}`,
              color: "white",
            }}
            // disabled={!permission?.isEdit && !permission?.isDelete}
          >
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                d="M15.584 10.001L13.998 8.417 5.903 16.512 5.374 18.626 7.488 18.097z"
              />
              <path d="M4.03,15.758l-1,4c-0.086,0.341,0.015,0.701,0.263,0.949C3.482,20.896,3.738,21,4,21c0.081,0,0.162-0.01,0.242-0.03l4-1 c0.176-0.044,0.337-0.135,0.465-0.263l8.292-8.292l1.294,1.292l1.414-1.414l-1.294-1.292L21,7.414 c0.378-0.378,0.586-0.88,0.586-1.414S21.378,4.964,21,4.586L19.414,3c-0.756-0.756-2.072-0.756-2.828,0l-2.589,2.589l-1.298-1.296 l-1.414,1.414l1.298,1.296l-8.29,8.29C4.165,15.421,4.074,15.582,4.03,15.758z M5.903,16.512l8.095-8.095l1.586,1.584 l-8.096,8.096l-2.114,0.529L5.903,16.512z" />
            </svg>
          </button>
          {displayPicker ? (
            <div
              className={`absolute z-30 ${props.transformCss ?? ""}`}
              style={styles.popover as CSSProperties}
            >
              <div data-style={styles.cover} onClick={handleClick} />
              <SketchPicker
                {...colorPickerProps}
                color={color}
                onChange={handleChange}
              />
            </div>
          ) : null}
        </div>
      </div>

      {props.displayError && props.errorMessage && (
        <p
          className={twMerge(
            "mt-2 text-sm text-red-500",
            props.errorMessageClassName
          )}
          role="alert"
          aria-live="polite"
        >
          {props.errorMessage}
        </p>
      )}
    </React.Fragment>
  );
};

export default ColorPicker;
