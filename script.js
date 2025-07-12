const allMultis = [];

function toggleMenu() {
  document.getElementById("menu").classList.toggle("hidden");
}
function toggleSettings() {
  document.getElementById("settings").classList.toggle("hidden");
}
function setTheme(mode) {
  document.body.className = mode + "-mode";
}

function createLegHTML(leg, index) {
  const percent = Math.min((leg.current / leg.target) * 100, 100);
  const status = leg.current >= leg.target ? "✅ Complete" : "🔄 In Progress";
  const aflLink = `https://www.afl.com.au/players?query=${encodeURIComponent(leg.name.replace(' ', '+'))}`;
  return `
    <div class="leg">
      <div class="leg-details">
        <div style="display: flex; align-items: center;">
          <div class="gurney" style="background:${leg.color || '#333'}">${leg.number || '?'}</div>
          <strong>${leg.name} - ${leg.type}</strong>
        </div>
        <a href="${aflLink}" class="link-icon" target="_blank">🔗</a>
      </div>
      Target: <input type="number" value="${leg.target}" onchange="updateTarget(${index}, this.value, ${allMultis.length - 1})"/> 
      Current: ${leg.current}
      <div class="progress-container">
        <div class="progress-bar" style="width: ${percent}%"></div>
      </div>
      <div class="leg-status">${status}</div>
    </div>`;
}

function updateTarget(index, newValue, multiIndex) {
  allMultis[multiIndex].legs[index].target = parseInt(newValue);
  renderMultis();
}

function renderMultis() {
  const container = document.getElementById("multi-wrapper");
  container.innerHTML = "";
  allMultis.forEach((multi, mIndex) => {
    const legsHTML = multi.legs.map((leg, i) => createLegHTML(leg, i)).join("");
    container.innerHTML += `<div class="multi">${legsHTML}</div>`;
  });
  updateMatchHeader();
}

function scanScreenshot() {
  // Simulate scanning
  const legs = [
    { name: "Shai Bolton", type: "Disposals", target: 15, current: 0, number: 29, color: "#552288" },
    { name: "Dylan Moore", type: "Disposals", target: 15, current: 0, number: 36, color: "#111144" },
    { name: "Josh Battle", type: "Disposals", target: 15, current: 0, number: 26, color: "#aa0000" },
    { name: "Jack Gunston", type: "Goals", target: 1, current: 0, number: 19, color: "#663300" },
  ];
  allMultis.push({ legs });
  renderMultis();
}

function simulateFetch() {
  allMultis.forEach(multi => {
    multi.legs.forEach(leg => {
      if (leg.name === "Shai Bolton") leg.current = 13;
      if (leg.name === "Dylan Moore") leg.current = 16;
      if (leg.name === "Josh Battle") leg.current = 8;
      if (leg.name === "Jack Gunston") leg.current = 1;
    });
  });
  renderMultis();
}

function updateMatchHeader() {
  document.getElementById("game-info").innerText = "Fremantle vs Hawthorn – Round 18 – Sat 12 Jul 20:10 AEST";
  document.getElementById("team-home-logo").src = "https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Fremantle_FC_logo.svg/1200px-Fremantle_FC_logo.svg.png";
  document.getElementById("team-away-logo").src = "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Hawthorn_Football_Club_Logo.svg/1200px-Hawthorn_Football_Club_Logo.svg.png";
}

window.onload = renderMultis;
