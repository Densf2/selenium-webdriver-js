/* eslint-disable no-undef */
const { Builder, By, Key } = require('selenium-webdriver');
const { expect } = require('chai');
const Search = require('../page/search-page');

describe('demo of serch at prego_ua', () => {
  this.timeout(30000);

  // list of the selectors and text data
  const searchInput = 'searchFormQueryInput';
  const headinngTextOfSearchPage = 'div > h2';

  // data
  const searchText = 'черевики';
  const sneakerTextOnSearchPage = 'на КЕДИ запит знайдено 353 збігів';

  // create the new element of the Search
  const searchpage = new Search();

  beforeEach(async () => {
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get('https://prego.ua/');
    await driver.manage().window().setRect(1440, 900);
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('checking the search', async () => {
    await driver.findElement(By.css('form#searchForm input')).click;
    await driver.findElement(By.id(searchInput)).sendKeys(searchText, Key.RETURN);
    await driver.findElement(By.css('span.header-icon_search')).click;
    await driver.get('https://prego.ua/uk/internal/full-search-result?query=черевики');
    const h2TextOnSearchPage = await driver.findElement(By.css(headinngTextOfSearchPage)).getText();
    expect(h2TextOnSearchPage).to.equal('НА ЧЕРЕВИКИ ЗАПИТ ЗНАЙДЕНО 3471 ЗБІГІВ');
    // open the first element in the search result list
    // eslint-disable-next-line no-unused-vars
    const stuffCode = await driver.findElement(By.css('div._result:nth-child(1) div.name span')).getText();
  });

  it('checking search with loaded pom objects', async () => {
    await searchpage.enterTheSearchText(searchInput, searchText);
    await searchpage.openTheSearchResultPage(headinngTextOfSearchPage, sneakerTextOnSearchPage);
  });
});
