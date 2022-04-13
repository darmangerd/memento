import styled from "styled-components";
import React from "react";

interface Props {
    options: string[]
}

const Select = styled.select({

});


const Option = styled.select({

});

function MDropdown(props: Props) {
    return (
        <Select>
            <Option></Option>
        </Select>
    );
}

export default MDropdown;
