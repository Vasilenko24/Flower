import formState from './state.js';


const options = document.querySelectorAll('.option')
const screen = document.querySelectorAll('.screen')
const form = document.getElementById('form')
let totalAmount = document.getElementById('totalAmount')
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
function createImageElement(imageSrc, price) {
    let imgBlock = document.createElement('div');

    let imgWrap = document.createElement('div')
    imgWrap.classList.add('imagewrap')

    let imgElement = document.createElement('img');
    imgBlock.classList.add('imageGallery-block');
    imgElement.src = imageSrc;
    imgElement.alt = 'Flower Image';
    imgElement.classList.add('filtred-images');

    let spanElement = document.createElement('span');
    spanElement.textContent = `${price || 'N/A'}`;

    // Create input field for quantity
    let quantity = document.createElement('div')
    quantity.classList.add('quantity', 'hidden')
    let quantityInput = document.createElement('input');
    quantityInput.classList.add('quantity-input')
    quantityInput.type = 'number'
    quantityInput.value = 0
    quantityInput.min = 0

    let increaseButton = document.createElement('button')
    increaseButton.textContent = '+'
    increaseButton.classList.add('quantity-button', 'increase')

    let decreaseButton = document.createElement('button')
    decreaseButton.textContent = '-'
    decreaseButton.classList.add('quantity-button', 'decrease')

    // Append elements to the imgBlock
    imgWrap.appendChild(imgElement)

    quantity.appendChild(decreaseButton);
    quantity.appendChild(quantityInput);
    quantity.appendChild(increaseButton);

    imgBlock.appendChild(imgWrap);
    imgBlock.appendChild(spanElement);
    imgBlock.appendChild(quantity)


    imgWrap.addEventListener('click', () => {
        imgBlock.classList.toggle('active')
        if (imgBlock.classList.contains('active')) {
            quantity.classList.toggle('hidden')
        } else {
            quantity.classList.add('hidden')
        }
    })
    increaseButton.addEventListener('click', () => handleQuantityButtonClick(increaseButton, quantityInput, spanElement));
    decreaseButton.addEventListener('click', () => handleQuantityButtonClick(decreaseButton, quantityInput, spanElement));

    return imgBlock;
}
function handleQuantityButtonClick(button, quantityInput, spanElement) {
    let currentInputValue = parseInt(quantityInput.value)
    const flowerPrice = spanElement.textContent
    const spanText = 'from $'
    const clearPrice = +flowerPrice.replace(spanText, '').trim()

    if (button.classList.contains('increase')) {
        totalAmount.textContent = (+totalAmount.textContent + clearPrice)
        quantityInput.value = currentInputValue + 1
    }
    if (button.classList.contains('decrease') && currentInputValue > 0) {
        totalAmount.textContent = (+totalAmount.textContent - clearPrice)
        quantityInput.value = currentInputValue - 1
    }
}

// filtredClicks on images from state


// shouw decriptions based on previous info

function showArrangment() {
    formState.colors.forEach(color => {
        formState.flowers.forEach(flower => {
            const images = formState.images[color][flower];
            if (images) {
                images.forEach(imageData => {
                    const price = `from $${imageData.price}`
                    const imagePath = `images/show/${imageData.image}`
                    const image = createImageElement(imagePath, price)

                    document.getElementById('imageGallery').appendChild(image)



                    // document.querySelector('.price').appendChild(price)
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
        formState.amount = totalAmount.textContent
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

