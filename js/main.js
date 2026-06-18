document.addEventListener('DOMContentLoaded', function() {
    buildCalendar();
    initAudioPlayer();
});

function buildCalendar() {
    const grid = document.getElementById('calendar-grid');
    if (!grid) return;

    const weekDays = ['Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб', 'Жс'];
    const firstDayOffset = 5;
    const totalDays = 31;
    const eventDay = 21;

    grid.innerHTML = '';

    weekDays.forEach(function(day) {
        const cell = document.createElement('div');
        cell.className = 'calendar-card__cell calendar-card__cell--head';
        cell.textContent = day;
        grid.appendChild(cell);
    });

    for (let i = 0; i < firstDayOffset; i += 1) {
        const cell = document.createElement('div');
        cell.className = 'calendar-card__cell calendar-card__cell--empty';
        grid.appendChild(cell);
    }

    for (let day = 1; day <= totalDays; day += 1) {
        const cell = document.createElement('div');
        cell.className = 'calendar-card__cell';
        if (day === eventDay) {
            cell.classList.add('calendar-card__cell--event');
            cell.setAttribute('aria-label', '21 тамыз, той күні');
        }
        cell.textContent = day;
        grid.appendChild(cell);
    }
}

function seekAudio(event) {
    if (typeof handleAudioSeek === 'function') {
        handleAudioSeek(event);
    }
}
