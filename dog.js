let dogsList = document.querySelector(".dogs")
let randomDogButton = document.querySelector(".random-dog")
let selectBreeds = document.querySelector("#choose-breeds")
let breedsForm = document.querySelector("#dog-by-breeds")
let getDogButton = document.querySelector("#get-dog")

let selectSubBreeds = document.createElement("select")
selectSubBreeds.id = "choose-sub-breeds"
let option = document.createElement("option")
let subBreedText = document.createElement("label")
subBreedText.textContent = "Choose Sub breeds: "
let img = document.createElement("img")
randomDogButton.before(img)

function getAPI(link) {
    fetch(link)
        .then(response => response.json())
        .then(data => {
            output(data)
        })
        .catch(error => {
            console.error('Not found:', error);
        });
    getDogButton.removeAttribute("disabled")
}

randomDogButton.addEventListener("click", () => {
    getAPI("https://dog.ceo/api/breeds/image/random")
})
getAPI("https://dog.ceo/api/breeds/list/all")

breedsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    form = event.target
    let breed = form["choose-breeds"].value
    if (form["choose-sub-breeds"]) {
        let subBreed = form["choose-sub-breeds"].value
        getAPI(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`)
    } else {
        getAPI(`https://dog.ceo/api/breed/${breed}/images/random`)
    }
})
breedsForm["choose-breeds"].addEventListener("input", () => {
    let breeds = breedsForm["choose-breeds"].value
    fetch(`https://dog.ceo/api/breed/${breeds}/list`)
        .then(response => response.json())
        .then(data => {
            while (selectSubBreeds.options.length > 0) {
                selectSubBreeds.remove(0);
            }
            subBreedText.remove()
            selectSubBreeds.remove()
            if (data.message.length > 0) {
                selectBreeds.after(subBreedText, selectSubBreeds)
            }
            Object.values(data.message).forEach(item => {
                let option = document.createElement("option")
                option.value = item
                option.textContent = item
                selectSubBreeds.append(option)

            });
        })
})

// let arr = []
// let subBreedList

function output(data) {
    if (typeof data.message !== "object") {
        img.src = data.message
        img.style.maxWidth = "300px"
    } else {
        Object.keys(data.message).forEach(item => {
            let option = document.createElement("option")
            option.value = item
            option.textContent = item
            selectBreeds.append(option)

        });
        // Object.values(data.message).forEach(item => {
        //     Object.values(item).forEach(item => {
        //         arr.push(item)
        //         subBreedList = arr.filter((elem, index) => arr.indexOf(elem) === index);

        //     });
        // });
        // console.log(subBreedList)
    }
}
