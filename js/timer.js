/* ============================================================
   TIMER.JS - Логика таймера обратного отсчёта
   ============================================================ */

let countdownDate = null;

/**
 * Инициализация таймера
 */
function initTimer(targetDate) {
    // Дата события: 22 августа 2026 года
    countdownDate = new Date('2026-08-22T15:00:00').getTime();
    
    console.log('⏰ Таймер инициализирован на:', new Date(countdownDate));
    
    // Первое обновление сразу
    updateTimer();
    
    // Обновление каждую секунду
    setInterval(updateTimer, 1000);
}

/**
 * Обновление таймера
 */
function updateTimer() {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    if (distance <= 0) {
        displayTimerEnd();
        return;
    }
    
    // Вычисление дней, часов, минут, секунд
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Обновление элементов DOM
    updateTimerElements(days, hours, minutes, seconds);
}

/**
 * Обновление элементов таймера в DOM
 */
function updateTimerElements(days, hours, minutes, seconds) {
    const timerUnits = document.querySelectorAll('.hp-card__timer-unit');
    
    if (timerUnits.length >= 4) {
        updateTimerValue(timerUnits[0], days);
        updateTimerValue(timerUnits[1], hours);
        updateTimerValue(timerUnits[2], minutes);
        updateTimerValue(timerUnits[3], seconds);
    }
}

/**
 * Обновление значения одной единицы таймера
 */
function updateTimerValue(unit, value) {
    const valueEl = unit.querySelector('.hp-card__timer-value');
    
    if (valueEl) {
        // Добавляем анимацию при изменении
        if (valueEl.textContent !== String(value).padStart(2, '0')) {
            valueEl.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                valueEl.textContent = String(value).padStart(2, '0');
                valueEl.style.transform = 'scale(1)';
            }, 150);
        } else {
            valueEl.textContent = String(value).padStart(2, '0');
        }
    }
}

/**
 * Отображение сообщения когда событие наступило
 */
function displayTimerEnd() {
    const timerContainer = document.querySelector('.hp-card__timer');
    
    if (timerContainer) {
        timerContainer.innerHTML = '<p style="font-size: 24px; color: #b8973a;">🎉 Событие началось!</p>';
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initTimer();
});
