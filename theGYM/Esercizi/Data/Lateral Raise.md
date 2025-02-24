---
nome_esercizio: Lateral Raise Machine
tags:
---
# Descrizione
Il Lateral Raise (o alzate laterali) è un esercizio di isolamento specificamente progettato per sviluppare i deltoidi laterali (parte media delle spalle), contribuendo a creare spalle più larghe e una silhouette a V. A differenza degli esercizi compound per le spalle come la military press, il lateral raise isola efficacemente il capo laterale del deltoide, aumentando la definizione e l'ampiezza della spalla. L'esercizio viene tipicamente eseguito con manubri, ma può essere variato utilizzando cavi, elastici o macchine specifiche. Il movimento di abduzione del braccio recluta principalmente il deltoide laterale, con un coinvolgimento secondario del deltoide anteriore, del trapezio superiore e dei muscoli stabilizzatori della spalla. È un esercizio fondamentale per chiunque desideri sviluppare spalle proporzionate e simmetriche.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Stai in piedi con i piedi alla larghezza delle spalle e le ginocchia leggermente flesse
   - Impugna un manubrio in ciascuna mano ai lati del corpo
   - Mantieni una leggera flessione dei gomiti (circa 10-15 gradi) che rimarrà costante durante tutto il movimento
   - Attiva leggermente il core e mantieni la schiena dritta
   - Le spalle dovrebbero essere leggermente indietro e abbassate (non sollevate verso le orecchie)

2. **Fase di sollevamento**:
   - Espira mentre sollevi i manubri lateralmente fino a quando le braccia sono parallele al pavimento (o leggermente sopra)
   - Solleva attraverso i gomiti, non attraverso i polsi
   - Mantieni i palmi rivolti verso il basso o leggermente inclinati (mignolo più alto del pollice) per maggiore attivazione
   - Pensa di "versare acqua da una brocca" con i mignoli che guidano il movimento
   - Fai una breve pausa nella posizione di massima contrazione

3. **Fase di discesa**:
   - Inspira mentre abbassi lentamente i manubri nella posizione iniziale
   - Controlla il movimento durante la discesa, resistendo alla gravità
   - Non lasciare che i pesi cadano o rimbalzino ai lati del corpo
   - Mantieni la tensione sui deltoidi anche nella posizione inferiore

4. **Varianti di esecuzione**:
   - Alzate laterali al cavo: per mantenere tensione costante durante tutto il movimento
   - Alzate laterali seduti: per ridurre il rischio di utilizzare slancio
   - Alzate laterali con i palmi rivolti in avanti: per maggiore attivazione del deltoide anteriore
   - Alzate laterali unilaterali: per concentrarsi su un lato alla volta
   - Alzate laterali con inclinazione in avanti: per maggiore enfasi sulla parte posteriore del deltoide

# Note di Sicurezza
- Utilizza pesi appropriati che ti permettano di mantenere una tecnica corretta (spesso si tratta di pesi relativamente leggeri)
- Evita di utilizzare slancio o movimento del busto per sollevare i pesi
- Non alzare i manubri oltre l'altezza delle spalle se avverti dolore o disagio
- Mantieni sempre un leggero bend nei gomiti, mai completamente dritti o eccessivamente piegati
- Evita di sollevare le spalle verso le orecchie durante il movimento
- Non inarcare la schiena per facilitare il sollevamento
- Presta attenzione alla rotazione delle spalle, evitando movimenti che possano causare impingement
- Se hai problemi alla cuffia dei rotatori o altre patologie della spalla, consulta un professionista prima di eseguire questo esercizio
- Inizia con serie di riscaldamento usando pesi molto leggeri
- Controlla il movimento in entrambe le direzioni, evitando movimenti bruschi, specialmente nella fase discendente
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
