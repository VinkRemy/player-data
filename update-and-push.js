const fetch = require('node-fetch');
const fs = require('fs');
const simpleGit = require('simple-git');
const dotenv = require('dotenv');

// Laad je .env bestand
dotenv.config();

const repoUrl = process.env.GITHUB_REPO_URL;
const branch = process.env.GITHUB_BRANCH || 'main';
const git = simpleGit();

const url = 'https://vinkremy.github.io/player-data/data.json';

fetch(url)
  .then(res => res.json())
  .then(data => {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    console.log('✅ data.json is bijgewerkt!');

    git
      .silent(true)
      .init()
      .checkoutLocalBranch(branch)  // <-- Hier zorg je dat 'main' bestaat lokaal
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
