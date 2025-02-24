---
nome_esercizio: Hack squat machine
tags:
  - gambe
  - quadricip
  - glutes
  - forza
  - compound
---
Macchina:: [[Hack squat machine|Hack squat machine]]

# # Descrizione

L'hack squat è un esercizio per la parte inferiore del corpo eseguito su una macchina specifica inclinata a 45 gradi. A differenza dello squat tradizionale, questa variante sposta il carico dalle vertebre lombari, permettendo di concentrare maggiormente il lavoro su quadricipiti e glutei. La posizione inclinata all'indietro e le spalle appoggiate al supporto imbottito permettono di mantenere una postura stabile durante l'esecuzione, riducendo il rischio di infortuni alla schiena.

# Tecnica di Esecuzione

1. **Posizione iniziale**:
    - Posizionati sulla macchina con le spalle ben appoggiate contro il cuscinetto imbottito
    - Piedi a larghezza spalle o leggermente più larghi posizionati sulla pedana (la posizione dei piedi influenza i muscoli coinvolti)
    - Impugna le maniglie laterali per stabilità
    - Sblocca i fermi di sicurezza prima di iniziare
2. **Fase eccentrica (discesa)**:
    - Inspira e piega lentamente le ginocchia
    - Mantieni la schiena ben appoggiata al supporto
    - Scendi fino a quando le cosce sono parallele o leggermente sotto il parallelo rispetto alla pedana
    - Evita di rimbalzare nella posizione bassa
3. **Fase concentrica (risalita)**:
    - Espira mentre spingi attraverso i talloni e la parte centrale del piede
    - Estendi le ginocchia e i fianchi per tornare alla posizione di partenza
    - Mantieni le ginocchia leggermente flesse nel punto più alto per evitare blocchi articolari
4. **Varianti di posizionamento dei piedi**:
    - Piedi più avanti: maggiore attivazione dei glutei e dei bicipiti femorali
    - Piedi più indietro: maggiore attivazione dei quadricipiti
    - Piedi larghi: maggiore coinvolgimento degli adduttori e parte interna delle cosce
    - Piedi stretti: maggiore attivazione del vasto laterale (parte esterna del quadricipite)

# Note di Sicurezza

- Mantieni sempre la schiena ben appoggiata al supporto durante tutto il movimento
- Non bloccare mai completamente le ginocchia nella fase di estensione
- Assicurati che i fermi di sicurezza siano correttamente posizionati prima di iniziare
- Inizia con pesi leggeri per padroneggiare la tecnica prima di aumentare il carico
- Evita questo esercizio se hai problemi alle ginocchia o alla schiena senza prima consultare un professionista
- Non eseguire questo movimento con una profondità eccessiva se hai problemi di mobilità alle anche o alle caviglie
- Assicurati che la macchina sia regolata correttamente per la tua altezza e conformazione fisica

## Log Esercizio
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
