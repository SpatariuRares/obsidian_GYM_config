---
nome_esercizio: High row
tags:
  - granDorsale
---
Macchina:: [[theGYM/macchine/data/HighRow machine.md|HighRow machine]]

# Descrizione
La High Row (remata alta) è un esercizio di trazione eseguito su macchina che si concentra sui muscoli della parte superiore della schiena. Questo movimento coinvolge principalmente il trapezio medio e inferiore, i romboidi, il gran dorsale (parte superiore) e i deltoidi posteriori. A differenza delle remate tradizionali, la High Row utilizza un angolo di trazione più elevato, mirando in modo più specifico alla parte superiore della schiena e alle spalle posteriori. L'esercizio è particolarmente efficace per migliorare la postura, equilibrare lo sviluppo muscolare del tronco superiore e contribuire all'aspetto di spalle larghe e schiena a "V". La versione con macchina offre un movimento guidato che facilita l'esecuzione corretta e riduce il rischio di infortuni, risultando ideale sia per principianti che per atleti avanzati.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Siediti sulla macchina con il petto appoggiato contro l'eventuale supporto imbottito (se presente)
   - Regola il sedile in modo che le impugnature siano all'altezza del petto o leggermente più in alto
   - Afferra le maniglie con una presa salda, palmi rivolti verso il basso o in posizione neutra
   - Mantieni una leggera inclinazione in avanti del busto, schiena dritta e core attivato
   - Le braccia dovrebbero essere estese in avanti, con una leggera flessione ai gomiti

2. **Fase di trazione (concentrica)**:
   - Espira mentre tiri le maniglie verso il corpo
   - Inizia il movimento retraendo le scapole (avvicinandole tra loro)
   - Porta i gomiti all'indietro e leggermente verso l'alto, mantenendoli vicini al corpo
   - Tira fino a quando le maniglie raggiungono la zona alta del petto/clavicole
   - Alla fine del movimento, stringi le scapole insieme per massimizzare la contrazione

3. **Fase di ritorno (eccentrica)**:
   - Inspira mentre riporti le maniglie in avanti in modo controllato
   - Permetti alle scapole di allungarsi progressivamente
   - Estendi le braccia fino a tornare alla posizione iniziale
   - Mantieni sempre una leggera tensione nei muscoli della schiena, evitando di rilassarli completamente

4. **Varianti di esecuzione**:
   - Presa larga: maggiore enfasi sui trapezi e romboidi
   - Presa stretta: maggiore attivazione del gran dorsale e dei deltoidi posteriori
   - Esecuzione unilaterale: utilizzo di un braccio alla volta per correggere squilibri
   - Diverse altezze di trazione: per enfatizzare differenti aree della schiena superiore

# Note di Sicurezza
- Regola correttamente la macchina in base alle tue proporzioni prima di iniziare
- Mantieni sempre la schiena in posizione neutra, evitando di inarcarla durante l'esercizio
- Non utilizzare slancio o movimenti bruschi per sollevare il peso
- Evita di sollevare le spalle verso le orecchie durante la trazione
- Assicurati che il movimento sia fluido e controllato in tutte le fasi
- Non tirare le maniglie troppo indietro, causando iperestensione della schiena
- Concentrati sulla retrazione delle scapole piuttosto che sul semplice movimento delle braccia
- Se avverti dolore alle spalle o alla zona cervicale, interrompi immediatamente l'esercizio
- Non trattenere il respiro durante l'esecuzione
- Inizia con carichi leggeri per padroneggiare la corretta tecnica prima di aumentare il peso
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