const input= document.querySelector('input');
const defaultText= document.querySelector('#default');
const debounceText= document.querySelector('#debounce');

const updateText= debounce((text)=>{
    debounceText.textContent= text
});


input.addEventListener('input', (e)=>{
    defaultText.textContent= e.target.value;
    updateText(e.target.value);
});



function debounce(callback, delay=250){
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer= setTimeout(()=>{
            callback(...args)
        }, delay);
    }
}