let moviesLists = document.querySelector(".movies-lists")

// getById()
function getById() {
    fetch('movies-by-id.json')
        .then(response => response.json())
        .then(data => {
            data.map(item => {
                fetch(`movie-${item}.json`)
                    .then(response => response.json())
                    .then(data => {
                        output(data)
                    })

            })

        })
}

// get();
function get() {
    fetch('movies.json')
        .then(response => response.json())
        .then(data => {
            data.map(item => {
                output(item)
            })
        })
}
function output(item) {
    let movie = document.createElement("div")
    movie.classList.add("movie")
    moviesLists.append(movie)
    let h1 = document.createElement("h1")
    let h2Ratings = document.createElement("h2")
    let h2Genres = document.createElement("h2")
    let h2Director = document.createElement("h2")
    let h2Stars = document.createElement("h2")
    let spanYear = document.createElement("span")
    let pDescription = document.createElement("p")
    let ulGenres = document.createElement("ul")
    let ulDirector = document.createElement("ul")
    let ulStars = document.createElement("ul")
    let ulRatings = document.createElement("ul")

    h1.textContent = item.name
    spanYear.textContent = ` (${item.year}m.)`
    pDescription.textContent = item.description
    h2Ratings.textContent = "Ratings:"
    h2Genres.textContent = "Genres:"
    h2Director.textContent = "Director:"
    h2Stars.textContent = "Stars:"
    movie.append(h1, h2Ratings, ulRatings, pDescription, h2Genres, ulGenres, h2Director, ulDirector, h2Stars, ulStars)

    let liEvaluation = document.createElement("li")
    let liVotes = document.createElement("li")
    liEvaluation.textContent = "Evaluation: " + item.ratings.evaluation
    liVotes.textContent = "Votes: " + item.ratings.votes
    ulRatings.append(liEvaluation, liVotes)

    item.genres.map(item => {
        let li = document.createElement("li")
        li.textContent = item
        ulGenres.append(li)
    })
    item.director.map(item => {
        let li = document.createElement("li")
        li.textContent = item
        ulDirector.append(li)
    })
    item.stars.map(item => {
        let li = document.createElement("li")
        li.textContent = item
        ulStars.append(li)
    })
    h1.append(spanYear)
}
let button = document.createElement("button")
// jokeId.after(button)
// button.textContent = "Joke"
// button.addEventListener("click", getApi)
// button.addEventListener("click", () => {
//     getApi();
// })
// function getApi() {
//     fetch('https://api.chucknorris.io/jokes/random')
//         .then(response => response.json())
//         .then(data => {
//             jokeId.textContent = data.value
//         })
// }
let submit = document.querySelector("#submit")
let pJoke = document.querySelector("#joke")
let form = document.querySelector("#joke-form")
let categoryOptions = form.querySelector("#category")
getCategories()
function getCategories() {
    fetch('https://api.chucknorris.io/jokes/categories')
        .then(response => response.json())
        .then(data => {
            data.map(category => {
                let categoryElement = document.createElement("option")
                categoryElement.textContent = "- " + category.toUpperCase()
                categoryElement.value = category
                categoryOptions.append(categoryElement)
            })
            submit.removeAttribute("disabled")
            submit.value = "Get joke"
        })
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target
    let category = form.category.value
    getJoke(category)
})

function getJoke(category) {
    fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
        .then(response => response.json())
        .then(data => {
            pJoke.textContent = data.value
        })
}




let textForm = document.querySelector("#joke-by-text-form")
let textSubmit = document.querySelector("#submit-text")
let categoryByTextOptions = textForm.querySelector("#category-by-text")

getCategories()
function getCategories() {
    fetch('https://api.chucknorris.io/jokes/categories')
        .then(response => response.json())
        .then(data => {
            data.map(category => {
                let categoryElement = document.createElement("option")
                categoryElement.textContent = "- " + category.toUpperCase()
                categoryElement.value = category
                categoryByTextOptions.append(categoryElement)
            })
            textSubmit.removeAttribute("disabled")
            textSubmit.value = "Get joke"
        })
}

textForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target
    let text = form.text.value
    let category = form['category-by-text'].value
    getJokeByText(text, category)
})

function getJokeByText(text, category) {
    fetch(`https://api.chucknorris.io/jokes/search?query=${text}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.result)

            let categoryFilter = data.result.filter(item => item.categories.some(categoryItem => categoryItem === category));
            let randomJokeNr = Math.floor(Math.random() * categoryFilter.length)
            pJoke.textContent = categoryFilter[randomJokeNr].value
        })
        .catch(error => {
            pJoke.textContent = "not found"
        });
}


