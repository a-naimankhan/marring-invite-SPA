document.addEventListener('DOMContentLoaded', function() {
    buildCalendar();
    initAudioPlayer();
    initAutoScroll();
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

function initAutoScroll() {
    const root = document.documentElement;
    const speed = 0.05;
    const startDelay = 1100;
    const resumeDelay = 5500;
    let enabled = false;
    let pausedUntil = Date.now() + startDelay;
    let lastFrame = null;

    function pauseAutoScroll(delay) {
        pausedUntil = Date.now() + delay;
    }

    function isFormActive() {
        const active = document.activeElement;
        return active && ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(active.tagName);
    }

    function tick(timestamp) {
        if (lastFrame === null) lastFrame = timestamp;
        const elapsed = Math.min(40, timestamp - lastFrame);
        lastFrame = timestamp;

        const maxScroll = root.scrollHeight - window.innerHeight;
        const atBottom = window.scrollY >= maxScroll - 2;

        if (!atBottom && enabled && Date.now() >= pausedUntil && !isFormActive()) {
            window.scrollBy(0, speed * elapsed);
        }

        requestAnimationFrame(tick);
    }

    window.addEventListener('load', function() {
        enabled = true;
        requestAnimationFrame(tick);
    });

    ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(function(eventName) {
        window.addEventListener(eventName, function() {
            pauseAutoScroll(resumeDelay);
        }, { passive: true });
    });

    document.addEventListener('focusin', function(event) {
        if (event.target.matches('input, textarea, select, button')) {
            pauseAutoScroll(60 * 60 * 1000);
        }
    });

    document.addEventListener('focusout', function() {
        pauseAutoScroll(resumeDelay);
    });
}
