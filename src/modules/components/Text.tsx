import React from "react"
import { DEFAULT_STYLE } from "../constants";
import { CommonElementProps } from "../types";

export type TextProps = Partial<React.PropsWithChildren<React.CSSProperties>> & CommonElementProps;

export const T = React.forwardRef(({ children, onClick, id, disabled, ...props } : TextProps, ref: React.ForwardedRef<HTMLSpanElement> ) => {
    const componentStyle = { ...DEFAULT_STYLE, ...props}

    return <span id={id} style={componentStyle} aria-disabled={disabled} onClick={onClick} ref={ref}>{children}</span>;
})