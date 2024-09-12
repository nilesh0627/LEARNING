const object = { 'a': [{ 'b': { 'c': 3, 'd': 4 } }] };



function get(object, path) {
    const pathArr = Array.isArray(path) ? path : path.replaceAll('[', '.').replaceAll(']', '.').split('.').filter(item => !!item)
    let res = object
    for (let item of pathArr) {
        res = res[item]
    }
    return res
}





console.log(get(object, ['a', '0', 'b', 'c']));


console.log(get(object, 'a[0].b.d'));