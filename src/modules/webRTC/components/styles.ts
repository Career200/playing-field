import { StyledButtonProps } from "../../components/Button";

export const chatTheme = {
  colors: {
    main: "#e8e8e8",
    chat: "#e8e8a8",
    button: {
      main: "#e8e8e8",
      active: "#c8a8a8",
      hover: "#98a8a8",
      activehover: "#98a8a8",
    },
    border: {
      main: "#989898",
      secondary: "#5858a8",
      button: "#989898",
    },
    fonts: {
      main: "#383838",
      hovered: "#5858e8",
    },
  },
};

export const buttonStyle: React.CSSProperties & StyledButtonProps = {
  background: chatTheme.colors.button.main,
  border: chatTheme.colors.border.button,
  color: chatTheme.colors.fonts.main,
  hoverBg: chatTheme.colors.button.hover,
  activeBg: chatTheme.colors.button.active,
  activeHoverBg: chatTheme.colors.button.activehover,
  borderRadius: 10,
  boxShadow: `inset 0px 0px 5px 5px ${chatTheme.colors.border.button}`,
};

export const textAreaStyle: React.CSSProperties = {
  resize: "none",
  width: "100%",
  height: 40,
};

export const chatBoxStyle: React.CSSProperties = {
  height: "100%",
  width: "100%",
  border: `${2}px solid ${chatTheme.colors.border.secondary}`,
  background: chatTheme.colors.chat,
  borderRadius: 10,
  overflow: "scroll",
  flexDirection: "column",
  color: "darkblue",
  fontSize: 12,
  alignItems: "center",
  boxShadow: `inset 0px 0px 5px 5px ${chatTheme.colors.main}, inset 0px 0px 8px 8px ${chatTheme.colors.border.secondary}`,
};

export const sidebarButtonProps: React.CSSProperties & StyledButtonProps = {
  ...buttonStyle,
  alignItems: "center",
  justifyContent: "center",
  padding: 4,
};

export const textProps: React.CSSProperties = {
  justifyContent: "center",
  alignItems: "center",
  color: "inherit",
  fontSize: 12,
  fontFamily: "sans-serif",
  whiteSpace: "nowrap",
};

export const channelButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  height: 30,
  width: 30,
};
