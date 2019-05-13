import { HomePage } from './home.po';
import { browser, logging, ElementArrayFinder } from 'protractor';
import { GeneralUtils } from './utils';
import { CityCard } from './citycard.po';

describe('Backbase Weather App', () => {
  let page: HomePage;
  let utils: GeneralUtils;
  let cityCard: CityCard;

  beforeEach(() => {
    page = new HomePage();
    utils = new GeneralUtils();
    cityCard = new CityCard();
  });

  it('should navigate to /weather', async () => {
    await utils.navigateTo();
    await utils.waitForUrl('/weather');
    expect(browser.getCurrentUrl()).toContain('/weather');
  });

  it('should display the navigation bar', async () => {
    await utils.navigateTo();
    await utils.waitForSpinner();
    await expect(page.getTitleText()).toEqual('Backbase Weather App');
  });

  it('should display five city cards', async () => {
    await utils.navigateTo();
    await utils.waitForSpinner();
    const ce = await page.getCardElements();
    expect(ce.length).toBe(5);
  });

  it('city cards display a plausible content', async () => {
    await utils.navigateTo();
    await utils.waitForSpinner();
    const ce = await page.getCardElements();

    await expect(cityCard.checkCardContent(ce[0], 'Amsterdam')).toBe('OK');
    await expect(cityCard.checkCardContent(ce[1], 'Dublin')).toBe('OK');
    await expect(cityCard.checkCardContent(ce[2], 'London')).toBe('OK');
    await expect(cityCard.checkCardContent(ce[3], 'Paris')).toBe('OK');
    await expect(cityCard.checkCardContent(ce[4], 'Berlin')).toBe('OK');
  });

  it('navigates to forecast page when clicking on a card', async () => {
    await utils.navigateTo();
    await utils.waitForSpinner();
    const ce = await page.getCardElements();
    await ce[1].click();
    await utils.waitForUrl('/weather/dublin');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});
