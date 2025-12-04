const apiUrl = "https://www.omdbapi.com/?apikey=5746a168&s=";

const searchBtn = document.getElementById("searchMovie");
const input = document.getElementById("movieSearch");
const list = document.getElementById("moviesList");

async function searchMovies() {
  const query = input.value.trim();
  if (!query) {
    list.textContent = "Введите название фильма!";
    return;
  }

  list.textContent = "Загрузка...";
  try {
    const res = await fetch(apiUrl + encodeURIComponent(query));
    const data = await res.json();

    if (data.Search && data.Search.length) {
      list.innerHTML = data.Search.map(
        (m) => `
        <div class="movie">
          <img src="${m.Poster}" alt="${m.Title}" />
          <h3>${m.Title}</h3>
          <p>${m.Year}</p>
        </div>
      `
      ).join("");
    } else {
      list.textContent = "Фильмы не найдены.";
    }
  } catch (e) {
    list.textContent = "Ошибка загрузки данных.";
  }
}

searchBtn.addEventListener("click", searchMovies);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchMovies();
  }
});
