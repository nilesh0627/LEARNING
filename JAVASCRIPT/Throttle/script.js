const input= document.querySelector('input');
const defaultText= document.querySelector('#default');
const throttleText= document.querySelector('#throttle');


input.addEventListener('input', (e)=>{
    defaultText.textContent= e.target.value;
})