import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Google Search', function() {
  this.timeout(30000);
  let driver;

  before(async function() {
    driver = await new Builder()
      .usingServer('http://localhost:4444/wd/hub')
      .forBrowser('chrome')
      .build();
  });

  after(async function() {
    await driver.quit();
  });

  it('should open Google and search for "Selenium"', async function() {
    await driver.get('https://www.google.com');
    await driver.findElement(By.name('q')).sendKeys('Selenium', Key.RETURN);
    await driver.wait(until.titleContains('Selenium'), 10000);
    const title = await driver.getTitle();
    expect(title).to.include('Selenium');
  });
});

