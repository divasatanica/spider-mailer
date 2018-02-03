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
const ITEM_COUNT = 3
const KEY_NAME = {
    '导演': 'director',
    '编剧': 'creator',
    '主演': 'actors',
    '上映日期:': 'up_date'
}

async function getMovieRank (options){
    const browser = await puppeteer.launch(options)
    const page = await browser.newPage();
    let result, info_h, buf, arr = []

    await page.setViewport({
        width: 1400,
        height: 900
    })
    await page.goto('https://movie.douban.com/chart', {
        timeout: 0
    })
    await page.waitForSelector('#content > div > div.article > div > div > table:nth-child(29)')
    let chart_h = await page.$eval(`#content > div > div.article > div > div`, dom => dom.innerHTML)
    let href = domParse.getProperties(chart_h, 'table > tbody > tr > td:nth-child(2) > div > a', 'href')
 
    for (let i = 0, len = href.length; i < len; i ++) {
        result = {}
        await page.goto(href[i])
        await page.waitForSelector('#link-report > span:nth-child(1)')


        info_h = await page.$eval('#content', dom => dom.innerHTML)
        result.title = (domParse.getText(info_h, 'h1 > span:nth-child(1)'))[0]
    
        await page.click('#info > span:nth-child(5) > span.attrs > a')
        let opt = {
            h: info_h
        }
        for (let i = 0; i < ITEM_COUNT; i ++) {
            opt.ks = `#info > span:nth-child(${1 + 2 * i}) > span.pl`
            opt.vs = `#info > span:nth-child(${1 + 2 * i}) > span.attrs a`
            _addInfo(opt, result)
        }
        result.preview = (domParse.getText(info_h, '#link-report > span:nth-child(1)'))[0].trim()
        arr.push(result)
    }

    await browser.close()

    return arr
}

function _addInfo(opt, result) {
    let buf = _getKeyValue(opt)
    result[KEY_NAME[buf.key]] = buf.val
}

function _getKeyValue (opt) {
    let _inner = opt.h
    let result, _pl, _attrs

    try {
        _pl = domParse.getText(_inner, opt.ks, opt.ki)
        _attrs = domParse.getText(_inner, opt.vs, opt.vi)
        result = {
            key: _pl[0],
            val: _attrs.join('/')
        }       
    } catch (e) {
        result = {}
    }
    return result
}

getMovieRank().catch(e => {
    console.log(e)
})

module.exports = getMovieRank