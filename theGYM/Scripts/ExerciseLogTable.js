// File: "theGYM/Scripts/ExerciseLogTable.js"

// Gestione intelligente del container
const container = Object.prototype.hasOwnProperty.call(this, "container")
  ? this.container
  : input && input.container
  ? input.container
  : dv.container;

// Gestisce la struttura nidificata dei parametri
let params;
if (input && Object.prototype.hasOwnProperty.call(input, "input")) {
  params = input.input;
} else {
  params = input || {};
}

// Debug iniziale se richiesto
const debug = params.debug || false;
if (debug) {
  console.log("Parametri elaborati:", params);
}

// Configurazione della tabella
const config = {
  limit: params.limit || 50,
  templatePath: params.templatePath || "theGYM/Log/Data",
  timestampFormat: params.timestampFormat || "MMDD-HHmmss",
  showAddButton: params.showAddButton !== false,
  buttonText: params.buttonText || "➕ Aggiungi Log",
  searchByName: params.searchByName || false,
  exactMatch: params.exactMatch || false,
  debug: debug,
  template: {
    fields: params.fields || ["Rep", "Weight", "Volume"],
    additionalFields:
      params.additionalFields ||
      ((exercise, currentPage) => [
        `Esercizio::[[${exercise}]]`,
        `Origine:: ${currentPage}`,
      ]),
  },
  columns: params.columns || [
    "Data",
    "Esercizio",
    "Ripetizioni",
    "Peso (kg)",
    "Volume",
    "Link",
  ],
};

// Usa il nome esercizio dai parametri elaborati
const exerciseName = params.exercise || "Esercizio sconosciuto";
if (debug) {
  console.log("Nome esercizio utilizzato:", exerciseName);
}

const exercisePath = params.exercisePath || dv.current().file.path;
const currentPage = params.currentPage || dv.current().file.link;

// Funzione per generare il template
const generateTemplate = (exercise, currentPage) => {
  const fields = config.template.fields.map((field) => `${field}:`);
  const additionalFields = config.template.additionalFields(
    exercise,
    currentPage
  );

  return ["---", ...fields, "---", ...additionalFields].join("\n");
};

// Creiamo l'area principale
const mainContainer = container.createEl("div");
mainContainer.style.width = "100%";

// Creiamo e stiliamo il pulsante se richiesto
if (config.showAddButton) {
  const buttonMaker = mainContainer.createEl("button", {
    text: config.buttonText,
    cls: "add-log-button",
  });

  // Stili del pulsante
  buttonMaker.style.cssText = `
        background-color: var(--interactive-accent);
        color: var(--text-on-accent);
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 4px;
        transition: background-color 0.2s ease;
    `;

  // Effetti hover
  buttonMaker.addEventListener("mouseover", () => {
    buttonMaker.style.backgroundColor = "var(--interactive-accent-hover)";
  });
  buttonMaker.addEventListener("mouseout", () => {
    buttonMaker.style.backgroundColor = "var(--interactive-accent)";
  });

  // Funzionalità del pulsante
  buttonMaker.addEventListener("click", async () => {
    const timestamp = moment().format(config.timestampFormat);
    const newFileName = `${config.templatePath}/${exerciseName}-${timestamp}.md`;
    const template = generateTemplate(exerciseName, currentPage);

    await app.vault.create(newFileName, template);
    app.workspace.openLinkText(newFileName, "", true);
  });
}

// Crea un div per la tabella
const tableContainer = mainContainer.createEl("div");
tableContainer.style.width = "100%";
tableContainer.style.overflowX = "auto";

// Ottieni tutte le pagine
const allPages = dv.pages(`"${config.templatePath}"`);
if (debug) {
  console.log(
    `Trovate ${allPages.length} pagine totali in ${config.templatePath}`
  );
}

// Funzione per confrontare la somiglianza dei nomi
function getMatchScore(name, searchTerm) {
  name = name.toLowerCase();
  searchTerm = searchTerm.toLowerCase();

  // Corrispondenza esatta
  if (name === searchTerm) return 100;

  // Parola completa all'inizio del nome
  if (name.startsWith(searchTerm + " ")) return 90;

  // Parola completa alla fine del nome
  if (name.endsWith(" " + searchTerm)) return 80;

  // Parola completa nel nome
  if (name.includes(" " + searchTerm + " ")) return 70;

  // Contiene il termine di ricerca
  if (name.includes(searchTerm)) return 60;

  return 0;
}

// METODO 1: Raccogli tutti i file e i percorsi Esercizio
const exercisePaths = {};
const fileNameMatches = [];

