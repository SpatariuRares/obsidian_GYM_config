---
nome_esercizio: inclined chest press
tags:
  - petto
  - pettorale
  - spalle
  - tricipiti
  - compound
---
# Descrizione
La Inclined Chest Press (pressa inclinata per pettorali) è un esercizio mirato che si concentra sulla porzione superiore del petto, eseguito su una macchina con schienale regolato a un'inclinazione positiva (tipicamente tra 30° e 45°). Questo esercizio compound coinvolge principalmente il grande pettorale (con enfasi sulla porzione clavicolare), il piccolo pettorale, i deltoidi anteriori e i tricipiti. A differenza della chest press orizzontale, l'angolazione inclinata sposta il focus sulla parte alta del petto, un'area spesso più difficile da sviluppare. La Inclined Chest Press offre i vantaggi di un movimento guidato che riduce la necessità di stabilizzazione, permettendo di concentrarsi sull'attivazione muscolare specifica. È particolarmente efficace per bilanciare lo sviluppo del petto e creare una definizione muscolare più completa nella regione pettorale superiore.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Siediti sulla macchina con la schiena e la testa ben appoggiate contro lo schienale inclinato
   - Regola l'altezza del sedile in modo che le impugnature siano allineate con la parte superiore del petto
   - Afferra le maniglie con una presa salda, generalmente con i palmi rivolti verso il basso o in posizione neutra
   - I gomiti dovrebbero essere piegati e posizionati leggermente al di sotto della linea delle spalle
   - Mantieni i piedi ben appoggiati a terra e le scapole retratte (spalle indietro)

2. **Fase di spinta (concentrica)**:
   - Espira mentre spingi le maniglie verso l'alto e leggermente in avanti
   - Estendi le braccia in modo controllato senza bloccare completamente i gomiti
   - Concentrati sulla contrazione della parte superiore dei pettorali
   - Mantieni le spalle abbassate e il collo in posizione neutra
   - Evita di sollevare i glutei dal sedile o inarcare la schiena

3. **Fase di ritorno (eccentrica)**:
   - Inspira mentre abbassi lentamente le maniglie in modo controllato
   - Permetti ai gomiti di scendere fino a sentire un buon allungamento nella parte superiore del petto
   - Mantieni la tensione nei muscoli pettorali durante tutto il movimento
   - Evita di far "collassare" il peso nella posizione più bassa
   - Non permettere alle spalle di ruotare in avanti durante la discesa

4. **Varianti di esecuzione**:
   - Regolazione dell'inclinazione: angolazioni più pronunciate (45°) enfatizzano maggiormente la parte alta del petto
   - Presa più larga: maggiore attivazione dei pettorali esterni
   - Presa più stretta: maggiore coinvolgimento dei tricipiti
   - Esecuzione unilaterale: utilizzo di un braccio alla volta per correggere squilibri muscolari

# Note di Sicurezza
- Regola sempre correttamente l'inclinazione dello schienale e l'altezza del sedile prima di iniziare
- Non utilizzare carichi eccessivi che compromettano la corretta postura o tecnica di esecuzione
- Evita di sollevare la testa dal poggiatesta durante lo sforzo
- Mantieni sempre il controllo del movimento, specialmente nella fase eccentrica
- Non bloccare completamente i gomiti nella posizione estesa per ridurre lo stress articolare
- Evita di spingere con i piedi o inarcare la schiena per aiutarti nel movimento
- Se avverti dolore alle spalle, al collo o ai polsi, interrompi immediatamente l'esercizio
- Assicurati che i fermi di sicurezza della macchina siano correttamente posizionati
- Esegui sempre un adeguato riscaldamento delle articolazioni delle spalle prima di iniziare
- Mantieni una respirazione regolare durante l'esecuzione, evitando la manovra di Valsalva (trattenere il respiro)

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
`Macchina:: [[theGYM/macchine/data/chest press inclined PURE.md|chest press inclined PURE]]
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