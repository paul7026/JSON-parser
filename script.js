async function getResponse() {
  const chosenButtons = document.querySelectorAll(".footer__button");
  chosenButtons.forEach((el) => {
    el.addEventListener("click", changeUrl);
    console.log(el);
  });
  // const inrerviewButton = document.querySelector("#interview");
  // const colorButton = document.querySelector("#color");
  // const addPostButton = document.querySelector("#add-post");
  // const signInButton = document.querySelector("#sign-in");
  // const signUPButton = document.querySelector("#sign-up");
  // inrerviewButton.addEventListener("click", changeJson);

  let response = await fetch(changeUrl());
  let obj = await response.json();
  const form = document.querySelector("#form");
  const refBlock = document.querySelector("#references");
  const buttonsBlock = document.querySelector("#buttons");
  const main = document.querySelector("#mains");
  console.log("Object", obj);
  const name = document.createElement("h1");
  name.textContent = obj.name;
  main.prepend(name);

  const { fields, references = "null", buttons = "null" } = obj;

  fields.forEach((field) => {
    addInput(field);
  });
  references.forEach((ref) => {
    addRef(ref);
  });
  buttons.forEach((button) => {
    addButton(button);
  });
  console.log(fields);
  console.log(references);
  console.log(buttons);

  function addInput(field) {
    const label = document.createElement("lebel");
    const input = document.createElement("input");
    label.textContent = field.label;
    //input prop start
    input.className = "text";
    input.type = field.input.type;
    input.required = field.input.required;
    if (field.input.placeholder === undefined) {
      input.placeholder = "";
    } else {
      input.placeholder = field.input.placeholder;
    }
    //input prop end
    form.prepend(label);
    form.prepend(input);
  }

  function addRef(ref) {
    const references = document.createElement("div");
    const text = document.createElement("p");
    const link = document.createElement("a");
    const inputRef = document.createElement("input");
    text.textContent = ref["text without ref"];
    link.textContent = ref.text;
    link.href = ref.ref;
    // inputRef.type = ref.input.type;
    refBlock.append(references);

    if (ref.input !== undefined) {
      references.append(inputRef);
    }
    references.append(text);
    references.append(link);
  }

  function addButton(button) {
    const buttons = document.createElement("button");
    buttons.className = "button";
    buttons.textContent = button.text;
    buttonsBlock.append(buttons);
  }

  function changeUrl(event) {
    let url = "signup.json";
    // url = event.currentTarget.value;
    // console.log(event.currentTarget.value);
    return url;
  }
}

getResponse();
