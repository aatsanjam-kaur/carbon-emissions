const emissions ={
  travel:0,
  electricity:0,
  screenTime:0,
  diet:0,
  water:0

}
function firstPage() {
  let box = document.querySelector(".box");
  box.innerText = "";
  if (box) {
    let h1 = document.createElement("h1");
    h1.textContent = "How did you travel today?";
    h1.classList.add("headingOne");
    box.appendChild(h1);
  }
  let select = document.createElement("select");
  select.classList.add("dropDown");
  let options = ["walk", "bike", "car", "metro", "bus", "EV"];
  options.forEach((items) => {
    let option = document.createElement("option");
    option.textContent = items;
    select.appendChild(option);
  });
  box.appendChild(select);
  let h2 = document.createElement("h2");
  h2.textContent = "Distance(Km)";
  h2.classList.add("headingtwo");
  box.appendChild(h2);

  let input = document.createElement("input");
  input.type = "number";
  input.placeholder = "Enter Distance";
  box.appendChild(input);

  let result = document.createElement("div");
  result.classList.add("estimatedResult");
  result.textContent = "Estimated Result:";
  box.appendChild(result);
  select.addEventListener("change", emissionCalc);
  input.addEventListener("input", emissionCalc);
  function emissionCalc() {
    const mappedfactors = new Map([
      ["walk", 0],
      ["bike", 0.09],
      ["car", 0.18],
      ["metro", 0.04],
      ["bus", 0.08],
      ["EV", 0.05],
    ]);
    let selectedMeans = select.value;
    let distance = Number(input.value);

    const emissionFormula = distance * mappedfactors.get(selectedMeans);
    console.log(emissionFormula);
    result.textContent = `Estimated Result : ${emissionFormula}`;
    emissions.travel=emissionFormula;
  }
}

function secondPage() {
  let box = document.querySelector(".box");
  box.innerText = "";
  box.style.height = "700px";

  let heading = document.createElement("h1");
  heading.textContent = "Electricity Usage (Hours)";
  box.appendChild(heading);

  
  const applianceFactor = new Map([
    ["AC", 1.23],
    ["Fan", 0.06],
    ["TV", 0.08],
    ["Washing Machine", 0.41],
  ]);

  
  function createApplianceInput(name) {
    let label = document.createElement("h3");
    label.textContent = name;
    box.appendChild(label);

    let input = document.createElement("input");
    input.type = "number";
    input.min = 0;
    input.placeholder = "Hours used";
    box.appendChild(input);

    input.addEventListener("input", calculateEmission);
    return input;
  }

  
  let acInput = createApplianceInput("AC");
  let fanInput = createApplianceInput("Fan");
  let tvInput = createApplianceInput("TV");
  let wmInput = createApplianceInput("Washing Machine");

  
  let result = document.createElement("div");
  result.classList.add("estimatedResult");
  result.textContent = "Estimated Result: ";
  box.appendChild(result);

  
  function calculateEmission() {
    let total =
      (Number(acInput.value) || 0) * applianceFactor.get("AC") +
      (Number(fanInput.value) || 0) * applianceFactor.get("Fan") +
      (Number(tvInput.value) || 0) * applianceFactor.get("TV") +
      (Number(wmInput.value) || 0) * applianceFactor.get("Washing Machine");

    result.textContent = `Estimated Result: ${total.toFixed(2)} kg CO₂`;
    emissions.electricity=total;
  }
}

function thirdPage() {
  let box = document.querySelector(".box");
  box.innerText = "";
  box.style.height = "500px";
  let h1 = document.createElement("h1");
  h1.classList.add("screenTime");
  h1.textContent = "Your Screen Time (Hours)";
  box.appendChild(h1);

  let heading = document.createElement("h3");
  heading.textContent = "Which device did you use:";
  box.appendChild(heading);
  let select = document.createElement("select");
  select.classList.add("dropDown");
  let options = ["Mobile Phone", "Laptop", "PC", "Television"];
  options.forEach((items) => {
    let option = document.createElement("option");
    option.textContent = items;
    select.appendChild(option);
  });
  box.appendChild(select);

  let h3 = document.createElement("h3");
  h3.textContent = "for how long :";
  box.appendChild(h3);

  let input = document.createElement("input");
  input.type = "number";
  box.appendChild(input);

  let result = document.createElement("div");
  result.classList.add("estimatedResult");
  result.textContent = "Estimated Result:";
  box.appendChild(result);
  select.addEventListener("change", emissionCalc);
  input.addEventListener("input", emissionCalc);

  function emissionCalc(){
    const screenFactor = new Map([
      ["Mobile Phone", 0.02],
      ["Laptop", 0.05],
      ["PC", 0.15],
      ["Television", 0.1]
    ]);

    let selectedOption=select.value;
    let time=Number(input.value)
    let emissionFormula=screenFactor.get(selectedOption)*time;
    result.innerText=`Estimated Result: ${emissionFormula}`
    emissions.screenTime=emissionFormula;

  }


}

