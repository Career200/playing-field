import { polygonStyle } from "./diceStyle";
import { styleToString } from "./styleToString";
import { DiceImg } from "./types";

export const d20Img = (): DiceImg => {
  const fontSize = 20;

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

  return [
    `data:image/svg+xml;base64,${btoa(svgString)}`,
    "polygon(50% 0%, 94% 28%, 94% 74%, 50% 100%, 6% 74%, 6% 28%)",
    0,
    fontSize
  ];
};
