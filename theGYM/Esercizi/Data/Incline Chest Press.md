---
nome_esercizio: Incline Chest Press Machine
tags:
---
# Descrizione
L'Incline Chest Press (pressa inclinata per pettorali) è una variante della chest press tradizionale che si concentra maggiormente sulla parte superiore del petto. Eseguita su una macchina con seduta inclinata a circa 30-45 gradi, questo esercizio compound coinvolge principalmente il capo clavicolare del grande pettorale, i deltoidi anteriori e i tricipiti. L'angolazione inclinata sposta l'enfasi dai pettorali centrali a quelli superiori, un'area spesso più difficile da sviluppare. Rispetto alla panca inclinata con bilanciere, la versione alla macchina offre un movimento guidato che riduce la necessità di stabilizzazione, consentendo di concentrarsi sul lavoro muscolare con minor rischio di infortuni alle spalle. È particolarmente efficace per chi desidera migliorare la definizione e lo sviluppo della parte superiore del torace, creando una transizione armoniosa tra pettorali e deltoidi.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Siediti sulla macchina con la schiena e la testa ben appoggiate contro lo schienale inclinato
   - Regola l'altezza del sedile in modo che le impugnature siano allineate con la parte superiore del petto
   - Afferra le maniglie con una presa salda, palmi rivolti verso il basso o in posizione neutra
   - I gomiti dovrebbero essere piegati e posizionati leggermente al di sotto della linea delle spalle
   - Mantieni i piedi ben appoggiati a terra o sulle apposite pedane per garantire stabilità

2. **Fase di spinta (concentrica)**:
   - Espira mentre spingi le maniglie verso l'alto e in avanti
   - Estendi le braccia in modo controllato seguendo la traiettoria naturale del movimento
   - Evita di bloccare completamente i gomiti al punto di massima estensione
   - Contrai consapevolmente la parte superiore dei pettorali durante la spinta
   - Mantieni le spalle abbassate e stabilizzate contro lo schienale

3. **Fase di ritorno (eccentrica)**:
   - Inspira mentre riporti le maniglie verso il petto in modo controllato
   - Abbassa il peso fino a sentire un buon allungamento nella parte superiore del petto
   - Controlla il movimento per tutta la fase di discesa, evitando di lasciar cadere il peso
   - Mantieni il contatto tra schiena e schienale durante l'intero movimento

4. **Varianti di esecuzione**:
   - Diverse inclinazioni: modificare l'angolo dello schienale per enfatizzare diverse porzioni del pettorale superiore
   - Presa più larga: maggiore attivazione della parte esterna del petto
   - Presa più stretta: maggiore coinvolgimento dei tricipiti
   - Esecuzione unilaterale: utilizzo di un braccio alla volta per correggere squilibri muscolari
   - Pause isometriche: mantenere la contrazione per 1-2 secondi al punto di massima estensione

# Note di Sicurezza
- Adatta sempre l'inclinazione e la posizione del sedile alla tua struttura corporea
- Evita di sollevare i glutei dallo schienale durante la spinta per non sovraccaricare la zona lombare
- Non spingere la testa in avanti durante lo sforzo, mantienila appoggiata allo schienale
- Evita di utilizzare carichi eccessivi che compromettano la corretta tecnica di esecuzione
- Mantieni i polsi in posizione neutra durante tutto il movimento per prevenire tensioni
- Non bloccare completamente i gomiti nella fase di estensione per proteggere le articolazioni
- Se avverti dolore acuto alle spalle o al petto, interrompi immediatamente l'esercizio
- Assicurati che i fermi di sicurezza siano correttamente posizionati prima di iniziare
- Esegui sempre un adeguato riscaldamento delle articolazioni delle spalle prima dell'esercizio
- Al termine delle serie, riporta le maniglie alla posizione iniziale in modo controllato, utilizzando i fermi di sicurezza se necessario

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