function fourthPage() {
  let box = document.querySelector(".box");
  box.innerText = "";
  box.style.height = "300px";

  let dietHeading = document.createElement("h1");
  dietHeading.innerText = "What was your diet today ? ";
  box.appendChild(dietHeading);

  let btnParent = document.createElement("div");
  btnParent.classList.add("btnParent");
  let options = ["Vegetarian", "Non-Vegetarian", "Eggetarian", "Vegan"];
  box.appendChild(btnParent);
  let result = document.createElement("div");
  result.classList.add("estimatedResult");
  result.textContent = "Estimated Result:";
  box.appendChild(result);
  let factor = new Map([
    ["Vegetarian", 2.5],
    ["Non-Vegetarian", 5],
    ["Eggetarian", 3],
    ["Vegan", 2],
  ]);
  options.forEach((items) => {
    let typeBtn = document.createElement("button");

    typeBtn.textContent = items;
    btnParent.appendChild(typeBtn);
    typeBtn.style.height = "70px";
    typeBtn.style.width = "90px";
    typeBtn.style.borderRadius = "50px";

    typeBtn.addEventListener("click", () => {
      let value = factor.get(items);
      result.textContent = `Estimated Result: ${value}`;
      emissions.diet=value;
    });
  });
  
}

function fifthPage() {
  let box = document.querySelector(".box");
  box.innerText = "";
  box.style.height = "300px";

  let waterHeading = document.createElement("h1");
  waterHeading.innerText = "Water Usage";
  box.appendChild(waterHeading);

  let waterAmt = document.createElement("h3");
  waterAmt.innerText = "How much water did you used today ? ";
  box.appendChild(waterAmt);

  let select = document.createElement("select");
  select.classList.add("waterUsage");
  let options = [
    "Low (quick showers, basic use)",
    "Medium (normal daily use)",
    "High (long showers, laundry)",
    "Heavy (car wash, multiple baths)",
  ];
  options.forEach((items) => {
    let option = document.createElement("option");
    option.innerText = items;
    select.appendChild(option);
  });
  box.appendChild(select);
  let result = document.createElement("div");
  result.classList.add("estimatedResult");
  result.textContent = "Estimated Result:";
  box.appendChild(result);
  select.addEventListener("change", emissionCalc);
  function emissionCalc() {
    const waterFactor = new Map([
      ["Low (quick showers, basic use)", 0.03],
      ["Medium (normal daily use)", 0.045],
      ["High (long showers, laundry)", 0.075],
      ["Heavy (car wash, multiple baths)", 0.105],
    ])
    let selectedOption = select.value;
    let emission = waterFactor.get(selectedOption);

    result.textContent = `Estimated Result: ${emission}`;
    emissions.water=emission;

  }
  
}
function sixthPage() {

  let box = document.querySelector(".box");
  box.innerText = "";

  let heading = document.createElement("h1");
  heading.textContent = "Your Total Carbon Emissions";
  box.appendChild(heading);

  let list = document.createElement("ul");

  list.innerHTML = `
    <li>Travel: ${emissions.travel.toFixed(2)} kg CO₂</li>
    <li>Electricity: ${emissions.electricity.toFixed(2)} kg CO₂</li>
    <li>Screen Time: ${emissions.screenTime.toFixed(2)} kg CO₂</li>
    <li>Diet: ${emissions.diet.toFixed(2)} kg CO₂</li>
    <li>Water: ${emissions.water.toFixed(2)} kg CO₂</li>
  `;

  box.appendChild(list);

  let total =
    emissions.travel +
    emissions.electricity +
    emissions.screenTime +
    emissions.diet +
    emissions.water;

  let totalResult = document.createElement("h2");
  totalResult.textContent = `Total: ${total.toFixed(2)} kg CO₂`;
  box.appendChild(totalResult);
}




let track = document.querySelector(".trackButton");
if (track) {
  track.addEventListener("click", () => {
    window.location.href = "question.html";
  });
}
window.addEventListener("DOMContentLoaded", () => {
  firstPage();
});
document.querySelector(".next").addEventListener("click", () => {});

let currentPage = 0;
let pages = [
  firstPage,
  secondPage,
  thirdPage,
  fourthPage,
  fifthPage,
  sixthPage,
];
let next = document.querySelector(".next");
next.addEventListener("click", () => {
  if (currentPage < pages.length - 1) {
    pages[currentPage + 1]();
    currentPage++;
  }
});
let back = document.querySelector(".back");
back.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    pages[currentPage]();
  }
});
