const legs = [];

function updateUI() {
  const container = document.getElementById("multi-legs");
  container.innerHTML = "";
  legs.forEach((leg, i) => {
    const percent = Math.min((leg.current / leg.target) * 100, 100);
    const status = leg.current >= leg.target ? "✅ Complete" : "🔄 In Progress";
    container.innerHTML += `
      <div class="leg">
        <strong>${leg.name} - ${leg.type}</strong><br/>
        Target: <input type="number" value="${leg.target}" onchange="updateTarget(${i}, this.value)" /> 
        Current: ${leg.current}
        <div class="progress-container">
          <div class="progress-bar" style="width: ${percent}%"></div>
        </div>
        <div class="leg-status">${status}</div>
      </div>
    `;
  });
}

function updateTarget(index, newValue) {
  legs[index].target = parseInt(newValue);
  updateUI();
}

function simulateFetch() {
  legs.forEach(leg => {
    if (leg.name === "Shai Bolton") leg.current = 13;
    if (leg.name === "Dylan Moore") leg.current = 16;
    if (leg.name === "Jack Gunston") leg.current = 1;
  });
  updateUI();
}

function scanScreenshot() {
  // Simulated OCR logic — you can integrate Tesseract.js here
  legs.length = 0;
  legs.push({ name: "Shai Bolton", type: "Disposals", target: 15, current: 0 });
  legs.push({ name: "Dylan Moore", type: "Disposals", target: 15, current: 0 });
  legs.push({ name: "Jack Gunston", type: "Goals", target: 1, current: 0 });
  updateUI();
  document.getElementById("compare-btn").style.display = "inline-block";
}

function compareToSportsBet() {
  alert("This would now fetch live data from Sportsbet or AFL API and compare stats.");
}

window.onload = updateUI;
