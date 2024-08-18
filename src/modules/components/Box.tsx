import React from "react";
import { DEFAULT_STYLE } from "../constants";
import { CommonElementProps } from "../types";

export type BoxProps = Partial<React.PropsWithChildren<React.CSSProperties>> &
  CommonElementProps;

export const Box = React.forwardRef(
  (
    { children, onClick, id, disabled, ...props }: BoxProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const componentStyle = { ...DEFAULT_STYLE, ...props };

    return (
      <div
        id={id}
        style={componentStyle}
        aria-disabled={disabled}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);
