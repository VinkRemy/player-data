const fetch = require('node-fetch');
const fs = require('fs');
const simpleGit = require('simple-git');
const dotenv = require('dotenv');

// Laad je .env bestand
dotenv.config();

// Haal je GitHub-token en repo-gegevens op
const token = process.env.GITHUB_TOKEN;
const repoUrl = process.env.GITHUB_REPO_URL;
const branch = process.env.GITHUB_BRANCH;

// GitHub repo voorbereiden
const git = simpleGit();

// Haal JSON op en sla op als data.json
const url = 'https://vinkremy.github.io/player-data/data.json'; // Jouw JSON-URL
fetch(url)
  .then(res => res.json())
  .then(data => {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    console.log('✅ data.json is bijgewerkt!');

    // Git commando’s om pushen naar GitHub
    git
      .silent(true)  // voorkom dat git commando’s in de terminal worden getoond
      .init()  // Initializeer git in de huidige map
      .add('.')
      .commit('Auto-update van data.json')
      .addRemote('origin', repoUrl)
      .push('origin', 'main')
      .then(() => console.log('✅ Push succesvol!'))
      .catch(err => console.error('❌ Fout bij pushen naar GitHub:', err));
  })
  .catch(err => {
    console.error('❌ Fout bij ophalen van JSON:', err);
  });
