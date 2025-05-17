import { handleWeatherByGeolocation } from '../geolocation.js';

describe('handleWeatherByGeolocation', () => {
  it('должна быть функцией', () => {
    expect(typeof handleWeatherByGeolocation).toBe('function');
  });
});
