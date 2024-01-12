const options = document.querySelectorAll('.option')
const screens = document.querySelectorAll('.screen')
const form = document.getElementById('form')
const result = document.getElementById('result')
let count = 1
let formState = {
    amount: []
}

// showing filtres
function showScreen() {
    screens.forEach(item => {
        item.classList.add('hidden')
        document.getElementById(`screen${count}`).classList.remove('hidden')
    })
}
showScreen(count)

// showDetails

document.getElementById('show').addEventListener('click', () => {
    document.querySelector('.description-show').classList.toggle('hid')
})

// handling clicks 
options.forEach(el => {
    el.addEventListener('click', () => {
        el.classList.toggle('active')
    })
})

// last form/result
function showForm() {
    screens.forEach(item => {
        item.classList.add('hidden')
    })
    document.getElementById('colors').innerHTML = `<div>Цвет</div> <div>${formState.colors}</div>`
    document.getElementById('ceremony').innerHTML = `<div>Wеремония</div> <div>${formState.ceremony}</div>`
    document.getElementById('flowers').innerHTML = `<div>Цветы</div> <div>${formState.flowers}</div>`
    document.getElementById('total').innerHTML = `${formState.amount}`

    form.classList.remove('hidden')
}

// switching filtres
document.querySelectorAll('.next').forEach(item => item.addEventListener('click', () => {
    const length = screens.length
    if (count === length) {
        showForm()
    } else {
        count++
        showScreen()
    }
}))

const changeFilterState = (state) => {
    const colorFilter = document.querySelectorAll('.colorFilter'),
        weddingFilter = document.querySelectorAll('.weddingFilter'),
        flowersFilter = document.querySelectorAll('.flowersFilter')

    function bindActionToElems(event, elems, prop) {
        elems.forEach((item) => {
            item.addEventListener(event, () => {
                // Check if the property exists in the state object
                if (!state[prop]) {
                    state[prop] = [];
                }

                // Toggle the value in the state array
                const amount = item.getAttribute('value')
                const value = item.getAttribute('id');
                const index = state[prop].indexOf(value)
                if (index === -1) {
                    // If the value is not in the array, add it
                    state[prop].push(value);
                    state.amount = amount
                } else {
                    // If the value is already in the array, remove it
                    state[prop].splice(index, 1);
                }

                console.log(state);
            });
        });
    }

    bindActionToElems('click', colorFilter, 'colors');
    bindActionToElems('click', weddingFilter, 'ceremony');
    bindActionToElems('click', flowersFilter, 'flowers');
}


changeFilterState(formState)
