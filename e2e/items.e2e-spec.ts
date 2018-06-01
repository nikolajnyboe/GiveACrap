import { element, by, browser, protractor } from "protractor";

describe('User flow', () => {

  beforeAll(() => {
    browser.get('register')
  });

  it('Should navigate to sign up', async() => {
    browser.waitForAngular();
    expect(element(by.css("mat-card-title")).getText()).toEqual("Sign up to Give A Crap!");
  });

  it('Should create a user', async() => {
    element(by.css('input[formControlName=firstname]')).sendKeys('test');
    element(by.css('input[formControlName=lastname]')).sendKeys('test');
    element(by.css('input[formControlName=email]')).sendKeys('test@test');
    element(by.css('input[formControlName=password]')).sendKeys('test');
    element(by.css('input[formControlName=password2]')).sendKeys('test');
    element(by.css('mat-radio-button[ng-reflect-value=true]')).click();
    element(by.css('button[type=submit]')).click();
    browser.waitForAngular();
    expect(element(by.css("mat-card-title")).getText()).toEqual("Login!");
  });

  it('Should login the created user', async() => {
    element(by.css('input[formControlName=email]')).sendKeys('test@test');
    element(by.css('input[formControlName=password]')).sendKeys('test');
    element(by.css('button[type=submit]')).click();
    browser.waitForAngular();
    expect(element(by.css("h2")).getText()).toEqual("Items:");
  });
});