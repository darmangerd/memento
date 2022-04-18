import styled from "styled-components";
import {GREY_COLOR} from "../constants/style";

interface Props {
    color?: string;
}

const MDescription = styled.div((props: Props) => ({
    fontWeight: "bold",
    fontSize: "1rem",
    color: props.color || GREY_COLOR,
    margin: 0,
    padding: 0,
}));

export default MDescription;
