---
nome_esercizio: High row
tags:
  - granDorsale
---
# Descrizione
Il Row (Rematore) è un esercizio fondamentale per lo sviluppo dei muscoli della schiena e può essere eseguito con diversi attrezzi: macchina specifica, bilanciere, manubri o cavi. Questo movimento compound coinvolge principalmente il dorsale ampio (latissimus dorsi), i romboidi, il trapezio medio e inferiore, i deltoidi posteriori, gli erettori spinali e, come muscoli secondari, i bicipiti e gli avambracci. Il rematore simula il movimento di remare, tirando un peso verso il corpo mentre si mantiene una postura stabile. È un esercizio essenziale per costruire una schiena forte e bilanciata, migliorare la postura e sviluppare la forza funzionale della catena posteriore. La sua versatilità lo rende adatto sia agli atleti principianti che a quelli avanzati, con numerose varianti che permettono di enfatizzare diverse aree muscolari.

# Tecnica di Esecuzione
1. **Posizione iniziale** (descritta per il rematore su macchina, adattabile alle altre varianti):
   - Siediti sulla macchina con il petto appoggiato contro il supporto imbottito (se presente)
   - Regola il sedile in modo che le impugnature siano raggiungibili con le braccia quasi completamente distese
   - Afferra le maniglie con una presa salda, palmi rivolti l'uno verso l'altro (presa neutra) o verso il basso
   - Mantieni la schiena dritta, le spalle leggermente indietro e il core attivato
   - I piedi devono essere ben appoggiati sui supporti o a terra per garantire stabilità

2. **Fase di trazione (concentrica)**:
   - Espira mentre tiri le maniglie verso il corpo
   - Inizia il movimento portando le scapole insieme (retrazione) prima di piegare i gomiti
   - Tira finché le maniglie non raggiungono la zona addominale o la parte bassa del petto
   - Mantieni i gomiti vicini al corpo e dirigili all'indietro, non verso l'alto
   - Contrai la schiena al massimo nel punto di massima contrazione

3. **Fase di ritorno (eccentrica)**:
   - Inspira mentre riporti le maniglie in avanti in modo controllato
   - Estendi le braccia gradualmente, mantenendo sempre una leggera tensione sui muscoli dorsali
   - Permetti alle scapole di allungarsi in avanti nella posizione finale
   - Evita di "lanciare" il peso o perdere il controllo del movimento

4. **Varianti di esecuzione**:
   - Presa larga: maggiore enfasi su trapezio e romboidi
   - Presa stretta: maggiore attivazione del dorsale e dei bicipiti
   - Rematore inclinato con manubri: maggiore richiesta di stabilizzazione del core
   - Rematore con bilanciere: permette di utilizzare carichi maggiori
   - Rematore su cavi bassi: offre una tensione costante durante tutto il movimento

# Note di Sicurezza
- Mantieni sempre la schiena in posizione neutra, evitando di inarcarla o arrotondarla eccessivamente
- Non utilizzare lo slancio o il movimento del busto per sollevare il peso
- Regola l'attrezzatura in base alle tue proporzioni corporee prima di iniziare
- Evita di alzare le spalle verso le orecchie durante il movimento
- Non estendere completamente i gomiti nella fase di ritorno per mantenere tensione sui muscoli
- Esegui il movimento in modo controllato, evitando strattoni o movimenti bruschi
- Concentrati sulla contrazione e sul movimento delle scapole, non solo sul movimento delle braccia
- Se avverti dolore alla schiena bassa o alle spalle, interrompi l'esercizio e verifica la tecnica
- Per le varianti a corpo libero (come il bent-over row), fai particolare attenzione alla posizione della schiena
- Inizia sempre con un peso gestibile per padroneggiare la tecnica corretta prima di aumentare il carico
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