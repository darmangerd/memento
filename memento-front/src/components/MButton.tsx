import styled from "styled-components";
import {PRIMARY_COLOR} from "../constants/style";

interface Props {
    width?: string | number;
    background?: string;
}

const MButton = styled.button((props: Props) => {
    if (!props.background) {
        props.background = PRIMARY_COLOR;
    }

    const propsWithoutRGB = props.background.replace("rgb(", "").replace(")", "");

    return {
        background: props.background,
        cursor: "pointer",
        color: "white",
        boxShadow: `1px 11px 20px -5px rgba(${propsWithoutRGB}, 0.25)`,
        border: "none",
        borderRadius: "15px",
        padding: "10px 20px",
        fontWeight: "800",
        fontSize: "1.1rem",
        transition: "all 0.2s",
        width: props.width,

        ":disabled": {
            cursor: "default",
            opacity: 0.5,
            boxShadow: "none"
        },

        ":disabled:hover": {
            boxShadow: "none"
        },

        ":disabled:active": {
            boxShadow: "none"
        },

        ":hover": {
            boxShadow: `-1px 11px 35px -5px rgba(${propsWithoutRGB}, 0.4)`
        },

        ":active": {
            boxShadow: `-1px 11px 15px -5px rgba(${propsWithoutRGB}, 0.5)`
        }
    };
});

export default MButton;
