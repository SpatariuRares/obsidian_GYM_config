---
nome_esercizio: Biceps Curl Machine
tags:
---
# Descrizione
La Biceps Curl Machine è un attrezzo specializzato progettato per isolare e sviluppare i muscoli bicipiti brachiali in modo efficace e controllato. A differenza dei curl con bilanciere o manubri, questa macchina offre un percorso di movimento guidato che riduce il coinvolgimento dei muscoli stabilizzatori e minimizza le possibilità di barare sulla tecnica. Il supporto per i gomiti mantiene l'articolazione del gomito in una posizione biomeccanicamente corretta, permettendo di concentrare lo sforzo esclusivamente sui bicipiti. L'esercizio coinvolge principalmente il bicipite brachiale e il brachiale anteriore, con un coinvolgimento secondario del brachioradiale. È particolarmente utile per principianti, per la riabilitazione dopo infortuni o per chi desidera perfezionare l'isolamento dei bicipiti senza preoccuparsi del bilanciamento e della stabilizzazione del peso.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Siediti sulla macchina con la schiena ben appoggiata allo schienale
   - Regola il sedile in modo che i gomiti siano correttamente posizionati sui cuscinetti di supporto
   - Le braccia dovrebbero essere completamente distese con i gomiti ben appoggiati
   - Afferra le impugnature con una presa salda, palmi rivolti verso l'alto
   - Mantieni i polsi in posizione neutra, evitando flessioni o estensioni eccessive

2. **Fase di flessione (concentrica)**:
   - Espira mentre pieghi le braccia, portando le impugnature verso le spalle
   - Contrai i bicipiti durante il movimento, concentrandoti sul muscolo target
   - Esegui il movimento in modo fluido e controllato, evitando strappi o movimenti bruschi
   - Piega completamente le braccia fino a raggiungere la massima contrazione dei bicipiti
   - Mantieni gomiti e spalle stabili durante tutto il movimento

3. **Fase di estensione (eccentrica)**:
   - Inspira mentre abbassi lentamente le impugnature tornando alla posizione iniziale
   - Controlla il peso durante la discesa, resistendo alla gravità
   - Estendi le braccia completamente senza sbattere o rilasciare bruscamente il peso
   - Mantieni sempre una leggera tensione sui bicipiti, anche nella posizione di massima estensione

4. **Varianti di esecuzione**:
   - Esecuzione unilaterale: utilizzo di un braccio alla volta per correggere squilibri
   - Presa neutra (se disponibile): impugnature con i palmi rivolti l'uno verso l'altro per maggiore coinvolgimento del brachiale
   - Tempo sotto tensione: rallentare deliberatamente la fase eccentrica per maggiore stimolazione
   - Pause isometriche: mantenere la contrazione al punto più alto per 1-2 secondi

# Note di Sicurezza
- Regola sempre la macchina in base alla tua anatomia individuale prima di iniziare
- Evita di utilizzare carichi eccessivi che compromettano la corretta tecnica di esecuzione
- Mantieni i gomiti ben appoggiati sui cuscinetti di supporto durante tutto il movimento
- Non utilizzare slancio o aiutarti con il corpo per sollevare il peso
- Mantieni il busto fermo e appoggiato allo schienale, evitando di sporgerti in avanti
- Non bloccare completamente i gomiti nella fase di estensione per mantenere tensione sui bicipiti
- Evita movimenti bruschi, specialmente nella transizione tra la fase concentrica ed eccentrica
- Se avverti dolore al gomito, al polso o alla spalla, interrompi immediatamente l'esercizio
- Esegui sempre un adeguato riscaldamento delle articolazioni prima di utilizzare carichi elevati
- Al termine dell'allenamento, rilascia il peso in modo controllato utilizzando i fermi di sicurezza

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
