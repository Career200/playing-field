import React from "react"
import { DEFAULT_STYLE } from "../constants";
import { CommonElementProps } from "../types";

export type ButtonProps = Partial<React.PropsWithChildren<React.CSSProperties>> & CommonElementProps;

export const Button = React.forwardRef(({ children, onClick, id, disabled, ...props } : ButtonProps, ref: React.ForwardedRef<HTMLButtonElement> ) => {
    const componentStyle = { ...DEFAULT_STYLE, ...props}

    return <button id={id} style={componentStyle} aria-disabled={disabled} disabled={disabled} onClick={onClick} ref={ref}>{children}</button>;
})