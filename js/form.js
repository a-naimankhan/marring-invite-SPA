function changeCount(delta) {
    const input = document.getElementById('wi2-count');
    if (!input) return;

    const current = parseInt(input.value, 10) || 1;
    input.value = Math.min(20, Math.max(0, current + delta));
    input.classList.remove('wi2__input--error');
}

function validateCount(input) {
    const parsed = parseInt(input.value, 10);
    if (Number.isNaN(parsed) || parsed < 0 || parsed > 20) {
        input.classList.add('wi2__input--error');
        return false;
    }

    input.value = Math.min(20, parsed);
    input.classList.remove('wi2__input--error');
    return true;
}

async function submitForm(event) {
    event.preventDefault();

    const form = event.target;
    const toast = document.getElementById('wi2-toast');
    const nameInput = document.getElementById('wi2-name');
    const countInput = document.getElementById('wi2-count');
    const submittedAtInput = document.getElementById('wi2-submitted-at');
    const attend = form.querySelector('input[name="attend"]:checked');

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

    if (Number.isNaN(numberOfPeople) || numberOfPeople < 0 || numberOfPeople > 20) {
        countInput.classList.add('wi2__input--error');
        showError('Қонақ санын 0-ден 20-ға дейін енгізіңіз');
        return;
    }

    if (submittedAtInput) {
        submittedAtInput.value = new Date().toISOString();
    }

    const formData = new FormData(form);

    try {
        if (window.location.protocol === 'file:') {
            console.log('Netlify form payload:', Object.fromEntries(formData.entries()));
            showSuccess(`${name}, жауабыңыз дайын. Netlify-де жарияланған соң форма жіберіледі.`);
            return;
        }

        const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        });

        if (!response.ok) {
            throw new Error('Netlify form submit failed');
        }

        showSuccess(`${name}, жауабыңыз жіберілді`);
        form.reset();
        countInput.value = '1';
    } catch (error) {
        console.error(error);
        showError('Жіберу кезінде қате болды. Кейінірек қайталап көріңіз.');
    }
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

document.addEventListener('DOMContentLoaded', function() {
    const radios = document.querySelectorAll('input[name="attend"]');
    const countInput = document.getElementById('wi2-count');

    radios.forEach(function(radio) {
        radio.addEventListener('change', function() {
            if (!countInput) return;

            if (this.value === 'Ия , Жұбайыммен келемін') {
                countInput.value = '2';
            } else if (this.value === 'Өкінішке орай, келе алмаймын') {
                countInput.value = '0';
            } else {
                countInput.value = '1';
            }

            countInput.classList.remove('wi2__input--error');
        });
    });
});
