const apiKey = "https://wttr.in";

document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('city').value.trim();
    const result = document.getElementById('weatherResult');
    if (!city) return result.textContent = "Введите название города!";

    result.textContent = "Загрузка...";
    try {
        const res = await fetch(`${apiKey}/${city}?format=j1`);
        const data = await res.json();
        const weather = data.current_condition[0];
        result.innerHTML = `
      <h3>${city}</h3>
      <p>Температура: ${weather.temp_C}°C</p>
      <p>Описание: ${weather.weatherDesc[0].value}</p>
    `;
    } catch (err) {
        result.textContent = "Ошибка при получении данных.";
    }
});
