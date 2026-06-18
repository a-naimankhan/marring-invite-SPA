function changeCount(delta) {
    const input = document.getElementById('wi2-count');
    if (!input) return;

    const current = parseInt(input.value, 10) || 1;
    input.value = Math.min(20, Math.max(1, current + delta));
    input.classList.remove('wi2__input--error');
}

function validateCount(input) {
    const parsed = parseInt(input.value, 10);
    if (Number.isNaN(parsed) || parsed < 1 || parsed > 20) {
        input.classList.add('wi2__input--error');
        return;
    }

    input.value = Math.min(20, parsed);
    input.classList.remove('wi2__input--error');
}

function submitForm(event) {
    if (event) event.preventDefault();

    const toast = document.getElementById('wi2-toast');
    const nameInput = document.getElementById('wi2-name');
    const countInput = document.getElementById('wi2-count');
    const attend = document.querySelector('input[name="attend"]:checked');

    if (!toast || !nameInput || !countInput) return;

    resetToast(toast);

    const name = nameInput.value.trim();
    const numberOfPeople = parseInt(countInput.value, 10);

    if (!name) {
        showError('Аты-жөніңізді жазыңыз');
        nameInput.focus();
        return;
    }

    if (!attend) {
        showError('Қатысу жауабын таңдаңыз');
        return;
    }

    if (Number.isNaN(numberOfPeople) || numberOfPeople < 1 || numberOfPeople > 20) {
        countInput.classList.add('wi2__input--error');
        showError('Қонақ санын 1-ден 20-ға дейін енгізіңіз');
        return;
    }

    const payload = {
        name,
        attend: attend.value,
        numberOfPeople,
        submittedAt: new Date().toISOString()
    };

    console.log('RSVP payload:', payload);
    showSuccess(`${name}, жауабыңыз сақталды`);
}

function resetToast(toast) {
    toast.className = 'rsvp-form__toast';
    toast.textContent = '';
}

function showError(message) {
    const toast = document.getElementById('wi2-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show', 'rsvp-form__toast--err');
}

function showSuccess(message) {
    const toast = document.getElementById('wi2-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show', 'rsvp-form__toast--ok');
}
