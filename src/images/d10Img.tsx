import { polygonStyle } from "./diceStyle";
import { styleToString } from "./styleToString";

export const d10Img = (): string => {
  const svgString = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon style="${styleToString(polygonStyle)}" points="1 50 27 48 50 1"/>
      <polygon style="${styleToString(polygonStyle)}" points="50 1 73 48 99 50"/>
      <polygon style="${styleToString(polygonStyle)}" points="50 1 27 48 50 66 73 48"/>
      <polygon style="${styleToString(polygonStyle)}" points="1 50 27 48 50 66 50 99"/>
      <polygon style="${styleToString(polygonStyle)}" points="50 99 99 50 73 48 50 66"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svgString)}`;
};
