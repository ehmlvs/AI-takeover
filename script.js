// Устанавливаем целевую дату: 19 января 2036 года
const DEFAULT_DATE = '2036-01-19T00:00:00';

// Загружаем сохраненную дату или устанавливаем стандартную
let targetDate = localStorage.getItem('takeoverDate') 
    ? new Date(localStorage.getItem('takeoverDate')) 
    : new Date(DEFAULT_DATE);

// Проверка: если сохраненная дата из прошлого (например, осталась от старых тестов)
// мы сбрасываем её на 2036 год
if (targetDate < new Date() && targetDate.getFullYear() < 2030) {
    targetDate = new Date(DEFAULT_DATE);
    localStorage.setItem('takeoverDate', targetDate);
}

function updateTimer() {
    const now = new Date();
    const diff = targetDate - now;

    const timerElement = document.getElementById('timer');
    if (!timerElement) return;

    if (diff <= 0) {
        timerElement.innerText = "AI HAS TAKEN OVER";
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    // Отображаем дни, часы, минуты и секунды
    timerElement.innerText = 
        `${String(d).padStart(2, '0')}:${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// Слушатель событий для кнопки ускорения
const btn = document.getElementById('accelerateBtn');
if (btn) {
    btn.addEventListener('click', () => {
        // Ускоряем захват на 1 день (уменьшаем целевую дату)
        targetDate = new Date(targetDate.getTime() - (24 * 60 * 60 * 1000));
        localStorage.setItem('takeoverDate', targetDate);
        updateTimer();
    });
}

// Запускаем обновление каждую секунду
setInterval(updateTimer, 1000);
updateTimer();
