import React, { memo, useState, useCallback } from "react";
import { IOTPInputProps } from "@/components/Input/types";
import SingleOTPInput from "@/components/Input/SingleInput";
import { twMerge } from "tailwind-merge";

export function OTPInputComponent(props: IOTPInputProps) {
  const {
    length,
    isNumberInput,
    autoFocus,
    disabled,
    onChangeOTP,
    value,
    setValue,
    inputClassName,
    inputStyle,
    name,
    ...rest
  } = props;

  const [activeInput, setActiveInput] = useState(0);

  const defaultInputClassName = twMerge(
    "w-8 h-8 mx-3 text-base text-center border border-gray-light dark:border-gray-dark outline-none",
    inputClassName
  );

  const defaultContainerClassName = twMerge(
    "flex justify-center items-center",
    rest.className
  );

  // Helper to return OTP from inputs
  const handleOtpChange = useCallback(
    (otp: string[]) => {
      const otpValue = otp.join("");
      onChangeOTP?.(otpValue);
    },
    [onChangeOTP]
  );

  // Helper to return value with the right type: 'text' or 'number'
  const getRightValue = useCallback(
    (str: string) => {
      let changedValue = str;
      if (!isNumberInput) {
        return changedValue;
      }
      return !changedValue || /\d/.test(changedValue) ? changedValue : "";
    },
    [isNumberInput]
  );

  // Change OTP value at focussing input
  const changeCodeAtFocus = useCallback(
    (str: string) => {
      const updatedOTPValues = value.split("");
      updatedOTPValues[activeInput] = str[0] || "";
      setValue(updatedOTPValues.join(""));
      handleOtpChange(updatedOTPValues);
    },
    [activeInput, handleOtpChange, value]
  );

  // Focus `inputIndex` input
  const focusInput = useCallback(
    (inputIndex: number) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
      setActiveInput(selectedIndex);
    },
    [length]
  );

  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1);
  }, [activeInput, focusInput]);

  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1);
  }, [activeInput, focusInput]);

  // Handle onFocus input
  const handleOnFocus = useCallback(
    (index: number) => () => {
      focusInput(index);
    },
    [focusInput]
  );

  // Handle onChange value for each input
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = getRightValue(e.currentTarget.value);
      if (!val) {
        e.preventDefault();
        return;
      }
      changeCodeAtFocus(val);
      focusNextInput();
    },
    [changeCodeAtFocus, focusNextInput, getRightValue]
  );

  // Hanlde onBlur input
  const onBlur = useCallback(() => {
    setActiveInput(-1);
  }, []);

  // Handle onKeyDown input
  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Backspace":
        case "Delete": {
          e.preventDefault();
          if (value[activeInput]) {
            changeCodeAtFocus("");
          } else {
            focusPrevInput();
          }
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          focusPrevInput();
          break;
        }
        case "ArrowRight": {
          e.preventDefault();
          focusNextInput();
          break;
        }
        case " ": {
          e.preventDefault();
          break;
        }
        default:
          break;
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, value]
  );

  const handleOnPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData("text/plain")
        .trim()
        .slice(0, length - activeInput)
        .split("");

      if (pastedData.length > 0) {
        const updatedOTPValues = [...value.split("")]; // Create a copy of the current OTP values

        let nextFocusIndex = activeInput;

        // Update OTP values with pasted data
        pastedData.forEach((char, index) => {
          const inputIndex = activeInput + index;
          if (inputIndex < length) {
            const changedValue = getRightValue(char);
            if (changedValue) {
              updatedOTPValues[inputIndex] = changedValue;
              nextFocusIndex = inputIndex;
            }
          }
        });

        setValue(updatedOTPValues.join("")); // Update the OTP value
        focusInput(Math.min(nextFocusIndex + 1, length - 1)); // Move focus to the next input
        handleOtpChange(updatedOTPValues); // Trigger the onChangeOTP callback
      }
    },
    [activeInput, getRightValue, length, value, focusInput, handleOtpChange]
  );

  const NumberOfInputs = () => {
    const otpInputs = [];

    for (let index = 0; index < length; index++) {
      otpInputs.push(
        <SingleOTPInput
          name={`${name}-${index}`}
          key={`SingleInput-${index}`}
          focus={activeInput === index}
          autoFocus={autoFocus}
          value={value && value[index]}
          onFocus={handleOnFocus(index)}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          onBlur={onBlur}
          onPaste={handleOnPaste}
          style={inputStyle}
          className={defaultInputClassName}
          disabled={disabled}
        />
      );
    }
    return otpInputs;
  };

  return (
    <div className={defaultContainerClassName} {...rest}>
      <NumberOfInputs />
    </div>
  );
}

const OTPInput = memo(OTPInputComponent);
export default OTPInput;
