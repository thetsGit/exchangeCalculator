const rateBoardContent = document.querySelector("#rateBoardContent");
const optionsBoxes = document.querySelectorAll(".ddOptionsWrap");
const ddOptionsWraps = document.querySelectorAll(".ddOptionsWrap");
const swapBtn = document.querySelector("#swapBtn");
const saveBtn = document.querySelector("#saveBtn");
const fromBoxData = document.querySelector("#fromBoxData");
const toBoxData = document.querySelector("#toBoxData");
const input = document.querySelector("#input");
const loadingGif = document.querySelector("#loadingGif");
const resultAmount = document.querySelector("#resultAmount");
const resultUnit = document.querySelector("#resultUnit");
const tableBody = document.querySelector("#tableBody");
const noDataState = document.querySelector("#noDataState");
const savedDataDeleteBtn = document.querySelector("#savedDataDeleteBtn");

setTimeout(() => {
  ddOptionsWraps.forEach((ddOptionsWrap) => {
    let ddOptionWraps = ddOptionsWrap.querySelectorAll(".ddOptionWrap");
    ddOptionWraps.forEach((el) =>
      el.addEventListener("click", (event) => {
        event.target.classList.add("ddSelectedOption");
        ddOptionWraps.forEach((el) =>
          el == event.target ? 0 : el.classList.remove("ddSelectedOption")
        );
        let ddBtn = event.target.parentNode.parentNode.previousElementSibling;
        ddBtn.click();
        ddBtn.firstElementChild.innerText = event.target.dataset.contract;
        input.click();
      })
    );
  });
  ddOptionsWraps.forEach((ddOptionsWrap) => {
    ddOptionsWrap.firstElementChild.click();
    ddOptionsWrap.parentElement.previousElementSibling.click();
  });
}, 100);

var timer;
input.addEventListener("input", () => {
  input.click();
});

input.addEventListener("click", () => {
  loadingGif.style.display = "block";
  clearInterval(timer);
  timer = setTimeout(() => {
    loadingGif.style.display = "none";
    fromUnit = fromBoxData.textContent;
    toUnit = toBoxData.textContent;
    let fromRate = String(datas[fromUnit])
      .split("")
      .filter((el) => el !== ",")
      .join("");
    let toRate = String(datas[toUnit])
      .split("")
      .filter((el) => el !== ",")
      .join("");
    console.log(fromRate, toRate);
    amount = (Number(input.value) * Number(fromRate)) / Number(toRate);
    amount = Number(amount).toFixed(2);
    integer = String(amount).split(".")[0];
    var processedAmount = "";
    for (let i = 1; i <= integer.length; i++) {
      if (i == integer.length) {
        processedAmount += integer[integer.length - i];
      } else {
        i % 3 == 0
          ? (processedAmount += integer[integer.length - i] + ",")
          : (processedAmount += integer[integer.length - i]);
      }
    }
    processedAmount =
      processedAmount.split("").reverse().join("") +
      "." +
      String(amount).split(".")[1];
    resultAmount.textContent = processedAmount;
    resultUnit.textContent = toUnit;
  }, 1000);
});

savedDataDeleteBtn.addEventListener("click", () => {
  storage.clear();
  tableBody.innerHTML =
    '<tr class="tableRow"><td colspan="4" id="noDataState">No data presented</td></tr>';
});

swapBtn.addEventListener("click", () => {
  let fromCurrency = fromBoxData.textContent;
  let toCurrency = toBoxData.textContent;
  document.querySelector(`#${fromCurrency}1`).click();
  document.querySelector(`#${toCurrency}`).click();
  ddOptionsWraps.forEach((ddOptionsWrap) => {
    ddOptionsWrap.parentElement.previousElementSibling.click();
  });
});
var tableIndex;
const storage = window.localStorage;
tableIndex = storage.length + 1;
saveBtn.addEventListener("click", () => {
  document.querySelector("#noDataState").style.display = "none";
  let dateNow = new Date();
  const date = [dateNow.getMonth(), dateNow.getDate(), dateNow.getFullYear()];
  const time = [dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds()];
  const addedDate = date.join("/") + " " + time.join(":");
  const from = input.value + " " + fromBoxData.textContent;
  const to = toBoxData.textContent;
  const result = resultAmount.textContent;
  storage.setItem(tableIndex, [
    addedDate + "|" + from + "|" + to + "|" + result,
  ]);
  tableBody.innerHTML += `<tr class="tableRow"><td>${addedDate}</td><td>${from}</td><td>${to}</td><td>${result}</td></tr>`;
  tableIndex++;
});

function ddBtnClick(e) {
  state = e.target.dataset.state;
  e.target.nextElementSibling.classList.toggle("openDropdown");
  e.target.dataset.state = e.target.dataset.state == "close" ? "open" : "close";
  e.target.children[1].classList.toggle("close");
  e.target.children[2].classList.toggle("close");
}

for (let data in datas) {
  const div = document.createElement("div");
  const div2 = document.createElement("div");
  const div3 = document.createElement("div");
  let currencyName = data;
  let mmkAmount = datas[data];
  div.classList.add("rateBoardContent--row");
  div2.classList.add("ddOptionWrap");
  div2.id = `${currencyName}`;
  div3.classList.add("ddOptionWrap");
  div3.id = `${currencyName}1`;
  div2.innerHTML = `<span>${currencyNames[data]}</span>`;
  div3.innerHTML = `<span>${currencyNames[data]}</span>`;
  div2.setAttribute("data-contract", data);
  div3.setAttribute("data-contract", data);
  div.innerHTML = `<span><span class="minor">1</span><span class="bold">  ${currencyName}</span></span><span><span class="bold">${mmkAmount}</span><span class="minor">  kyats</span></span>`;
  rateBoardContent.appendChild(div);
  optionsBoxes[0].appendChild(div2);
  optionsBoxes[1].appendChild(div3);
}
function displaySavedData() {
  if (storage.length > 0) {
    noDataState.style.display = "none";
  }
  Object.keys(storage).forEach((key) => {
    [addedDate, from, to, result] = storage[key].split("|");
    tableBody.innerHTML += `<tr class="tableRow"><td>${addedDate}</td><td>${from}</td><td>${to}</td><td>${result}</td></tr>`;
  });
}
displaySavedData();
