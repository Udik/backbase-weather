// tslint:disable:no-string-literal

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherIconComponent } from './weathericon.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('WeatherIconComponent', () => {
  let component: WeatherIconComponent;
  let fixture: ComponentFixture<WeatherIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherIconComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
