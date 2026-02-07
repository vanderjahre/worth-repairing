const comicImage = document.getElementById('comic-image');
const chapterSelect = document.getElementById('chapter-select');
const chapterSelectBottom = document.getElementById('chapter-select-bottom');
const blogContent = document.getElementById('blog-content');
const blogDate = document.getElementById('blog-date');
const blogTitle = document.getElementById('blog-title');

const navButtons = {
    first: document.getElementById('first-comic'),
    prev: document.getElementById('prev-comic'),
    next: document.getElementById('next-comic'),
    latest: document.getElementById('latest-comic'),
    firstBottom: document.getElementById('first-comic-bottom'),
    prevBottom: document.getElementById('prev-comic-bottom'),
    nextBottom: document.getElementById('next-comic-bottom'),
    latestBottom: document.getElementById('latest-comic-bottom'),
};

// --- Chapter Configuration ---
const chaptersConfig = [
    { chapter: 1, pages: 8, name: '1: As Good As Gold', cover: 'images/covers/chapter1.png' },
];

// --- Pre-calculate chapter data ---
let totalPages = 0;
export const chapters = chaptersConfig.map(config => {
    const startPage = totalPages + 1;
    totalPages += config.pages;
    const endPage = totalPages;
    return { ...config, startPage, endPage };
});

let currentNotes = {};

// --- Page Location and Navigation Logic ---

function getPageFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    let page = parseInt(urlParams.get('page'));
    return isNaN(page) || page < 1 || page > totalPages ? totalPages : page;
}

function findChapterFromPage(globalPage) {
    return chapters.find(c => globalPage >= c.startPage && globalPage <= c.endPage);
}

async function updatePage(page) {
    const chapterInfo = findChapterFromPage(page);
    if (!chapterInfo) {
        console.error(`Could not find a chapter for page ${page}`);
        return;
    }

    // Correctly use the global page number for the image path
    comicImage.src = `comics/chapter${chapterInfo.chapter}/${page}.jpg`;

    // Load notes if not already loaded
    if (!currentNotes[chapterInfo.chapter]) {
        try {
            const response = await fetch(`notes/chapter${chapterInfo.chapter}.json`);
            if (!response.ok) throw new Error('Notes not found');
            currentNotes[chapterInfo.chapter] = await response.json();
        } catch (error) {
            console.error(`Error loading notes for chapter ${chapterInfo.chapter}:`, error);
            currentNotes[chapterInfo.chapter] = {};
        }
    }

    const pageNote = currentNotes[chapterInfo.chapter][page];
    blogTitle.textContent = pageNote ? pageNote.title : 'No Title';
    blogDate.textContent = pageNote ? `Published on ${pageNote.published}` : '';
    blogContent.innerHTML = pageNote ? pageNote.note : 'No author notes for this page.';

    const url = new URL(window.location);
    url.searchParams.set('page', page);
    window.history.pushState({ page }, ``, url);

    updateNav(page);
    if (chapterSelect.value != page) chapterSelect.value = page;
    if (chapterSelectBottom.value != page) chapterSelectBottom.value = page;
    window.scrollTo(0, 0);
}

function updateNav(page) {
    const isFirst = page <= 1;
    const isLast = page >= totalPages;

    // Top Nav
    navButtons.first.classList.toggle('disabled', isFirst);
    navButtons.prev.classList.toggle('disabled', isFirst);
    navButtons.next.classList.toggle('disabled', isLast);
    navButtons.latest.classList.toggle('disabled', isLast);

    // Bottom Nav
    navButtons.firstBottom.classList.toggle('disabled', isFirst);
    navButtons.prevBottom.classList.toggle('disabled', isFirst);
    navButtons.nextBottom.classList.toggle('disabled', isLast);
    navButtons.latestBottom.classList.toggle('disabled', isLast);
}

function populateJumper() {
    if (!chapterSelect || !chapterSelectBottom) return;
    [chapterSelect, chapterSelectBottom].forEach(jumper => (jumper.innerHTML = ''));

    chapters.forEach(({ name, startPage, endPage }) => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = name;
        for (let i = startPage; i <= endPage; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Page ${i}`;
            optgroup.appendChild(option);
        }
        chapterSelect.appendChild(optgroup);
        chapterSelectBottom.appendChild(optgroup.cloneNode(true));
    });
}

// --- Event Listeners ---
function setupEventListeners() {
    const handleNavClick = (e, newPage) => {
        e.preventDefault();
        if (!e.currentTarget.classList.contains('disabled')) {
            updatePage(newPage);
        }
    };

    let currentPage = getPageFromUrl();

    navButtons.first.addEventListener('click', e => handleNavClick(e, 1));
    navButtons.firstBottom.addEventListener('click', e => handleNavClick(e, 1));
    navButtons.latest.addEventListener('click', e => handleNavClick(e, totalPages));
    navButtons.latestBottom.addEventListener('click', e => handleNavClick(e, totalPages));

    navButtons.prev.addEventListener('click', e => handleNavClick(e, getPageFromUrl() - 1));
    navButtons.prevBottom.addEventListener('click', e => handleNavClick(e, getPageFromUrl() - 1));
    navButtons.next.addEventListener('click', e => handleNavClick(e, getPageFromUrl() + 1));
    navButtons.nextBottom.addEventListener('click', e => handleNavClick(e, getPageFromUrl() + 1));

    chapterSelect.addEventListener('change', e => updatePage(parseInt(e.target.value)));
    chapterSelectBottom.addEventListener('change', e => updatePage(parseInt(e.target.value)));

    document.addEventListener('keydown', e => {
        currentPage = getPageFromUrl();
        if (e.key === 'ArrowLeft' && currentPage > 1) updatePage(currentPage - 1);
        if (e.key === 'ArrowRight' && currentPage < totalPages) updatePage(currentPage + 1);
    });

    window.addEventListener('popstate', e => {
        if (e.state && e.state.page) {
            updatePage(e.state.page);
        }
    });
}

// --- Initial Setup ---
function init() {
    if (!comicImage) return; // Only run on the main comic page
    populateJumper();
    setupEventListeners();
    const initialPage = getPageFromUrl();
    updatePage(initialPage);
}

init();
