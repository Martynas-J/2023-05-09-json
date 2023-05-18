let dogsList = document.querySelector(".dogs")
let selectBreeds = document.querySelector("#choose-breeds")
let breedsForm = document.querySelector("#dog-by-breeds")
let getDogButton = document.querySelector("#get-dog")
let dogPictures = document.querySelector(".dog-pictures")

let selectSubBreeds = document.createElement("select")
selectSubBreeds.id = "choose-sub-breeds"
let option = document.createElement("option")
let subBreedText = document.createElement("label")
subBreedText.textContent = "Choose Sub breeds: "
let img = document.createElement("img")

option.value = "random"
option.textContent = "Random"
selectBreeds.append(option)

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

breedsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    form = event.target
    let breed = form["choose-breeds"].value
    let quantity = form["quantity-dogs"].value
    if (breed === "random") {
        getAPI(`https://dog.ceo/api/breeds/image/random/${quantity}`)
    } else if (form["choose-sub-breeds"]) {
        let subBreed = form["choose-sub-breeds"].value
        getAPI(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random/${quantity}`)
    } else {
        getAPI(`https://dog.ceo/api/breed/${breed}/images/random/${quantity}`)
    }
})
breedsForm["choose-breeds"].addEventListener("input", () => {
    let breeds = breedsForm["choose-breeds"].value
    if (breeds !== "random") {
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
    } else {
        subBreedText.remove()
        selectSubBreeds.remove()
    }
})

getDogBreeds("https://dog.ceo/api/breeds/list/all")
function getDogBreeds(link) {
    fetch(link)
        .then(response => response.json())
        .then(data => {
            Object.keys(data.message).forEach(item => {
                let option = document.createElement("option")
                option.value = item
                option.textContent = item
                selectBreeds.append(option)
            });
        })
        .catch(error => {
            console.error('Not found:', error);
        });
    getDogButton.removeAttribute("disabled")
}
function output(data) {
    removeImg()
    data.message.map(item => {
        let img = document.createElement("img")
        dogPictures.append(img)
        img.src = item
        img.style.maxHeight = "300px"
    })
}
function removeImg() {
    let images = dogPictures.getElementsByTagName('img');
    for (let i = images.length - 1; i >= 0; i--) {
        images[i].remove();
    }
}
