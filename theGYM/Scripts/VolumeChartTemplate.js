// File: "theGYM/Scripts/VolumeChartTemplate.js"

// Accedi al container dalla variabile globale se disponibile
const container = Object.prototype.hasOwnProperty.call(this, "container")
  ? this.container
  : input && input.container
  ? input.container
  : dv.container;

// Usa i parametri se disponibili, altrimenti valori predefiniti
const params = input || {};

// 1. Ottieni l'esercizio dalla nota chiamante
const exercisePath = params.exercisePath || dv.current().file.path;
const exerciseTitle =
  params.title || dv.page(exercisePath)?.nome_esercizio || "Esercizio";
const customHeight = params.height || "250px";
const showTrend = params.showTrend !== false;
const showStats = params.showStats !== false;

// 2. Ottieni i dati
let data = dv
  .pages(`"theGYM/Log/Data"`)
  .where((p) => p.Esercizio?.path === exercisePath)
  .sort((p) => p.file.ctime, "asc")
  .limit(50);

// 3. Creiamo un div per il contenuto
const contentDiv = container.createEl("div");

// 4. Funzione per formattare la data
function formatDate(dateObj) {
  const date = new Date(dateObj);
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
}

// 5. Aggregazione dei volumi per giorno
let dailyVolumes = {};
data.forEach((page) => {
  if (!page.file || !page.file.ctime) return;
  const dateKey = formatDate(page.file.ctime);
  if (page.Volume) {
    dailyVolumes[dateKey] = (dailyVolumes[dateKey] || 0) + page.Volume;
  }
});

// 6. Estrai i dati aggregati per il grafico
let labels = Object.keys(dailyVolumes);
labels.sort((a, b) => {
  const [dayA, monthA] = a.split("/").map((n) => parseInt(n));
  const [dayB, monthB] = b.split("/").map((n) => parseInt(n));
  if (monthA !== monthB) return monthA - monthB;
  return dayA - dayB;
});

let volumeData = labels.map((date) => dailyVolumes[date]);

