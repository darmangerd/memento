import styled from "styled-components";

const MButton = styled.button({
    background: "rgb(4, 92, 255)",
    cursor: "pointer",
    color: "white",
    boxShadow: "1px 11px 20px -5px rgba(4, 92, 255, 0.25)",
    border: "none",
    borderRadius: "15px",
    padding: "10px 20px",
    fontWeight: "800",
    fontSize: "1.1rem",
    transition: "all 0.2s",

    ":hover": {
      boxShadow: "-1px 11px 35px -5px rgba(4, 92, 255, 0.4)"
    },

    ":active": {
      boxShadow: "-1px 11px 15px -5px rgba(4, 92, 255, 0.5)"
    }
});

export default MButton;
