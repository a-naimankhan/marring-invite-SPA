/* ============================================================
   MAIN.JS - Точка входа приложения
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 SPA приложение инициализировано');
    
    // Инициализация всех компонентов
    initSections();
    initNavigation();
});

/**
 * Инициализация секций (smooth scroll)
 */
function initSections() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        console.log(`✓ Секция загружена: ${section.id}`);
    });
}

/**
 * Инициализация навигации (опционально)
 */
function initNavigation() {
    // Можно добавить sticky nav, dots, etc.
}

/**
 * Функция для плеера (будет вызывать player.js)
 */
function seekAudio(event) {
    if (typeof handleAudioSeek === 'function') {
        handleAudioSeek(event);
    }
}
