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
    let url = e.target.dataset.url;
    fetchUrl(url);
  });
});

const dbApi = new DbApi();

function fetchUrl(url) {
  dbApi
    .getDbData(url)
    .then((obj) => {
      const name = document.createElement("h1");
      name.textContent = obj.name;
      name.classList = "main__title";
      main.prepend(name);
      // let refBox = document.createElement("div");
      // refBox.classList = "form__ref-box";
      // form.append(refBox);
      const { fields, references, buttons } = obj;
      if (fields) {
        fields.forEach((field, id) => {
          addInput(field, id);
        });
      }
      if (references) {
        references.forEach((ref) => {
          // form.append(refBox);
          addRef(ref);
        });
      }
      if (buttons) {
        buttons.forEach((button) => {
          addButton(button);
        });
      }
    })
    .catch((error) => console.log(error));
}

function chooseLink(ref) {
  if (ref.ref) {
    let links = document.querySelectorAll(".link");
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        form.innerHTML = "";
        main.removeChild(main.firstChild);
        if (link.id === "signin") {
          fetchUrl("JSON/signin.json");
        }
        if (link.id === "signup") {
          fetchUrl("JSON/signup.json");
        }
      });
    });
  }
}

function preventDef() {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((el) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });
}

function addInput(field, id) {
  const label = document.createElement("label");
  label.classList = "form__lable";
  const input = document.createElement("input");
  label.textContent = field.label;
  label.htmlFor = id;
  //input prop start
  input.className = "text";
  input.type = field.input.type;
  input.required = field.input.required;
  input.id = id;
  !!!field.input.placeholder
    ? (input.placeholder = "")
    : (input.placeholder = field.input.placeholder);

  if (field.input.colors) {
    let list = "color";
    input.setAttribute("list", list);
    let datalist = document.createElement("datalist");
    datalist.id = "color";
    input.appendChild(datalist);
    field.input.colors.forEach((color) => {
      input.value = color;
      let colorOption = document.createElement("option");
      colorOption.value = color;
      datalist.appendChild(colorOption);
    });
  }

  if (field.input.multiple) {
    input.multiple = field.input.multiple;
  }

  form.append(label);
  form.append(input);

  if (field.input.mask) {
    input.type = "text";
    var maskOptions = {
      mask: field.input.mask,
    };
    var mask = IMask(input, maskOptions);
  }

  // тип файла
  // if (field.input.type === "file") {
  //   let filetype = field.input.filetype;
  //   filetype.forEach((file) => {
  //     input.accept = field.input.filetype;
  //   });
  // }

  if (field.input.type === "textarea") {
    let textarea = document.createElement("textarea");
    textarea.classList = "input__textarea";
    textarea.required = field.input.required;
    input.replaceWith(textarea);
  }
  if (field.input.type === "technology") {
    let select = document.createElement("select");
    select.classList = "input__select";
    select.multiple = field.input.multiple;
    select.required = field.input.required;
    input.replaceWith(select);
    field.input.technologies.forEach((techn) => {
      let option = document.createElement("option");
      option.value = techn;
      option.innerHTML = techn;
      select.appendChild(option);
    });
  }
}

function addButton(button) {
  const buttonsBlock = document.createElement("div");
  form.append(buttonsBlock);
  const buttons = document.createElement("button");
  buttons.className = "button";
  buttons.textContent = button.text;
  buttonsBlock.append(buttons);
  preventDef();
}

function addRef(ref) {
  const refBlock = document.createElement("div");
  refBlock.classList = "form__ref-block";
  form.append(refBlock);
  let references = document.createElement("div");
  references.classList = "form__ref";

  if (ref.text) {
    const text = document.createElement("p");
    text.classList = "form__title-ref";
    text.textContent = ref["text without ref"];
    let link = document.createElement("a");
    link.textContent = ref.text;
    link.href = ref.ref;
    link.classList = "link";
    link.id = ref.ref;
    refBlock.append(text);
    refBlock.append(link);
  }
  if (ref.input) {
    const inputRef = document.createElement("input");
    inputRef.type = ref.input.type;
    inputRef.required = ref.input.required;
    inputRef.checked = +ref.input.checked;
    refBlock.append(inputRef);
  }
  chooseLink(ref);
}
