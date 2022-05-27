import styled from "styled-components";
import {Link} from "react-router-dom";
import {PRIMARY_COLOR} from "../constants/style";

export const MLink = styled(Link)({
    color: PRIMARY_COLOR,
    textDecoration: "underline",
    fontSize: "1rem"
});
