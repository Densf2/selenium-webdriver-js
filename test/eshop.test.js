/* eslint-disable max-len */
/* eslint-disable no-undef */
const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('demo_prego_ua', () => {
  this.timeout(30000);

  beforeEach(async () => {
    driver = await new Builder().forBrowser('firefox').build();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('demo_prego_ua', async () => {
    await driver.get('https://prego.ua/');
    await driver.manage().window().setRect(1440, 900);
    await driver.executeScript('window.scrollTo(0,30)');
    await driver.findElement(By.css('div.sale-categories > a:nth-child(3)')).click();
  });

  it('example of explicit wiat', async () => {
    // example of explicit wait in selenium test
    await driver.get('https://prego.ua/');
    await driver.manage().window().setRect(1440, 900);
    await driver.findElement(By.linkText('Наші магазини')).click();
    // explicit wait added after the element from frontend
    // the webdriver wait for the element
    await driver.findElement(By.css("div.shops__list-wrapper > div > div:nth-child(1)[data-city='м. Київ']"), 10000);
  });

  it('expmple of implict wait', async () => {
    // implict wait added before the all test
    // and timeout works for all elements for all operations below
    // if element still invisible - the webdriver log the error
    await driver.manage().setTimeouts({ implicit: 10000 });
    await driver.get('https://prego.ua/');
    // example of checking the link without visit to
    const blogLink = await driver.findElement(By.css('ul.nav-top li:nth-child(5) a')).getAttribute('href');
    expect(blogLink).to.equal('https://prego.ua/uk/blog');
    await driver.findElement(By.linkText('Блог')).click();
    await driver.findElement(By.css('div.multifilter:nth-child(5) > a')).click();
    const imgLink = await driver.findElement(By.css('section.blog-large > div > article:nth-child(1) > div > figure > a > div > img')).getAttribute('src');
    expect(imgLink).to.equal('https://static.prego.ua/img?path=BlogPost&name=d988b341-0263-4dff-bb04-28f20c829282.jpg&w=480&h=300&q=80');
  });

  it('example of fluent wait', async () => {
    await driver.get('https://prego.ua/uk/oplata');
    // correct verion of fluent wait
    // the fluent wait used for one element
    await driver.wait(until.elementsLocated(By.xpath('/html/body/div[3]/section/div[2]/div/div/div/div/div[7]/strong[1]'), 10000, 'Timed out after 10 seconds', 2000));
    // incorrect version of fluent wait
    // await driver.wait(until.elementsLocated(By.xpath("/html/body/div[3]/section/div[2]/div/div/div/div/div[22]"), 10000, 'Timed out after 10 seconds', 2000))
  });
});
