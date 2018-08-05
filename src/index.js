let tableBody;
let form;

document.addEventListener('DOMContentLoaded', (event) => {
  tableBody = document.getElementById("table-body");
  form = document.getElementById("dog-form");

  getDogs();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const newDog = {
      name: event.target.name.value,
      breed: event.target.breed.value,
      sex: event.target.sex.value
    };

    event.target.name.value = "";
    event.target.breed.value = "";
    event.target.sex.value = "";

    postDog(newDog);
  });
});


function getDogs() {
  fetch("http://localhost:3000/dogs")
  .then(response => response.json())
  .then(data => showDogs(data));
}

function showDogs(data) {
  let rows = "<tr>";

  data.forEach(dataObj => {
    rows += `<tr id="row-${dataObj.id}"><td>${dataObj.name}</td> <td>${dataObj.breed}</td> <td>${dataObj.sex}</td> <td><button id="button-${dataObj.id}" onClick=handleClick(this)>Edit</button></td></tr>`
  });

  rows += "</tr>";
  tableBody.innerHTML += rows;
}

function postDog(data) {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  fetch("http://localhost:3000/dogs", config)
  .then(response => response.json())
  .then(data => showDogs([data]));
}

function handleClick(ele) {
  const row = document.getElementById("row-" + Number(ele.id.split("-")[1]));
  const columns = [...row.children];

  form.name.value = columns[0].innerText;
  form.breed.value = columns[1].innerText;
  form.sex.value = columns[2].innerText;

}
