import { country_list } from "./countries.js";


const amountEl = document.querySelector("form input");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const exIcon = document.querySelector("form .reverse");
const exRateTxt = document.querySelector("form .result");
const getBtn = document.querySelector(".container button");

const API_KEY = "c8b8de6990c7032d9aaa289a";
const URL = "https://v6.exchangerate-api.com/v6/c8b8de6990c7032d9aaa289a/latest/USD";

// The second parameter in the callback function for forEach is always the index of the current element in the array.

[fromCurrency,toCurrency].forEach((select,i)=>{

   for(let curcode in country_list){
      
        const selected = (i === 0 && curcode === "USD") || (i === 1 && curcode === "LKR") ? "selected" : "";

        select.insertAdjacentHTML("beforeend", `<option value="${curcode}" ${selected}>${curcode}</option>`);


   }


   
   select.addEventListener("change", ()=>{

     const code = select.value;
     const imgTag= select.parentElement.querySelector("img");

     imgTag.src = `https://flagcdn.com/36x27/${country_list[code].toLowerCase()}.png`;
    
   });



});    


// GET DATA FROM API

async function getExchangeRate(){

  const amountValue = amountEl.value;
  exRateTxt.textContent = "Please Wait....."

   
   try{

     const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency.value}`);
     const result = await response.json();

     const exRate = result.conversion_rates[toCurrency.value];
     const totalExRate = amountValue * exRate; 


     exRateTxt.textContent = `${amountValue} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value} `

    //  console.log(totalExRate);



   }
   catch(error)
   {
        exRateTxt.textContent = "Something Went Wrong....."
   }




}

window.addEventListener("DOMContentLoaded", getExchangeRate())


// getBtn.addEventListener("click",(e)=>{

// e.preventDefault();
// getExchangeRate();

// })


//EXCHANGE ICON

exIcon.addEventListener("click", () => {
    // Swap the values of fromCurrency and toCurrency
    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
  
    // Update the flag images and exchange rates for both select elements
    [fromCurrency, toCurrency].forEach((select) => {
      const code = select.value;
      const imgTag = select.parentElement.querySelector("img");
  
      // Update the src attribute of the img element with the corresponding flag image URL
      imgTag.src = `https://flagcdn.com/36x27/${country_list[code].toLowerCase()}.png`;
    });
  
    // Call getExchangeRate once after updating both select elements
    getExchangeRate();
  });
  
  amountEl.addEventListener("keyup" , ()=>{


getExchangeRate();
  })