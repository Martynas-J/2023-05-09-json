let getButton = document.querySelector("get-button")
let personData = document.querySelector("#person-data")
let personDataForm = document.querySelector("#person-form")

let titleCounty = document.createElement("h1")
let allUl = document.createElement("div")
let allTitle = document.createElement("div")
let ulNational = document.createElement("ul")
let ulGender = document.createElement("ul")
let ulAge = document.createElement("ul")
let titleNational = document.createElement("h2")
let titleGender = document.createElement("h2")
let titleAge = document.createElement("h2")

allUl.style.display = "flex"
allUl.style.justifyContent = "space-around"
allTitle.style.display = "flex"
allTitle.style.justifyContent = "space-around"
ulNational.style.listStyleType = "none";
ulGender.style.listStyleType = "none";
ulAge.style.listStyleType = "none";
personData.append(titleCounty, allTitle, allUl)
allUl.append(ulNational, ulGender, ulAge)
allTitle.append(titleNational, titleGender, titleAge)

personDataForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let form = event.target
    let name = form.name.value
    nationalApi(name)
    genderApi(name)
    ageApi(name)
    titleCounty.textContent = `Data by name: ${name}`
})

function nationalApi(name) {
    ulNational.innerHTML = "";
    fetch(`https://api.nationalize.io/?name=${name}`)
        .then(response => response.json())
        .then(data => {
            data.country.forEach(element => {

                let liCountyId = document.createElement("li")
                let liCountyProbability = document.createElement("li")
                titleNational.textContent = "By National:"
                liCountyId.innerHTML = `<b>Country:</b> ${element.country_id}`
                liCountyProbability.innerHTML = `<b>Probability: </b>${element.probability} %`
                ulNational.append(liCountyId, liCountyProbability)
            });
        })
}

function genderApi(name) {
    ulGender.innerHTML = "";
    fetch(`https://api.genderize.io?name=${name}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let liCount = document.createElement("li")
            let liGender = document.createElement("li")
            let liProbability = document.createElement("li")
            titleGender.textContent = "By Gender:"
            liCount.innerHTML = `<b>Count:</b> ${data.count}`
            liGender.innerHTML = `<b>Gender: </b>${data.gender}`
            liProbability.innerHTML = `<b>Probability: </b>${data.probability} %`
            ulGender.append(liGender, liCount, liProbability)
        })
}
function ageApi(name) {
    ulAge.innerHTML = "";
    fetch(`https://api.agify.io/?name=${name}`)
        .then(response => response.json())
        .then(data => {
            let liCount = document.createElement("li")
            let liAge = document.createElement("li")
            titleAge.textContent = "By Age:"
            liCount.innerHTML = `<b>Count:</b> ${data.count}`
            liAge.innerHTML = `<b>Age: </b>${data.age}`
            ulAge.append(liAge, liCount)
        })
}
