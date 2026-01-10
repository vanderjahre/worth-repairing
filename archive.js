import { chapters } from './main.js';

function createArchive() {
    const container = document.getElementById('archive-container');
    if (!container) return;

    chapters.forEach(chapter => {
        const chapterDiv = document.createElement('div');
        chapterDiv.classList.add('chapter-item');

        const link = document.createElement('a');
        link.href = `index.html?page=${chapter.startPage}`;

        const img = document.createElement('img');
        img.src = chapter.cover;
        img.alt = `Cover for ${chapter.name}`;
        link.appendChild(img);

        const name = document.createElement('p');
        name.textContent = chapter.name;

        chapterDiv.appendChild(link);
        chapterDiv.appendChild(name);
        container.appendChild(chapterDiv);
    });
}

document.addEventListener('DOMContentLoaded', createArchive);
