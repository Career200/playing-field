import React, { useCallback, useEffect, useState } from "react"
import { DEFAULT_STYLE } from "../constants";
import { CommonElementProps } from "../types";
import styled from "@emotion/styled";

export type ButtonModes = "tact" | "pressable" | "switch"

export type ButtonProps = Partial<React.PropsWithChildren<React.CSSProperties>> & { active?: boolean } &CommonElementProps;

type StyledButtonProps = { 
    pressed?: boolean, 
    mode?: ButtonModes, 
    hoverBg?: string,
    activeBg?: string,
    activeHoverBg?: string,
};

const $button = styled.button(
    ({ 
        pressed, 
        background, 
        hoverBg, 
        activeBg, 
        activeHoverBg,
        color 
    }:  StyledButtonProps & React.CSSProperties) => {
    return {
        background: pressed ? activeBg : background,
        color: pressed ? "blue" : color,
        ":hover": {
            background: pressed ? activeHoverBg : hoverBg,
            color: pressed ? "red" : color
        }
    }
})

export const Button = React.forwardRef(
    ({ 
        children, 
        mode = "tact", 
        active = false, 
        onClick, 
        id, 
        disabled, 
        background, 
        color, 
        activeBg,
        hoverBg,
        activeHoverBg,
        ...props 
    } : ButtonProps & StyledButtonProps, ref: React.ForwardedRef<HTMLButtonElement> ) => {
    const componentStyle = { ...DEFAULT_STYLE, ...props}
    const [pressed, setPressed] = useState<boolean>(false);

    useEffect(() => {
        if (mode === "switch") setPressed(active);
    }, [mode, active]);

    const handleMouseDown = useCallback((event: React.MouseEvent) => {
        event.preventDefault();
        if (mode === "tact") setPressed(true);
    }, [pressed, mode]);

    const handleMouseUp = useCallback((event: React.MouseEvent) => {
        event.preventDefault();
        if (mode === "tact") setPressed(false);
    }, [pressed, mode])

    const handleClick = useCallback((event: React.MouseEvent) => {
        if (mode === "pressable") setPressed(!pressed);
        onClick?.(event)
    }, [onClick, mode, pressed]);


    return (
        <$button 
            mode={mode} 
            pressed={pressed} 
            id={id} 
            background={background}
            color={color}
            style={componentStyle} 
            aria-disabled={disabled} 
            disabled={disabled} 
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={handleClick} 
            hoverBg={hoverBg}
            activeBg={activeBg}
            activeHoverBg={activeHoverBg}
            ref={ref}>
                {children}
        </$button>
        );
})