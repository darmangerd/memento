import styled from "styled-components";
import React from "react";
import {Flex} from "rebass";
import {GREY_COLOR} from "../constants/style";

interface Props<T = string[][], V = string> {
    options?: T[];
    getText?: (a: T) => string;
    getValue?: (a: T) => V;
    selected?: V;
    onChange?: (value: V) => any;
}

interface OptionProps {
    selected?: boolean;
}

const Wrapper = styled(Flex)({
    background: GREY_COLOR,
    borderRadius: 13
});

const Option = styled(Flex)((props: OptionProps) => ({
    background: props.selected ? "white" : "transparent",
    borderRadius: 10,
    boxShadow: props.selected ? "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" : "",
    fontWeight: props.selected ? "bold" : "normal"
}));

function MSwitch<T = string[][], V = string>(props: Props<T, V>) {
    const handleClick = (option: T) => {
        if (props.getValue) {
            props.onChange?.(props.getValue(option));
        }
    };

    return (
        <Wrapper py={1}>
            {
                props.options?.map((option, index) => (
                    <button key={index}>
                        <Option onClick={() => handleClick(option)}
                                selected={props.getValue?.(option) === props.selected} px={3}>
                            {props.getText?.(option)}
                        </Option>
                    </button>
                ))
            }
        </Wrapper>
    );
}

export default MSwitch;
