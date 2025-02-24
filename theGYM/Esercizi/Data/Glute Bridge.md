---
nome_esercizio: Glute Bridge
tags:
---
# Descrizione
Il Glute Bridge con sovraccarico è un esercizio mirato principalmente allo sviluppo dei glutei e della catena posteriore. A differenza della versione base a corpo libero, l'aggiunta di un sovraccarico (bilanciere, disco, kettlebell o banda elastica) aumenta significativamente l'intensità e l'efficacia dell'esercizio. Questa variante permette di attivare in modo più intenso il grande gluteo, gli ischio-crurali (hamstring) e i muscoli lombari, creando un movimento di estensione dell'anca che è fondamentale per molte attività sportive e quotidiane. Il Glute Bridge con sovraccarico è particolarmente apprezzato per la sua capacità di isolare i glutei con un carico significativo, pur mantenendo un basso impatto sulla colonna vertebrale, rendendolo adatto anche per chi ha problemi alla zona lombare o cerca alternative allo squat e allo stacco.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Sdraiati sulla schiena su un tappetino, con le ginocchia piegate e i piedi appoggiati a terra a larghezza anche
   - Posiziona il sovraccarico sull'anca (bilanciere, disco, kettlebell)
   - Se usi un bilanciere, posizionalo in modo che poggi sulla piega dell'anca
   - Tieni il sovraccarico in posizione con entrambe le mani per maggiore stabilità
   - Le braccia dovrebbero essere distese a terra con i palmi rivolti verso il basso per bilanciare il corpo

2. **Fase di sollevamento (concentrica)**:
   - Attiva i muscoli addominali per stabilizzare la zona lombare
   - Espira mentre spingi attraverso i talloni e contrai i glutei
   - Solleva il bacino dal pavimento fino a creare una linea retta dalle spalle alle ginocchia
   - Raggiungi la massima contrazione dei glutei in cima al movimento
   - Evita di inarcare eccessivamente la schiena nella posizione alta

3. **Fase di discesa (eccentrica)**:
   - Inspira mentre abbassi lentamente il bacino verso il pavimento
   - Controlla il movimento di discesa, evitando di "cadere" bruscamente
   - Abbassa fino a quando i glutei sono vicini al pavimento ma non lo toccano completamente (per mantenere tensione)
   - Mantieni i piedi completamente appoggiati durante tutto il movimento

4. **Varianti di esecuzione**:
   - Glute Bridge su una gamba sola: per aumentare l'intensità e lavorare sugli squilibri
   - Piedi più lontani dal corpo: per maggiore attivazione degli hamstring
   - Piedi più vicini al corpo: per maggiore attivazione dei glutei
   - Piedi su superficie elevata (panca o step): per aumentare il range di movimento
   - Pausa isometrica: mantenere la posizione alta per 2-3 secondi per intensificare la contrazione

# Note di Sicurezza
- Inizia con un carico leggero per padroneggiare la tecnica prima di aumentare il sovraccarico
- Mantieni sempre gli addominali contratti per proteggere la zona lombare
- Evita di inarcare eccessivamente la schiena nella fase alta del movimento
- Se utilizzi un bilanciere, assicurati che sia ben bilanciato sull'anca e considera l'uso di un cuscinetto protettivo
- Assicurati che i piedi rimangano ben piantati a terra durante tutto l'esercizio
- Non sollevare il bacino oltre il punto in cui crei una linea retta dalle spalle alle ginocchia
- Se avverti dolore alla zona lombare, riduci il carico o torna alla versione a corpo libero
- Assicurati di avere spazio sufficiente intorno a te, specialmente se usi un bilanciere
- Mantieni la testa e le spalle a contatto con il pavimento durante tutto il movimento
- Quando utilizzi carichi pesanti, considera la presenza di un partner di allenamento per assistenza
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