import { createHeader, createSearchForm } from '../appHeader.js';
import { eventBus } from '../helper.js';

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

  test('клик по "Сменить город" показывает форму поиска', () => {
    const headerEl = createHeader('TestCity');
    document.body.append(headerEl);
    const cityChangeBtn = headerEl.querySelector('.city__change');
    cityChangeBtn.click();
    expect(document.querySelector('.search')).not.toBeNull();
  });

  test('клик по кнопке поиска без ввода города показывает ошибку', () => {
    const form = createSearchForm();
    document.body.append(form);
    const searchBtn = form.querySelector('.search_btn');
    searchBtn.click();
    const errorBlock = form.querySelector('.search__error');
    expect(errorBlock).not.toBeNull();
    expect(errorBlock.textContent).toContain('Введите название города');
  });

  test('emit события searchCity при вводе города', () => {
    const form = createSearchForm();
    document.body.append(form);
    const searchInput = form.querySelector('.search_input');
    const searchBtn = form.querySelector('.search_btn');
    const handler = jest.fn();
    eventBus.on('searchCity', handler);
    searchInput.value = 'Москва';
    searchBtn.click();
    expect(handler).toHaveBeenCalledWith('Москва');
    eventBus.off('searchCity', handler);
  });
});
