const fetch = require('node-fetch');
const fs = require('fs');
const simpleGit = require('simple-git');
const dotenv = require('dotenv');

// Laad je .env bestand
dotenv.config();

// Haal je GitHub-token en repo-gegevens op
const token = process.env.GITHUB_TOKEN;
const repoUrl = process.env.GITHUB_REPO_URL;
const branch = process.env.GITHUB_BRANCH || 'main';

// GitHub repo voorbereiden
const git = simpleGit();

// Haal JSON op en sla op als data.json
const url = 'https://vinkremy.github.io/player-data/data.json'; // Jouw JSON-URL
fetch(url)
  .then(res => res.json())
  .then(async data => {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    console.log('✅ data.json is bijgewerkt!');

    try {
      // Controleer of de remote al bestaat
      const remotes = await git.getRemotes(true);
      const originExists = remotes.some(remote => remote.name === 'origin');
      
      if (originExists) {
        // Als origin bestaat, update de URL
        await git.removeRemote('origin');
      }
      
      // Voeg de remote toe
      await git.addRemote('origin', repoUrl);
      
      // Voeg bestanden toe, commit en push
      await git.add('.');
      await git.commit('Auto-update van data.json');
      
      // Push met authenticatie
      await git.push(['-u', 'origin', branch, '--force']);
      console.log('✅ Push succesvol!');
    } catch (err) {
      console.error('❌ Fout bij pushen naar GitHub:', err);
    }
  })
  .catch(err => {
    console.error('❌ Fout bij ophalen van JSON:', err);
  });