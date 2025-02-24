---
nome_esercizio: Crunch Inversi
tags:
---
# Descrizione
I Crunch Inversi sono un esercizio fondamentale per il rafforzamento della parte bassa dell'addome, che coinvolge principalmente il retto addominale inferiore e, in misura minore, l'obliquo esterno e interno. A differenza del crunch tradizionale che prevede il sollevamento delle spalle e della parte superiore del corpo, i crunch inversi si concentrano sul sollevamento della parte inferiore (bacino e gambe) verso il busto. Questo movimento inverso permette di isolare maggiormente la sezione inferiore dell'addome, spesso più difficile da sollecitare efficacemente con altri esercizi. I crunch inversi sono particolarmente efficaci per sviluppare stabilità del core, forza funzionale della parte bassa dell'addome e migliorare il controllo della regione lombo-pelvica.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Sdraiati su una superficie piana con la schiena ben appoggiata a terra
   - Posiziona le braccia ai lati del corpo con i palmi rivolti verso il basso o sotto i glutei per maggiore supporto
   - Solleva le gambe fino a formare un angolo di circa 90 gradi con il pavimento
   - Mantieni le ginocchia leggermente piegate per ridurre lo stress sulla zona lombare
   - Attiva il core mantenendo la zona lombare in contatto con il pavimento

2. **Fase di contrazione (concentrica)**:
   - Espira mentre sollevi lentamente il bacino dal pavimento verso il busto
   - Contrai gli addominali inferiori per generare il movimento
   - Solleva il bacino di alcuni centimetri, non è necessario un movimento ampio
   - Mantieni le gambe in posizione stabile durante il sollevamento
   - Il movimento dovrebbe essere fluido e controllato, senza utilizzare slancio

3. **Fase di ritorno (eccentrica)**:
   - Inspira mentre abbassi lentamente il bacino tornando alla posizione iniziale
   - Mantieni la tensione nei muscoli addominali anche durante la discesa
   - Evita di lasciare cadere bruscamente il bacino
   - Non permettere alla zona lombare di inarcarsi durante il movimento di ritorno
   - Controlla il movimento fino al completo ritorno alla posizione iniziale

4. **Varianti di esecuzione**:
   - Crunch inversi con gambe tese: aumenta l'intensità dell'esercizio
   - Crunch inversi su panca declinata: incrementa la resistenza gravitazionale
   - Crunch inversi con rotazione: aggiunge lavoro sugli obliqui
   - Hanging leg raises: versione avanzata eseguita in sospensione alla sbarra

# Note di Sicurezza
- Mantieni sempre la zona lombare della schiena in contatto con il pavimento durante tutto l'esercizio
- Evita di utilizzare slancio o movimenti bruschi che potrebbero sovraccaricare la colonna vertebrale
- Se avverti dolore alla zona lombare, riduci l'ampiezza del movimento o modifica la posizione delle gambe
- Non trattenere il respiro durante l'esecuzione
- In caso di problemi alla schiena o ernia del disco, consulta un professionista prima di eseguire questo esercizio
- Controlla sempre il movimento sia nella fase di sollevamento che di discesa
- Evita di tirare con il collo o le spalle durante l'esecuzione
- Inizia con ripetizioni moderate (10-15) e aumenta gradualmente in base al tuo livello di forza
- Per i principianti, è consigliabile mantenere le ginocchia più piegate per facilitare l'esecuzione
- Concentrati sulla qualità del movimento piuttosto che sulla quantità di ripetizioni
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
