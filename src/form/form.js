import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
const btnCancel = document.querySelector(".btn-secondary");
let errors = [];

btnCancel.addEventListener("click", () => {
  location.assign("/index.html");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Creation cle / valeur (iterable)
  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());
  if (formIsValid(article)) {
    try {
      const json = JSON.stringify(article);
      const response = await fetch("https://restapi.fr/api/article", {
        method: "POST",
        body: json,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status < 299) {
        //une requete s'est bien déroulé lorsque status <299
        // possible aussi de faire avec location href
        location.assign("/index.html");
      }
      console.log(body);
    } catch (e) {
      console.error("e : ", e);
    }
  }
});

const formIsValid = (article) => {
  errors = [];
  if (
    !article.author ||
    !article.img ||
    !article.category ||
    !article.title ||
    !article.content
  ) {
    errors.push("Vous devez remplir tous les champs.");
  } else {
    errors = [];
  }
  if (errors.length) {
    let errorHTML = "";
    errors.forEach((e) => {
      errorHTML += `<li>${e}</li>`;
    });
    errorElement.innerHTML = errorHTML;
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
};
