---
nome_esercizio: Pectoral Machine
tags:
---
# Descrizione
La Pectoral Machine (Macchina per pettorali o Butterfly/Pec Deck) è un attrezzo specificamente progettato per isolare e allenare i muscoli pettorali attraverso un movimento di adduzione orizzontale delle braccia. A differenza della chest press che coinvolge anche tricipiti e deltoidi in modo significativo, la pectoral machine consente di concentrare lo sforzo quasi esclusivamente sui fasci del grande pettorale e del piccolo pettorale, con un coinvolgimento minore dei muscoli sinergici. Il movimento guidato e stabile della macchina offre un'ottima connessione mente-muscolo, permettendo di sentire intensamente la contrazione dei pettorali e di ottenere un eccellente stimolo ipertrofico con un rischio ridotto di infortuni. Questo esercizio è particolarmente efficace come movimento di rifinitura alla fine di un allenamento del petto o per chi cerca di sviluppare definizione e simmetria muscolare.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Siediti sulla macchina con la schiena ben aderente allo schienale
   - Regola l'altezza del sedile in modo che gli avambracci siano paralleli al pavimento
   - Posiziona gli avambracci e/o la parte interna dei gomiti contro i cuscinetti imbottiti
   - Mantieni i gomiti piegati a circa 90 gradi (o secondo il design specifico della macchina)
   - Attiva leggermente il core per stabilizzare la colonna vertebrale

2. **Fase di contrazione (concentrica)**:
   - Espira mentre spingi i cuscinetti verso il centro
   - Concentrati sulla contrazione dei muscoli pettorali per generare il movimento
   - Avvicina le braccia in modo controllato fino a quando i cuscinetti si avvicinano o si toccano
   - Mantieni una contrazione isometrica al punto di massima chiusura per 1-2 secondi
   - Evita di spingere eccessivamente con spalle o tricipiti

3. **Fase di ritorno (eccentrica)**:
   - Inspira mentre permetti ai cuscinetti di tornare lentamente alla posizione di partenza
   - Controlla il movimento di apertura per mantenere tensione sui pettorali
   - Continua ad aprire fino a sentire un buon allungamento dei muscoli pettorali
   - Non permettere al peso di tornare bruscamente in posizione iniziale

4. **Varianti di esecuzione**:
   - Variazione dell'altezza del sedile: per enfatizzare diverse porzioni del pettorale
   - Esecuzione unilaterale: utilizzare un braccio alla volta per correggere squilibri
   - Pause isometriche: mantenere la contrazione nel punto di massima chiusura
   - Ripetizioni parziali: lavorare con range di movimento ridotti per intensificare il pump

# Note di Sicurezza
- Regola sempre correttamente la macchina in base alla tua anatomia prima di iniziare
- Evita di utilizzare carichi eccessivi che causino compensazioni o movimenti incontrollati
- Non forzare eccessivamente il movimento nella fase di chiusura per prevenire stiramenti
- Mantieni il controllo durante tutta la fase eccentrica per massimizzare i benefici e prevenire infortuni
- Evita di inarcare la schiena o sollevare i glutei dal sedile durante l'esecuzione
- Non portare le braccia troppo indietro nella fase di apertura se hai problemi alle spalle
- Evita movimenti bruschi o a scatti che possono causare lesioni
- Se avverti dolore acuto alle spalle o al petto, interrompi immediatamente l'esercizio
- Fai attenzione a non pizzicare la pelle tra le parti mobili della macchina
- Non rilasciare improvvisamente la tensione alla fine dell'esercizio, riporta sempre i cuscinetti in modo controllato alla posizione di partenza

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
