---
nome_esercizio: Standing Leg Curl
tags:
---
# Descrizione
Lo Standing Leg Curl (curl per le gambe in piedi) è un esercizio di isolamento che si concentra specificamente sui muscoli posteriori della coscia (hamstring) e, in misura minore, sui gastrocnemi (polpacci). Eseguito su una macchina apposita che consente di flettere il ginocchio contro resistenza mentre si è in posizione eretta, questo esercizio offre un'alternativa efficace al tradizionale leg curl sdraiato o seduto. A differenza di altre varianti, lo standing leg curl consente di lavorare su una gamba alla volta in posizione funzionale, migliorando l'equilibrio e la stabilità unilaterale. È particolarmente utile per atleti di sport che richiedono potenza e forza degli hamstring come sprint, salti e calci, oltre a contribuire all'estetica della parte posteriore della coscia e alla prevenzione degli infortuni.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Posizionati di fronte alla macchina, rivolto verso il supporto imbottito
   - Afferra le maniglie o il supporto frontale per stabilità
   - Posiziona la parte posteriore della caviglia (tendine d'Achille) sotto il cuscinetto della macchina
   - Mantieni la gamba di supporto leggermente flessa, non bloccata
   - Attiva il core e mantieni la schiena in posizione neutra

2. **Fase di flessione (concentrica)**:
   - Espira mentre fletti il ginocchio, sollevando il tallone verso il gluteo
   - Contrai attivamente i muscoli hamstring durante il movimento
   - Solleva il peso fino a quando il ginocchio è piegato a circa 90 gradi o leggermente oltre
   - Mantieni la posizione superiore per 1-2 secondi per massimizzare la contrazione
   - Evita di utilizzare slancio o di compensare con altri muscoli

3. **Fase di ritorno (eccentrica)**:
   - Inspira mentre abbassi lentamente la gamba alla posizione di partenza
   - Controlla il movimento di ritorno, resistendo alla trazione del peso
   - Mantieni una leggera tensione nei muscoli posteriori della coscia anche nel punto più basso
   - Non tornare alla completa estensione del ginocchio per mantenere tensione costante

4. **Varianti di esecuzione**:
   - Tempo sotto tensione: rallentare deliberatamente la fase eccentrica (3-4 secondi)
   - Pausa isometrica: mantenere la contrazione nel punto più alto per 2-3 secondi
   - Range parziale: lavorare solo nella porzione più difficile del movimento per intensificare lo stimolo
   - Metodo 21: eseguire 7 ripetizioni nella metà inferiore, 7 nella metà superiore e 7 complete

# Note di Sicurezza
- Regola accuratamente l'altezza del cuscinetto in base alla tua statura prima di iniziare
- Mantieni sempre una presa salda sulle maniglie per stabilità durante tutto l'esercizio
- Evita di inarcare eccessivamente la schiena durante l'esecuzione
- Non utilizzare slancio o movimenti bruschi per sollevare il peso
- Controlla il movimento sia nella fase concentrica che in quella eccentrica
- Inizia con carichi leggeri per padroneggiare la corretta tecnica prima di aumentare il peso
- Se avverti dolore al ginocchio o dietro la coscia (diverso dal normale "bruciore" muscolare), interrompi l'esercizio
- Evita questo esercizio se hai recenti infortuni al ginocchio o agli hamstring
- Mantieni il busto in posizione verticale, evitando di piegarti in avanti
- Assicurati che l'imbottitura della macchina sia posizionata correttamente sulla parte posteriore della caviglia, non sul tendine d'Achille

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
