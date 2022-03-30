import React from "react";
import { Box, Flex } from "rebass";
import { GREY_COLOR } from "../constants/style";

interface Props {
  children: React.ReactNode;
}

function MWordListItem(props: Props) {
  return (
      <Flex
        width={1}
        flexWrap="wrap"
      >
        {props.children}
      </Flex>
  );
}

export default MWordListItem;
