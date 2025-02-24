---
nome_esercizio: Shoulder Press
tags:
  - spalle
  - deltoidi
  - tricipiti
  - compound
---
# Descrizione
La Shoulder Press (o pressa per spalle) è un esercizio fondamentale per lo sviluppo della parte superiore del corpo, eseguito su una macchina appositamente progettata che guida il movimento verticale. Questo esercizio compound coinvolge principalmente il deltoide anteriore e il deltoide laterale, con un coinvolgimento significativo dei trapezi e dei tricipiti come muscoli secondari. A differenza della Military Press con bilanciere, la Shoulder Press su macchina offre un percorso di movimento guidato che riduce il rischio di infortuni e permette di concentrarsi esclusivamente sull'intensità del lavoro muscolare. È un esercizio eccellente per costruire forza e volume nelle spalle, migliorare la stabilità dell'articolazione scapolo-omerale e sviluppare una silhouette a V nella parte superiore del corpo.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Siediti sulla macchina con la schiena ben appoggiata allo schienale
   - Regola l'altezza del sedile in modo che le impugnature siano approssimativamente all'altezza delle spalle
   - Afferra le maniglie con una presa salda, palmi rivolti in avanti o in posizione neutra (dipende dal design della macchina)
   - I gomiti dovrebbero essere piegati e allineati con il corpo, formando un angolo di circa 90 gradi
   - Mantieni i piedi ben appoggiati a terra per assicurare stabilità

2. **Fase di spinta (concentrica)**:
   - Espira mentre spingi le maniglie verso l'alto in modo controllato
   - Estendi le braccia senza bloccare completamente i gomiti al punto più alto
   - Mantieni il collo in posizione neutra, evitando di spingerlo in avanti
   - Contrai i muscoli delle spalle durante tutta la fase di spinta
   - Evita di inarcare la schiena durante il movimento

3. **Fase di ritorno (eccentrica)**:
   - Inspira mentre abbassi le maniglie lentamente verso la posizione di partenza
   - Controlla il movimento durante tutta la fase di discesa
   - Non permettere al peso di "cadere" o di rimbalzare nella posizione più bassa
   - Fermati quando i gomiti raggiungono un angolo di circa 90 gradi, evitando di scendere troppo in basso

4. **Varianti di esecuzione**:
   - Esecuzione unilaterale: utilizzo di un braccio alla volta per correggere squilibri
   - Variazione della presa: più stretta per maggiore attivazione dei tricipiti
   - Tempi di esecuzione: rallentare la fase eccentrica per aumentare il tempo sotto tensione
   - Pause isometriche: mantenere brevemente la contrazione al punto più alto del movimento

# Note di Sicurezza
- Regola sempre la macchina in base alla tua anatomia individuale prima di iniziare
- Evita di utilizzare carichi eccessivi che compromettano la corretta tecnica di esecuzione
- Mantieni sempre il controllo del movimento, evitando movimenti bruschi o scattosi
- Non bloccare completamente i gomiti nella fase di estensione per ridurre lo stress sulle articolazioni
- Mantieni la parte bassa della schiena appoggiata allo schienale durante tutto l'esercizio
- Evita di sollevare le spalle verso le orecchie durante il movimento
- Non spingere la testa in avanti durante la fase di spinta
- Se avverti dolore alle spalle o ai gomiti, interrompi immediatamente l'esercizio
- Non trattenere il respiro durante l'esecuzione, segui il pattern respiratorio consigliato
- Al termine della serie, riporta le maniglie alla posizione iniziale in modo controllato o utilizza i fermi di sicurezza

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
`Macchina:: [[theGYM/macchine/data/shoulder press Tecnogym.md|shoulder press Tecnogym]]
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