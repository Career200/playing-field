import { polygonStyle } from "./diceStyle";
import { styleToString } from "./styleToString";
import { DiceImg } from "./types";

export const d12Img = (): DiceImg => {
  const fontSize = 20;

  const svgString = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon style="${styleToString(polygonStyle)}" points="1 35 20.5 10.5 50 1 50 20 22 40"/>
      <polygon style="${styleToString(polygonStyle)}" points="50 1 50 20 78 40 99 35 79.5 10.5"/>
      <polygon style="${styleToString(polygonStyle)}" points="1 35 22 40 35 72 20.5 89.5 1 65"/>
      <polygon style="${styleToString(polygonStyle)}" points="22 40 50 20 78 40 65 72 35 72"/>
      <polygon style="${styleToString(polygonStyle)}" points="78 40 99 35 99 65 79.5 89.5 65 72"/>
      <polygon style="${styleToString(polygonStyle)}" points="20.5 89.5 35 72 65 72 79.5 89.5 50 99"/>
    </svg>
  `;

  return [
    `data:image/svg+xml;base64,${btoa(svgString)}`,
    "polygon(0% 35%, 20% 10%, 50% 0%, 80% 10%, 100% 35%, 100% 65%, 80% 90%, 50% 100%, 20% 90%, 0% 65%)",
    -5,
    fontSize
  ];
};
