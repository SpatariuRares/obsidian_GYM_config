---
nome_esercizio: High row
tags:
  - tricipiti
  - isolamento
  - braccia
---
Macchina:: [[tricep machine]]

# Descrizione
La Triceps Extension è un esercizio di isolamento progettato per sviluppare specificamente il muscolo tricipite brachiale, che costituisce circa i due terzi del volume del braccio. Questo esercizio può essere eseguito su una macchina apposita, con cavi, manubri o bilancieri, garantendo un isolamento efficace di tutte e tre le teste del tricipite (lunga, laterale e mediale). A differenza degli esercizi compound come presse o dip, la Triceps Extension elimina il contributo di gruppi muscolari secondari, concentrando il lavoro esclusivamente sui tricipiti. È particolarmente efficace per la definizione e la crescita muscolare della parte posteriore del braccio, ed è fondamentale sia per obiettivi estetici che funzionali, migliorando la forza nei movimenti di spinta e stabilizzando l'articolazione della spalla.

# Tecnica di Esecuzione
1. **Posizione iniziale** (per la versione alla macchina):
   - Siediti sulla macchina con la schiena ben appoggiata contro lo schienale
   - Regola l'altezza del sedile in modo che le articolazioni delle spalle siano allineate con l'asse di rotazione della macchina
   - Afferra le impugnature con i palmi rivolti verso il basso o in posizione neutra
   - Mantieni i gomiti vicini al corpo e allineati con l'asse di rotazione
   - Posiziona i piedi ben appoggiati a terra per maggiore stabilità

2. **Fase di estensione (concentrica)**:
   - Espira mentre spingi le impugnature verso il basso, estendendo completamente i gomiti
   - Contrai i tricipiti al massimo nella posizione di estensione completa
   - Mantieni la parte superiore delle braccia stazionaria (solo l'avambraccio si muove)
   - Evita di utilizzare lo slancio del corpo per completare il movimento
   - Esegui una breve pausa nella posizione di massima contrazione

3. **Fase di ritorno (eccentrica)**:
   - Inspira mentre permetti alle impugnature di risalire in modo controllato
   - Piega i gomiti fino a quando gli avambracci formano circa un angolo di 90 gradi con la parte superiore delle braccia
   - Evita di lasciare che il peso risalga bruscamente
   - Mantieni la tensione nei tricipiti durante tutta la fase di ritorno

4. **Varianti di esecuzione**:
   - Esecuzione unilaterale: utilizzo di un braccio alla volta per correggere squilibri
   - Cambio di impugnatura: presa prona (palmi in giù), supina (palmi in su) o neutra
   - Overhead Triceps Extension: con cavi o manubri, estendendo le braccia sopra la testa
   - Triceps Pushdown: con cavo, spingendo verso il basso con le braccia vicine al corpo

# Note di Sicurezza
- Regola sempre correttamente la macchina in base alla tua antropometria
- Evita di utilizzare carichi eccessivi che compromettano la corretta tecnica di esecuzione
- Mantieni la parte superiore delle braccia ferma durante tutto il movimento
- Non bloccare completamente i gomiti nella fase di estensione, mantenendo una leggera tensione
- Evita movimenti bruschi o a scatti che possono sottoporre i gomiti a stress eccessivo
- Non inarcare la schiena per facilitare il movimento
- Se avverti dolore ai gomiti o alle spalle, interrompi immediatamente l'esercizio
- Non spingere oltre il normale range di movimento articolare
- Esegui sempre un adeguato riscaldamento prima di utilizzare carichi elevati
- Al termine dell'esercizio, riporta sempre il peso alla posizione iniziale in modo controllato
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