import styled from "styled-components";

interface MTitleProps {
  mb?: number
}

const MTitle = styled.h1((props: MTitleProps) => ({
  fontWeight: "bold",
  fontSize: "2rem",
  margin: 0,
  padding: 0,
  marginBottom: props.mb !== undefined ? props.mb : 20
}));

export default MTitle;
