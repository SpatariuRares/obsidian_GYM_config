---
nome_esercizio: Russian Twist
tags:
---
# Descrizione
Il Russian Twist è un esercizio efficace per il core che si concentra principalmente sui muscoli obliqui esterni e interni, ma coinvolge anche il retto addominale e i muscoli stabilizzatori della colonna vertebrale. Questo movimento rotatorio del busto viene eseguito da una posizione seduta con le gambe sollevate o i piedi appoggiati a terra, creando un significativo impegno del core per mantenere l'equilibrio mentre si eseguono rotazioni laterali. A differenza degli esercizi addominali tradizionali che lavorano in direzione frontale, il Russian Twist introduce un piano di movimento trasversale che aiuta a sviluppare forza funzionale, migliorare la stabilità rotazionale e definire la zona della "cintura" addominale. È un esercizio versatile che può essere adattato a tutti i livelli di fitness variando la difficoltà attraverso l'aggiunta di peso o modificando la posizione delle gambe.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Siediti sul pavimento con le ginocchia piegate e i piedi appoggiati a terra
   - Inclina il busto all'indietro formando un angolo di circa 45° con il pavimento
   - Solleva leggermente i piedi da terra per aumentare l'intensità (opzionale)
   - Estendi le braccia di fronte a te con le mani unite o tenendo un peso (disco, kettlebell, palla medica)
   - Attiva il core mantenendo la schiena dritta ma leggermente flessa nella zona lombare

2. **Fase di rotazione**:
   - Mantieni la posizione del busto stabile mentre ruoti il torso verso destra
   - Porta le mani o il peso verso il lato destro del corpo, vicino al pavimento
   - Mantieni le braccia leggermente flesse ma relativamente rigide durante la rotazione
   - Usa i muscoli obliqui per controllare il movimento, non solo le braccia
   - Respira normalmente, evitando di trattenere il fiato

3. **Fase di transizione**:
   - Inverti il movimento, ruotando il busto attraverso il centro
   - Continua la rotazione fino a raggiungere il lato sinistro del corpo
   - Mantieni l'altezza del busto costante durante tutto il movimento
   - Ogni rotazione completa (destra-centro-sinistra-centro) conta come una ripetizione

4. **Varianti di esecuzione**:
   - Con piedi a terra: versione base per principianti
   - Con piedi sollevati: maggiore attivazione del core
   - Con gambe tese: versione avanzata per massima intensità
   - Con diverse resistenze: mani libere, peso singolo, palla medica
   - Ritmo controllato: enfasi sulla qualità del movimento vs versioni esplosive per atleti avanzati

# Note di Sicurezza
- Evita movimenti bruschi o scattanti che possano stressare la zona lombare
- Mantieni sempre il core attivato per proteggere la colonna vertebrale
- Non ruotare eccessivamente oltre il punto di comfort naturale delle spalle
- Se hai problemi alla schiena, esegui l'esercizio con i piedi appoggiati a terra e limitando l'ampiezza di movimento
- Inizia senza pesi aggiuntivi fino a quando non padroneggi la corretta tecnica di esecuzione
- Respira regolarmente durante l'esercizio, evitando di trattenere il respiro
- Assicurati che il movimento avvenga principalmente dai muscoli addominali e non dalle braccia
- Interrompi l'esercizio se avverti dolore alla zona lombare o al collo
- Evita questo esercizio durante la gravidanza o in caso di ernia del disco
- Se sei principiante, inizia con serie più brevi (10-15 rotazioni totali) e aumenta gradualmente il volume
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
