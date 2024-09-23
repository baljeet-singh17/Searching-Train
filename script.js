const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const searchHistoryList = document.getElementById('search-history');

function loadSearchHistory() {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistoryList.innerHTML = '';
    searchHistory.forEach((term, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = term;
        let deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.setAttribute('data-index', index);
        deleteBtn.addEventListener('click', deleteSearchTerm);
        listItem.appendChild(deleteBtn);
        searchHistoryList.appendChild(listItem);
    });
}

function addSearchTerm(term) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!searchHistory.includes(term)) {
        searchHistory.push(term);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
    loadSearchHistory();
}

function deleteSearchTerm(event) {
    let index = event.target.closest('button').getAttribute('data-index');
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistory.splice(index, 1);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    loadSearchHistory();
}

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        addSearchTerm(searchTerm);
        searchInput.value = '';
    }
});

clearHistoryBtn.addEventListener('click', () => {
    localStorage.removeItem('searchHistory');
    loadSearchHistory();
});

window.onload = loadSearchHistory;
