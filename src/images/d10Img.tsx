import { polygonStyle } from "./diceStyle";
import { styleToString } from "./styleToString";
import { DiceImg } from "./types";

export const d10Img = (): DiceImg => {
  const fontSize = 20;
  const centerPoint = 90;

  const centerPoint0 = centerPoint*0.75;
  const sidePoint1 = centerPoint/2;
  const sidePoint2 = 100-centerPoint*0.4;
  const centerPoint2 = centerPoint*0.6;

  const svgString = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon style="${styleToString(polygonStyle)}" points="6 ${sidePoint1} 10 ${sidePoint2} 27 ${centerPoint2} 50 1"/>
      <polygon style="${styleToString(polygonStyle)}" points="50 1 73 ${centerPoint2} 90 ${sidePoint2} 94 ${sidePoint1}"/>
      <polygon style="${styleToString(polygonStyle)}" points="50 1 27 ${centerPoint2} 50 ${centerPoint0} 73 ${centerPoint2}"/>
      <polygon style="${styleToString(polygonStyle)}" points="50 99 10 ${sidePoint2} 27 ${centerPoint2} 50 ${centerPoint0}"/>
      <polygon style="${styleToString(polygonStyle)}" points="50 99 90 ${sidePoint2} 73 ${centerPoint2} 50 ${centerPoint0}"/>
    </svg>
  `;

  return [
    `data:image/svg+xml;base64,${btoa(svgString)}`,
    `polygon(50% 0%, 94% ${sidePoint1}%, 90% ${sidePoint2}%, 50% 100%, 10% ${sidePoint2}%, 6% ${sidePoint1}%)`,
    -centerPoint/5,
    fontSize
  ];
};
