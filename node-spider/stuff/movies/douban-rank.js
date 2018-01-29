/**
 * @author coma
 * @description 豆瓣新片榜爬取
 */

// Third Party Lib
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

// Custom Modules
const executablePath = require('../../config/boot').executablePath
const domParse = require('../../modules/domParse')

async function getMovieRank (options){
    const browser = await puppeteer.launch(options)
    const page = await browser.newPage();

    await page.setViewport({
        width: 1400,
        height: 900
    })
    await page.goto('https://movie.douban.com/chart', {
        timeout: 0
    })
    await page.waitForSelector('#content > div > div.article > div > div > table:nth-child(29)')

    let inner = await page.$eval(`#content > div > div.article > div > div`, dom => dom.innerHTML)

    let href = domParse.getProperties(inner, 'table > tbody > tr > td:nth-child(2) > div > a', 'href')

    await browser.close()

    return href
}

getMovieRank();

module.exports = getMovieRank;