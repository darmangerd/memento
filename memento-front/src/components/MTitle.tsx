import styled from "styled-components";

interface MTitleProps {
    mb?: number;
    mobileFontSize?: string;
}

const MTitle = styled.h1((props: MTitleProps) => ({
    fontWeight: "bold",
    fontSize: "2rem",
    margin: 0,
    padding: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginBottom: props.mb !== undefined ? props.mb : 20,

    "@media (max-width: 768px)": {
        fontSize: props.mobileFontSize || "1.7rem",
    }
}));

export default MTitle;
