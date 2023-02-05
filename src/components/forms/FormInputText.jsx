import { forwardRef } from "react";

export const FormInputText = forwardRef(
  (
    {
      type,
      placeholder,
      autoComplete = "off",
      labelName,
      error,
      onChange,
      onBlur,
      name,
      full = false,
      children,
    },
    ref
  ) => { 

    
    const classLabel = error ? 'text-red-700 dark:text-red-500' : 'text-gray-900 dark:text-white'; 
    const classInput = error ? 
     'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400'
     : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    return (
      <div className="mb-6">
        <label
          htmlFor="input-group-1"
          className={`mb-1 text-sm font-medium ${classLabel}`}
        >
          {labelName}
        </label>
        <input
          className={classInput}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
        />
        {children}
      </div>
    );
  }
);
