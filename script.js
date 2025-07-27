const API_BASE = 'http://localhost:3000'; // Change if your backend URL is different

async function loadSongs() {
  const res = await fetch(`${API_BASE}/songs`);
  const songs = await res.json();

  const container = document.getElementById('songs-container');
  container.innerHTML = '<h2>All Songs</h2>';
  songs.forEach(song => {
    const div = document.createElement('div');
    div.className = 'song';
    div.innerHTML = `
      <h3>${song.title}</h3>
      <p>Duration: ${song.duration} sec</p>
      <button onclick="playSong(${song.song_id})">▶️ Play</button>
      <button onclick="likeSong(${song.song_id})">❤️ Like</button>
    `;
    container.appendChild(div);
  });
}

async function loadTopSongs() {
  const res = await fetch(`${API_BASE}/analytics/top-songs`);
  const songs = await res.json();

  const container = document.getElementById('songs-container');
  container.innerHTML = '<h2>🔥 Top 5 Songs</h2>';
  songs.forEach(song => {
    const div = document.createElement('div');
    div.className = 'song';
    div.innerHTML = `
      <h3>${song.title}</h3>
      <p>Plays: ${song.play_count}</p>
    `;
    container.appendChild(div);
  });
}

async function playSong(id) {
  await fetch(`${API_BASE}/play`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ song_id: id })
  });
  alert('Played song!');
}

async function likeSong(id) {
  await fetch(`${API_BASE}/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ song_id: id })
  });
  alert('Liked song!');
}

// Load all songs on first load
loadSongs();
