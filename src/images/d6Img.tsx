import { polygonStyle } from "./diceStyle";
import { styleToString } from "./styleToString";

export const d6Img = (): string => {
  const svgString = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon style="${styleToString(polygonStyle)}" points="6 28.5 50 1 94 28 50 53"/>
      <polygon style="${styleToString(polygonStyle)}" points="6 28.5 6 74 50 99 50 53"/>
      <polygon style="${styleToString(polygonStyle)}" points="50 53 94 28.5 94 74 50 99"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svgString)}`;
};
