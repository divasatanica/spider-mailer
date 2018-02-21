const getMovieRank = require('./stuff/movies/douban-rank')

const bootOptions = require('./config/boot')

const movieHTMLRender = require('./stuff/movies/h_gen')
const request = require('superagent')

bootOptions.headless = false

let _args = process.argv

switch (_args[3]) {
    case 'douban-top10': {
        getMovieRank(envOpt() || bootOptions).then(data => {
            let html = movieHTMLRender(data)
            let date = new Date()
            request.put('http://localhost:9608/mail/s001')
                   .send({
                       subject: `${date.toLocaleDateString()} 豆瓣电影榜`,
                       content: html,
                       service: 'qq'
                   })
                   .end(res => {
                       console.log(res)
                   })
        }).catch(e => {
            console.log(e)
        })
        break
    }
}

function envOpt () {
    let result
    if (process.argv[2] === 'dev') {
        result = null
    } else if (process.argv[2] === 'pro') {
        result = {
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        }
    }
    return result
}
