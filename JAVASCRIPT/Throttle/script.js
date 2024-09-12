const input = document.querySelector('input');
const defaultText = document.querySelector('#default');
const throttleText = document.querySelector('#throttle');


input.addEventListener('input', (e) => {
    defaultText.textContent = e.target.value;
})

function throttle(func, wait) {
    // your code here
    let timerId, lastArgs
    return function (...args) {
        if (timerId) {
            lastArgs = args
            return
        }
        func.apply(this, args)
        timerId = setTimeout(() => {
            timerId = null
            if (lastArgs) func.apply(this, lastArgs)
        }, wait)
    }
}