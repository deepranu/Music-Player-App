const genres = [
    { value: '', text: 'All' },
    { value: 'hiphop', text: 'Hip-hop' },
    { value: 'rock', text: 'Rock' },
    { value: 'pop', text: 'Pop' },
];

const songsByGenre = {
    all: ['I will Wait', 'ily', 'let me go', 'quarantine clean', 'roar', 'toosie slide', 'tera ban jaunga', 'tere sang yara', 'kaun tujhe'],
    hiphop: ['I will Wait', 'ily', 'let me go'],
    rock: ['quarantine clean', 'roar', 'toosie slide'],
    pop: ['tera ban jaunga', 'tere sang yara', 'kaun tujhe'],
};

const songImages = {
    'I will Wait': 'media/I-will-Wait.jpg',
    'ily': 'media/ily.jpg',
    'let me go': 'media/let-me-go.jpg',
    'quarantine clean': 'media/qurantine-clean.jpg',
    'roar': 'media/roar.jpg',
    'toosie slide': 'media/toosie-slide.jpg',
    'tera ban jaunga': 'media/tera-ban-jaunga.jpg',
    'tere sang yara': 'media/tere-sang-yara.jpg',
    'kaun tujhe': 'media/kaun-tujhe.jpg',
};

// ____________________________________________________________________________________

let currentGenre = 'all';
let currentSongIndex = 0;
let currentPlaylist = [];

function populateDropdown(selectId, options) {
    const select = document.getElementById(selectId);
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.innerText = option.text;
        select.appendChild(opt);
    });
}

function updateSongList(genre) {
    currentGenre = genre;
    currentSongIndex = 0;
    const songContainer = document.getElementById('allSongs');
    songContainer.innerHTML = '';

    const songs = songsByGenre[genre] || songsByGenre.all;
    songs.forEach(song => {
        const songElement = document.createElement('li');
        songElement.innerText = song;
        songElement.onclick = () => setCurrentSong(song);
        songContainer.appendChild(songElement);
    });
    updatePlayerImage(songs[0]);
}

function setCurrentSong(song) {
    const songs = songsByGenre[currentGenre] || songsByGenre.all;
    currentSongIndex = songs.indexOf(song);
    updatePlayerImage(song);
    updatePlayerName(song);
}

function updatePlayerImage(song) {
    const imgElement = document.getElementById('songImage');
    imgElement.src = songImages[song] || '';
}

function updatePlayerName(name) {
    const nameElement = document.getElementById('songName');
    nameElement.innerText = name || '';
}

populateDropdown('Genre', genres);

function handleDropdownChange(event) {
    const selectedGenre = event.target.value;
    updateSongList(selectedGenre);
}

const genreSelect = document.getElementById('Genre');
genreSelect.addEventListener('change', handleDropdownChange);

updateSongList('all');

const searchBox = document.getElementById('searchBox');
const resultContainer = document.getElementById('resultContainer');

searchBox.addEventListener('input', function () {
    resultContainer.innerHTML = '';

    const query = searchBox.value;

    if (query) {
        const newElement = document.createElement('div');
        newElement.className = 'new-element';
        newElement.textContent = `You typed: ${query}`;
        resultContainer.appendChild(newElement);
    }
});

// ________________________________________________________________

const nextElement = document.getElementById('hd1');
nextElement.addEventListener('click', function () {
    dp('previous');
});

const nextElement2 = document.getElementById('hd2');
nextElement2.addEventListener('click', function () {
    dp('next');
});

const allPlaylist = document.getElementById('i');
allPlaylist.addEventListener('click', function () {
    dp('addToPlaylist');
});

// ________________________________________________________________

const createPlaylistBtn = document.getElementById('CPL');
createPlaylistBtn.addEventListener('click', createPlaylist);

function createPlaylist() {
    const playlistName = searchBox.value.trim();
    if (playlistName) {
        const playlistContainer = document.getElementById('allPlaylist');
        const newPlaylistElement = document.createElement('div');
        newPlaylistElement.className = 'playlist-item';
        newPlaylistElement.innerText = playlistName;
        newPlaylistElement.onclick = () => displayPlaylist(playlistName);
        playlistContainer.appendChild(newPlaylistElement);
        searchBox.value = ''; // Clear the input box after adding
    }
}

function displayPlaylist(playlistName) {
    const playlist = getPlaylistByName(playlistName);
    if (playlist) {
        currentPlaylist = playlist.songs;
        renderCurrentPlaylist();
    }
}

function getPlaylistByName(name) {
    const playlists = document.getElementsByClassName('playlist-item');
    for (let playlist of playlists) {
        if (playlist.innerText === name) {
            return { name: playlist.innerText, songs: playlist.dataset.songs.split(',') };
        }
    }
    return null;
}

function renderCurrentPlaylist() {
    const playlistSongsContainer = document.getElementById('playlistSongs');
    playlistSongsContainer.innerHTML = '';
    currentPlaylist.forEach(song => {
        const songElement = document.createElement('li');
        songElement.innerText = song;
        playlistSongsContainer.appendChild(songElement);
    });
}

// ________________________________________________________________________________________________________________________________

function dp(operation) {
    const songs = songsByGenre[currentGenre] || songsByGenre.all;

    if (operation === 'previous') {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    } else if (operation === 'next') {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
    } else if (operation === 'addToPlaylist') {
        const song = songs[currentSongIndex];
        currentPlaylist.push(song);
        renderCurrentPlaylist();
        return;
    }

    const currentSong = songs[currentSongIndex];
    updatePlayerImage(currentSong);
    updatePlayerName(currentSong);
}


// __________________________________________________________________________
const darkModeSwitch = document.getElementById('darkModeSwitch');
const body = document.body;

darkModeSwitch.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    
    const switchLabel = darkModeSwitch.querySelector('.slider');
    if (body.classList.contains('dark-mode')) {
        switchLabel.textContent = 'Dark-Mode';
    } else {
        switchLabel.textContent = 'Light-Mode';
    }
});

// ___________________________________________________________________________



