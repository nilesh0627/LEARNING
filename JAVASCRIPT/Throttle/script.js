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
        // if timer exists that means any callback is already in queue so just store the latest arguments and return
        if (timerId) {
            lastArgs = args
            return
        }
        // below will be executed if timer doesn't exists 
        func.apply(this, args)
        timerId = setTimeout(() => {
            timerId = null
            // this will be executed once the wait is over and will execute with latest args.
            if (lastArgs) func.apply(this, lastArgs)
        }, wait)
    }
}