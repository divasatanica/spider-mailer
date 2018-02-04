const getMovieRank = require('./stuff/movies/douban-rank')

const bootOptions = require('./config/boot')

const movieHTMLRender = require('./stuff/movies/h_gen')
const sendMail = require('../node-mailer/index')

bootOptions.headless = true

let _args = process.argv

switch (_args[3]) {
    case 'douban-top10': {
        getMovieRank(isDev() && bootOptions).then(data => {
            let html = movieHTMLRender(data)
            sendMail('豆瓣电影排行榜', html)
        }).catch(e => {
            console.log(e)
        })
        break
    }
}

function isDev () {
    return process.argv[2] === 'dev'
}
