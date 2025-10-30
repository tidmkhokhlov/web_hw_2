const api = "https://api.frankfurter.app/latest";

document.getElementById('convert').addEventListener('click', async () => {
    const amount = parseFloat(document.getElementById('amount').value);
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const result = document.getElementById('result');

    if (!amount) {
        result.textContent = "Введите сумму.";
        return;
    }

    if (from === to) {
        result.textContent = "Выберите разные валюты.";
        return;
    }

    try {
        const res = await fetch(`${api}?from=${from}&to=${to}&amount=${amount}`);
        const data = await res.json();
        const rate = data.rates[to];
        result.textContent = `${amount} ${from} = ${rate.toFixed(2)} ${to}`;
    } catch (error) {
        result.textContent = "Ошибка при получении данных о валюте.";
        console.error(error);
    }
});
