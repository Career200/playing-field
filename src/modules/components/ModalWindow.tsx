import { Box } from "./Box";
import { Button } from "./Button";


const zIndex = {
    modal: 1000,
}

export type ModalWindowProps = React.PropsWithChildren<{
    isOpen: boolean, 
    onClose: (event: React.MouseEvent<Element, MouseEvent>) => void,
}>

export const ModalWindow = ({ isOpen, onClose, children }: ModalWindowProps) => {

    if (!isOpen) {
        return null;
    }

    return (
        <Box  
            position="fixed"
            top={0}
            left={0}
            zIndex={zIndex.modal}
            width="100vw"
            height="100vh"
            justifyContent="center"
            alignItems="center"
        >
            <Box
                position="fixed"
                top={0}
                left={0}
                width="100vw"
                height="100vh"
                background="grey"
                opacity="0.2"
            />
            <Box
                background="silver"
                opacity="1"
                border="1px solid blue"
                borderRadius={10}
                padding={12}
                gap={4}
                flexDirection="column"
                zIndex={zIndex.modal + 1}
            >
                {children}
                <Box>
                    <Button onClick={onClose}>Close</Button>
                </Box>
            </Box>
        </Box>
    );
};