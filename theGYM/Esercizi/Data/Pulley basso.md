---
nome_esercizio: High row
tags:
  - granDorsale
---
# Descrizione
Il Pulley Basso (o Low Row) è un esercizio fondamentale per lo sviluppo della muscolatura posteriore del tronco, eseguito utilizzando una macchina con cavo e puleggia posizionata in basso. Questo movimento compound coinvolge principalmente i muscoli dorsali (gran dorsale e romboidi), i muscoli del trapezio inferiore, i deltoidi posteriori e secondariamente i bicipiti e gli avambracci. A differenza degli esercizi a corpo libero come le trazioni, il pulley basso permette di modulare con precisione il carico e adattare l'esercizio a qualsiasi livello di forza. L'utilizzo del cavo garantisce una tensione costante durante tutto il movimento, ottimizzando l'attivazione muscolare e riducendo i punti morti. È un esercizio particolarmente efficace per migliorare la postura, bilanciare lo sviluppo muscolare del tronco e potenziare la capacità di trazione orizzontale.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Siediti sulla panca del pulley con i piedi ben appoggiati sulle pedane o sul pavimento
   - Afferra la barra o le maniglie con una presa salda
   - Mantieni la schiena dritta, le spalle indietro e il petto leggermente in fuori
   - Estendi leggermente le braccia in avanti mantenendo una leggera flessione dei gomiti
   - Contrai leggermente il core per stabilizzare il tronco

2. **Fase di trazione (concentrica)**:
   - Espira mentre tiri la barra/maniglie verso l'addome
   - Inizia il movimento avvicinando le scapole tra loro (retrazione scapolare)
   - Continua tirando con i gomiti che si muovono all'indietro e leggermente verso il basso
   - Porta la barra/maniglie a contatto con la parte bassa dell'addome o il punto di massima contrazione
   - Mantieni i gomiti vicino al corpo durante tutta la fase di trazione

3. **Fase di ritorno (eccentrica)**:
   - Inspira mentre riporti le braccia in estensione controllata
   - Permetti alle scapole di allungarsi in avanti (protrazione) alla fine del movimento
   - Mantieni sempre un minimo di tensione, evitando di rilasciare completamente il carico
   - Controlla il movimento senza permettere al peso di guidare le braccia in avanti

4. **Varianti di esecuzione**:
   - Presa larga: maggiore enfasi sui dorsali esterni e spalle posteriori
   - Presa stretta: maggiore coinvolgimento della parte centrale della schiena e dei bicipiti
   - Presa supina (palmi verso l'alto): maggiore attivazione dei bicipiti
   - Presa neutra (palmi uno verso l'altro): maggiore comfort per spalle e polsi
   - Utilizzo di maniglie singole: per l'esecuzione unilaterale o alternata

# Note di Sicurezza
- Mantieni sempre la schiena in posizione neutra, evitando di inarcarla eccessivamente
- Non utilizzare lo slancio del busto per completare la ripetizione
- Evita di tirare la barra/maniglie troppo in alto (verso il petto), il che potrebbe sovraccaricare le spalle
- Regola il sedile in modo che le ginocchia siano leggermente piegate quando i piedi sono appoggiati
- Nei carichi pesanti, assicurati che i piedi siano ben ancorati sui supporti per evitare di essere trascinato in avanti
- Evita di sollevare le spalle verso le orecchie durante il movimento
- Non iperestendere la schiena nella fase di trazione
- Controlla il movimento nella fase di ritorno, evitando movimenti bruschi
- Se avverti dolore alla schiena bassa o alle spalle, interrompi immediatamente l'esercizio
- Al termine della serie, accompagna sempre il peso al ritorno piuttosto che rilasciarlo bruscamente

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