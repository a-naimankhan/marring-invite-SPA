let countdownDate = null;
let countdownInterval = null;

function initTimer() {
    countdownDate = new Date('2026-08-21T18:00:00+05:00').getTime();

    updateTimer();
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const daysEl = document.getElementById('hp-days');
    const hoursEl = document.getElementById('hp-hours');
    const minsEl = document.getElementById('hp-mins');
    const secsEl = document.getElementById('hp-secs');

    if (!daysEl || !hoursEl || !minsEl || !secsEl || !countdownDate) return;

    const diff = countdownDate - Date.now();

    if (diff <= 0) {
        setTimerValue(daysEl, '0');
        setTimerValue(hoursEl, '00');
        setTimerValue(minsEl, '00');
        setTimerValue(secsEl, '00');
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    setTimerValue(daysEl, String(days));
    setTimerValue(hoursEl, padZero(hours));
    setTimerValue(minsEl, padZero(mins));
    setTimerValue(secsEl, padZero(secs));
}

function setTimerValue(element, value) {
    if (element.textContent === value) return;

    element.style.transform = 'translateY(2px) scale(0.96)';
    element.textContent = value;

    window.setTimeout(function() {
        element.style.transform = 'translateY(0) scale(1)';
    }, 120);
}

function padZero(value) {
    return value < 10 ? '0' + value : String(value);
}

document.addEventListener('DOMContentLoaded', initTimer);
