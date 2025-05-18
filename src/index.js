import { getWeatherData } from './api.js';
import { createContent } from './appContent.js';
import { createHeader } from './appHeader.js';
import { eventBus } from './helper.js';
import '../css/styles.css';

const createHistoryBlock = () => {
  const historyBlock = document.createElement('div');
  historyBlock.classList.add('history-block');
  const title = document.createElement('h3');
  title.textContent = 'История поиска';
  const list = document.createElement('ul');
  list.classList.add('history-list');

  const updateHistory = () => {
    list.innerHTML = '';
    const cities = JSON.parse(localStorage.getItem('history')) || [];
    cities.forEach((city) => {
      const li = document.createElement('li');
      li.textContent = city;
      li.classList.add('history-item');
      li.addEventListener('click', () => {
        eventBus.emit('historySelect', city);
      });
      list.appendChild(li);
    });
  };

  eventBus.on('historyChanged', updateHistory);
  updateHistory();

  historyBlock.append(title, list);
  return historyBlock;
};

const renderApp = (city, weather) => {
  const root = document.getElementById('root');
  if (!root) return;
  root.innerHTML = '';
  const header = createHeader(city);
  const history = createHistoryBlock();
  const content = createContent(weather);
  root.append(header, history, content);
};

const addToHistory = (city) => {
  let history = JSON.parse(localStorage.getItem('history')) || [];
  history = history.filter((c) => c !== city);
  history.unshift(city);
  if (history.length > 10) history = history.slice(0, 10);
  localStorage.setItem('history', JSON.stringify(history));
  eventBus.emit('historyChanged');
};

const app = async () => {
  const city = JSON.parse(localStorage.getItem('city')) || 'Москва';
  const weather = await getWeatherData(city);
  renderApp(weather.name, weather);

  eventBus.on('searchCity', async (city) => {
    const weather = await getWeatherData(city);
    if (weather && !weather.message) {
      localStorage.setItem('city', JSON.stringify(weather.name));
      addToHistory(weather.name);
      renderApp(weather.name, weather);
    }
  });

  eventBus.on('historySelect', async (city) => {
    const weather = await getWeatherData(city);
    if (weather && !weather.message) {
      localStorage.setItem('city', JSON.stringify(weather.name));
      renderApp(weather.name, weather);
    }
  });
};

app();
