import { MovingDiv, RotatingDiv, RotatingDivBackground, RotatingImg } from "./animations"

type Props = {
    rotating: boolean,
    onClick?: () => void,
    imgSrc: any, 
    diceStyle: React.CSSProperties,
    animationTime: number
}

const componentStyle: React.CSSProperties = { 
    width: 100,
    height: 100,
}

const bkComponentStyle: React.CSSProperties = { 
    background: "linear-gradient(145deg, #ded, #131)",
}

export const RollingDice = (( { rotating, animationTime, onClick, imgSrc, diceStyle }: Props) => {

    return (
        <MovingDiv animating={rotating} animationTime={animationTime} onClick={onClick}>
            <RotatingDiv animating={rotating} animationTime={animationTime} style={{...componentStyle, ...diceStyle}}>
                <RotatingDivBackground animating={rotating} animationTime={animationTime} style={{...componentStyle, ...bkComponentStyle}}>
                        <RotatingImg
                            src={imgSrc}
                            alt="Dice"
                            width={"100%"}
                            height={"100%"}
                            animating={rotating}
                            animationTime={1}
                        />
                </RotatingDivBackground>
            </RotatingDiv>
        </MovingDiv>);
})