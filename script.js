// comments are to note down function purposes and JavaScript syntax

// create constants from classes
//  document.querySelector gets the first element with the class in the parameter
//  note: to return all matches, use document.querySelectorAll()
const countriesElem=document.querySelector(".countries")
const dropDown=document.querySelector(".dropDown")
const dropElem=document.querySelector(".drop")
const region=document.querySelectorAll(".region")
const search=document.querySelector(".search")
const toggle=document.querySelector(".toggle")
const moon=document.querySelector(".moon")
const countryExtra=document.querySelector(".countryExtra")
const arrow=document.querySelector(".arrow")
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
        const response=await url.json()
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

// Define a container for news articles
const newsContainer = document.createElement("div");
newsContainer.classList.add("bottomExtra");

// toggleMore toggles the extra info page, which is used in the next function
function toggleMore(data) {
    countryExtra.classList.toggle("show");
    
    // Check if the news container is already appended to the countryExtra
    if (!countryExtra.contains(newsContainer)) {
      countryExtra.appendChild(newsContainer); // Append the news container if not already present
    }
  
    if (countryExtra.classList.contains("show")) {
      // If the countryExtra is shown, populate it with the extra info content
      countryExtra.innerHTML = `
        <button class="back">Back</button>
        <div class="extra">
            <div class="leftExtra">
                <img src="${data.flags.svg}" alt="">
            </div>
            <div class="rightExtra">
                <h1>${data.name.common}</h1>
                <div class="extraInfo">
                    <div class="innerLeft inner">
                        <p><strong>Native Name:</strong> ${data.name.common}</p>
                        <p><strong>Official Name:</strong> ${data.name.official}</p>
                        <p><strong>Region:</strong> ${data.region}</p>
                    </div>
                    <div class="innerRight inner">
                        <p><strong>Population:</strong> ${data.population}</p>
                        <p><strong>Sub Region:</strong> ${data.subregion}</p>
                        <p><strong>Capital:</strong> ${data.capital}</p>
                    </div>
                </div>
            </div>
        </div>
      `;
  
      // Add a click event listener to the Back button
      const back = countryExtra.querySelector(".back");
      back.addEventListener("click", () => {
        countryExtra.classList.toggle("show");
      });
    }
  
  // Fetch news data and append it to the news container
  var url = `https://newsapi.org/v2/top-headlines?country=${data.cca2}&apiKey=0e89fbfdd4ae4b8aab1f68d69b990797`;
  var req = new Request(url);
  
  fetch(req)
    .then(function(response) {
      return response.json(); // Parse the response JSON
    })
    .then(function(data) {
      // Construct the HTML content with the fetched news data
      var newsHTML = '<h2>Top Headlines</h2>';
      data.articles.forEach(function(article) {
        newsHTML += `
          <div class="article">
            <h3>${article.title}</h3>
            <a href="${article.url}" target="_blank">Read More</a>
          </div>
        `;
      });
  
      // Append the newsHTML to the news container
      newsContainer.innerHTML = newsHTML;
    })
    .catch(function(error) {
      console.error('Error fetching news data:', error);
    });
}

// // toggleMore toggles the extra info page, which is used in the next function
// function toggleMore(data) {
//     countryExtra.classList.toggle("show");
//     countryExtra.innerHTML = `<button class="back">Back</button>
//     <div class="extra">
//         <div class="leftExtra">
//             <img src="${data.flags.svg}" alt="">
//         </div>
//         <div class="rightExtra">
//             <h1>${data.name.common}</h1>
//             <div class="extraInfo">
//                 <div class="innerLeft inner">
//                     <p><strong>Native Name:</strong> ${data.name.common}</p>
//                     <p><strong>Official Name:</strong> ${data.name.official}</p>
//                     <p><strong>Region:</strong> ${data.region}</p>
                    
//                 </div>
//                 <div class="innerRight inner">
//                     <p><strong>Population:</strong> ${data.population}</p>
//                     <p><strong>Sub Region:</strong> ${data.subregion}</p>
//                     <p><strong>Capital:</strong> ${data.capital}</p>
//                 </div>
//             </div>
//         </div>
//     </div>`
//     const back=countryExtra.querySelector(".back")
//     back.addEventListener("click", ()=> {
//     countryExtra.classList.toggle("show")
// })

// }

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
        <button class="more" > More Info </button>
    </div>
    `
    // appendChild appends a country node to the last child of countriesElem
    countriesElem.appendChild(country);

    const more = country.querySelector(".more")
    more.addEventListener("click", ()=> {
        toggleMore(data);
    })
}

// addEventListener executes when a click is detected on dropDown
//  ()=> is an unnamed function (basically lambda)
dropDown.addEventListener("click", (event)=>{
    dropElem.classList.toggle("showDropDown");
    arrow.classList.toggle("flip");
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

// iteratively checks each elem in the array made of country names against input
search.addEventListener("input", ()=> {
    // console.log(search.value);
    Array.from(countryName).forEach(elem => {
        if(elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
            elem.parentElement.parentElement.style.display=""
        } else {
            elem.parentElement.parentElement.style.display="none"
        }
    });
})

toggle.addEventListener("click", ()=> {
    document.body.classList.toggle("dark-mode")
    moon.classList.toggle("fas")
})

