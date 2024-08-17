import { polygonStyle } from "./diceStyle";
import { styleToString } from "./styleToString";
import { DiceImg } from "./types";

export const d8Img = (): DiceImg => {
  const fontSize = 24;

  const svgString = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon style="${styleToString(polygonStyle)}" points="6 74 94 73.5 50 1"/>
      <polygon style="${styleToString(polygonStyle)}" points="50 1 94 73.5 94 28.5"/>
      <polygon style="${styleToString(polygonStyle)}" points="6 73.5 94 73.5 50 99"/>
      <polygon style="${styleToString(polygonStyle)}" points="50 1 6 28.5 6 74"/>
    </svg>
  `;

  return [
    `data:image/svg+xml;base64,${btoa(svgString)}`,
    "polygon(50% 0%, 94% 28%, 94% 74%, 50% 100%, 6% 74%, 6% 28%)",
    0,
    fontSize
  ];
};
