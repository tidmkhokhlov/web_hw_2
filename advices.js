const API_BASE = "https://api.adviceslip.com";

const form = document.getElementById("advicesForm");
const countSelect = document.getElementById("advicesCount");
const getAdvicesButton = document.getElementById("getAdvices");
const resultBox = document.getElementById("advicesResult");

if (!form || !countSelect || !getAdvicesButton || !resultBox) {
  console.error("Advice widgets are missing in the markup.");
} else {
  const MAX_COUNT = 10;

  const parseCount = () => {
    const parsed = Number(countSelect.value);
    if (Number.isNaN(parsed) || parsed <= 0) {
      return 1;
    }
    return Math.min(Math.floor(parsed), MAX_COUNT);
  };

  const fetchSingleAdvice = async () => {
    const response = await fetch(`${API_BASE}/advice?timestamp=${Date.now()}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    const advice = data && data.slip && data.slip.advice;

    if (!advice) {
      throw new Error("Advice is missing in response");
    }

    return advice;
  };

  const fetchAdvices = async (count) => {
    const advices = [];
    const seen = new Set();

    while (advices.length < count) {
      const advice = await fetchSingleAdvice();
      const normalized = advice.trim();

      if (!seen.has(normalized)) {
        advices.push(normalized);
        seen.add(normalized);
      }
    }

    return advices;
  };

  const setLoading = (isLoading) => {
    getAdvicesButton.disabled = isLoading;
    form.classList.toggle("loading", isLoading);
    if (isLoading) {
      resultBox.textContent = "Загрузка...";
    }
  };

  const renderAdvices = (advices) => {
    if (advices.length === 0) {
      resultBox.textContent = "Советы не найдены.";
      return;
    }

    const items = advices.map((advice) => `<li>${advice}</li>`).join("");

    resultBox.innerHTML = `
      <h3>Подборка советов</h3>
      <ol>${items}</ol>
    `;
  };

  const showError = (message) => {
    resultBox.textContent = message;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const count = parseCount();
      const advices = await fetchAdvices(count);
      renderAdvices(advices);
    } catch (error) {
      console.error(error);
      showError("Ошибка при получении данных. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  form.addEventListener("submit", handleSubmit);
}
