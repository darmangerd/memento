import React from "react";
import MButton from "./components/MButton";
import MInputText from "./components/MInputText";
import MWordListItem from "./components/MWordListItem";

function App() {
  return (
    <div>
      <MButton>Text</MButton>
      <MInputText placeholder="salut" />
      <MWordListItem title="English BEC 1" author="owen" status="green" />
    </div>
  );
}

export default App;
