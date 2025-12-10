// https://learnersbucket.com/examples/interview/html-encoding-of-a-string/

// Input:
// const str = 'Hello, world'; 
// const styleArr = [[0, 2, 'i'], [4, 9, 'b'], [7, 10, 'u']];

// Output: 
// '<i>Hel</i>l<b>o, w<u>orl</u></b><u>d</u>'
// '<i>Hel</i>o<b>, w<u>orl</b>d</u>'

function encode(start, end, string, tag) {
    const stack = []
    let i = 0
    while (i < string.length) {
        if (string[i] === '<')
    }

    return `${string.substr(0, start - 1)}<${tag}>${string.substr(start, end + 1)}</${tag}>${string.substr(end + 2)}`
}

console.log(encode(0, 2, 'Hello, world', 'i'))

function htmlEncode(str, styleArr) {
    let output = str
    for (let item of styleArr) {
        output = encode(item[0], item[1], output, item[2])
    }
    return output
}

const styleArr = [[0, 2, 'i'], [4, 9, 'b'], [7, 10, 'u']];

console.log(htmlEncode('Hello, world', styleArr))


    // < i > Hel</i > lo, world

    //     < i > Hel</i > l < b > o, wor</b > ld

    //         < i > Hel</i > l < b > o, <u>wor</b>ld