// Esamina tutti i log
allPages.forEach((p) => {
  // Verifica corrispondenza nel nome file
  const fileName = p.file.name;
  const fileMatchScore = getMatchScore(fileName, exerciseName);

  if (fileMatchScore > 0) {
    fileNameMatches.push({
      page: p,
      score: fileMatchScore,
      name: fileName,
    });
  }

  // Raccogli i percorsi Esercizio
  if (p.Esercizio && p.Esercizio.path) {
    // Registra tutti i percorsi esercizi
    if (!exercisePaths[p.Esercizio.path]) {
      exercisePaths[p.Esercizio.path] = {
        count: 0,
        name: p.Esercizio.display || dv.page(p.Esercizio.path).file.name,
      };
    }
    exercisePaths[p.Esercizio.path].count++;

    // Calcola il punteggio per questo percorso
    const pathName = dv.page(p.Esercizio.path).file.name;
    exercisePaths[p.Esercizio.path].score = getMatchScore(
      pathName,
      exerciseName
    );
  }
});

if (debug) {
  console.log("Corrispondenze per nome file:", fileNameMatches);
  console.log("Percorsi esercizi con punteggi:", exercisePaths);
}

// Identifica il miglior percorso esercizio
let bestPath = null;
let bestScore = -1;

Object.entries(exercisePaths).forEach(([path, info]) => {
  if (info.score > bestScore) {
    bestScore = info.score;
    bestPath = path;
  }
});

// Se la corrispondenza è alta (> 70), usa quel percorso
let filteredPages = [];
let usedMethod = "";

if (bestPath && bestScore >= 70) {
  // Usa il percorso con la migliore corrispondenza
  filteredPages = allPages.where((p) => p.Esercizio?.path === bestPath);
  usedMethod = `percorso esatto (${bestPath})`;

  if (debug) {
    console.log(
      `Utilizzando percorso esatto "${bestPath}" con punteggio ${bestScore}`
    );
    console.log(`Trovate ${filteredPages.length} pagine`);
  }
} else if (fileNameMatches.length > 0) {
  // Altrimenti usa i nomi file, ordinati per punteggio
  fileNameMatches.sort((a, b) => b.score - a.score);

  // Se si richiede una corrispondenza esatta, filtra ulteriormente
  if (config.exactMatch) {
    const exactMatches = fileNameMatches.filter((m) => m.score >= 90);
    if (exactMatches.length > 0) {
      fileNameMatches = exactMatches;
    }
  }

  // Ottieni le pagine solo dalle corrispondenze migliori
  const bestFileScore = fileNameMatches[0].score;
  const bestFileMatches = fileNameMatches.filter(
    (m) => m.score === bestFileScore
  );

  filteredPages = bestFileMatches.map((m) => m.page);
  usedMethod = `nome file (punteggio ${bestFileScore})`;

  if (debug) {
    console.log(
      `Utilizzando corrispondenze per nome file con punteggio ${bestFileScore}`
    );
    console.log(`Trovate ${filteredPages.length} pagine`);
  }
} else {
  if (debug) {
    console.log("Nessuna corrispondenza trovata");
  }
}

// Se non abbiamo risultati, mostra un messaggio con tutti i percorsi trovati
if (filteredPages.length === 0) {
  const errorMsg = tableContainer.createEl("div", {
    text: `Nessun dato trovato per l'esercizio "${exerciseName}". Verifica che l'esercizio esista.`,
  });
  errorMsg.style.color = "var(--text-error)";
  errorMsg.style.padding = "15px";
  errorMsg.style.textAlign = "center";

  // Aggiungi dettagli di debug
  const debugDetails = tableContainer.createEl("details");
  const summary = debugDetails.createEl("summary", {
    text: "Mostra esercizi disponibili",
  });

  const debugContent = debugDetails.createEl("div");
  debugContent.style.padding = "10px";
  debugContent.style.backgroundColor = "var(--background-secondary)";
  debugContent.style.borderRadius = "5px";
  debugContent.style.textAlign = "left";

  // Crea un elenco dei percorsi esercizi
  debugContent.innerHTML = "<strong>Esercizi trovati nei log:</strong>";

  const exerciseList = debugDetails.createEl("ul");

  Object.entries(exercisePaths)
    .sort((a, b) => b[1].count - a[1].count)
    .forEach(([path, info]) => {
      const li = exerciseList.createEl("li");
      li.innerHTML = `${info.name} (${info.count} log)`;
    });
} else {
  // Query per la tabella
  dv.table(
    config.columns,
    filteredPages
      .sort((p) => p.file.ctime, "desc") // Mostra i più recenti prima
      .limit(config.limit)
      .map((p) => [
        p.file.ctime,
        p.Esercizio,
        p.Rep,
        p.Weight,
        p.Volume,
        p.file.link,
      ]),
    tableContainer
  );

  // Mostra info sul metodo usato
  const infoDiv = mainContainer.createEl("div");
  infoDiv.style.fontSize = "0.8em";
  infoDiv.style.color = "var(--text-muted)";
  infoDiv.style.marginTop = "10px";
  infoDiv.innerHTML = `Nota: Trovati ${filteredPages.length} log per "${exerciseName}" usando ${usedMethod}`;
}
