---
nome_esercizio: Chest press
tags:
---

# Descrizione
La Chest Press (pressa per pettorali) è un esercizio fondamentale per lo sviluppo della parte superiore del corpo, eseguito su una macchina appositamente progettata che guida il movimento. Questo esercizio compound coinvolge principalmente i muscoli pettorali (grande pettorale e piccolo pettorale), i tricipiti e i deltoidi anteriori. A differenza della panca con bilanciere, la Chest Press offre un percorso di movimento guidato e stabile, riducendo la necessità di equilibrio e stabilizzazione, permettendo così di concentrarsi completamente sul lavoro muscolare. È particolarmente utile per principianti, per chi si sta riprendendo da infortuni o per chi desidera isolare e sviluppare specificamente i muscoli del petto con un rischio ridotto di sovraccarico articolare a spalle e polsi.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Siediti sulla macchina con la schiena ben appoggiata contro lo schienale
   - Regola l'altezza del sedile in modo che le impugnature e il petto siano allineati
   - Afferra le maniglie con una presa salda, palmi rivolti verso il basso o in posizione neutra (dipende dal design della macchina)
   - I gomiti dovrebbero essere piegati e allineati o leggermente al di sotto della linea delle spalle
   - Mantieni i piedi ben appoggiati a terra per stabilità

2. **Fase di spinta (concentrica)**:
   - Espira mentre spingi le maniglie in avanti
   - Estendi le braccia in modo controllato senza bloccare completamente i gomiti
   - Contrai i muscoli pettorali durante il movimento di spinta
   - Mantieni le spalle abbassate e indietro (non sollevate verso le orecchie)
   - Evita di inarcare la schiena durante la spinta

3. **Fase di ritorno (eccentrica)**:
   - Inspira mentre riporti le maniglie verso il petto in modo controllato
   - Permetti ai gomiti di piegarsi fino a raggiungere una posizione in cui senti un buon allungamento dei pettorali
   - Mantieni il controllo durante tutta la fase di ritorno, evitando movimenti bruschi
   - Non permettere al peso di "rimbalzare" nella posizione più arretrata

4. **Varianti di esecuzione**:
   - Presa più larga: maggiore enfasi sui pettorali esterni
   - Presa più stretta: maggiore coinvolgimento dei tricipiti e della parte interna del petto
   - Esecuzione unilaterale: utilizzo di un braccio alla volta per correggere squilibri
   - Diverse inclinazioni dello schienale (se disponibili): per enfatizzare diverse aree del petto

# Note di Sicurezza
- Regola sempre la macchina in base alla tua anatomia prima di iniziare l'esercizio
- Evita di utilizzare carichi eccessivi che compromettano la corretta tecnica di esecuzione
- Non bloccare completamente i gomiti nella fase di estensione per ridurre lo stress sulle articolazioni
- Mantieni i polsi in posizione neutra, evitando flessioni eccessive
- Evita di sollevare le spalle o inarcare la schiena durante l'esercizio
- Non trattenere il respiro durante l'esecuzione
- Se avverti dolore acuto alle spalle, ai gomiti o ai polsi, interrompi immediatamente l'esercizio
- Quando utilizzi carichi pesanti, assicurati che la macchina abbia fermi di sicurezza correttamente posizionati
- Inizia sempre con un adeguato riscaldamento delle articolazioni delle spalle
- Al termine dell'esercizio, riporta sempre le maniglie alla posizione iniziale in modo controllato, evitando di rilasciarle bruscamente

