const apiUrl = "https://www.omdbapi.com/?apikey=564727fa&s=";

document.getElementById('searchMovie').addEventListener('click', async () => {
    const query = document.getElementById('movieSearch').value.trim();
    const list = document.getElementById('moviesList');
    if (!query) return list.textContent = "Введите название фильма!";

    list.textContent = "Загрузка...";
    try {
        const res = await fetch(apiUrl + query);
        const data = await res.json();
        if (data.Search) {
            list.innerHTML = data.Search.map(m => `
        <div class="movie">
          <img src="${m.Poster}" alt="${m.Title}" />
          <h3>${m.Title}</h3>
          <p>${m.Year}</p>
        </div>
      `).join("");
        } else {
            list.textContent = "Фильмы не найдены.";
        }
    } catch (e) {
        list.textContent = "Ошибка загрузки данных.";
    }
});
