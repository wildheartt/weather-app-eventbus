import { createHeader } from '../appHeader.js';

jest.mock('../api.js', () => ({
  getWeatherData: jest.fn(() =>
    Promise.resolve({ main: { temp: 12 }, name: 'MockCity' }),
  ),
}));

describe('createHeader', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('корректно создает элементы', () => {
    const headerEl = createHeader('TestCity');
    document.body.append(headerEl);

    const cityName = headerEl.querySelector('.city__name');
    expect(cityName).not.toBeNull();
    expect(cityName.textContent).toBe('TestCity');

    const cityChangeBtn = headerEl.querySelector('.city__change');
    expect(cityChangeBtn).not.toBeNull();
  });
});
