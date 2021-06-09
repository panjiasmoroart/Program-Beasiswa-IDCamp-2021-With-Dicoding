const CACHE_KEY = "foods_history";

const foods = {
  category: null,
};

function processChoiceFoods(category) {
  foods.category = category;
  // alert(foods.category);
  if (checkForStorage()) {
    let historyData = null;
    if (localStorage.getItem(CACHE_KEY) === null) {
      historyData = [];
    } else {
      historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
    }

    // kemduian masukan kedalam index pertama array
    historyData.unshift(foods.category);

    if (historyData.length > 4) {
      // alert("Anda tidak bisa menambahkan lagi");
      // return;
      historyData.pop();
    }

    // simpan ke localStorage
    localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));

    // biar pada saat di add/beli data langsung tampil
    renderHistory();
    window.location.reload();
  }
}

function showHistory() {
  if (checkForStorage()) {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
  } else {
    return [];
  }
}

function renderHistory() {
  const historyData = showHistory();
  // console.log(historyData);
  let historyList = document.querySelector("#historyList");
  // biara tidak ada doubel elemen
  historyList.innerHTML = "";

  let li = document.createElement("li");

  if (historyData.length < 1) {
    // console.log("Makanan Belum Dipesan");
    li.innerHTML = '<a href="">' + "Makanan Belum Dipesan" + "</a>";
    historyList.appendChild(li);
  } else {
    for (let history of historyData) {
      let li = document.createElement("li");
      li.innerHTML = '<a href="#">' + history + "</a>";
      // tampilkan ke browser
      historyList.appendChild(li);
    }
  }
}

function checkForStorage() {
  return typeof Storage !== "undefined";
}

// get value of HTML element in javascript
const friedRiceValue = document.getElementById("friedRice").innerHTML;
const tamarindValue = document.getElementById("tamarindVegetable").innerHTML;
const potatoSauceValue = document.getElementById("potatoSauce").innerHTML;

const buttons = document.querySelectorAll(".add");

for (let button of buttons) {
  button.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("friedRice")) {
      processChoiceFoods(friedRiceValue);
    }

    if (target.classList.contains("tamarindVegetable")) {
      processChoiceFoods(tamarindValue);
    }

    if (target.classList.contains("potatoSauce")) {
      processChoiceFoods(potatoSauceValue);
    }
  });
}

renderHistory();
