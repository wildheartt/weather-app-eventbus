export const directionOfwWind = (degree) => {
  if (degree > 337.5) {
    return 'северный';
  }
  if (degree > 292.5) {
    return 'северо-западный';
  }
  if (degree > 247.5) {
    return 'западный';
  }
  if (degree > 202.5) {
    return 'юго-западный';
  }
  if (degree > 157.5) {
    return 'южный';
  }
  if (degree > 122.5) {
    return 'юго-восточный';
  }
  if (degree > 67.5) {
    return 'восточный';
  }
  if (degree > 22.5) {
    return 'северо-восточный';
  }
  return 'северный';
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const cToF = (celsius) => {
  return (celsius * 9) / 5 + 32;
};

export const fToC = (fahrenheit) => {
  return ((fahrenheit - 32) * 5) / 9;
};

export class EventBus {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((l) => l !== listener);
  }

  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach((listener) => listener(data));
  }
}

export const eventBus = new EventBus();
