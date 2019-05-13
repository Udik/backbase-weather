import { browser, by, element, protractor, ElementFinder, ElementArrayFinder } from 'protractor';

const delay = 200;

export class HomePage {
  async getTitleText() {
    return await element(by.css('app-root h1')).getText();
  }

  async getCardElements() {
    return await element.all(by.css('.cardsContainer app-city-card'));
  }

  async getCardElementsArray() {
    return await element.all(by.css('.cardsContainer app-city-card')).asElementFinders_();
  }
}
