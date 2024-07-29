import { Button } from "../../components/Button";
import { channelButtonStyle } from "./styles";

type Props = { 
    text: string, 
    active: boolean, 
    onClick: (event?: React.MouseEvent) => void 
};

export const ChannelButton = ({ text, active, onClick }: Props ) => {

    return (
        <Button
            {...channelButtonStyle}
            mode="switch"
            activeBg="lightslategray"
            activeHoverBg="steel"
            active={active}
            onClick={onClick}
        >
            {text}
        </Button>
    )
}