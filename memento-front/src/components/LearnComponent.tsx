import React, { ChangeEvent, useState } from "react";

interface Props {
  //? -> nullable (rend l'attribut optionnel)
  text?: string;
}

//useState -> on l'utilise dès qu'on veut mettre à jour un component sur la page lorsque que la valeur d'une variable change
function LearnComponent(props: Props) {
  // text -> get the text
  // setText -> set the value of the text
  // || -> valeur par défaut (si le premier false, envoie le deuxième)
  const [text, setText] = useState(props.text || "Hello");

  function changeHandler(event:  ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  return (
    <div>
      {text}
      <input value={text} type="text" onChange={changeHandler}></input>
    </div>
  );
}

export default LearnComponent;
