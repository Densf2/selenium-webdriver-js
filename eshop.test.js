const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')
const { expect } = require('chai')
require("mocha-allure-reporter")
const log4js = require('log4js')

describe('demo_prego_ua', function() {
  this.timeout(30000)
const step = allure.createStep("initial", () => {})
const logger = log4js.getLogger()
logger.level = 'debug'

  
  beforeEach(async function() {
    driver = await new Builder().forBrowser('firefox').build()
  })

  afterEach(async function() {
    await driver.quit();
  })

  it('demo_prego_ua', async function() {
    await driver.get("https://prego.ua/")
    await driver.manage().window().setRect(1440, 900)
    await driver.executeScript("window.scrollTo(0,30)")
    await driver.findElement(By.css("div.sale-categories > a:nth-child(3)")).click()
    logger.debug('Initial test passed')
  })

  it('example of explicit wiat', async function() {
    await driver.get("https://prego.ua/")
    await driver.manage().window().setRect(1440, 900)
    await driver.findElement(By.linkText("Наші магазини")).click()
    await driver.findElement(By.css("div.shops__list-wrapper > div > div:nth-child(1)[data-city='м. Київ']"), 10000)
    // assert(await driver.findElement(By.css("li.shops__cities-item--active")).getText() == "КИЇВ")
    logger.debug('Exmple with explicit wait finished')
    logger.info('Finished the first part of tests')
  })

  it('expmple of implict wait', async function() {
    await driver.manage().setTimeouts( { implicit: 10000} )
    await driver.get("https://prego.ua/")
    // example of checking the link without visit to 
    const blogLink = await driver.findElement(By.css("ul.nav-top li:nth-child(5) a")).getAttribute("href")
    expect(blogLink).to.equal("https://prego.ua/uk/blog")
    await driver.findElement(By.linkText("Блог")).click()
    await driver.findElement(By.css("div.multifilter:nth-child(5) > a")).click()
    const imgLink = await driver.findElement(By.css("section.blog-large > div > article:nth-child(1) > div > figure > a > div > img")).getAttribute("src")
    expect(imgLink).to.equal("https://static.prego.ua/img?path=BlogPost&name=d988b341-0263-4dff-bb04-28f20c829282.jpg&w=480&h=300&q=80")
  })

  // it('example of fluent wait', async function() {
  //   await driver.get("https://prego.ua/uk/oplata")
  //   // correct verion of fluent wait
  //   // await driver.wait(until.elementsLocated(By.xpath("/html/body/div[3]/section/div[2]/div/div/div/div/div[7]/strong[1]"), 10000, 'Timed out after 10 seconds', 2000))
  //   //incorrect version of fluent wait
  //   await driver.wait(until.elementsLocated(By.xpath("/html/body/div[3]/section/div[2]/div/div/div/div/div[22]"), 1000, 'Timed out after 10 seconds', 200))
  // })
})
