let rssToJsonLink = "https://api.rss2json.com/v1/api.json?rss_url=";

async function fetchDataFromRSS(url){
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}


function requestDataFromFetch() {
    let elemId = 0;
    magazines.forEach(async (url) => {
        
        let getData = await fetchDataFromRSS(rssToJsonLink + url);

        // Calling createAccordion()
        createAccordion(getData, elemId);

        //Calling createCarouselOfCards()
        createCarouselOfCards(getData, elemId);
        elemId++;
    });
}

//createAccordion() function defination
function createAccordion(data, id){
    let newsTitle = data.feed.title;
    let accordionDiv = document.querySelector("#accordion-div");
    let newAccordionItem = document.createElement("div");
    newAccordionItem.setAttribute("class", "accordion-item");
    newAccordionItem.innerHTML = `
    <h2 class="accordion-header" id="heading${id}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="false" aria-controls="collapse${id}">
        ${newsTitle}
        </button>
    </h2>
    <div id="collapse${id}" class="accordion-collapse collapse ${id == 0 ? "show" : ""}" aria-labelledby="heading${id}" data-bs-parent="#accordionExample">
        <div class="accordion-body" id="accordianBody${id}">
            <!-- Carousel Start -->
            <div id="carouselExampleControls${id}" class="carousel slide carousel-fade" data-bs-ride="carousel">
            <div class="carousel-inner" id="carouselInner${id}">
            
            </div>
            
            <!-- Carousel End -->
        </div>
        </div>
    </div> `
    accordionDiv.appendChild(newAccordionItem);
    
}

//createCarouselOfCards() function defination
function createCarouselOfCards(data, id){
    console.log(data);
    let carouselInner = document.querySelector(`#carouselInner${id}`);
    for(let i = 0 ; i < data.items.length; i++){
        let newsURL = data.items[i].link;
        let newsBanner = data.items[i].enclosure.link;
        let newsHeading = data.items[i].title;
        let publishDate = data.items[i].pubDate;
        let newsBody = data.items[i].description;
        let newsAuthor = data.items[i].author;

        let carouselItem = document.createElement("div");
        if(i == 0){
            carouselItem.setAttribute("class", "carousel-item active");
        }
        else{
            carouselItem.setAttribute("class", "carousel-item");
        }
        carouselItem.setAttribute("data-bs-interval", "");
        
        carouselItem.innerHTML = `
            <a href="${newsURL}" target="_blank">
                    <div class="card">
                    <div class="d-flex align-items-center">  
                        <img src="${newsBanner}" class="card-img w-100" alt="${newsHeading} image banner">   
                        <button class="carousel-control-prev align-middle" type="button" data-bs-target="#carouselExampleControls${id}" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon align-middle" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next align-middle" type="button" data-bs-target="#carouselExampleControls${id}" data-bs-slide="next">
                            <span class="carousel-control-next-icon align-middle" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>           
                    </div> 

                    <div class="card-body text-bg-light">
                        <h5 class="card-title">${newsHeading}</h5>
                        <p class="card-subtitle mb-2 text-muted">${newsAuthor} • ${publishDate}</p>
                        <p class="card-text">${newsBody}</p>
                    </div>
                </div>
            </a>
        `
        carouselInner.appendChild(carouselItem);

    }
}






requestDataFromFetch()
