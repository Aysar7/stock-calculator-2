// ======================
// CALCULATE BUTTON
// ======================

document.querySelector(".btn-calculate")
.addEventListener("click", calculate);

document.querySelector(".btn-reset")
.addEventListener("click", resetCalculator);

document.querySelector(".btn-target")
.addEventListener("click", calculateTarget);


// ======================
// MAIN CALCULATOR
// ======================

function calculate(){

let buyPrice =
parseFloat(document.getElementById("buyPrice").value) || 0;

let quantity =
parseFloat(document.getElementById("quantity").value) || 0;

let sellPrice =
parseFloat(document.getElementById("sellPrice").value) || 0;

let brokerMin =
parseFloat(document.getElementById("brokerMin").value) || 8;

let brokerRate =
(parseFloat(document.getElementById("brokerRate").value) || 0.08)/100;

let clearingRate =
(parseFloat(document.getElementById("clearingFee").value) || 0.03)/100;

let stampRate =
(parseFloat(document.getElementById("stampDuty").value) || 0.10)/100;


// ======================
// BUY SIDE
// ======================

let grossBuy =
buyPrice * quantity;

let buyBrokerage =
Math.max(
brokerMin,
grossBuy * brokerRate
);

let buyClearing =
grossBuy * clearingRate;

let buyStamp =
Math.ceil(
grossBuy * stampRate
);

let netBuy =
grossBuy +
buyBrokerage +
buyClearing +
buyStamp;


// ======================
// SELL SIDE
// ======================

let grossSell =
sellPrice * quantity;

let sellBrokerage =
Math.max(
brokerMin,
grossSell * brokerRate
);

let sellClearing =
grossSell * clearingRate;

let sellStamp =
Math.ceil(
grossSell * stampRate
);

let netSell =
grossSell -
sellBrokerage -
sellClearing -
sellStamp;


// ======================
// PROFIT
// ======================

let profit =
netSell - netBuy;

let profitPercent =
(profit / netBuy) * 100;


// ======================
// BREAK EVEN
// ======================

let breakEvenPrice =
netBuy / quantity;


// ======================
// TICK SIZE
// ======================

let tickSize = getTickSize(buyPrice);


// ======================
// BID VALUE
// ======================

let oneBidValue =
quantity * tickSize;


// ======================
// UPDATE SCREEN
// ======================

document.getElementById("grossBuy")
.innerHTML =
"RM" + formatRM(grossBuy);

document.getElementById("buyBrokerage")
.innerHTML =
"RM" + buyBrokerage.toFixed(2);

document.getElementById("buyClearing")
.innerHTML =
"RM" + buyClearing.toFixed(2);

document.getElementById("buyStamp")
.innerHTML =
"RM" + buyStamp.toFixed(2);

document.getElementById("netBuy")
.innerHTML =
"RM" + formatRM(netBuy);


// SELL

document.getElementById("grossSell")
.innerHTML =
"RM" + formatRM(grossSell);

document.getElementById("sellBrokerage")
.innerHTML =
"RM" + sellBrokerage.toFixed(2);

document.getElementById("sellClearing")
.innerHTML =
"RM" + sellClearing.toFixed(2);

document.getElementById("netSell")
.innerHTML =
"RM" + formatRM(netSell);


// PROFIT

document.getElementById("profitAmount")
.innerHTML =
"RM" + formatRM(profit);

document.getElementById("profitPercent")
.innerHTML =
profitPercent.toFixed(2) + "%";


// BREAK EVEN

document.getElementById("breakEvenPrice")
.innerHTML =
"RM" + (Math.ceil(breakEvenPrice * 100) / 100).toFixed(3);


// TICK

document.getElementById("tickSize")
.innerHTML =
tickSize.toFixed(3);


// BID VALUE

document.getElementById("oneBidValue")
.innerHTML =
"RM" + oneBidValue.toFixed(2);


// BID TABLE

document.getElementById("bid1")
.innerHTML =
"RM" + (oneBidValue * 1).toFixed(2);

document.getElementById("bid2")
.innerHTML =
"RM" + (oneBidValue * 2).toFixed(2);

document.getElementById("bid5")
.innerHTML =
"RM" + (oneBidValue * 5).toFixed(2);

document.getElementById("bid10")
.innerHTML =
"RM" + (oneBidValue * 10).toFixed(2);


// COLOR PROFIT

if(profit >= 0){

document.getElementById("profitAmount")
.style.color = "#16a34a";

document.getElementById("profitPercent")
.style.color = "#16a34a";

}
else{

document.getElementById("profitAmount")
.style.color = "#dc2626";

document.getElementById("profitPercent")
.style.color = "#dc2626";

}


// SAVE LOCAL STORAGE

saveData();

}



// ======================
// TICK SIZE
// ======================

function getTickSize(price){

if(price < 0.20){
return 0.001;
}

if(price < 1.00){
return 0.005;
}

if(price < 5.00){
return 0.01;
}

if(price < 10.00){
return 0.02;
}

if(price < 20.00){
return 0.05;
}

if(price < 100.00){
return 0.10;
}

return 0.10;

}



// ======================
// TARGET PROFIT
// ======================

function calculateTarget(){

let target =
parseFloat(document.getElementById("targetProfit").value) || 0;

let quantity =
parseFloat(document.getElementById("quantity").value) || 0;

let netBuyText =
document.getElementById("netBuy")
.innerHTML
.replace("RM","");

let netBuy =
parseFloat(netBuyText) || 0;

if(quantity <= 0) return;

let targetSellPrice =
(netBuy + target) / quantity;

document.getElementById("targetPrice")
.innerHTML =
"RM" + (Math.ceil(targetSellPrice * 100) / 100).toFixed(3);

}



// ======================
// RESET
// ======================

function resetCalculator(){

document.getElementById("buyPrice").value = "";

document.getElementById("quantity").value = "";

document.getElementById("sellPrice").value = "";

document.getElementById("targetProfit").value = "";

location.reload();

}



// ======================
// LOCAL STORAGE
// ======================

function saveData(){

localStorage.setItem(
"buyPrice",
document.getElementById("buyPrice").value
);

localStorage.setItem(
"quantity",
document.getElementById("quantity").value
);

localStorage.setItem(
"sellPrice",
document.getElementById("sellPrice").value
);

}


window.onload = function(){

if(localStorage.getItem("buyPrice")){

document.getElementById("buyPrice").value =
localStorage.getItem("buyPrice");

}

if(localStorage.getItem("quantity")){

document.getElementById("quantity").value =
localStorage.getItem("quantity");

}

if(localStorage.getItem("sellPrice")){

document.getElementById("sellPrice").value =
localStorage.getItem("sellPrice");

}

}
function formatRM(value){

return new Intl.NumberFormat('en-MY', {
minimumFractionDigits: 2,
maximumFractionDigits: 2
}).format(value);

}