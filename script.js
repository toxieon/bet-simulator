document.getElementById('screenshot').addEventListener('change', function (e) {
  const file = e.target.files[0];
  const preview = document.getElementById('preview');
  if (file) {
    const reader = new FileReader();
    reader.onload = function (evt) {
      preview.src = evt.target.result;
      preview.style.display = 'block';

      // Placeholder: Simulate detection
      document.getElementById('bookmaker').value = "sportsbet";
      document.getElementById('game').value = "geelong_vs_richmond";
    };
    reader.readAsDataURL(file);
  }
});

function compareOdds() {
  const bookmaker = document.getElementById('bookmaker').value;
  const game = document.getElementById('game').value;

  if (!bookmaker || !game) {
    alert("Please select both bookmaker and game.");
    return;
  }

  const fakeOdds = {
    sportsbet: { team1: 1.85, team2: 1.95 },
    tab: { team1: 1.80, team2: 2.00 },
    bet365: { team1: 1.88, team2: 1.92 },
    pointsbet: { team1: 1.90, team2: 1.91 }
  };

  const odds = fakeOdds[bookmaker];

  document.getElementById('comparisonResult').innerHTML = `
    <h3>Odds for ${game.replace(/_/g, ' ')}</h3>
    <table class="comparison-table">
      <tr>
        <th>Bookmaker</th>
        <th>Team 1 Odds</th>
        <th>Team 2 Odds</th>
      </tr>
      <tr>
        <td>${bookmaker}</td>
        <td>${odds.team1}</td>
        <td>${odds.team2}</td>
      </tr>
    </table>
  `;
}
