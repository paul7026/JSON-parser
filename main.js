// let promise = fetch("/signup.json")
//   .then((response) => {
//     return response.json();
//   })
//   .then((obj) => {
//     console.log(obj);
//   });

class Form {
  constructor(container = ".wrapper") {
    this.container = container;
    this.name = "";
    this.fields = [];
    this.references = [];
    this.buttons = [];
    this.obj = {};
    this._fetchjson();
  }
  _fetchjson() {
    // async function getResponse() {
    //   let response = await fetch("/signup.json");
    //   let content = await response.json();
    //   // console.log(content);
    // }

    fetch("/signup.json")
      .then((response) => {
        return response.json();
      })
      .then((obj) => {
        console.log(obj);
        return obj;
      });
  }
  render(obj) {
    const list = document.querySelector(this.container);
    console.log(obj);
    console.log("render");
  }
}

// const fields = content.fields.forEach((field) => {
//   console.log(field);
// });

// list.innerHTML += `<h1>${content.name}</h1>
//                     <div class="main-agileinfo">
//                       <div class="agileits-top">
//                         <form action="#" method="post">
//                           <input class="text" type="text" name="Username" placeholder="Username" required="">
//                           <input class="text email" type="email" name="email" placeholder="Email" required="">
//                           <input class="text" type="password" name="password" placeholder="Password" required="">
//                           <input class="text w3lpass" type="password" name="password" placeholder="Confirm Password" required="">
//                           <div class="wthree-text">
//                             <label class="anim">
//                               <input type="checkbox" class="checkbox" required="">
//                               <span>I Agree To The Terms & Conditions</span>
//                             </label>
//                             <div class="clear"> </div>
//                           </div>
//                           <input type="submit" value="SIGNUP">
//                         </form>
//                         <p>Don't have an Account? <a href="#"> Login Now!</a></p>
//                       </div>
//                     </div>
//                     <!-- copyright -->
//                     <div class="colorlibcopy-agile">
//                       <p>© 2018 Colorlib Signup Form. All rights reserved | Design by <a href="https://colorlib.com/" target="_blank">Colorlib</a></p>
//                     </div>
//                     <!-- //copyright -->
//                     <ul class="colorlib-bubbles">
//                       <li></li>
//                       <li></li>
//                       <li></li>
//                       <li></li>
//                       <li></li>
//                       <li></li>
//                       <li></li>
//                       <li></li>
//                       <li></li>
//                       <li></li>
//                     </ul>`;

const someform = new Form();
someform.render();
