import { styleToString } from "./styleToString";

export const d20Img = (): string => {
  const polygonStyle: React.CSSProperties = {
    fill: "#eee",
    stroke: "#222",
    strokeWidth: "1px",
    strokeLinejoin: "round",
    opacity: "0.2"
  };

  const svgString = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon style="${styleToString(polygonStyle)}" points="6 28 50 24 50 1"/>
      <polygon style="${styleToString(polygonStyle)}" points="50 1 50 24 94 28"/>
      <polygon style="${styleToString(polygonStyle)}" points="28 64 50 24 74 64"/>
      <polygon style="${styleToString(polygonStyle)}" points="6 28 28 64 50 24"/>
      <polygon style="${styleToString(polygonStyle)}" points="50 24 74 64 94 28"/>
      <polygon style="${styleToString(polygonStyle)}" points="94 28 74 64 94 74"/>
      <polygon style="${styleToString(polygonStyle)}" points="6 74 28 64 50 99"/>
      <polygon style="${styleToString(polygonStyle)}" points="50 99 74 64 94 74"/>
      <polygon style="${styleToString(polygonStyle)}" points="28 64 50 99 74 64"/>
      <polygon style="${styleToString(polygonStyle)}" points="6 28 6 74 28 64"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svgString)}`;
};
