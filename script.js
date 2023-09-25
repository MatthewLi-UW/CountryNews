// Selecting DOM Elements
const countriesElem=document.querySelector(".countries")
const dropDown=document.querySelector(".dropDown")
const dropElem=document.querySelector(".drop")
const region=document.querySelectorAll(".region")
const search=document.querySelector(".search")
const toggle=document.querySelector(".toggle")
const moon=document.querySelector(".moon")
const countryExtra=document.querySelector(".countryExtra")
const news=document.querySelector(".news")
const arrow=document.querySelector(".arrow")
const regionName=document.getElementsByClassName("regionName")
const countryName=document.getElementsByClassName("countryName")

// getCountry() fetches and displays country data
async function getCountry() {
    try {
        // Fetch data from the Rest Countries API
        const url=await fetch("https://restcountries.com/v3.1/all")
        const response=await url.json()
        // Iterate through the country data and display it
        response.forEach(element => {
            showCountry(element)
        });
    } catch (error) {
        console.log('Error:', error);
    }
}

// Initialize the application
getCountry()

// toggleMore(data) toggles the extra information page
function toggleMore(data) {
    countryExtra.classList.toggle("show");
    news.classList.toggle("show");
    // Display country-specific information
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
                        <p><strong>Population:</strong> ${data.population}</p>
                        
                    </div>
                    <div class="innerRight inner">
                        <p><strong>Region:</strong> ${data.region}</p>
                        <p><strong>Sub Region:</strong> ${data.subregion}</p>
                        <p><strong>Capital:</strong> ${data.capital}</p>
                    </div>
                </div>
            </div>
        </div>
      `;
    
    // Click event listener on Back button
    const back = countryExtra.querySelector(".back");
    back.addEventListener("click", () => {
        countryExtra.classList.toggle("show");
        news.classList.toggle("show");
    });

    // Fetch news data and append it to the news container
    var url = `https://newsapi.org/v2/top-headlines?country=${data.cca2}&apiKey=0e89fbfdd4ae4b8aab1f68d69b990797`;
    var req = new Request(url);
    fetch(req)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
        // Construct the HTML content
        var newsHTML = '<h2>Top Headlines in This Country: <h3>(Disclaimer: Some countries are not supported, SORRY!)</h3></h2> <br>';
        data.articles.forEach(function(article) {
            newsHTML += `
            <div class="article">
                <h3>${article.title}</h3>
                <a href="${article.url}" target="_blank" class="readMore">Read More</a>
            </div>
            `;
        });
        // Append newsHTML
        news.innerHTML = newsHTML;
    })
    .catch(function(error) {
      console.error('Error fetching news data:', error);
    });
}

// showCountry(data) displays country data
function showCountry(data) {
    const country=document.createElement("div");
    country.classList.add("country");
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
    countriesElem.appendChild(country);
    const more = country.querySelector(".more")
    more.addEventListener("click", ()=> {
        toggleMore(data);
    })
}

// Click event listener on the DropDown element
dropDown.addEventListener("click", (event)=>{
    dropElem.classList.toggle("showDropDown");
    arrow.classList.toggle("flip");
})

// Evennt listener for filter functionality
region.forEach(element => {
    element.addEventListener("click", ()=> {
        Array.from(regionName).forEach(elem => {
            if(elem.innerText.includes(element.innerText) || element.innerText=="All") {
                elem.parentElement.parentElement.style.display=""
            } else {
                elem.parentElement.parentElement.style.display="none"
            }
        });
    })
});

// Event listener for search functionality
search.addEventListener("input", ()=> {
    Array.from(countryName).forEach(elem => {
        if(elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
            elem.parentElement.parentElement.style.display=""
        } else {
            elem.parentElement.parentElement.style.display="none"
        }
    });
})

// Event listener for dark mode
toggle.addEventListener("click", ()=> {
    document.body.classList.toggle("dark-mode")
    moon.classList.toggle("fas")
})

