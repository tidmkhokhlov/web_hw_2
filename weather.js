const WEATHER_API = "https://api.open-meteo.com/v1/forecast";
const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";

const weatherCodeDescriptions = {
  0: "Ясно",
  1: "Преимущественно ясно",
  2: "Переменная облачность",
  3: "Пасмурно",
  45: "Туман",
  48: "Туман с изморозью",
  51: "Мелкий моросящий дождь",
  53: "Моросящий дождь",
  55: "Сильная изморось",
  56: "Ледяная изморось",
  57: "Ледяной дождь",
  61: "Небольшой дождь",
  63: "Дождь",
  65: "Ливень",
  66: "Ледяной дождь",
  67: "Сильный ледяной дождь",
  71: "Небольшой снег",
  73: "Снег",
  75: "Сильный снег",
  77: "Снежная крупа",
  80: "Небольшие ливни",
  81: "Ливни",
  82: "Сильные ливни",
  85: "Небольшие снегопады",
  86: "Сильные снегопады",
  95: "Гроза",
  96: "Гроза с градом",
  99: "Сильная гроза с градом",
};

document.getElementById("getWeather").addEventListener("click", async () => {
  const city = document.getElementById("city").value.trim();
  const result = document.getElementById("weatherResult");
  if (!city) return (result.textContent = "Введите название города!");

  result.textContent = "Загрузка...";
  try {
    const geoResponse = await fetch(
      `${GEO_API}?name=${encodeURIComponent(
        city
      )}&count=1&language=ru&format=json`
    );
    if (!geoResponse.ok) {
      throw new Error("Geocoding request failed");
    }
    const geoData = await geoResponse.json();
    const location = geoData.results && geoData.results[0];

    if (!location) {
      result.textContent = "Город не найден.";
      return;
    }

    const { latitude, longitude, name, country } = location;
    const weatherResponse = await fetch(
      `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`
    );
    if (!weatherResponse.ok) {
      throw new Error("Weather request failed");
    }

    const weatherData = await weatherResponse.json();
    const weather = weatherData.current_weather;

    if (!weather) {
      result.textContent = "Нет данных о погоде.";
      return;
    }

    const description =
      weatherCodeDescriptions[weather.weathercode] || "Описание недоступно";
    const locationTitle = country ? `${name}, ${country}` : name;

    result.innerHTML = `
      <h3>${locationTitle}</h3>
      <p>Температура: ${weather.temperature}°C</p>
      <p>Скорость ветра: ${weather.windspeed} км/ч</p>
      <p>Описание: ${description}</p>
    `;
  } catch (err) {
    result.textContent = "Ошибка при получении данных.";
  }
});