# Log delle Performance
```dataviewjs
const config = {
    limit: 50,
    templatePath: "theGYM/Log/Data",
    timestampFormat: 'MMDD-HHmmss',  
    template: {
        fields: [
            "Rep",
            "Weight",
            "Volume"
        ],
        additionalFields: (exercise, currentPage) => [
            `Esercizio::[[${exercise}]]`,
            `Origine:: ${currentPage}`
        ]
    }
};
const exercise = dv.current().file.name;
const currentPage = dv.current().file.link;

// Funzione per generare il template
const generateTemplate = (exercise, currentPage) => {
    const fields = config.template.fields.map(field => `${field}:`);
    const additionalFields = config.template.additionalFields(exercise, currentPage);
    
    return [
        "---",
        ...fields,
        "---",
        ...additionalFields
    ].join('\n');
};

// Creiamo e stiliamo il pulsante
const buttonMaker = this.container.createEl('button', {
    text: "➕ Aggiungi Log",
    cls: "add-log-button"
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
buttonMaker.addEventListener('mouseover', () => {
    buttonMaker.style.backgroundColor = 'var(--interactive-accent-hover)';
});
buttonMaker.addEventListener('mouseout', () => {
    buttonMaker.style.backgroundColor = 'var(--interactive-accent)';
});

// Funzionalità del pulsante
buttonMaker.addEventListener('click', async () => {
    const timestamp = moment().format(config.timestampFormat);
    const newFileName = `${config.templatePath}/${exercise}-${timestamp}.md`;  // Nome file modificato
    const template = generateTemplate(exercise, currentPage);
    
    await app.vault.create(newFileName, template);
    app.workspace.openLinkText(newFileName, '', true);
});

// Query per la tabella
dv.table(
    ["Data", "Esercizio", "Ripetizioni", "Peso (kg)", "Volume", "Link"],
    dv.pages(`"${config.templatePath}"`)
        .where(p =>  p.Esercizio?.path === dv.page(exercise).file.path)
        .sort(p => p.file.ctime, 'asc')
        .limit(config.limit)
        .map(p => [
            p.file.ctime,
            p.Esercizio,
            p.Rep,
            p.Weight,
            p.Volume,
            p.file.link
        ])
);
```
### grafico
```dataviewjs
// Configurazione
const config = {
    templatePath: "theGYM/Log/Data",
    limit: 50,  // Aumentato il limite per includere più dati storici
};

// Ottieni il nome dell'esercizio dal titolo della nota corrente
const exercise = dv.current().nome_esercizio;
const chartTitle = `Progresso Volume ${exercise} (Somma Giornaliera)`;

// Ottieni i dati dal database
let data = dv.pages(`"${config.templatePath}"`)
    .where(p => p.Esercizio?.path === dv.current().file.path)
    .sort(p => p.file.ctime, 'asc')
    .limit(config.limit);

// Oggetto per aggregare i volumi per data
let dailyVolumes = {};

// Funzione per formattare la data nel formato GG/MM
function formatDate(dateObj) {
    const date = new Date(dateObj);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
}

// Aggregazione dei volumi per giorno
data.forEach(page => {
    const dateKey = formatDate(page.file.ctime);
    
    // Se il volume è definito, aggregalo
    if (page.Volume) {
        if (dailyVolumes[dateKey]) {
            dailyVolumes[dateKey] += page.Volume;
        } else {
            dailyVolumes[dateKey] = page.Volume;
        }
    }
});

// Estrai i dati aggregati per il grafico
let labels = Object.keys(dailyVolumes).sort((a, b) => {
    // Ordinamento per data (GG/MM)
    const [dayA, monthA] = a.split('/').map(n => parseInt(n));
    const [dayB, monthB] = b.split('/').map(n => parseInt(n));
    
    if (monthA !== monthB) return monthA - monthB;
    return dayA - dayB;
});

let volumeData = labels.map(date => dailyVolumes[date]);

// Crea il contenitore per il grafico
const chartContainer = this.container.createEl('div');
chartContainer.style.width = '100%';
chartContainer.style.height = '300px';
chartContainer.style.marginBottom = '20px';

// Verifica se ci sono dati da visualizzare
if (volumeData.length === 0) {
    const noDataMsg = chartContainer.createEl('p');
    noDataMsg.textContent = "Nessun dato disponibile per il grafico. Aggiungi i log delle tue sessioni.";
    noDataMsg.style.textAlign = 'center';
    noDataMsg.style.padding = '20px';
    noDataMsg.style.color = 'var(--text-muted)';
} else {
    // Prepara i dati per il grafico
    const chartData = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Volume Totale Giornaliero',
                data: volumeData,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.1)',
                tension: 0.1,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: chartTitle,
                    font: {
                        size: 16
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Volume: ${context.parsed.y} kg`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Volume (kg)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Data Sessione'
                    }
                }
            }
        }
    };

    // Genera il grafico usando il plugin Chart di Obsidian
    window.renderChart(chartData, chartContainer);
}
```