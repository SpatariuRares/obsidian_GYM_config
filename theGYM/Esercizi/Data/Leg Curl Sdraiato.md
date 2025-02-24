---
nome_esercizio: Leg Curl Sbraiato
tags: 
---
# Descrizione
Il Leg Curl Sdraiato è un esercizio di isolamento focalizzato specificamente sui muscoli posteriori della coscia (hamstring o ischio-crurali). Viene eseguito su una macchina apposita che permette di flettere le ginocchia contro resistenza dalla posizione prona. A differenza degli esercizi compound come stacchi o squat, il leg curl isola selettivamente gli ischio-crurali, rendendo questo esercizio fondamentale per uno sviluppo equilibrato della muscolatura delle gambe. I muscoli bersaglio principali includono il bicipite femorale, il semitendinoso e il semimembranoso. L'esercizio è particolarmente efficace per migliorare la forza e l'ipertrofia dei flessori del ginocchio, contribuendo alla stabilità dell'articolazione e riducendo il rischio di infortuni, specialmente per chi pratica sport che richiedono sprint, salti o cambi di direzione.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Sdraiati a pancia in giù sulla panca della macchina
   - Regola la macchina in modo che il cuscinetto sia posizionato appena sopra i talloni
   - La linea dell'articolazione del ginocchio dovrebbe essere allineata con il perno di rotazione della macchina
   - Afferra le maniglie o i bordi della panca per stabilità
   - Mantieni i piedi rilassati e in posizione neutra (non puntati o flessi)

2. **Fase di flessione (concentrica)**:
   - Espira mentre fletti le ginocchia, sollevando il cuscinetto verso i glutei
   - Mantieni i fianchi ben appoggiati sulla panca durante tutto il movimento
   - Continua la flessione fino a quando non puoi più contrarre gli ischio-crurali (tipicamente 90-100 gradi)
   - Stringi brevemente gli ischio-crurali nella posizione di massima contrazione
   - Evita di utilizzare slancio o di sollevare i fianchi dalla panca

3. **Fase di estensione (eccentrica)**:
   - Inspira mentre abbassi lentamente il peso, tornando alla posizione di partenza
   - Controlla il movimento di ritorno, resistendo alla gravità
   - Non lasciare che il peso cada bruscamente
   - Mantieni una leggera tensione sugli ischio-crurali anche nella posizione di partenza

4. **Varianti di esecuzione**:
   - Esecuzione unilaterale: utilizzo di una gamba alla volta per correggere squilibri
   - Variazione della posizione dei piedi: ruotati internamente o esternamente per enfatizzare diversi capi muscolari
   - Pause isometriche: mantenere la posizione di massima contrazione per 1-3 secondi
   - Ripetizioni parziali: eseguire movimenti parziali nella parte alta del range per aumentare l'intensità

# Note di Sicurezza
- Regola sempre correttamente la macchina in base alla tua struttura corporea prima di iniziare
- Evita di utilizzare carichi eccessivi che causino movimenti compensatori come il sollevamento dei fianchi
- Non estendere completamente le ginocchia nella posizione di partenza per mantenere tensione sui muscoli target
- Evita movimenti bruschi, specialmente nella transizione tra le fasi concentrica ed eccentrica
- Mantieni la parte bassa della schiena in posizione neutra, evitando un'eccessiva lordosi
- Non trattenere il respiro durante l'esecuzione
- Se hai problemi lombari, assicurati che la pancia sia ben supportata e che non ci sia compressione eccessiva
- Per prevenire crampi, mantieni una buona idratazione e assicurati di avere sufficienti elettroliti
- Se avverti dolore acuto dietro il ginocchio o nella zona dei tendini, interrompi immediatamente l'esercizio
- Evita questo esercizio se hai recenti lesioni ai tendini degli ischio-crurali senza consultare un fisioterapista

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