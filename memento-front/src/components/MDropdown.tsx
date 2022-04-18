import styled from "styled-components";
import React from "react";
import {PRIMARY_COLOR} from "../constants/style";
import {Flex} from "rebass";

interface Props<Type = any> {
    id: string;
    options: Type[],
    text: (item: Type) => string;
    onChange?: (value: Type) => any;
}

const Select = styled.select({
    "-webkit-appearance": "none",
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


const Option = styled.option({

});

function MDropdown<Type>(props: Props<Type>) {
    return (
        <Select onChange={({ target: {value} }) => props.onChange?.(JSON.parse(value)) } id={props.id}>
            {
                props.options.map((option, index) => (
                    <Option key={index} value={JSON.stringify(option)}>{props.text?.(option)}</Option>
                ))
            }
        </Select>
    );
}

export default MDropdown;
