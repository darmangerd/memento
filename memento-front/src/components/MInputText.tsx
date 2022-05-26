import styled from "styled-components";
import {GREEN_COLOR, RED_COLOR} from "../constants/style";

interface Props {
    background?: string;
    error?: boolean;
    success?: boolean;
}

const MInputText = styled.input((props: Props) => {
    let borderColor = "transparent";

    if (props.error) {
        borderColor = RED_COLOR;
    } else if (props.success) {
        borderColor = GREEN_COLOR;
    }

    return {
        background: props.background || "rgb(226, 226, 226)",
        color: "black",
        border: "4px solid transparent",
        borderRadius: "15px",
        padding: "10px 20px",
        outline: "none",
        width: "100%",
        borderColor,

        ":focus": {
            borderColor
        }
    };
});



export default MInputText;
