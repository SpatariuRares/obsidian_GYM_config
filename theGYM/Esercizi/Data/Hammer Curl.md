---
nome_esercizio: Hammer Curl
tags:
---
# Descrizione
L'Hammer Curl (curl a martello) è un esercizio di isolamento che si concentra principalmente sui muscoli bicipiti brachiali e brachioradiali, con significativo coinvolgimento del muscolo brachiale. A differenza del curl classico, l'Hammer Curl utilizza una presa neutra (palmi rivolti l'uno verso l'altro) che riproduce il movimento di impugnare un martello. Questa posizione delle mani stimola in modo più efficace il brachioradiale, un muscolo dell'avambraccio che contribuisce alla flessione del gomito, e sollecita il bicipite da un'angolazione diversa, promuovendo uno sviluppo più equilibrato e completo dell'intero braccio. L'esercizio è particolarmente efficace per incrementare la forza di presa e la resistenza dell'avambraccio, risultando utile sia in ambito estetico che funzionale.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Stai in piedi con i piedi alla larghezza delle spalle
   - Impugna un manubrio in ciascuna mano con una presa neutra (palmi rivolti l'uno verso l'altro)
   - Le braccia devono essere completamente distese lungo i fianchi
   - Mantieni la schiena dritta, le spalle indietro e il petto in fuori
   - Attiva leggermente il core per stabilizzare la colonna vertebrale

2. **Fase concentrica (salita)**:
   - Espira mentre fletti i gomiti per sollevare i manubri verso le spalle
   - Mantieni la parte superiore delle braccia (omeri) ferma e aderente ai fianchi
   - Solleva i manubri in modo controllato fino a quando gli avambracci sono quasi paralleli al pavimento
   - Contrai i bicipiti e i brachioradiali nel punto più alto del movimento
   - Mantieni i polsi in posizione neutra durante tutto il movimento

3. **Fase eccentrica (discesa)**:
   - Inspira mentre abbassi lentamente i manubri
   - Controlla il movimento di discesa, evitando di lasciare cadere i pesi
   - Estendi completamente le braccia senza bloccare i gomiti
   - Mantieni la tensione nei muscoli target anche nella posizione più bassa

4. **Varianti di esecuzione**:
   - Hammer Curl alternati: eseguire il movimento alternando un braccio alla volta
   - Hammer Curl su panca inclinata: per un maggiore isolamento e stretching del bicipite
   - Hammer Curl in piega: con il busto leggermente inclinato in avanti per variare l'angolo di lavoro
   - Hammer Curl con cavo: utilizzando una corda o un'impugnatura singola al cavo basso per una tensione costante

# Note di Sicurezza
- Evita di oscillare il corpo per generare slancio durante l'esecuzione
- Mantieni i gomiti vicini ai fianchi per isolare correttamente i muscoli target
- Non flettere i polsi durante il movimento per evitare stress eccessivo
- Utilizza un peso che ti permetta di mantenere una tecnica corretta per tutte le ripetizioni
- Non bloccare completamente i gomiti nella posizione bassa per mantenere la tensione muscolare
- Se avverti dolore ai polsi o ai gomiti, interrompi immediatamente l'esercizio
- Mantieni la schiena dritta e il core attivato per evitare compensazioni posturali
- Evita di sollevare le spalle durante l'esecuzione del movimento
- Controlla il movimento sia nella fase di salita che in quella di discesa
- Per i principianti, è consigliabile iniziare con pesi leggeri fino a padroneggiare la tecnica corretta
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
