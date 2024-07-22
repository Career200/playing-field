import { RotatingDiv, RotatingDivBackground, RotatingImg } from "./animations"

type Props = {
    rotating: boolean,
    onClick?: () => void,
    imgSrc: any, 
    diceStyle: React.CSSProperties
}

const componentStyle: React.CSSProperties = { 
    background: "linear-gradient(145deg, #eee, #333)",
    width: 100,
    height: 100,
}

export const RollingDice = (( { rotating, onClick, imgSrc, diceStyle }: Props) => {

    return (
        <RotatingDiv isRotating={rotating} style={{...componentStyle, ...diceStyle}} onClick={onClick}>
            <RotatingDivBackground isRotating={rotating} style={componentStyle}>
                     <RotatingImg
                        src={imgSrc}
                        alt="My Image"
                        width={"100%"}
                        height={"100%"}
                        isRotating={rotating}
                    />
            </RotatingDivBackground>
        </RotatingDiv>);
})