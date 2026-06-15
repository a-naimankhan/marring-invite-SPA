/* ============================================================
   FORM.JS - Логика RSVP формы со счётчиком гостей
   ============================================================ */

/**
 * Изменить количество гостей
 */
function changeCount(delta) {
    var inp = document.getElementById('wi2-count');
    var val = parseInt(inp.value) || 1;
    val = Math.min(20, Math.max(1, val + delta));
    inp.value = val;
    inp.classList.remove('wi2__input--error');
}

/**
 * Валидация количества гостей
 */
function validateCount(el) {
    var raw = el.value;
    var parsed = parseInt(raw, 10);
    if (isNaN(parsed) || parsed !== +raw || parsed < 1) {
        el.classList.add('wi2__input--error');
    } else {
        el.classList.remove('wi2__input--error');
        el.value = Math.min(20, parsed);
    }
}

/**
 * Отправка формы RSVP
 */
function submitForm() {
    var toast = document.getElementById('wi2-toast');
    toast.className = 'wi2__toast';

    var name = document.getElementById('wi2-name').value.trim();
    var attend = document.querySelector('input[name="attend"]:checked');
    var countEl = document.getElementById('wi2-count');
    var countRaw = countEl.value;
    var numberOfPeople = parseInt(countRaw, 10);

    if (!name) {
        showError('⚠ Аты-жөніңізді жазыңыз');
        return;
    }
    if (!attend) {
        showError('⚠ Қатысу мүмкіндігін таңдаңыз');
        return;
    }
    if (isNaN(numberOfPeople) || numberOfPeople < 1 || String(numberOfPeople) !== countRaw.trim()) {
        countEl.classList.add('wi2__input--error');
        showError('⚠ Адам санын дұрыс енгізіңіз (бүтін сан)');
        return;
    }

    var payload = {
        name: name,
        attend: attend.value,
        numberOfPeople: numberOfPeople
    };

    console.log('RSVP payload:', JSON.stringify(payload));

    toast.textContent = '✓ Жауап жіберілді! ' + name + ' — ' + numberOfPeople + ' адам';
    toast.classList.add('show', 'wi2__toast--ok');
}

/**
 * Показать ошибку
 */
function showError(msg) {
    var toast = document.getElementById('wi2-toast');
    toast.textContent = msg;
    toast.classList.add('show', 'wi2__toast--err');
}
