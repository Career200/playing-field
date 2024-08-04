import { polygonStyle } from "./diceStyle";
import { styleToString } from "./styleToString";
import { DiceImg } from "./types";

export const d4Img = (): DiceImg => {
  const centerPoint = 25;
  const fontSize = 24;
  
  const svgString = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon style="${styleToString(polygonStyle)}" points="1 90 50 5 50 ${centerPoint}"/>
      <polygon style="${styleToString(polygonStyle)}" points="1 90 50 ${centerPoint} 99 90"/>
      <polygon style="${styleToString(polygonStyle)}" points="50 5 99 90 50 ${centerPoint}"/>
    </svg>
  `;

  return [
    `data:image/svg+xml;base64,${btoa(svgString)}`, 
    "polygon(0% 90%, 50% 10%, 100% 90%)",
    centerPoint, 
    fontSize
  ];
};
