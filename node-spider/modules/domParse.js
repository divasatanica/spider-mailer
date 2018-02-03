const cheerio = require('cheerio')

function getText (h, selector) {
    let $ = cheerio.load(h)
    let col = $(selector.trim(), h)
    
    let arr = []

    for (let i = 0, len = col.length; i < len; i ++) {
        col[i] && col[i].children[0] && arr.push(col[i].children[0].data)
    }

    return arr;
}

function getProperties (h, selector, name) {
    let $ = cheerio.load(h)
    let col = $(selector, h)

    let arr = []
    for (let i = 0, len = col.length; i < len; i++) {
        arr.push(col[i].attribs[name])
    }

    return arr;
}


module.exports = {
    getText,
    getProperties
}