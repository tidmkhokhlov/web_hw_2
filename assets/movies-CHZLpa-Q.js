import"./style-Cvjpl_yh.js";const o="https://www.omdbapi.com/?apikey=564727fa&s=";document.getElementById("searchMovie").addEventListener("click",async()=>{const n=document.getElementById("movieSearch").value.trim(),t=document.getElementById("moviesList");if(!n)return t.textContent="Введите название фильма!";t.textContent="Загрузка...";try{const i=await(await fetch(o+n)).json();i.Search?t.innerHTML=i.Search.map(e=>`
        <div class="movie">
          <img src="${e.Poster}" alt="${e.Title}" />
          <h3>${e.Title}</h3>
          <p>${e.Year}</p>
        </div>
      `).join(""):t.textContent="Фильмы не найдены."}catch{t.textContent="Ошибка загрузки данных."}});
