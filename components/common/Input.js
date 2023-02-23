import { useState } from "react";

function Input(props) {
  const [isInputSelected, setIsInputSelected] = useState(false);

  const inputFocusHandler = () => {
    setIsInputSelected(true);
  }

  const inputBlurHandler = () => {
    setIsInputSelected(false);
  }
  
  return (
    <div className={props?.divClassName || "space-y-2 flex flex-col text-sm"}>
      {props?.label && (
        <label
          htmlFor={props?.input.id}
          className={props?.labelClassName || `text-sm font-normal text-tertiarygrey-400 font-title ${isInputSelected && "text-tertiaryred-50"}`}
        >
          {props?.label}{props?.input?.required && <span className="">*</span>}
        </label>
      )}
      <input
        {...props?.input}
        onFocus={inputFocusHandler}
        onBlur={inputBlurHandler}
        className={props?.inputClassName || `bg-inherit border border-tertiarygrey-350 font-title focus:outline-none focus:border-tertiaryred-50 focus:text-tertiaryred-50 rounded-lg w-full p-3 text-sm`}
      />
      {props?.extra}
    </div>
  );
}

export default Input;
