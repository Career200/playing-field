import { polygonStyle } from "./diceStyle";
import { styleToString } from "./styleToString";
import { DiceImg } from "./types";

export const d6Img = (): DiceImg => {
  const centerPoint = 80;
  const fontSize = 24;

  const svgString = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon style="${styleToString(polygonStyle)}" points="6 ${centerPoint/2} 50 1 94 ${centerPoint/2} 50 ${centerPoint}"/>
      <polygon style="${styleToString(polygonStyle)}" points="6 ${centerPoint/2} 6 ${100-centerPoint/2} 50 99 50 ${centerPoint}"/>
      <polygon style="${styleToString(polygonStyle)}" points="50 ${centerPoint} 94 ${centerPoint/2} 94 ${100-centerPoint/2} 50 99"/>
    </svg>
  `;

  return [
    `data:image/svg+xml;base64,${btoa(svgString)}`, 
    `polygon(50% 0%, 94% ${centerPoint/2}%, 94% ${100-centerPoint/2}%, 50% 100%, 6% ${100-centerPoint/2}%, 6% ${centerPoint/2}%)`,
    -100 + centerPoint,
    fontSize
  ];
};
