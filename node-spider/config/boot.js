const path = require('path')

const executablePath = path.resolve('../../Downloads/chrome-win32/chrome.exe')

if (!executablePath) {
    console.log(`The Directory '${executablePath}' is not existed..`)
}


const boot = {
    executablePath
}

module.exports = boot;