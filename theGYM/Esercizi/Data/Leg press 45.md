---
nome_esercizio: Leg press 45
tags:
  - gambe
  - quadricip
  - addominali
  - forza
  - compound
  - glutes
---
Macchina:: [[leg press 45 macchine|leg press 45 macchine]], [[theGYM/macchine/data/Leg press 45 Panatta.md|Leg press 45 Panatta]]

# Descrizione
La Leg Press 45° è un esercizio compound per la parte inferiore del corpo eseguito su una macchina inclinata a 45 gradi. A differenza dello squat tradizionale, consente di spingere carichi elevati con un minor stress sulla colonna vertebrale, poiché la schiena rimane appoggiata e supportata durante tutto il movimento. L'esercizio coinvolge principalmente quadricipiti, glutei e hamstring, con un'intensità variabile in base al posizionamento dei piedi sulla piattaforma. La Leg Press 45° è particolarmente efficace per lo sviluppo della forza e dell'ipertrofia degli arti inferiori, rappresentando un esercizio fondamentale nell'allenamento delle gambe per atleti di tutti i livelli.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Siediti sulla macchina con la schiena ben aderente allo schienale imbottito
   - Posiziona i piedi sulla piattaforma a larghezza spalle o leggermente più larghi
   - Le ginocchia dovrebbero essere piegate a circa 90 gradi
   - Impugna le maniglie laterali per maggiore stabilità
   - Assicurati che la parte bassa della schiena rimanga in contatto con lo schienale

2. **Fase di spinta (concentrica)**:
   - Espira mentre spingi con i piedi sulla piattaforma
   - Estendi le gambe in modo controllato senza mai bloccare completamente le ginocchia
   - Mantieni la pressione distribuita uniformemente tra tallone e metatarso
   - Mantieni una leggera flessione delle ginocchia nel punto di massima estensione

3. **Fase di ritorno (eccentrica)**:
   - Inspira mentre permetti alla piattaforma di tornare verso di te
   - Controlla il movimento di discesa, evitando di cedere bruscamente
   - Mantieni i piedi ben saldi sulla piattaforma durante tutto il movimento
   - Scendi fino a quando le ginocchia formano un angolo di circa 90 gradi

4. **Varianti di posizionamento dei piedi**:
   - Piedi alti sulla piattaforma: maggiore attivazione di glutei e hamstring
   - Piedi bassi sulla piattaforma: enfasi sui quadricipiti
   - Piedi larghi: maggiore coinvolgimento degli adduttori e parte interna delle cosce
   - Piedi stretti: maggiore attivazione del vasto laterale (parte esterna del quadricipite)
   - Piedi ruotati leggermente verso l'esterno: adattamento all'anatomia individuale dell'anca

# Note di Sicurezza
- Non bloccare mai completamente le ginocchia nella fase di estensione per evitare stress eccessivo sull'articolazione
- Verifica sempre che i fermi di sicurezza siano correttamente posizionati prima di iniziare
- Evita di avvicinare le ginocchia al petto in modo eccessivo, mantieni un range di movimento sicuro
- Non sollevare le natiche dallo schienale durante l'esecuzione per proteggere la zona lombare
- Evita di spingere con le mani sulle ginocchia durante la fase di spinta
- Non usare carichi eccessivi che compromettano la corretta tecnica di esecuzione
- Esegui sempre un adeguato riscaldamento prima di utilizzare carichi elevati
- Se avverti dolore alle ginocchia o alla schiena, interrompi immediatamente l'esercizio
- Quando carichi o scarichi i dischi dalla macchina, fai attenzione a mantenere una postura corretta
- Rilascia sempre il carico in modo controllato a fine allenamento, utilizzando i fermi di sicurezza

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
