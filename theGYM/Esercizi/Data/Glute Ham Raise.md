---
nome_esercizio: Glute Ham Raise
tags:
---
# Descrizione
Il Glute Ham Raise (GHR) è un esercizio avanzato focalizzato sullo sviluppo della catena posteriore, in particolare dei muscoli ischio-crurali (hamstring) e dei glutei. Eseguito su una specifica panca GHR o su un'attrezzatura modificata, questo movimento è considerato uno dei più efficaci per il rinforzo funzionale degli hamstring. A differenza del leg curl alla macchina, il GHR coinvolge gli hamstring sia nella loro funzione di flessione del ginocchio che di estensione dell'anca, lavorando contemporaneamente sul rinforzo della zona lombare. Questa natura completa lo rende particolarmente prezioso per atleti di forza, velocisti e sportivi che necessitano di potenza esplosiva negli sprint e nei salti. Il GHR è anche eccellente per la prevenzione degli infortuni agli ischio-crurali, una problematica comune in molti sport ad alta intensità.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Posizionati sulla panca GHR con i piedi bloccati sotto i cuscinetti posteriori
   - Le ginocchia dovrebbero essere appoggiate sul cuscinetto principale, leggermente dietro l'articolazione
   - Il corpo dovrebbe formare una linea retta dalla testa alle ginocchia
   - Incrocia le braccia sul petto o tienile distese davanti per maggiore stabilità
   - Mantieni il core attivato e la colonna vertebrale in posizione neutra

2. **Fase di discesa (eccentrica)**:
   - Partendo dalla posizione eretta, inizia a piegarti in avanti dall'anca
   - Mantieni la schiena completamente dritta durante tutto il movimento
   - Abbassa il busto lentamente e con controllo
   - Continua la discesa fino a quando il busto è quasi parallelo al pavimento o fino al punto in cui riesci a mantenere il controllo
   - Durante questa fase, gli hamstring vengono allungati sotto carico

3. **Fase di risalita (concentrica)**:
   - Contrai fortemente hamstring e glutei per iniziare a risalire
   - Mantieni le anche estese e la schiena dritta durante tutto il movimento
   - Solleva il busto fino a tornare alla posizione iniziale verticale
   - Esegui una contrazione isometrica di hamstring e glutei nel punto più alto

4. **Varianti di esecuzione**:
   - Versione assistita: utilizzo delle braccia o di una banda elastica per aiutare la risalita
   - Versione appesantita: tenere un disco o kettlebell al petto per aumentare la resistenza
   - Nordic Hamstring Curl: variante che enfatizza maggiormente la fase eccentrica
   - GHR con twist: aggiungere una rotazione nella fase di risalita per coinvolgere gli obliqui

# Note di Sicurezza
- Se sei alle prime armi con questo esercizio, inizia con la versione assistita utilizzando le braccia per aiutarti
- Assicurati che i cuscinetti della panca siano regolati correttamente per la tua altezza
- Verifica che i piedi siano saldamente bloccati prima di iniziare l'esercizio
- Mantieni sempre la colonna vertebrale in posizione neutra, evitando di inarcarne la parte lombare
- Non tentare di scendere oltre il punto in cui puoi mantenere il controllo del movimento
- Se avverti tensione o dolore nella zona lombare, interrompi immediatamente l'esercizio
- Inizia con un numero ridotto di ripetizioni (3-5) per le prime sessioni, anche se ti sembra facile
- Gli hamstring possono essere soggetti a DOMS (dolori muscolari post-allenamento) intensi; introduci gradualmente questo esercizio nella tua routine
- Esegui sempre un adeguato riscaldamento, includendo esercizi di mobilità per anche e ginocchia
- È consigliabile avere un assistente nelle prime fasi di apprendimento dell'esercizio
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