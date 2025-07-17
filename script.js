function compareOdds() {
  const game = document.getElementById('game').value;
  const legs = [...document.querySelectorAll('#legs input')].map(input => input.value);

  if (!game || legs.length === 0) {
    alert("Please provide game and at least one leg.");
    return;
  }

  const oddsData = {
    Sportsbet: [1.85, 1.90, 1.88, 2.00],
    TAB: [1.80, 1.91, 1.89, 1.95],
    Bet365: [1.88, 1.89, 1.90, 2.05],
    PointsBet: [1.84, 1.88, 1.87, 2.00]
  };

  let tableHTML = '<h3>Best Odds for ' + game + '</h3>';
  tableHTML += '<table class="comparison-table"><tr><th>Bookmaker</th>';
  legs.forEach((leg, i) => tableHTML += '<th>' + leg + '</th>');
  tableHTML += '</tr>';

  const bestOddsPerLeg = legs.map((_, i) => {
    let best = 0;
    for (let site in oddsData) {
      if (oddsData[site][i] > best) best = oddsData[site][i];
    }
    return best;
  });

  for (let site in oddsData) {
    tableHTML += '<tr><td>' + site + '</td>';
    oddsData[site].forEach((odds, i) => {
      const className = odds === bestOddsPerLeg[i] ? 'best-odds' : '';
      tableHTML += '<td class="' + className + '">' + odds.toFixed(2) + '</td>';
    });
    tableHTML += '</tr>';
  }

  tableHTML += '</table>';
  document.getElementById('comparisonResult').innerHTML = tableHTML;
}

document.getElementById('screenshot').addEventListener('change', function (e) {
  const file = e.target.files[0];
  const preview = document.getElementById('preview');
  if (file) {
    const reader = new FileReader();
    reader.onload = function (evt) {
      preview.src = evt.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});
