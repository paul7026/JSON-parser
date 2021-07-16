async function getResponse() {
  let response = await fetch("/signup.json");
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
    form.append(label);
    form.append(input);
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
}

getResponse();
