// Third Party Lib
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

// Custom Modules
const executablePath = require('./config/boot').executablePath
const getText = require('./modules/domParse')


(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'],
        executablePath
    })
    const page = await browser.newPage();

    await page.setViewport({
        width: 1400,
        height: 900
    })
    // await page.emulate(iPhone);
    await page.goto('https://book.douban.com/', {
        timeout: 0
    })
    await page.waitForSelector('#content > div > div.aside > div.section.weekly-top > div.bd > ul:nth-child(2) > li:nth-child(10)')
    const bodyInnerHTML = await page.$eval('#content > div > div.aside > div.section.weekly-top', dom => dom.innerHTML);
    let book = getText(bodyInnerHTML, '.book-info a')
    let author = getText(bodyInnerHTML, '.book-info .author')

    let result = [];
    for (let i = 0; i < 10; i ++) {
        result.push({
            name: book[i],
            author: author[i]
        })
    }

    console.log(result);
    await browser.close()
})();