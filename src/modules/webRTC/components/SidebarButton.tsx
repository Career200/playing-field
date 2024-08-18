import React from "react";
import { Box } from "../../components/Box";
import { Button } from "../../components/Button";
import { T } from "../../components/Text";
import { sidebarButtonProps, textProps } from "./styles";

export type SidebarPages = "chat" | "user" | "offerings" | "answerings";

type SidebarButtonProps = {
  width: number | string;
  text: string;
  refPage: SidebarPages;
  page: SidebarPages;
  onClick: (event: React.MouseEvent) => void;
};

export const SidebarButton = ({
  width,
  text,
  refPage,
  page,
  onClick,
}: SidebarButtonProps) => {
  return (
    <Box flexDirection="column" width={width}>
      <Button
        width={width}
        active={page === refPage}
        mode="switch"
        activeBg="silver"
        activeHoverBg="silver"
        hoverBg="silver"
        onClick={onClick}
        {...sidebarButtonProps}
      >
        <T {...textProps}>{text}</T>
      </Button>
    </Box>
  );
};
