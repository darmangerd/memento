import styled from "styled-components";
import { PRIMARY_COLOR } from "../constants/style";

const MInputText = styled.input({
    background: "rgb(226, 226, 226)",
    color: "black",
    border: "4px solid transparent",
    borderRadius: "15px",
    padding: "10px 20px",
    outline: "none",
    width: "100%",

    ":focus": {
      borderColor: PRIMARY_COLOR
    }
});

export default MInputText;
