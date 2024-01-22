"use strict";

const fromSelectForm = document.getElementById("sel1");
const toSelectForm = document.getElementById("sel2");
const amountForm = document.querySelector("[data-amount]");
const convertButton = document.querySelector("[data-convert]");
const resetButton = document.querySelector("[data-reset]");
const headerElem = document.querySelector("[data-header]");


let fromCurrency = null;
let toCurrency = null;
let amount = null;


fromSelectForm.addEventListener("change" ,() => {
    fromCurrency = fromSelectForm.value ; 
    console.log(fromCurrency);
})


toSelectForm.addEventListener("change" ,() => {
    toCurrency = toSelectForm.value
})

amountForm.addEventListener("change", () => {
    amount = amountForm.value ; 
})

convertButton.addEventListener("click" ,(e) => {
    if (!fromCurrency || !toCurrency || !amount){
       switch(fromCurrency){
            case null :
                headerElem.innerHTML = `Please select "From Currency"`;
                break;
        }
       switch(toCurrency){
            case null :
                headerElem.innerHTML = `Please select "To Currency"`;
                break;
        }
       switch(amount){
            case null :
                headerElem.innerHTML = `Please fill the "Amount" field`;
                break;
        }
        return;
    }
    let convertedCurrency  = convertCurrency(amount);
    convertedCurrency.then(data => updateInfo.call(null, data))
})

resetButton.addEventListener("click" , () => {
    reset();
})

async function convertCurrency(amount){
     return await fetch(`https://api.fastforex.io/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}&api_key=39600f3e15-930eb37ddc-s7o0as`)
    .then(resp => resp.json())
    .then(data => data);
}   

function updateInfo(data){
    headerElem.innerHTML = `Converted Amount of ${data.amount} ${data.base} is ${data.result[toCurrency]} ${toCurrency} with rate of ${data.result.rate}`;
    reset();
}

function reset(){
    fromCurrency = toCurrency = amount = null;
    amountForm.value = "" ; 
    fromSelectForm.value = "";
    toSelectForm.value = "";
}