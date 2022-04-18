import styled from "styled-components";
import {PRIMARY_COLOR, RED_COLOR} from "../constants/style";

interface Props {
    error?: boolean;
}

const MInputText = styled.input((props: Props) => ({
    background: "rgb(226, 226, 226)",
    color: "black",
    border: "4px solid transparent",
    borderRadius: "15px",
    padding: "10px 20px",
    outline: "none",
    width: "100%",
    borderColor: props.error ? RED_COLOR : "transparent",

    ":focus": {
        borderColor: props.error ? RED_COLOR : PRIMARY_COLOR
    }
}));



export default MInputText;
