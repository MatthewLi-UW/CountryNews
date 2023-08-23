// comments are to note down function purposes and JavaScript syntax

// create constants from classes
//  document.querySelector gets the first element with the class in the parameter
//  note: to return all matches, use document.querySelectorAll()
const countriesElem=document.querySelector(".countries")
const dropDown=document.querySelector(".dropDown")
const dropElem=document.querySelector(".drop")
const region=document.querySelectorAll(".region")
const search=document.querySelector(".search")
// note: do NOT use a period before the class name
const regionName=document.getElementsByClassName("regionName")
const countryName=document.getElementsByClassName("countryName")

// getCountry() iteratively pulls data for each country
//  async functions return a promise
//  starts a long-running task while still being able to respond to other events while it's running
async function getCountry() {
    // try block is monitored for errors
    // if error is found, stops code and control is transferred to the catch block
    try {
        // HTTP request fetches from Rest Countries api into a constant
        // await pauses execution until a promise is resolved or rejected
        const url=await fetch("https://restcountries.com/v3.1/all")
        // extracts JSON data from the url returned by the previous step
        // await pauses execution until the JSON data is available
        const response=await url.json()
        // log contents of response constant into the console
        console.log(response);
        // iteratively execute showCountry function for each element of the array
        //  in this case, the array is response
        //  for arrow functions: param => expression
        response.forEach(element => {
            showCountry(element)
        });
    } catch (error) {
        // error handling
        console.log('Error:', error);
    }
}

// running getCountry function
getCountry()

// showCountry(data) shows country data for each country in the array
function showCountry(data) {
    // creates a div
    const country=document.createElement("div");
    // adds the "country" class to the div that was just created
    country.classList.add("country");
    // innerHTML sets the HTML content of the country element
    //  make sure to use `` (tilde, not quotes)
    country.innerHTML=
    `
    <div class="country-img">
        <img src="${data.flags.svg}" alt="">
    </div>
    <div class="country-info">
        <h5 class="countryName">${data.name.common} (${data.name.official})</h5>
        <p><strong>Population:</strong> ${data.population}</p>
        <p class="regionName"><strong>Region:</strong> ${data.region}</p>
        <p><strong>Capital:</strong> ${data.capital}</p>
    </div>
    `
    // appendChild appends a country node to the last child of countriesElem
    countriesElem.appendChild(country);
}

// addEventListener executes when a click is detected on dropDown
//  ()=> is an unnamed function (basically lambda)
dropDown.addEventListener("click", ()=>{
    // toggles the "showDropDown" class for dropElem
    dropElem.classList.toggle("showDropDown");
})

// iteratively checks if the region matches for each country
region.forEach(element => {
    element.addEventListener("click", ()=> {
        // console.log(element);
        Array.from(regionName).forEach(elem => {
            // console.log(elem.innerText)
            // console.log(element.innerText)
            if(elem.innerText.includes(element.innerText) || element.innerText=="All") {
                elem.parentElement.parentElement.style.display=""
            } else {
                elem.parentElement.parentElement.style.display="none"
            }
        });
    })
});

search.addEventListener("input", ()=> {
    // console.log(search.value);
    Array.from(regionName).forEach(elem => {
        // console.log(elem.innerText)
        // console.log(element.innerText)
        if(elem.innerText.includes(element.innerText) || element.innerText=="All") {
            elem.parentElement.parentElement.style.display=""
        } else {
            elem.parentElement.parentElement.style.display="none"
        }
    });
})