import styled from "styled-components";
import React from "react";
import {PRIMARY_COLOR, RED_COLOR} from "../constants/style";
import {Flex} from "rebass";

interface Props<Type = any> {
    id: string;
    options: Type[],
    text: (item: Type) => string;
    onChange?: (value: Type) => any;
    error?: boolean;
}

interface SelectProps {
    error?: boolean;
}

const Select = styled.select((props: SelectProps) => ({
    "-webkit-appearance": "none",
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


const Option = styled.option({
});

function MDropdown<Type>(props: Props<Type>) {
    return (
        <Select
            error={props.error}
            onChange={({ target: {value} }) => props.onChange?.(JSON.parse(value)) }
            id={props.id}
        >
            {
                props.options.map((option, index) => (
                    <Option key={index} value={JSON.stringify(option)}>{props.text?.(option)}</Option>
                ))
            }
        </Select>
    );
}

export default MDropdown;
