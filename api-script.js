let activities = document.querySelector(".activities")
let titleActivities = document.createElement("h1")
let priceActivities = document.createElement("h2")
let ulActivities = document.createElement("ul")
let liAccessibility = document.createElement("li")
let liType = document.createElement("li")
let liParticipants = document.createElement("li")
let pLink = document.createElement("p")
let pKey = document.createElement("p")

let buttonRandom = document.createElement("button")
let buttonKey = document.createElement("button")
let buttonType = document.createElement("button")
let buttonParticipants = document.createElement("button")
let buttonPrice = document.createElement("button")
let buttonAccessibility = document.createElement("button")

let div = document.createElement("div")
let input = document.createElement("input")
input.type = "text"
input.placeholder = "Activity by:"

buttonRandom.textContent = "Random activity"
buttonKey.textContent = "Activity by Key"
buttonType.textContent = "Activity by Type"
buttonParticipants.textContent = "Activity by Participants"
buttonPrice.textContent = "Activity by Price"
buttonAccessibility.textContent = "Activity by Accessibility"

activities.append(titleActivities, priceActivities, ulActivities, pLink, pKey, div, buttonRandom, buttonKey, buttonType, buttonParticipants, buttonPrice, buttonAccessibility)
div.append(input)

let submitActivities = document.createElement("input")
let inputActivities = document.createElement("input")
submitActivities.type = "submit"
submitActivities.value = "Get Activity"
inputActivities.type = "text"
inputActivities.id = "text"
let activitiesForm = document.querySelector("#activities-form")
activitiesForm.append(inputActivities, submitActivities)

let chooseActivities = activitiesForm.querySelector("#choose-activities")
let key = document.createElement("option")
key.value = "key"
key.textContent = "Key"
let type = document.createElement("option")
type.value = "type"
type.textContent = "Type"
let participants = document.createElement("option")
participants.value = "participants"
participants.textContent = "Participants"
let price = document.createElement("option")
price.value = "price"
price.textContent = "Price"
let accessibility = document.createElement("option")
accessibility.value = "accessibility"
accessibility.textContent = "Accessibility"
chooseActivities.append(key, type, participants, price, accessibility)

activitiesForm.addEventListener("submit", (event) => {
    event.preventDefault()
    form = event.target
    let category = form["choose-activities"].value
    let text = form.text.value
    getRandomActivity(`http://www.boredapi.com/api/activity?${category}=${text}`);
})

buttonRandom.addEventListener("click", () => {
    getRandomActivity('http://www.boredapi.com/api/activity/')
})
let text
input.addEventListener("input", () => {
    text = input.value
});

buttonKey.addEventListener("click", () => {
    getRandomActivity(`http://www.boredapi.com/api/activity?key=${text}`);
})
buttonType.addEventListener("click", () => {
    getRandomActivity(`http://www.boredapi.com/api/activity?type=${text}`);
})
buttonParticipants.addEventListener("click", () => {
    getRandomActivity(`http://www.boredapi.com/api/activity?participants=${text}`);
})
buttonPrice.addEventListener("click", () => {
    getRandomActivity(`http://www.boredapi.com/api/activity?price=${text}`);
})
buttonAccessibility.addEventListener("click", () => {
    getRandomActivity(`http://www.boredapi.com/api/activity?accessibility=${text}`);
})

function getRandomActivity(link) {
    fetch(link)
        .then(response => response.json())
        .then(data => {
            if (data) {
               output(data)  
            }
           
        })
        .catch(error => {
            console.error('Not found:', error);
        });
}
function output(data) {
    let { activity, price, link, key, accessibility, type, participants } = data

    ulActivities.append(liAccessibility, liType, liParticipants)
    titleActivities.textContent = activity
    priceActivities.innerHTML = price > 0 ? `Price is:  <small>${price} euro per min</small>` : "Free"
    pLink.innerHTML = link ? `<b>More information:</b> <a href="${link}">${link}</a>` : ""
    pKey.innerHTML = `<b>Key:</b> ${key}`
    liAccessibility.innerHTML = `<b>Accessibility:</b> ${accessibility}`
    liType.innerHTML = `<b>Type:</b> ${type}`
    liParticipants.innerHTML = `<b>Participants:</b> ${participants}`
}