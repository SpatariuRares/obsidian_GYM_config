## Allenamento B: Dorso + Spalle (Enfasi Ampiezza) + Tricipiti (Macchinari)

**Riscaldamento:**
* 5-10 minuti cardio leggero
* Mobilità articolare (spalle, schiena)

**Allenamento:**

## HighRow:
### 3 serie x massime ripetizioni (Recupero: 2-3 minuti)

```dataviewjs
const exercise = "HighRow";
const limit = 12;
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

 ## Row:
 ### 3 serie x 6-8 ripetizioni (Recupero: 2-3 minuti)
```dataviewjs
const exercise = "Row";
const limit = 12;
// Creiamo e stiliamo il pulsante
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
## Pulley Basso:
### 3 serie x 8-10 ripetizioni (Recupero: 90 secondi)
```dataviewjs
const exercise = "Pulley Basso";
const limit = 12;
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
## Shoulder Press:
### 3 serie x 8-10 ripetizioni (Recupero: 90 secondi)
```dataviewjs
const exercise = "Shoulder Press";
const limit = 12;
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
## Push Down ai Cavi:
### 3 serie x 10-12 ripetizioni (Recupero: 60 secondi)
```dataviewjs
const exercise = "Push Down ai cavi";
const limit = 12;
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
## Triceps Extension:
### 2 serie x 10-12 ripetizioni (Recupero: 60 secondi)
```dataviewjs
const exercise = "Triceps Extension";
const limit = 12;
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

**Circuito (Opzionale):**

* **Australian Pull-up (o Body Row - sotto un tavolo o sbarra bassa):** Massime ripetizioni 
* **Pike Push-up (per enfasi spalle):** 
  *Massime ripetizioni 
* **Diamond Push-up (per enfasi tricipiti):**
  Massime ripetizioni 
* **Superman (estensioni lombari a terra):**
   15-20 ripetizioni 
* Riposo: 60 secondi 
* Ripetere il circuito 2-3 volte.

**Defaticamento:**
* 5-10 minuti stretching statico (dorsali, spalle, tricipiti, bicipiti)
