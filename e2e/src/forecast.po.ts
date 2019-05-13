import { browser, by, element, protractor, ElementFinder, ElementArrayFinder } from 'protractor';

const delay = 200;

export class ForecastPage {

  async getCityCard() {
    return await element.all(by.css('app-city-card'));
  }

  async getBackLink(): Promise<ElementFinder> {
    return await element(by.css('.homeNavigation'));
  }

  async getForecastRows() {
    return await element.all(by.css('.forecastPeriod'));
  }
}