// 7. Verifica se ci sono dati disponibili
if (volumeData.length === 0) {
  contentDiv.innerHTML =
    "<p style='text-align:center;padding:20px;color:var(--text-muted)'>Nessun dato disponibile. Aggiungi log delle sessioni.</p>";
} else {
  // 8. Analisi del trend
  const firstValue = volumeData[0];
  const lastValue = volumeData[volumeData.length - 1];
  const percentChange = (((lastValue - firstValue) / firstValue) * 100).toFixed(
    1
  );

  // 9. Calcola la linea di tendenza (regressione lineare)
  const n = volumeData.length;
  const indices = Array.from({ length: n }, (_, i) => i);
  const sumX = indices.reduce((a, b) => a + b, 0);
  const sumY = volumeData.reduce((a, b) => a + b, 0);
  const sumXY = indices.reduce((a, i) => a + i * volumeData[i], 0);
  const sumXX = indices.reduce((a, i) => a + i * i, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // 10. Calcola i valori della linea di tendenza
  const trendlineData = indices.map((i) => intercept + slope * i);

  // 11. Determina direzione trend
  let trendDirection, trendColor, trendIcon;
  if (slope > 0.1) {
    trendDirection = "in aumento";
    trendColor = "green";
    trendIcon = "↗️";
  } else if (slope < -0.1) {
    trendDirection = "in diminuzione";
    trendColor = "red";
    trendIcon = "↘️";
  } else {
    trendDirection = "stabile";
    trendColor = "orange";
    trendIcon = "→";
  }

  // 12. Crea header con indicazione chiara del trend
  if (showTrend) {
    const trendHeader = contentDiv.createEl("div");
    trendHeader.style.padding = "10px";
    trendHeader.style.marginBottom = "15px";
    trendHeader.style.backgroundColor = "var(--background-secondary)";
    trendHeader.style.borderRadius = "5px";
    trendHeader.style.textAlign = "center";

    trendHeader.innerHTML = `
            <h3 style="margin:0;color:${trendColor}">
                ${trendIcon} Trend volume: <strong>${trendDirection}</strong> ${trendIcon}
            </h3>
            <p style="margin:5px 0 0 0">
                Variazione: <span style="color:${trendColor};font-weight:bold">
                ${percentChange > 0 ? "+" : ""}${percentChange}%</span> 
                (da ${firstValue} kg a ${lastValue} kg)
            </p>
        `;
  }

  // 13. Crea il contenitore per il grafico
  const chartContainer = contentDiv.createEl("div");
  chartContainer.style.width = "100%";
  chartContainer.style.height = customHeight;
  chartContainer.style.marginBottom = "20px";

  // 14. Versione più semplice per mobile - usa un timeout più lungo
  setTimeout(() => {
    try {
      // 15. Prepara i dati per il grafico con linea di tendenza
      const chartData = {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Volume (kg)",
              data: volumeData,
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgba(75, 192, 192, 0.1)",
              tension: 0.1,
              fill: true,
              pointRadius: 3,
              pointHoverRadius: 5,
            },
            {
              label: "Linea di tendenza",
              data: trendlineData,
              borderColor: trendColor,
              borderWidth: 2,
              borderDash: [5, 5],
              fill: false,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: exerciseTitle,
              font: { size: 13 },
            },
            legend: {
              display: true,
              position: "top",
            },
            tooltip: {
              displayColors: false,
              callbacks: {
                label: function (context) {
                  return `Volume: ${context.parsed.y} kg`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              ticks: { font: { size: 11 } },
            },
            x: {
              ticks: { font: { size: 11 } },
            },
          },
        },
      };

      // 16. Verifica se renderChart è disponibile
      if (typeof window.renderChart === "function") {
        window.renderChart(chartData, chartContainer);
      } else {
        // 17. Alternativa per mobile se renderChart non è disponibile
        const tableDiv = contentDiv.createEl("div");
        tableDiv.style.overflow = "auto";

        // 18. Creiamo una tabella semplice
        const table = tableDiv.createEl("table");
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";

        // 19. Intestazione tabella
        const thead = table.createEl("thead");
        const headerRow = thead.createEl("tr");
        ["Data", "Volume (kg)", "Tendenza"].forEach((text) => {
          const th = headerRow.createEl("th");
          th.textContent = text;
          th.style.padding = "8px";
          th.style.borderBottom = "1px solid var(--background-modifier-border)";
        });

        // 20. Corpo tabella - ora con indicatori di tendenza
        const tbody = table.createEl("tbody");

        volumeData.forEach((volume, i) => {
          // Calcola variazione rispetto al dato precedente
          let change = "";
          if (i > 0) {
            const diff = volume - volumeData[i - 1];
            change = diff > 0 ? "↑" : diff < 0 ? "↓" : "→";
            change += ` ${Math.abs(diff)} kg`;
          }

          const tr = tbody.createEl("tr");

          // Colonne
          const tdDate = tr.createEl("td");
          tdDate.textContent = labels[i];
          tdDate.style.padding = "8px";
          tdDate.style.borderBottom =
            "1px solid var(--background-modifier-border)";

          const tdVolume = tr.createEl("td");
          tdVolume.textContent = volume;
          tdVolume.style.padding = "8px";
          tdVolume.style.borderBottom =
            "1px solid var(--background-modifier-border)";

          const tdTrend = tr.createEl("td");
          tdTrend.innerHTML = change;
          tdTrend.style.padding = "8px";
          tdTrend.style.borderBottom =
            "1px solid var(--background-modifier-border)";
        });

        chartContainer.style.display = "none";
        tableDiv.createEl("p", {
          text: "Visualizzazione tabellare (Charts plugin non disponibile)",
          attr: {
            style: "text-align:center;color:var(--text-muted);font-size:0.8em;",
          },
        });
      }
    } catch (e) {
      console.error("Errore:", e);
      contentDiv.innerHTML =
        "Errore nella visualizzazione. Verifica che il plugin Charts sia installato.";
    }
  }, 300);

  // 21. Statistiche ulteriori
  if (showStats) {
    const statsDiv = contentDiv.createEl("div");
    statsDiv.style.marginTop = "10px";
    statsDiv.style.padding = "10px";
    statsDiv.style.backgroundColor = "var(--background-secondary)";
    statsDiv.style.borderRadius = "5px";

    // 22. Calcola ulteriori metriche
    const avgVolume = (
      volumeData.reduce((sum, vol) => sum + vol, 0) / volumeData.length
    ).toFixed(1);
    const maxVolume = Math.max(...volumeData);
    const maxVolumeDate = labels[volumeData.indexOf(maxVolume)];

    // 23. Calcola trend recente (ultime 3 sessioni se disponibili)
    let recentTrend = "";
    if (volumeData.length >= 3) {
      const recent = volumeData.slice(-3);
      if (recent[2] > recent[0]) {
        recentTrend = `<span style="color:green">+${(
          recent[2] - recent[0]
        ).toFixed(1)} kg nelle ultime 3 sessioni</span>`;
      } else if (recent[2] < recent[0]) {
        recentTrend = `<span style="color:red">${(
          recent[2] - recent[0]
        ).toFixed(1)} kg nelle ultime 3 sessioni</span>`;
      } else {
        recentTrend =
          "<span style='color:orange'>Stabile nelle ultime 3 sessioni</span>";
      }
    }

    statsDiv.innerHTML = `
            <strong>Analisi Volume:</strong>
            <ul style="margin-top:5px;margin-bottom:5px;">
                <li>Volume medio: ${avgVolume} kg</li>
                <li>Volume massimo: ${maxVolume} kg (${maxVolumeDate})</li>
                <li>Numero sessioni registrate: ${labels.length}</li>
                ${
                  recentTrend ? `<li>Tendenza recente: ${recentTrend}</li>` : ""
                }
            </ul>
        `;
  }
}
