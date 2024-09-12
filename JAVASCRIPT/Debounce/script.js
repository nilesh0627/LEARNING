const input = document.querySelector('input');
const defaultText = document.querySelector('#default');
const debounceText = document.querySelector('#debounce');

const updateText = debounce((text) => {
    debounceText.textContent = text
});


input.addEventListener('input', (e) => {
    defaultText.textContent = e.target.value;
    updateText(e.target.value);
});



function debounce(callback, delay = 250) {
    let timer;
    return function (...args) {
        // if timer exists that means something is in queue to be executed so just clear that thing 
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            // below will be executed once delay is completed.
            callback.apply(this, args)
        }, delay);
    }
}