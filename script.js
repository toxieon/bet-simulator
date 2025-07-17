const statOptions = [
  "Anytime Goal Scorer",
  "10+ Disposals",
  "15+ Disposals",
  "20+ Disposals",
  "25+ Disposals",
  "30+ Disposals"
];

const playerOptionsByGame = {
  essendon_gws: ["Zach Merrett", "Archie Perkins", "Peter Wright", "Archie Roberts"],
  carlton_essendon: ["Sam Walsh", "Patrick Cripps", "Charlie Curnow", "Zach Merrett"],
  geelong_richmond: ["Patrick Dangerfield", "Tom Stewart", "Jeremy Cameron", "Dustin Martin"]
};

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

document.getElementById("screenshot").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const outputList = document.getElementById("ocrLegs");
  outputList.innerHTML = "<li><em>Processing screenshot...</em></li>";

  if (file) {
    const reader = new FileReader();
    reader.onload = function (evt) {
      Tesseract.recognize(evt.target.result, 'eng').then(({ data: { text } }) => {
        const lines = text.split("\n").map(l => l.trim()).filter(l => l);
        outputList.innerHTML = "";
        let count = 0;
        lines.forEach(line => {
          if (/\d+\+ Disposals|Goal Scorer/i.test(line)) {
            const li = document.createElement("li");
            li.textContent = line;
            outputList.appendChild(li);
            count++;
          }
        });
        if (count === 0) outputList.innerHTML = "<li><em>No bet legs detected.</em></li>";
      });
    };
    reader.readAsDataURL(file);
  }
});

function compareOdds() {
  const legDivs = document.querySelectorAll("#legs div");
  if (legDivs.length === 0) {
    alert("Please add at least one leg.");
    return;
  }

  const legs = Array.from(legDivs).map(div => ({
    player: div.querySelector(".player").value,
    stat: div.querySelector(".stat").value
  }));

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
