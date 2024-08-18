import React from "react";
import { DEFAULT_STYLE } from "../constants";
import { CommonElementProps } from "../types";

type InputProps = {
  value?: number | string;
  onChange?: (event: React.ChangeEvent) => void;
  type?: string;
  readOnly?: boolean;
  placeholder?: string;
} & React.CSSProperties &
  CommonElementProps;

export const Input = React.forwardRef(
  (
    {
      id,
      disabled,
      placeholder,
      onChange,
      onClick,
      value,
      type = "text",
      readOnly = false,
      ...props
    }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const componentStyle = { ...DEFAULT_STYLE, ...props };

    return (
      <input
        id={id}
        type={type}
        style={componentStyle}
        aria-disabled={disabled}
        disabled={disabled}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        ref={ref}
      />
    );
  },
);
