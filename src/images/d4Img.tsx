import { polygonStyle } from "./diceStyle";
import { styleToString } from "./styleToString";

export const d4Img = (): string => {
  const svgString = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon style="${styleToString(polygonStyle)}" points="1 90 50 5 50 60"/>
      <polygon style="${styleToString(polygonStyle)}" points="1 90 50 60 99 90"/>
      <polygon style="${styleToString(polygonStyle)}" points="50 5 99 90 50 60"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svgString)}`;
};
