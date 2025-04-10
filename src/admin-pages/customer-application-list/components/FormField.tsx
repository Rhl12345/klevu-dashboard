import Input from '@/components/Input/Input';
import { Label } from '@/components/Label/Label';
import { IFormFieldProps } from '@/types/customer/customer-application-list/customerApplicationList.type';
import React, { memo } from 'react'

const FormField: React.FC<IFormFieldProps> = memo(({
  label,
  name,
  type = "text",
  value,
}) => {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-2 items-center  w-full">
      <div className="flex flex-col lg:flex-row items-center w-full gap-2">
        <div className="w-1/4">
          <Label>{label}:</Label>
        </div>
        <div className="w-full lg:w-3/4">
          <Input
            type={type}
            name={name}
            id={name}
            value={value}
            formik={false}
            disabled
          />
        </div>
      </div>
    </div>
  );
});

export default FormField;
