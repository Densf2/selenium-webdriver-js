const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('startup', function() {
  this.timeout(30000)

  beforeEach(async function() {
    driver = await new Builder().forBrowser('firefox').build()
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('open the startup page and click 1 article', async function() {
    await driver.get("https://ain.ua/en/tag/startups/")
    await driver.manage().window().setRect(1440, 900)
    await driver.findElement(By.xpath("//a[contains(@href, \'https://ain.ua/en/2020/06/24/taxation-of-grants-in-ukraine/\')]")).click()
    assert(await driver.findElement(By.css("h1")).getText() == "Grantees of the Ukrainian Startup Fund have to pay a 19.5% tax")
  })
})

// for launch fill the command starts from test
// test command added to the package.json

// if received the issue with selenium-webdriver
// put the command 
//npm install selenium-webdriver