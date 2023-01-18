async function getAllData() {
  let response = await getData();
  let data = await response;

  return data;
}

function getUrlParams(needle) {
  let params = new URLSearchParams(window.location.search);
  return params.get(needle);
}

function spinner(state) {
  let spinner = document.querySelector(".spinner");
  var path = window.location.pathname;
  let main;

  if (path.includes("/menu.html")) {
    main = document.getElementById("list");
  } else {
    main = document.querySelector(".content");
  }
  if (state) {
    main.style.visibility = "hidden";
    spinner.style.display = "flex";
  } else {
    main.style.visibility = "";
    spinner.style.display = "none";
  }
}

function search() {
  let name, value;
  let input = document.getElementById("searchBar").value.toUpperCase();
  let list = document.getElementById("list").querySelectorAll("li");
  list.forEach((element) => {
    name = element.querySelector("h2");
    value = name.innerHTML;
    if (value.toUpperCase().indexOf(input) > -1) {
      element.style.display = "";
    } else {
      element.style.display = "none";
    }
  });
}
