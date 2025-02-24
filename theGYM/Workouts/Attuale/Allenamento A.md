## Allenamento A: Gambe (Enfasi Quadricipiti) + Pettorali (Macchinari)

**Riscaldamento:**
* 5-10 minuti cardio leggero (cyclette, tapis roulant)
* Mobilità articolare (gambe, anche, spalle)

# Allenamento:
## Hack Squat Machine:
### 3-4 serie x 6-8 ripetizioni (Recupero: 2-3 minuti)
```dataviewjs
const config = {
    exercise: "Hack Squat",
    limit: 12,
    templatePath: "theGYM/Log/Data",
    timestampFormat: 'MMDD-HHmmss',  // Formato modificato
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
    const newFileName = `${config.templatePath}/${config.exercise}-${timestamp}.md`;  // Nome file modificato
    const template = generateTemplate(config.exercise, currentPage);
    
    await app.vault.create(newFileName, template);
    app.workspace.openLinkText(newFileName, '', true);
});

// Query per la tabella
dv.table(
    ["Data", "Esercizio", "Ripetizioni", "Peso (kg)", "Volume", "Link"],
    dv.pages(`"${config.templatePath}"`)
        .where(p => p.Esercizio?.path === dv.page(config.exercise).file.path)
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
## Leg Press 45°:
### 3 serie x 8-10 ripetizioni (Recupero: 90 secondi)
```dataviewjs
const exercise = "Leg Press 45";
const limit = 9;
const currentPage = dv.current().file.link;
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

// Funzionalità del pulsante con timestamp che include i secondi
buttonMaker.addEventListener('click', async () => {
    const timestamp = moment().format('MMDD-HHmmss');
    const newFileName = `theGYM/Log/Data/${exercise}-${timestamp}.md`;
    const template = [
        "---",
        "Rep:",
        "Weight:",
        "Volume:",
        "---",
        `Esercizio::[[${exercise}]]`,
        `Origine:: ${currentPage}`
    ].join('\n');
    
    await app.vault.create(newFileName, template);
    app.workspace.openLinkText(newFileName, '', true);
});

