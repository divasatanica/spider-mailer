/**
 * @author coma
 * @description 生成电影爬取信息
 */

const KEY_NAME = {
    'director': '导演',
    'creator': '编剧',
    'actors': '主演',
    'up_date': '上映日期:',
    'preview': '概要' 
}


function _renderSingleMovie (info) {
    let head = `<div style="padding: 5px 8px">
                <h1>${info.title}</h1>`
    let _info = ((k, v) => `<div style="display: flex">
                    <p style="padding: 2px 3px">${k}</p>
                    <p style="padding: 2px 3px">${v}</p>
                </div>`)
    for (let i in info) {
        if (info.hasOwnProperty(i)) {
            if (i !== 'title') {
                head += _info(KEY_NAME[i], info[i])
            }
        }
    }
    head += `</div>`
    return head
}

function _renderRank (data) {
    let str = `<!DOCTYPE HTML><html><head>
                <style>
                    div, p, body, html {
                        margin: 3px;
                    }
                </style>
                </head>
                <body>
                    <div style="padding: 10px 16px"><div>`

    for (let i = 0, len = data.length; i < len; i ++) {
        str += _renderSingleMovie(data[i])
    }
    str += `</div></body></html>`
    return str
}

function render (data) {
    return _renderRank(data)
}

module.exports = render