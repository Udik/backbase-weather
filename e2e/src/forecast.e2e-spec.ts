import { HomePage } from './home.po';
import { browser, logging, ElementArrayFinder } from 'protractor';
import { GeneralUtils } from './utils';
import { ForecastPage } from './forecast.po';
import { CityCard } from './citycard.po';

describe('Forecast Page', () => {
  let page: ForecastPage;
  let cityCard: CityCard;
  let utils: GeneralUtils;

  beforeEach(() => {
    page = new ForecastPage();
    cityCard = new CityCard();
    utils = new GeneralUtils();
  });

  it('should navigate to /weather/city', async () => {
    await utils.navigateToUrl('weather/dublin');
    await utils.waitForUrl('/weather/dublin');
    await utils.waitForSpinner();
    await expect(utils.getRelativeUrl()).toBe('/weather/dublin');
  });

  it('should display the back link', async () => {
    await utils.navigateToUrl('weather/dublin');
    await utils.waitForSpinner();
    const link = await page.getBackLink();
    await expect(link.getText()).toContain('Back');
  });

  it('back link should navigate to home', async () => {
    await utils.navigateToUrl('weather/dublin');
    await utils.waitForSpinner();
    const link = await page.getBackLink();
    await link.click();
    await expect(utils.getRelativeUrl()).toBe('/weather');
  });

  it('should display the city weather card', async () => {
    await utils.navigateToUrl('weather/dublin');
    await utils.waitForSpinner();
    const cc = await page.getCityCard();
    await expect(cc.length).toBe(1);
    await expect(cityCard.checkCardContent(cc[0], 'Dublin')).toBe('OK');
  });

  it('should display 16 forecast rows', async () => {
    await utils.navigateToUrl('weather/dublin');
    await utils.waitForSpinner();
    const fr = await page.getForecastRows();
    expect(fr.length).toBe(16);
  });

  it('should redirect to error on unrecognized city', async () => {
    await utils.navigateToUrl('weather/xyz');
    await utils.waitForSpinner();
    await utils.waitForUrl('/error');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});
