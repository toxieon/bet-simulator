const statOptions = [
  "Anytime Goal Scorer",
  "10+ Disposals",
  "15+ Disposals",
  "20+ Disposals",
  "25+ Disposals",
  "30+ Disposals"
];

const playerOptionsByGame = {};

async function fetchFixtures() {
  // Placeholder: Simulate AFL fixtures
  const games = [
    { id: "essendon_gws", name: "Essendon vs GWS GIANTS", players: ["Zach Merrett", "Archie Perkins", "Peter Wright", "Archie Roberts"] },
    { id: "carlton_essendon", name: "Carlton vs Essendon", players: ["Sam Walsh", "Patrick Cripps", "Charlie Curnow", "Zach Merrett"] },
    { id: "geelong_richmond", name: "Geelong vs Richmond", players: ["Patrick Dangerfield", "Tom Stewart", "Jeremy Cameron", "Dustin Martin"] }
  ];

  const select = document.getElementById("gameSelect");
  select.innerHTML = '<option value="">-- Select Game --</option>';
  games.forEach(game => {
    const opt = document.createElement("option");
    opt.value = game.id;
    opt.textContent = game.name;
    select.appendChild(opt);
    playerOptionsByGame[game.id] = game.players;
  });
}

document.getElementById("gameSelect").addEventListener("change", () => {
  document.getElementById("legs").innerHTML = "";
});

document.getElementById("addLegBtn").addEventListener("click", () => {
  const game = document.getElementById("gameSelect").value;
  if (!game) {
    alert("Please select a game first.");
    return;
  }

  const players = playerOptionsByGame[game] || [];
  const legDiv = document.createElement("div");
  legDiv.innerHTML = `
    <select class="player">${players.map(p => `<option value="${p}">${p}</option>`).join("")}</select>
    <select class="stat">${statOptions.map(s => `<option value="${s}">${s}</option>`).join("")}</select><br/>
  `;
  document.getElementById("legs").appendChild(legDiv);
});

async function compareOdds() {
  const legDivs = document.querySelectorAll("#legs div");
  if (legDivs.length === 0) {
    alert("Please add at least one leg.");
    return;
  }

  const legs = Array.from(legDivs).map(div => ({
    player: div.querySelector(".player").value,
    stat: div.querySelector(".stat").value
  }));

  // Placeholder simulated API odds data
  const oddsData = {
    Sportsbet: [1.85, 1.90, 1.88, 2.00],
    TAB: [1.80, 1.91, 1.89, 1.95],
    Bet365: [1.88, 1.89, 1.90, 2.05],
    PointsBet: [1.84, 1.88, 1.87, 2.00]
  };

  let tableHTML = '<h3>Best Odds</h3><table class="comparison-table"><tr><th>Bookmaker</th>';
  legs.forEach((leg, i) => {
    tableHTML += `<th>${leg.player}<br>${leg.stat}</th>`;
  });
  tableHTML += '</tr>';

  const bestOddsPerLeg = legs.map((_, i) => {
    let best = 0;
    for (let site in oddsData) {
      if (oddsData[site][i] > best) best = oddsData[site][i];
    }
    return best;
  });

  for (let site in oddsData) {
    tableHTML += `<tr><td>${site}</td>`;
    oddsData[site].forEach((odds, i) => {
      const isBest = odds === bestOddsPerLeg[i];
      tableHTML += `<td class="${isBest ? 'best-odds' : ''}">${odds.toFixed(2)}</td>`;
    });
    tableHTML += "</tr>";
  }

  tableHTML += "</table>";
  document.getElementById("comparisonResult").innerHTML = tableHTML;
}

document.getElementById("screenshot").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const preview = document.getElementById("preview");
  if (file) {
    const reader = new FileReader();
    reader.onload = function (evt) {
      preview.src = evt.target.result;
      preview.style.display = 'block';
      Tesseract.recognize(
        evt.target.result,
        'eng',
        { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        console.log("OCR Result:", text);
        // Placeholder logic: show OCR output in console
        // You could map player/stat names using AI or regex
      });
    };
    reader.readAsDataURL(file);
  }
});

window.onload = fetchFixtures;
