/* ============================================================
   PLAYER.JS - Логика музыкального плеера
   ============================================================ */

let audioElement = null;
let isPlaying = false;

/**
 * Инициализация плеера
 */
function initAudioPlayer() {
    // Будет добавлено при интеграции блока wedding_music_player2.html
    console.log('🎵 Плеер инициализирован');
}

/**
 * Обработка нажатия на кнопку play/pause
 */
function toggleAudio() {
    if (!audioElement) return;
    
    if (isPlaying) {
        audioElement.pause();
        isPlaying = false;
    } else {
        audioElement.play();
        isPlaying = true;
    }
    
    updatePlayButton();
}

/**
 * Обработка seek (перемотка трека)
 */
function handleAudioSeek(event) {
    if (!audioElement) return;
    
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = x / rect.width;
    
    audioElement.currentTime = percentage * audioElement.duration;
}

/**
 * Обновление отображения кнопки play/pause
 */
function updatePlayButton() {
    // Будет реализовано при интеграции
}

/**
 * Обновление прогресс-бара
 */
function updateProgress() {
    if (!audioElement) return;
    
    const fill = document.getElementById('mp-fill');
    const current = document.getElementById('mp-cur');
    const duration = document.getElementById('mp-dur');
    
    if (fill) {
        const percent = (audioElement.currentTime / audioElement.duration) * 100;
        fill.style.width = percent + '%';
    }
    
    if (current) {
        current.textContent = formatTime(audioElement.currentTime);
    }
    
    if (duration && audioElement.duration) {
        duration.textContent = formatTime(audioElement.duration);
    }
}

/**
 * Форматирование времени (mm:ss)
 */
function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
