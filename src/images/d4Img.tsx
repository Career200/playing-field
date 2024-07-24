import { styleToString } from "./styleToString";

export const d4Img = (): string => {
  const polygonStyle: React.CSSProperties = {
    fill: "#eee",
    stroke: "#222",
    strokeWidth: "1px",
    strokeLinejoin: "round",
    opacity: "0.2"
  };

  const svgString = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon style="${styleToString(polygonStyle)}" points="1 90 50 5 50 60"/>
      <polygon style="${styleToString(polygonStyle)}" points="1 90 50 60 99 90"/>
      <polygon style="${styleToString(polygonStyle)}" points="50 5 99 90 50 60"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svgString)}`;
};