// Query corretta per gestire i link
dv.table(
    ["Data", "Esercizio", "Ripetizioni", "Peso (kg)", "Volume","Link"],
    dv.pages('"theGYM/Log/Data"')
        .where(p => p.Esercizio?.path === dv.page(exercise).file.path)
        .sort(p => p.file.ctime, 'asc')
        .limit(limit)
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
## Leg Extension:
### 3 serie x 10-12 ripetizioni (Recupero: 60 secondi)
```dataviewjs
const exercise = "Leg Extension";
const limit = 9;
const currentPage = dv.current().file.link;
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

// Funzionalità del pulsante con timestamp che include i secondi
buttonMaker.addEventListener('click', async () => {
const timestamp = moment().format('MMDD-HHmmss');
    const newFileName = `theGYM/Log/Data/${exercise}-${timestamp}.md`;
    const template = [
        "---",
        "Rep:",
        "Weight:",
        "Volume:",
        "---",
        `Esercizio::[[${exercise}]]`,
        `Origine:: ${currentPage}`
    ].join('\n');
    
    await app.vault.create(newFileName, template);
    app.workspace.openLinkText(newFileName, '', true);
});

// Query corretta per gestire i link
dv.table(
    ["Data", "Esercizio", "Ripetizioni", "Peso (kg)", "Volume","Link"],
    dv.pages('"theGYM/Log/Data"')
        .where(p => p.Esercizio?.path === dv.page(exercise).file.path)
        .sort(p => p.file.ctime, 'asc')
        .limit(limit)
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
## Affondi allo Smith Machine:
### 3 serie x 10-12 ripetizioni per gamba (Recupero: 60 secondi per gamba)
```dataviewjs
// Definiamo la variabile per l'esercizio
const exercise = "Affondi allo Smith Machine";
const limit = 12; // 3x4const currentPage = dv.current().file.link;
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

// Funzionalità del pulsante con timestamp che include i secondi
buttonMaker.addEventListener('click', async () => {
const timestamp = moment().format('MMDD-HHmmss');
    const newFileName = `theGYM/Log/Data/${exercise}-${timestamp}.md`;
    const template = [
        "---",
        "Rep:",
        "Weight:",
        "Volume:",
        "---",
        `Esercizio::[[${exercise}]]`,
        `Origine:: ${currentPage}`
    ].join('\n');
    
    await app.vault.create(newFileName, template);
    app.workspace.openLinkText(newFileName, '', true);
});

// Query corretta per gestire i link
dv.table(
    ["Data", "Esercizio", "Ripetizioni", "Peso (kg)", "Volume","Link"],
    dv.pages('"theGYM/Log/Data"')
        .where(p => p.Esercizio?.path === dv.page(exercise).file.path)
        .sort(p => p.file.ctime, 'asc')
        .limit(limit)
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
 
## Chest Press Machine:
### 3 serie x 6-8 ripetizioni (Recupero: 2-3 minuti)
```dataviewjs
// Definiamo la variabile per l'esercizio
const exercise = "chest press";
const limit = 9; // 3x4
const currentPage = dv.current().file.link;
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

// Funzionalità del pulsante con timestamp che include i secondi
buttonMaker.addEventListener('click', async () => {
const timestamp = moment().format('MMDD-HHmmss');
    const newFileName = `theGYM/Log/Data/${exercise}-${timestamp}.md`;
    const template = [
        "---",
        "Rep:",
        "Weight:",
        "Volume:",
        "---",
        `Esercizio::[[${exercise}]]`,
        `Origine:: ${currentPage}`
    ].join('\n');
    
    await app.vault.create(newFileName, template);
    app.workspace.openLinkText(newFileName, '', true);
});

// Query corretta per gestire i link
dv.table(
    ["Data", "Esercizio", "Ripetizioni", "Peso (kg)", "Volume","Link"],
    dv.pages('"theGYM/Log/Data"')
        .where(p => p.Esercizio?.path === dv.page(exercise).file.path)
        .sort(p => p.file.ctime, 'asc')
        .limit(limit)
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
## Incline Chest Press Machine:
### 3 serie x 8-10 ripetizioni (Recupero: 90 secondi)
```dataviewjs
// Definiamo la variabile per l'esercizio
const exercise = "inclined chest press";
const limit = 12; // 3x4
const currentPage = dv.current().file.link;
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

// Funzionalità del pulsante con timestamp che include i secondi
buttonMaker.addEventListener('click', async () => {
const timestamp = moment().format('MMDD-HHmmss');
    const newFileName = `theGYM/Log/Data/${exercise}-${timestamp}.md`;
    const template = [
        "---",
        "Rep:",
        "Weight:",
        "Volume:",
        "---",
        `Esercizio::[[${exercise}]]`,
        `Origine:: ${currentPage}`
    ].join('\n');
    
    await app.vault.create(newFileName, template);
    app.workspace.openLinkText(newFileName, '', true);
});

// Query corretta per gestire i link
dv.table(
    ["Data", "Esercizio", "Ripetizioni", "Peso (kg)", "Volume","Link"],
    dv.pages('"theGYM/Log/Data"')
        .where(p => p.Esercizio?.path === dv.page(exercise).file.path)
        .sort(p => p.file.ctime, 'asc')
        .limit(limit)
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
## Croci ai Cavi:
### 2 serie x 12-15 ripetizioni (Recupero: 60 secondi)
```dataviewjs
// Definiamo la variabile per l'esercizio
const exercise = "Croci ai Cavi";
const limit = 6;
const currentPage = dv.current().file.link;
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

// Funzionalità del pulsante con timestamp che include i secondi
buttonMaker.addEventListener('click', async () => {
const timestamp = moment().format('MMDD-HHmmss');
    const newFileName = `theGYM/Log/Data/${exercise}-${timestamp}.md`;
    const template = [
        "---",
        "Rep:",
        "Weight:",
        "Volume:",
        "---",
        `Esercizio::[[${exercise}]]`,
        `Origine:: ${currentPage}`
    ].join('\n');
    
    await app.vault.create(newFileName, template);
    app.workspace.openLinkText(newFileName, '', true);
});

// Query corretta per gestire i link
dv.table(
    ["Data", "Esercizio", "Ripetizioni", "Peso (kg)", "Volume","Link"],
    dv.pages('"theGYM/Log/Data"')
        .where(p => p.Esercizio?.path === dv.page(exercise).file.path)
        .sort(p => p.file.ctime, 'asc')
        .limit(limit)
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

**Circuito (Opzionale - Scegli uno):**

* **Circuito Glutei/Gambe (Focus Metabolico):**
    * Air Squat (o Smith Machine Squat leggero): 20 ripetizioni
    * Affondi Alternati (corpo libero o Smith Machine): 10 ripetizioni per gamba
    * Glute Bridge (a terra, senza peso): 20 ripetizioni
    * Slanci Posteriori (a terra, in quadrupedia o alla Glute Machine): 15 ripetizioni per gamba
    * Riposo: 60 secondi
    * Ripetere il circuito 3-4 volte.

**Defaticamento:**
* 5-10 minuti stretching statico (quadricipiti, femorali, glutei, polpacci, pettorali)