---
nome_esercizio: Leg Extension
tags: 
---

# Descrizione
La Leg Extension (o estensione delle gambe) è un esercizio di isolamento che si concentra specificamente sui muscoli quadricipiti. Viene eseguito su una macchina apposita che permette un movimento controllato di estensione del ginocchio. A differenza degli esercizi compound come squat o leg press, la leg extension isola quasi completamente i quadricipiti, rendendola efficace per la definizione muscolare, il recupero da infortuni e la correzione di squilibri muscolari tra le gambe. L'esercizio coinvolge tutte e quattro le parti del quadricipite (vasto mediale, vasto laterale, vasto intermedio e retto femorale), con particolare enfasi sul retto femorale che è l'unico dei quattro a attraversare sia l'articolazione dell'anca che quella del ginocchio.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Siediti sulla macchina con la schiena ben appoggiata allo schienale
   - Regola la seduta in modo che il ginocchio sia allineato con il perno di rotazione della macchina
   - Posiziona la parte anteriore delle caviglie sotto il cuscinetto imbottito
   - Impugna le maniglie laterali per stabilità
   - Mantieni la parte bassa della schiena in posizione neutra, evitando l'iperestensione

2. **Fase concentrica (estensione)**:
   - Espira mentre estendi le gambe lentamente
   - Solleva il peso fino a quando le gambe sono quasi completamente distese
   - Evita di sbattere o bloccare le ginocchia nella posizione di massima estensione
   - Contrai i quadricipiti al punto più alto del movimento
   - Mantieni i piedi in posizione neutra o leggermente flessi verso di te

3. **Fase eccentrica (ritorno)**:
   - Inspira mentre abbassi lentamente il peso
   - Controlla il movimento di ritorno senza lasciarlo cadere
   - Abbassa fino a quando le ginocchia formano un angolo di circa 90 gradi
   - Mantieni la tensione sui quadricipiti anche in posizione di flessione

4. **Varianti di esecuzione**:
   - Esecuzione unilaterale: utilizzo di una gamba alla volta per correggere squilibri
   - Pause isometriche: mantenere l'estensione per 1-3 secondi in cima al movimento
   - Azione pulsante: eseguire piccoli movimenti parziali nella posizione di massima contrazione
   - Tempo sotto tensione: rallentare deliberatamente la fase eccentrica per maggiore stimolazione

# Note di Sicurezza
- Non utilizzare carichi eccessivi che compromettano la corretta esecuzione o causino movimenti compensatori
- Evita di estendere completamente il ginocchio con uno scatto finale per prevenire stress eccessivo sull'articolazione
- Assicurati che l'imbottitura sia posizionata correttamente sulla parte distale della tibia, non sulla caviglia
- Non utilizzare slancio o aiutarti con il busto per sollevare il peso
- Regola sempre la macchina in base alla tua anatomia individuale prima di iniziare
- Non eseguire l'esercizio con carichi pesanti se hai problemi ai legamenti del ginocchio senza consultare uno specialista
- Mantieni sempre il controllo durante la fase di ritorno per evitare sovraccarichi sull'articolazione
- Evita di sollevare le natiche dal sedile durante l'esecuzione
- Se avverti dolore acuto al ginocchio, interrompi immediatamente l'esercizio
- Per i principianti, è consigliabile partire con carichi leggeri per familiarizzare con il movimento e rafforzare gradualmente i tendini

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