"use_strict"

const { Key, until, Builder, By } = require("selenium-webdriver")
const { expect, assert } = require('chai')

class searchPage {
    constructor(driver) {
        this.driver = driver;
    }

    async createDriver() {
        driver = await new Builder().forBrowser('firefox').build()
    }

    async enterTheSearchText(locator, searchText) {
        return await driver.findElement(By.id(locator)).sendKeys(searchText, Key.RETURN)
    }

    async openTheSearchResultPage() {
        return await driver.get("https://prego.ua/uk/internal/full-search-result?query=КЕДИ")
    }

    async verifyTheSearchResultPageForSneakers(locator, text) {
        const h2TextOnSearchPage = await driver.findElement(By.css(locator )).getText()
        expect(h2TextOnSearchPage).to.equal(text)
    }
}


module.exports = searchPage;