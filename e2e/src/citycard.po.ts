import { browser, by, element, protractor, ElementFinder, ElementArrayFinder } from 'protractor';

const delay = 200;

export class CityCard {

  async checkCardContent(card: ElementFinder, title: string) {
    const ctitle = await card.element(by.css('mat-card-title')).getText();
    if (ctitle !== title) {
      return `wrong title: ${title} - ${ctitle}`;
    }

    const cdesc = await card.element(by.css('.innerlist>li:nth-child(1)')).getText();
    if (cdesc === '') {
      return 'weather description empty';
    }

    const ctemp = await card.element(by.css('.innerlist>li:nth-child(2)')).getText();
    if (!ctemp.match(/^-{0,1}[1-9]{0,1}[0-9](\.[0-9]){0,1} ℃$/)) {
      return 'temperature issue ' + ctemp;
    }

    const cwind = await card.element(by.css('.innerlist>li:nth-child(3)')).getText();
    if (!cwind.match(/^[1-9]{0,1}[0-9](\.[0-9]){0,1} km\/h$/)) {
      return 'wind issue' + cwind;
    }

    return 'OK';
  }
}
