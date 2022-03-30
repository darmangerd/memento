import React from "react";
import { Box, Flex } from "rebass";
import MButton from "./components/MButton";
import MInputText from "./components/MInputText";
import MTitle from "./components/MTitle";
import MWordList from "./components/MWordList";
import MWordListItem from "./components/MWordListItem";

function App() {
  const listItems = [
    <MWordListItem title="English BEC 1" author="owen" status="green" />,
    <MWordListItem title="English BEC 1" author="owen" status="green" />,
    <MWordListItem title="English BEC 1" author="owen" status="green" />,
    <MWordListItem title="English BEC 1" author="owen" status="green" />,
    <MWordListItem title="English BEC 1" author="owen" status="green" />,
    <MWordListItem title="English BEC 1" author="owen" status="green" />,
    <MWordListItem title="English BEC 1" author="owen" status="green" />,
    <MWordListItem title="English BEC 1" author="owen" status="green" />,
    <MWordListItem title="English BEC 1" author="owen" status="green" />,
    <MWordListItem title="English BEC 1" author="owen" status="green" />,
    <MWordListItem title="English BEC 1" author="owen" status="green" />,
    <MWordListItem title="English BEC 1" author="owen" status="green" />,
    <MWordListItem title="English BEC 1" author="owen" status="green" />,
    <MWordListItem title="English BEC 1" author="owen" status="green" />,
  ];

  return (
    <Flex
      flexDirection="column"
      p={30}
    >
      <MTitle>Vos Listes</MTitle>
      <MWordList>
        {listItems}
      </MWordList>
    </Flex>
  );
}

export default App;
