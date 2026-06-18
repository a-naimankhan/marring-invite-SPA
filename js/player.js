let audioElement = null;
let isPlaying = false;

function initAudioPlayer() {
    audioElement = document.getElementById('wedding-audio');
    if (!audioElement) return;

    audioElement.addEventListener('play', function() {
        isPlaying = true;
        updatePlayButton();
    });

    audioElement.addEventListener('pause', function() {
        isPlaying = false;
        updatePlayButton();
    });

    audioElement.addEventListener('timeupdate', updateProgress);
    audioElement.addEventListener('loadedmetadata', updateProgress);
}

function toggleAudio() {
    if (!audioElement) {
        initAudioPlayer();
    }

    if (!audioElement) return;

    if (isPlaying) {
        audioElement.pause();
        return;
    }

    audioElement.play().catch(function() {
        showPlayerMessage('Музыка файлы кейін қосылады');
    });
}

function handleAudioSeek(event) {
    if (!audioElement || !audioElement.duration) return;

    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    audioElement.currentTime = percentage * audioElement.duration;
}

function updatePlayButton() {
    const button = document.querySelector('.music-section__play');
    const player = document.querySelector('[data-player]');
    if (!button) return;

    button.innerHTML = '<i class="ti ti-player-play-filled" aria-hidden="true"></i>';
    button.setAttribute('aria-label', isPlaying ? 'Музыканы тоқтату' : 'Музыканы қосу');

    if (player) {
        player.classList.toggle('is-playing', isPlaying);
    }
}

function updateProgress() {
    const fill = document.getElementById('mp-fill');
    const current = document.getElementById('mp-cur');
    const duration = document.getElementById('mp-dur');

    if (!audioElement || !fill) return;

    const percent = audioElement.duration ? (audioElement.currentTime / audioElement.duration) * 100 : 0;
    fill.style.width = percent + '%';

    if (current) current.textContent = formatTime(audioElement.currentTime);
    if (duration) duration.textContent = formatTime(audioElement.duration);
}

function showPlayerMessage(message) {
    const hint = document.querySelector('.music-section__hint');
    if (hint) hint.textContent = message;
}

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
