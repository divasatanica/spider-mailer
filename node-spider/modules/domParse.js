const cheerio = require('cheerio')

function getText (h, selector) {
    let $ = cheerio.load(h)
    let col = $(selector, h)
    
    let arr = []
    for (let i = 0, len = col.length; i < len; i ++) {
        arr.push(col[i].children[0].data)
    }

    return arr;
}


module.exports = getText