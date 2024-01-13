import formState from './state.js';


const options = document.querySelectorAll('.option')
const screen = document.querySelectorAll('.screen')
const form = document.getElementById('form')
const result = document.getElementById('result')
let count = 1


// showing filtres
function showScreen() {
    screen.forEach(item => {
        item.classList.add('hidden')
        document.getElementById(`screen${count}`).classList.remove('hidden')
    })
}
showScreen(count)

// showDetails

document.getElementById('show').addEventListener('click', () => {
    document.querySelector('.description-show').classList.toggle('hid')
})


function handlingClick(elemets, event) {
    elemets.forEach(el => {
        el.classList.remove('active')
        event.classList.add('active')
    })
}


// last form/result
function showForm() {
    screen.forEach(item => {
        item.classList.add('hidden')
    })
    document.getElementById('service').innerHTML = `<div>Service:</div> <div>${formState.service}</div>`
    document.getElementById('colors').innerHTML = `<div>Colors:</div> <div>${formState.colors}</div>`
    document.getElementById('flowers').innerHTML = `<div>Flowers</div> <div>${formState.flowers}</div>`
    document.getElementById('ceremon').innerHTML = `<div>Style:</div> <div>${formState.style}</div>`

    document.getElementById('total').innerHTML = `${formState.amount}`

    form.classList.remove('hidden')
}

// Function to create image elements
function createImageElement(imageSrc) {
    const imgElement = document.createElement('img');
    imgElement.src = imageSrc;
    imgElement.alt = 'Flower Image';
    imgElement.classList.add('filtred-images')
    return imgElement;
}


// shouw decriptions based on previous info

function showArrangment() {
    formState.colors.forEach(color => {
        formState.flowers.forEach(flower => {
            const images = formState.images[color][flower];
            if (images) {
                images.forEach(imageData => {
                    console.log(imageData);
                    const imagePath = `images/show/${imageData.image}`
                    const image = createImageElement(imagePath)
                    document.getElementById('imageGallery').appendChild(image)
                })
            }
        })
    })
}



// switching filtres

document.querySelectorAll('.next').forEach(item => item.addEventListener('click', () => {
    const length = screen.length
    console.log(length);
    if (count === 4) {
        console.log('yses');
        showScreen()
        showArrangment()
    }
    if (count === length) {
        showForm()
    } else {
        count++
        showScreen()
    }
}))





// Display images based on colors and flowers





const changeFilterState = (state) => {
    const colorFilter = document.querySelectorAll('.colorFilter'),
        serviceFilter = document.querySelectorAll('.serviceFilter'),
        weddingFilter = document.querySelectorAll('.weddingFilter'),
        flowersFilter = document.querySelectorAll('.flowersFilter')

    function bindActionToElems(event, elems, prop) {
        elems.forEach((item) => {
            item.addEventListener(event, (e) => {
                // Check if the property exists in the state object
                const target = e.target
                if (!state[prop]) {
                    state[prop] = [];
                }
                const value = item.getAttribute('id');
                const index = state[prop].indexOf(value)
                if (index === -1) {
                    // If the value is not in the array, add it
                    state[prop].push(value);
                    // state.amount = amount
                } else {
                    // If the value is already in the array, remove it
                    state[prop].splice(index, 1);
                }

                if (item.classList.contains('serviceFilter')) {
                    state[prop] = []
                    handlingClick(serviceFilter, target)
                    if (item.classList.contains('active')) state[prop].push(value)
                }

                if (item.classList.contains('square')) {
                    item.classList.toggle('active')
                }
                console.log(state);
            });
        });
    }
    bindActionToElems('click', serviceFilter, 'service');
    bindActionToElems('click', colorFilter, 'colors');
    bindActionToElems('click', weddingFilter, 'style');
    bindActionToElems('click', flowersFilter, 'flowers');

}


changeFilterState(formState)

