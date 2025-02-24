---
nome_esercizio: Hip Trust
tags:
---
# Descrizione
L'Hip Thrust Machine è un attrezzo specializzato progettato per eseguire l'hip thrust, un esercizio focalizzato principalmente sul grande gluteo. A differenza dell'hip thrust tradizionale con bilanciere, la versione alla macchina offre un movimento guidato e un supporto ottimale per schiena e spalle, facilitando un'esecuzione corretta e riducendo il rischio di infortuni. Questo esercizio è considerato uno dei più efficaci per lo sviluppo della forza e dell'ipertrofia dei glutei, coinvolgendo anche secondariamente i muscoli ischiocrurali (hamstring), gli adduttori e gli stabilizzatori del core. La macchina permette un'esecuzione precisa del movimento di estensione dell'anca, consentendo di utilizzare carichi significativi in sicurezza senza la necessità di preparare e posizionare bilancieri e pesi.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Siediti sulla macchina con la schiena appoggiata sul supporto imbottito
   - Posiziona i piedi a terra, a larghezza spalle o leggermente più larghi
   - Allinea le ginocchia piegate a circa 90 gradi quando sei nella posizione di partenza
   - Afferra le maniglie laterali (se presenti) per stabilità
   - Posiziona il cuscinetto imbottito della macchina sulla parte bassa dell'addome/alta delle cosce

2. **Fase di spinta (concentrica)**:
   - Espira mentre spingi attraverso i talloni
   - Contrai i glutei con forza mentre sollevi il bacino
   - Estendi le anche fino a quando il corpo forma una linea retta dalle spalle alle ginocchia
   - Raggiungi una contrazione massimale dei glutei nel punto più alto
   - Mantieni l'addome contratto per stabilizzare la parte bassa della schiena

3. **Fase di ritorno (eccentrica)**:
   - Inspira mentre abbassi il bacino in modo controllato
   - Mantieni la tensione sui glutei durante la discesa
   - Abbassa fino a tornare alla posizione iniziale senza toccare il fondo della macchina
   - Evita di "rimbalzare" nella posizione bassa

4. **Varianti di esecuzione**:
   - Posizionamento dei piedi: più avanti per un maggiore coinvolgimento degli hamstring, più indietro per un'enfasi sui quadricipiti
   - Larghezza dei piedi: più stretta per il grande gluteo, più larga per un maggiore coinvolgimento degli abduttori
   - Rotazione dei piedi: leggermente ruotati verso l'esterno per un migliore allineamento con l'articolazione dell'anca
   - Tempo sotto tensione: rallentare la fase eccentrica o mantenere la posizione alta per 1-3 secondi

# Note di Sicurezza
- Regola correttamente la macchina in base alla tua altezza e struttura corporea prima di iniziare
- Evita di iperestendere la colonna vertebrale nel punto più alto del movimento
- Mantieni la testa in posizione neutra, evitando di spingerla in avanti o di estenderla eccessivamente
- Non utilizzare un carico che comprometta la corretta tecnica di esecuzione
- Assicurati che i piedi rimangano ben piantati a terra durante tutto il movimento
- Evita di utilizzare lo slancio o di "rimbalzare" dal fondo per facilitare il movimento
- Mantieni le ginocchia allineate con i piedi durante l'esecuzione
- Se avverti dolore alla schiena o alle ginocchia, interrompi immediatamente l'esercizio
- Non bloccare le ginocchia nella fase di estensione
- Se sei un principiante, inizia con carichi leggeri per padroneggiare la tecnica corretta prima di aumentare il peso

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