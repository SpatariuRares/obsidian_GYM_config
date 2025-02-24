---
nome_esercizio: Affondi allo Smith Machine
tags:
  - gambe
  - quadricip
  - glutes
  - equilibrio
  - compound
---
Macchina:: [[theGYM/macchine/data/Multi power.md|Multi power]]

# Descrizione

Gli affondi allo Smith Machine sono una variante dell'affondo tradizionale che utilizza il supporto guidato della Smith Machine per facilitare l'equilibrio e l'esecuzione del movimento. Questo esercizio compound coinvolge principalmente quadricipiti, glutei e hamstring, oltre a sollecitare secondariamente i muscoli stabilizzatori del core. A differenza degli affondi liberi, la versione alla Smith Machine permette di concentrarsi maggiormente sull'intensità e sul carico, riducendo la necessità di bilanciamento laterale. L'escursione verticale guidata consente di mantenere una traiettoria costante durante l'esecuzione, rendendolo un esercizio eccellente per lo sviluppo della forza e dell'ipertrofia degli arti inferiori, particolarmente utile per chi desidera aumentare il carico in sicurezza o è in fase di apprendimento della tecnica dell'affondo.

# Tecnica di Esecuzione

1. **Posizione iniziale**:
    - Posizionati sotto la barra della Smith Machine con la schiena dritta
    - Appoggia la barra sulla parte superiore delle spalle/trapezi (posizione alta) o sulle scapole (posizione bassa)
    - Assumi una posizione eretta con i piedi paralleli e alla larghezza delle spalle
    - Sblocca la barra ruotandola leggermente
    - Fai un passo in avanti con una gamba, mantenendo l'altra ferma
2. **Fase di discesa (eccentrica)**:
    - Inspira mentre abbassi il corpo in modo controllato
    - Piega entrambe le ginocchia simultaneamente
    - La gamba anteriore dovrebbe formare un angolo di circa 90° al ginocchio
    - La gamba posteriore scende verso il pavimento, con il ginocchio che quasi lo sfiora
    - Mantieni il busto eretto e il core attivato durante tutto il movimento
3. **Fase di risalita (concentrica)**:
    - Espira mentre spingi attraverso il tallone della gamba anteriore
    - Estendi entrambe le gambe per tornare alla posizione di partenza
    - Utilizza i glutei e i quadricipiti per generare la forza necessaria
    - Mantieni la schiena neutra e le spalle indietro durante la risalita
4. **Varianti di esecuzione**:
    - Affondi stazionari: mantenendo sempre lo stesso piede avanti per tutte le ripetizioni
    - Affondi alternati: cambiando la gamba avanzata ad ogni ripetizione
    - Posizionamento del piede: più avanzato per maggiore attivazione dei glutei, più arretrato per i quadricipiti
    - Distanza dal macchinario: variando la distanza dei piedi dalla Smith Machine per modificare l'angolo di lavoro

# Note di Sicurezza

- Regola correttamente l'altezza dei fermi di sicurezza prima di iniziare l'esercizio
- Mantieni sempre la schiena dritta e il core attivato per proteggere la zona lombare
- Evita di spingere il ginocchio della gamba anteriore oltre la punta del piede
- Assicurati che il piede anteriore sia completamente appoggiato a terra e non solo sulla punta
- Inizia con carichi leggeri per padroneggiare la corretta tecnica di esecuzione
- Non bloccare completamente il ginocchio nella fase di estensione
- Se hai problemi di equilibrio, posiziona il piede posteriore leggermente più largo per una base più stabile
- Fai attenzione all'allineamento del ginocchio della gamba anteriore, che deve rimanere in linea con il piede
- Evita movimenti bruschi, specialmente nella transizione tra la fase eccentrica e concentrica
- Se avverti dolore acuto alle ginocchia o alla schiena, interrompi immediatamente l'esercizio

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