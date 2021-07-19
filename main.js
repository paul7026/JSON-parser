class DbApi {
  constructor() {}

  async getDbData(url) {
    const dataResponse = await fetch(url);
    const dataJson = await dataResponse.json();
    return dataJson;
  }
}

const main = document.querySelector("#mains");
const form = document.querySelector("#form");
const chosenButtons = document.querySelectorAll(".footer__button");

chosenButtons.forEach((el) => {
  el.addEventListener("click", function (e) {
    form.innerHTML = "";
    main.removeChild(main.firstChild);
    let target = e.target;
    let url = target.dataset.url;
    if (url) {
      fetchUrl(url);
    }
  });
});

const dbApi = new DbApi();

function fetchUrl(url) {
  dbApi
    .getDbData(url)
    .then((obj) => {
      console.log(obj);
      //

      console.log("Object", obj);
      const name = document.createElement("h1");
      name.textContent = obj.name;
      name.classList = "main__title";
      main.prepend(name);
      const refBox = document.createElement("div");
      refBox.classList = "form__ref-box";

      const { fields, references, buttons } = obj;
      if (fields !== undefined) {
        fields.forEach((field) => {
          addInput(field);
        });
      }
      if (references !== undefined) {
        references.forEach((ref) => {
          form.append(refBox);
          addRef(ref);
        });
      }
      if (buttons !== undefined) {
        buttons.forEach((button) => {
          addButton(button);
        });
      }

      console.log(fields);
      console.log(references);
      console.log(buttons);

      function addInput(field) {
        const label = document.createElement("lebel");
        label.classList = "form__lable";
        const input = document.createElement("input");
        label.textContent = field.label;
        //input prop start
        input.className = "text";
        input.type = field.input.type;
        input.required = field.input.required;
        if (
          field.input.placeholder === undefined
            ? (input.placeholder = "")
            : (input.placeholder = field.input.placeholder)
        );
        form.append(label);
        form.append(input);
      }

      function addRef(ref) {
        const refBlock = document.createElement("div");
        refBlock.classList = "form__ref-block";
        refBox.append(refBlock);
        const references = document.createElement("div");
        references.classList = "form__ref";

        if (ref.text !== undefined) {
          const text = document.createElement("p");
          text.classList = "form__title-ref";
          text.textContent = ref["text without ref"];
          const link = document.createElement("a");
          link.textContent = ref.text;
          link.href = ref.ref;
          refBlock.append(text);
          refBlock.append(link);
        }
        if (ref.input !== undefined) {
          const inputRef = document.createElement("input");
          inputRef.type = ref.input.type;
          inputRef.required = ref.input.required;
          inputRef.checked = +ref.input.checked;
          refBlock.append(inputRef);
        }
      }

      function addButton(button) {
        const buttonsBlock = document.createElement("div");
        form.append(buttonsBlock);
        const buttons = document.createElement("button");
        buttons.className = "button";
        buttons.textContent = button.text;
        buttonsBlock.append(buttons);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
