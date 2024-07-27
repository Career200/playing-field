import { polygonStyle } from "./diceStyle";
import { styleToString } from "./styleToString";

export const d8Img = (): string => {
  const svgString = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon style="${styleToString(polygonStyle)}" points="6 74 94 73.5 50 1"/>
      <polygon style="${styleToString(polygonStyle)}" points="50 1 94 73.5 94 28.5"/>
      <polygon style="${styleToString(polygonStyle)}" points="6 73.5 94 73.5 50 99"/>
      <polygon style="${styleToString(polygonStyle)}" points="50 1 6 28.5 6 74"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svgString)}`;
};
