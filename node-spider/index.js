const getMovieRank = require('./stuff/movies/douban-rank')

const bootOptions = require('./config/boot')

console.log(bootOptions)

bootOptions.headless = false

getMovieRank(bootOptions).then(console.log)