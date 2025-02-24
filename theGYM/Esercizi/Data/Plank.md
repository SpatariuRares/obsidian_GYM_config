---
nome_esercizio: Plank
tags:
---
# Descrizione

Il Plank è un esercizio isometrico fondamentale per il rafforzamento del core e della stabilità generale del corpo. Consiste nel mantenere una posizione simile a quella di una flessione (push-up), ma con gli avambracci appoggiati a terra anziché le mani. Questo esercizio coinvolge principalmente i muscoli addominali (retto addominale, obliqui esterni e interni, trasverso dell'addome), i muscoli della schiena (erettori spinali), i glutei e gli stabilizzatori delle spalle. A differenza degli esercizi dinamici come i crunch, il plank impegna l'intera catena muscolare anteriore e posteriore in una contrazione statica, migliorando la resistenza muscolare e la stabilità posturale senza stress sulla colonna vertebrale. Per questo motivo, è considerato uno degli esercizi più efficaci e sicuri per lo sviluppo della forza del core.

# Tecnica di Esecuzione

1. **Posizione iniziale**:
    - Posizionati a faccia in giù sul tappetino
    - Appoggia gli avambracci a terra, con i gomiti direttamente sotto le spalle
    - Le braccia dovrebbero formare un angolo di 90 gradi con gli avambracci paralleli tra loro
    - Solleva il corpo da terra, sostenendoti sugli avambracci e sulle punte dei piedi
    - Mantieni le gambe distese e i piedi a larghezza fianchi
2. **Allineamento corporeo**:
    - Mantieni il corpo in una linea retta dalla testa ai talloni
    - Contrai gli addominali e i glutei per stabilizzare la posizione
    - Mantieni la schiena in posizione neutra, evitando sia l'inarcamento che la curvatura
    - Tieni il collo in linea con la colonna vertebrale, guardando leggermente avanti verso il pavimento
    - Distribuisci uniformemente il peso tra avambracci e punte dei piedi
3. **Mantenimento della posizione**:
    - Respira normalmente durante l'esecuzione, evitando di trattenere il respiro
    - Tieni la muscolatura del core costantemente attivata
    - Mantieni la posizione per il tempo prestabilito (da 20 secondi per principianti a oltre 1 minuto per avanzati)
    - Concentrati sulla qualità della posizione piuttosto che sulla durata
4. **Varianti di esecuzione**:
    - Plank sulle mani: posizione più elevata con braccia tese
    - Side plank: plank laterale che coinvolge maggiormente gli obliqui
    - Plank con elevazione di un arto: sollevare alternamente braccia o gambe per aumentare la difficoltà
    - Plank dinamico: aggiungere movimenti come toccare alternativamente le spalle con le mani opposte

# Note di Sicurezza

- Evita di far cadere il bacino verso il basso o di sollevarlo eccessivamente verso l'alto
- Non trattenere il respiro durante l'esecuzione dell'esercizio
- Evita di caricare eccessivamente il peso sulle spalle per prevenire tensioni nel collo
- Interrompi l'esercizio se avverti dolore nella zona lombare o nelle spalle
- Inizia con tempi brevi (20-30 secondi) e aumenta gradualmente la durata
- Preferisci più serie brevi con tecnica perfetta piuttosto che una singola serie lunga con tecnica scorretta
- Se hai problemi alle spalle o ai polsi, puoi eseguire il plank su un supporto rialzato come una panca
- Assicurati di avere sufficiente presa sul pavimento per evitare scivolamenti
- Se hai problemi di pressione sanguigna, consulta un medico prima di praticare esercizi isometrici prolungati
- Per principianti o persone con limitata forza del core, è possibile iniziare con una versione modificata appoggiando le ginocchia a terra

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
