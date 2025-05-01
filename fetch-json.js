const fs = require('fs');
const fetch = require('node-fetch');

// 🔁 Vervang deze link met jouw werkende JSON-link:
const url = 'https://script.google.com/macros/s/AKfycbw8MHQH8V75bxn68rPSoiY5dLti6tVBFmACPWyDMprcKikNkDcCJJxAld-16-FHITYi/exec';

fetch(url)
  .then(res => res.json())
  .then(data => {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    console.log('✅ data.json is bijgewerkt!');
  })
  .catch(err => {
    console.error('❌ Fout bij ophalen van JSON:', err);
  });