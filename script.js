const API_BASE = 'http://localhost:3000'; // Change if your backend URL is different

async function loadSongs() {
  let songs;
  try {
    const res = await fetch(`${API_BASE}/songs`);
    if (!res.ok) throw new Error('Failed to fetch songs');
    songs = await res.json();
  } catch (error) {
    // Use mock data if fetch fails
    songs = [
      { song_id: 1, title: 'Mock Song 1', duration: 210 },
      { song_id: 2, title: 'Mock Song 2', duration: 185 },
      { song_id: 3, title: 'Mock Song 3', duration: 240 }
    ];
  }
  const container = document.getElementById('songs-container');
  container.innerHTML = '<h2>All Songs</h2>';
  songs.forEach(song => {
    const div = document.createElement('div');
    div.className = 'song';
    div.innerHTML = `
      <h3></h3>
      <p>Duration: ${song.duration} sec</p>
      <button onclick="playSong(${song.song_id})">▶️ Play</button>
      <button onclick="likeSong(${song.song_id})">❤️ Like</button>
    `;
    div.querySelector('h3').textContent = song.title;
    container.appendChild(div);
  });
}

async function loadTopSongs() {
  let songs;
  try {
    const res = await fetch(`${API_BASE}/analytics/top-songs`);
    if (!res.ok) throw new Error('Failed to fetch top songs');
    songs = await res.json();
  } catch (error) {
    // Use mock data if fetch fails
    songs = [
      { title: 'Mock Top Song 1', play_count: 1200 },
      { title: 'Mock Top Song 2', play_count: 950 },
      { title: 'Mock Top Song 3', play_count: 800 },
      { title: 'Mock Top Song 4', play_count: 700 },
      { title: 'Mock Top Song 5', play_count: 650 }
    ];
  }
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
  try {
    const res = await fetch(`${API_BASE}/play`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ song_id: id })
    });
    if (!res.ok) {
      const errorMsg = await res.text();
      throw new Error(`Failed to play song: ${errorMsg}`);
    } else {
      alert('Played song!');
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

async function likeSong(id) {
  try {
    const res = await fetch(`${API_BASE}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ song_id: id })
    });
    if (!res.ok) {
      const errorMsg = await res.text();
      throw new Error(`Failed to like song: ${errorMsg}`);
    } else {
      alert('Liked song!');
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

// Load all songs on first load
loadSongs();
