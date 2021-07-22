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
let inputBloks = document.createElement("div");
inputBloks.classList = "input__blocks";
let refBox = document.createElement("div");
refBox.classList = "form__ref-box";
let buttonBox = document.createElement("div");
buttonBox.classList = "button__box";

chosenButtons.forEach((el) => {
  el.addEventListener("click", function (e) {
    form.innerHTML = "";
    inputBloks.innerHTML = "";
    refBox.innerHTML = "";
    buttonBox.innerHTML = "";
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
      let name = document.createElement("h1");
      name.textContent = obj.name;
      name.classList = "main__title";
      main.prepend(name);
      form.appendChild(inputBloks);
      form.appendChild(refBox);
      form.appendChild(buttonBox);
      const { fields, references, buttons } = obj;
      if (fields) {
        fields.forEach((field, id) => {
          addInput(field, id);
        });
      }
      if (references) {
        references.forEach((ref) => {
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
        refBox.innerHTML = "";
        buttonBox.innerHTML = "";
        inputBloks.innerHTML = "";
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
  let label = document.createElement("label");
  label.classList = "form__lable";
  let input = document.createElement("input");
  label.textContent = field.label;
  label.htmlFor = id;
  input.className = "text";
  input.type = field.input.type;
  input.required = field.input.required;
  input.id = id;
  field.input.placeholder
    ? (input.placeholder = field.input.placeholder)
    : input.removeAttribute("placeholder");

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

  inputBloks.append(label);
  inputBloks.append(input);

  if (field.input.mask) {
    input.type = "text";
    var maskOptions = {
      mask: field.input.mask,
    };
    var mask = IMask(input, maskOptions);
  }

  if (input.type === "checkbox") {
    label.classList = "label-check";
    label.prepend(input);
  }

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
  if (input.type === "file") {
    input.classList = "input__file";
    label.classList = "form__lable, form__label_file";
    if (field.input.filetype) {
      field.input.filetype.forEach((file) => {
        input.accept += `.${file}, `;
      });
      input.accept = input.accept.replace(/,(\s+)?$/, "");
    }
  }
}

function addButton(button) {
  let buttons = document.createElement("button");
  buttons.className = "button";
  buttons.textContent = button.text;
  buttonBox.append(buttons);
  preventDef();
}

function addRef(ref) {
  let references = document.createElement("div");
  references.classList = "form__ref";

  if (ref.text) {
    if (ref["text without ref"]) {
      let text = document.createElement("p");
      text.classList = "form__title-ref";
      text.textContent = ref["text without ref"];
      refBox.append(text);
    }

    let link = document.createElement("a");
    link.textContent = ref.text;
    link.href = ref.ref;
    link.classList = "link";
    link.id = ref.ref;

    refBox.append(link);
  }
  if (ref.input) {
    const inputRef = document.createElement("input");
    inputRef.type = ref.input.type;
    inputRef.required = ref.input.required;
    inputRef.checked = +ref.input.checked;
    refBox.append(inputRef);
  }
  chooseLink(ref);
}
