import React from "react";
import { DEFAULT_STYLE } from "../constants";
import { CommonElementProps } from "../types";

export type TextAreaProps = Partial<
  React.PropsWithChildren<React.CSSProperties>
> & {
  readOnly?: boolean;
  placeholder?: string;
  value?: string;
  resize?: string;
  onChange?: (event: React.ChangeEvent) => void;
} & CommonElementProps;

export const TextArea = React.forwardRef(
  (
    {
      children,
      value,
      onClick,
      onChange,
      id,
      disabled,
      readOnly = false,
      placeholder = "",
      ...props
    }: TextAreaProps,
    ref: React.ForwardedRef<HTMLTextAreaElement>,
  ) => {
    const componentStyle = { ...DEFAULT_STYLE, ...props };

    return (
      <textarea
        id={id}
        style={componentStyle}
        readOnly={readOnly}
        aria-disabled={disabled}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onClick={onClick}
        contentEditable={false}
        ref={ref}
      >
        {children}
      </textarea>
    );
  },
);
