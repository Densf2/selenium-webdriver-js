/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */

'use_strict';

const {
  Builder, By, Key, until,
} = require('selenium-webdriver');
const assert = require('assert');

class SeachPage {
  constructor(driver) {
    this.driver = driver;
  }

  async createDriver() {
    driver = await new Builder().forBrowser('firefox').build();
  }

  async openMainPageAndClickSearch() {
    assert(await driver.getTitle() == 'Сообщество программистов | DOU');
    await driver.findElement(By.css('input.inp')).click();
  }

  async fillQaTextInInput() {
    await driver.findElement(By.id('txtGlobalSearch')).sendKeys('QA', Key.ENTER);
  }

  async checkRedirectToSearchPage() {
    await driver.wait(until.elementLocated(By.id('resInfo-0')), 5000);
    assert(await driver.getTitle() == 'Поиск | DOU');
  }
}

module.exports = SeachPage;
