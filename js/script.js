
function loadTemplate(templateId) {
    const container = document.getElementById('dynamicContent');
    const template = document.getElementById(templateId);
    container.innerHTML = '';
    container.appendChild(template.content.cloneNode(true));
}

function handleNavigation(e) {
    e.preventDefault();
    const page = e.target.dataset.page;
    if (page) {
        loadTemplate(`${page}-template`);
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

        if (e.target.classList.contains('nav-link')) {
            e.target.classList.add('active');
        }
    }
}

function initApp() {
    loadTemplate('catalog-template');
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
}

document.addEventListener('DOMContentLoaded', initApp);
