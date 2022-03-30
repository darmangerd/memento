import React from "react";
import { Box, Flex } from "rebass";
import { GREY_COLOR } from "../constants/style";

interface Props {
    title: string;
    author: string;
    status: "green" | "orange" | "red";
}

function MWordListItem(props: Props) {
  function getColor() {
    switch(props.status) {
      case "green": return "green";
      case "orange": return "orange";
      case "red": return "red";
    } 
  }

  return (
    <Flex
      width={[1, 1/2, 1/2, 1/3, 1/3]}
      px={30}
      py={15}
    >
      <Flex
        css={{borderRadius: "15px"}}
        backgroundColor={GREY_COLOR}
        justifyContent="space-between"
        px={30}
        py={15}
        width={1}
      >
          <Flex
            flexDirection="column"
          >
              <Box fontWeight={800}>{props.title}</Box>
              <Box fontWeight={500} opacity={0.5}>{props.author}</Box>
          </Flex>
          <Flex
            alignItems="center"
          >
              <Box
                css={{borderRadius: "15px"}}
                width={30}
                height={30}
                backgroundColor={getColor()}
              />
          </Flex>
      </Flex>
    </Flex>
  );
}

export default MWordListItem;
