---
nome_esercizio: Face Pulls
tags:
---
# Descrizione
I Face Pulls sono un esercizio fondamentale ma spesso sottovalutato per lo sviluppo della parte posteriore delle spalle e della muscolatura superiore della schiena. Eseguito tipicamente con una corda attaccata a una puleggia alta, questo movimento coinvolge principalmente i deltoidi posteriori, i trapezi, i romboidi e i rotatori esterni della spalla. A differenza di molti esercizi per le spalle che enfatizzano la parte anteriore e mediale del deltoide, i Face Pulls si concentrano sulla muscolatura posteriore spesso trascurata, contribuendo a migliorare la postura, prevenire squilibri muscolari e ridurre il rischio di infortuni alla spalla. Questo esercizio è particolarmente prezioso per contrastare gli effetti della postura curva in avanti tipica delle attività quotidiane come lavorare al computer, guidare o utilizzare lo smartphone.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Regola la puleggia a un'altezza leggermente superiore al livello della testa
   - Afferra le estremità della corda con i palmi rivolti verso il basso
   - Fai un passo indietro per creare tensione iniziale sul cavo
   - Posizionati con i piedi alla larghezza delle spalle, ginocchia leggermente flesse
   - Mantieni il busto eretto, core attivato e schiena leggermente inarcata

2. **Fase di trazione (concentrica)**:
   - Inizia tirando la corda verso il viso, mirando alla zona tra il naso e la fronte
   - Contemporaneamente, ruota leggermente i polsi in modo che alla fine del movimento i pollici puntino dietro di te
   - Porta i gomiti all'indietro e leggermente al di sopra delle spalle
   - Alla fine del movimento, le mani dovrebbero essere vicine alle orecchie
   - Contrai fortemente i deltoidi posteriori e i trapezi, cercando di "schiacciare" le scapole

3. **Fase di ritorno (eccentrica)**:
   - Rilascia lentamente la tensione controllando il movimento di ritorno
   - Estendi gradualmente le braccia fino a tornare alla posizione iniziale
   - Mantieni una leggera tensione nei muscoli, evitando di rilassare completamente le braccia
   - Controlla il movimento per tutta la sua durata senza permettere alla puleggia di tirare bruscamente

4. **Varianti di esecuzione**:
   - Face pulls in ginocchio: per eliminare il contributo delle gambe e isolare maggiormente la parte superiore
   - Face pulls con elastico: alternativa alla puleggia, utile per l'allenamento a casa
   - Face pulls con pausa: mantenere la posizione contratta per 1-2 secondi
   - Face pulls con rotazione esterna accentuata: enfatizzare la rotazione dei polsi per maggiore attivazione dei rotatori esterni

# Note di Sicurezza
- Usa un carico appropriato che ti permetta di mantenere una tecnica corretta per tutte le ripetizioni
- Evita di utilizzare lo slancio del corpo per completare il movimento
- Non sollevare le spalle verso le orecchie durante l'esecuzione
- Mantieni il collo in posizione neutra, evitando di spingerlo in avanti
- Focalizzati sulla contrazione della parte posteriore delle spalle piuttosto che sulla quantità di peso utilizzato
- Evita movimenti bruschi o a scatti che potrebbero causare tensione alle articolazioni
- Se avverti dolore acuto alla spalla, al gomito o al polso, interrompi immediatamente l'esercizio
- Mantieni sempre una base stabile con i piedi ben piantati a terra
- Non eseguire questo esercizio se hai infiammazioni acute alla cuffia dei rotatori senza consultare uno specialista
- Inizia con carichi leggeri per imparare il movimento corretto prima di aumentare l'intensità

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
