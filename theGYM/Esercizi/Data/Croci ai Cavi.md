---
nome_esercizio: Croci ai Cavi
tags:
  - petto
  - pettorale
  - isolamento
  - flessibilità
---
# Descrizione
Le Croci ai Cavi sono un esercizio di isolamento progettato per sviluppare i muscoli pettorali, con particolare enfasi sull'adduzione orizzontale delle braccia. A differenza degli esercizi compound come panca piana o chest press, le croci ai cavi isolano maggiormente i pettorali, riducendo il coinvolgimento di tricipiti e deltoidi. L'utilizzo dei cavi offre il vantaggio unico di mantenere tensione costante sul muscolo durante l'intero arco di movimento, inclusa la posizione di massima contrazione, dove i manubri perderebbero efficacia a causa della gravità. Questo esercizio è particolarmente efficace per la definizione e la rifinitura del petto, creando quella linea di separazione tra i pettorali che è spesso ricercata nell'allenamento estetico. Le croci ai cavi permettono inoltre di modificare l'angolo di trazione per enfatizzare diverse porzioni del pettorale (superiore, media o inferiore).

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Posizionati al centro di una macchina a cavi con doppia puleggia
   - Regola le pulegge all'altezza del petto (per pettorali medi), più in alto (per pettorali inferiori) o più in basso (per pettorali superiori)
   - Afferra le impugnature con una presa pronata (palmi verso il basso) o neutra
   - Fai un passo avanti con un piede per stabilità e leggera inclinazione del busto
   - Piega leggermente i gomiti mantenendo un angolo costante durante tutto l'esercizio
   - Parti con le braccia aperte lateralmente, formando una "T" con il busto

2. **Fase concentrica (adduzione)**:
   - Espira mentre porti le mani davanti a te con un movimento ad arco
   - Mantieni una leggera flessione ai gomiti durante tutto il movimento (non estenderli né piegarli ulteriormente)
   - Visualizza l'azione di "abbracciare un albero", con le mani che si avvicinano ma non si toccano
   - Contrai i pettorali nel punto di massima adduzione
   - Mantieni i polsi allineati e stabili, senza permettere rotazioni

3. **Fase eccentrica (abduzione)**:
   - Inspira mentre apri lentamente le braccia, tornando alla posizione di partenza
   - Controlla il movimento di ritorno, senza permettere ai cavi di tirare bruscamente le braccia
   - Senti l'allungamento dei pettorali nella posizione di massima apertura
   - Mantieni la tensione nei pettorali anche nella fase di ritorno

4. **Varianti di esecuzione**:
   - Croci alte: pulegge posizionate in basso, enfasi sui pettorali superiori
   - Croci basse: pulegge posizionate in alto, enfasi sui pettorali inferiori
   - Croci unilaterali: esecuzione con un braccio alla volta per maggiore concentrazione
   - Croci con step-in: aggiungere un passo in avanti durante la fase di contrazione

# Note di Sicurezza
- Mantieni sempre il controllo del movimento, evitando slanci o movimenti bruschi
- Non utilizzare carichi eccessivi che compromettano la corretta esecuzione tecnica
- Mantieni una leggera flessione dei gomiti costante durante tutto il movimento per proteggere l'articolazione
- Evita di inarcare eccessivamente la schiena durante l'esecuzione
- Non portare le braccia troppo indietro nella fase di apertura per evitare stress alla capsula articolare della spalla
- Mantieni i polsi in posizione neutra, evitando flessioni eccessive
- Assicurati che i cavi siano correttamente agganciati e le pulegge ben lubrificate
- Se avverti dolore alle spalle, ferma immediatamente l'esercizio
- Inizia con carichi leggeri per padroneggiare la tecnica e l'attivazione muscolare
- Mantieni una respirazione regolare, evitando di trattenere il respiro durante l'esecuzione
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