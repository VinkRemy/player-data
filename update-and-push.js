const fetch = require('node-fetch');
const fs = require('fs');
const simpleGit = require('simple-git');
const dotenv = require('dotenv');

// Laad je .env bestand
dotenv.config();

// Haal env-variabelen op
const repoUrl = process.env.GITHUB_REPO_URL;
const branch = process.env.GITHUB_BRANCH || 'main';

// Bereid git voor
const git = simpleGit();

// De URL van de JSON
const url = 'https://vinkremy.github.io/player-data/data.json';

// Haal JSON op en sla op als data.json
fetch(url)
  .then(res => res.json())
  .then(data => {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    console.log('✅ data.json is bijgewerkt!');

    // Voer git-commando’s uit
    git
      .silent(true)
      .add('.')
      .commit('Auto-update van data.json')
      .then(() => git.getRemotes(true))
      .then(remotes => {
        const hasOrigin = remotes.some(r => r.name === 'origin');
        if (!hasOrigin) {
          return git.addRemote('origin', repoUrl);
        }
      })
      .then(() => git.push('origin', branch))
      .then(() => console.log('✅ Push succesvol!'))
      .catch(err => console.error('❌ Fout bij pushen naar GitHub:', err));
  })
  .catch(err => {
    console.error('❌ Fout bij ophalen van JSON:', err);
  });
