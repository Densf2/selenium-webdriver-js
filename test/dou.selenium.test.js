/* eslint-disable func-names */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const Search = require('../page/search_page_dou');

describe('dou_salary', function () {
  const searchapge = new Search();
  this.timeout(30000);
  // let driver
  beforeEach(async () => {
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get('https://dou.ua/');
    await driver.manage().window().setRect(892, 796);
  });
  after(async () => {
    await driver.quit();
  });
  it('dou_salary', async () => {
    // await driver.get("https://dou.ua/")
    // await driver.manage().window().setRect(892, 796)
    assert(await driver.findElement(By.css('.m-hide > .sel')).getText() == 'ГЛАВНАЯ');
    await driver.findElement(By.css('.b-head li:nth-child(5) > a')).click();
    assert(await driver.findElement(By.linkText('Динамика')).getText() == 'Динамика');
    assert(await driver.getTitle() == 'Cтатистика зарплат программистов, тестировщиков и PM в Украине | DOU');
    await driver.close();
  });

  it('Click on search input on main page', async () => {
    await searchapge.openMainPageAndClickSearch();
    await searchapge.fillQaTextInInput();
    await searchapge.checkRedirectToSearchPage();
  });
});
