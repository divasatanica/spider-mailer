const getMovieRank = require('./stuff/movies/douban-rank')

const bootOptions = require('./config/boot')

bootOptions.headless = false

getMovieRank(bootOptions).then(console.log).catch(e => {
    console.log(e)
})