// https://learnersbucket.com/examples/interview/count-strings-occurrence-in-array-of-strings-javascript/

// Input:
// const URLs = [
//   "www.google.com",
//   "www.learnersbucket.com",
//   "google.com",
//   "learnersbucket.com",
//   "news.learnersbucket.com",
// ];

// Output:
// {
//   "www.google.com": 1,
//   "www.learnersbucket.com": 1,
//   "google.com": 2,
//   "learnersbucket.com": 3,
//   "news.learnersbucket.com": 1
// }


const getStrMap = (URLs) => {
    return URLs.reduce((map, url, index, array) => {

        let count = 0

        array.forEach(element => {
            if (element.includes(url)) count++
        });
        map[url] = count

        return map

    }, {})
}


const URLs = [
    "www.google.com",
    "www.learnersbucket.com",
    "google.com",
    "learnersbucket.com",
    "news.learnersbucket.com",
];

console.log(getStrMap(URLs))

