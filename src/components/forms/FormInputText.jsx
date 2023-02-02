import { forwardRef } from "react";

export const FormInputText = forwardRef(
  ({ type, placeholder, autoComplete = "off", onChange, onBlur, name, children }, ref) => {
    return (
      <>
         <input
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
        />
        {children}
      </>
     
    );
  }
);
