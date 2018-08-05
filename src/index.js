document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById("table-body");

  function getDogs() {
    fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(data => showDogs(data));
  }

  function showDogs(data) {
    let rows = "<tr>";

    data.forEach(dataObj => {
      rows += `<tr><td>${dataObj.name}</td> <td>${dataObj.breed}</td> <td>${dataObj.sex}</td> <td><button>Edit</button></td></tr>`
    });

    rows += "</tr>";
    tableBody.innerHTML = rows;
  }




  getDogs();
});
