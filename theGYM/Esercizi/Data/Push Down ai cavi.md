---
nome_esercizio: Push Down ai cavi
tags:
  - tricipiti
  - isolamento
  - braccia
---
# Descrizione
Il Push Down ai cavi è un esercizio di isolamento mirato principalmente allo sviluppo dei muscoli tricipiti. Viene eseguito utilizzando un cavo alto con una barra dritta, una corda o un attacco a V. Questo movimento è eccellente per isolare efficacemente tutti e tre i capi del tricipite (laterale, lungo e mediale), con particolare enfasi sul capo laterale e mediale. A differenza degli esercizi compound come le distensioni, il Push Down concentra il lavoro esclusivamente sui tricipiti, minimizzando il coinvolgimento di gruppi muscolari assistenti. La tensione costante fornita dal sistema a cavi durante tutto il movimento lo rende particolarmente efficace per la definizione e l'ipertrofia del tricipite, rendendolo un esercizio fondamentale per chi desidera braccia ben definite e bilanciate.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Posizionati in piedi davanti a una macchina con cavo alto
   - Collega l'attacco desiderato (barra dritta, corda o attacco a V) al cavo
   - Afferra l'attacco con entrambe le mani, palmi rivolti verso il basso per la barra o in posizione neutra per la corda
   - Posizionati con i piedi alla larghezza delle spalle, leggermente distanziati dalla macchina
   - Mantieni i gomiti aderenti ai fianchi e piegati a circa 90 gradi
   - Inclinati leggermente in avanti dal busto mantenendo la schiena dritta

2. **Fase di spinta (concentrica)**:
   - Espira mentre spingi l'attacco verso il basso
   - Estendi completamente i gomiti, contraendo intensamente i tricipiti
   - Mantieni i gomiti vicini al corpo durante tutto il movimento
   - Alla fine del movimento, i tricipiti dovrebbero essere completamente contratti
   - Mantieni i polsi in posizione neutra, evitando flessioni eccessive

3. **Fase di ritorno (eccentrica)**:
   - Inspira mentre permetti all'attacco di risalire lentamente
   - Controlla il movimento di risalita senza lasciare che il peso guidi le tue mani
   - Ferma il movimento quando i gomiti raggiungono un angolo di circa 90 gradi
   - Mantieni sempre una leggera tensione nei tricipiti, evitando che il peso "rimbalzi" in cima

4. **Varianti di esecuzione**:
   - Push Down con corda: permette una leggera rotazione esterna dei polsi a fine movimento per maggiore contrazione
   - Push Down con barra dritta: favorisce una maggiore stabilità e permette di utilizzare carichi più pesanti
   - Push Down con impugnatura a V: offre una via di mezzo tra corda e barra
   - Push Down a un braccio: utile per correggere squilibri di forza o sviluppo tra i due lati

# Note di Sicurezza
- Mantieni sempre i gomiti aderenti ai fianchi per isolare correttamente i tricipiti ed evitare stress sulle spalle
- Evita di utilizzare slancio o il peso del corpo per completare il movimento
- Non bloccare completamente le articolazioni dei gomiti nella fase di estensione
- Mantieni i polsi stabili e in linea con gli avambracci durante tutto l'esercizio
- Non utilizzare carichi eccessivi che compromettano la corretta tecnica di esecuzione
- Evita di inclinare eccessivamente il busto in avanti, che potrebbe causare stress alla zona lombare
- Non sollevare le spalle durante l'esecuzione
- Se avverti dolore ai gomiti o ai polsi, interrompi immediatamente l'esercizio
- Inizia sempre con un adeguato riscaldamento delle articolazioni dei gomiti e delle spalle
- Quando termini l'esercizio, riporta sempre il peso alla posizione iniziale in modo controllato

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
