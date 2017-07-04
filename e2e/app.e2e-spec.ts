import { MongodbappPage } from './app.po';

describe('mongodbapp App', () => {
  let page: MongodbappPage;

  beforeEach(() => {
    page = new MongodbappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
