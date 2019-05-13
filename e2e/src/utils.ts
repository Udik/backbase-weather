import { browser, by, element, protractor } from 'protractor';

const delay = 200;

export class GeneralUtils {
  async navigateTo() {
    return await browser.get(browser.baseUrl) as Promise<any>;
  }

  async navigateToUrl(url: string) {
    return await browser.get(browser.baseUrl + '/' + url) as Promise<any>;
  }

  async waitForSpinner() {
      const until = protractor.ExpectedConditions;
      await browser.wait(until.invisibilityOf(element(by.id('global-spinner'))),
          15000, 'Spinner taking too long to disappear');
  }

  async waitForUrl(url: string) {
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.urlContains(url), 5000);
  }

  async getRelativeUrl() {
    const url = await browser.getCurrentUrl();
    return '/' + url.split('/').splice(3).join('/');
  }
}
