## Allenamento C: Gambe (Enfasi Femorali e Glutei) + Bicipiti (Macchinari)

**Riscaldamento:**
* 5-10 minuti cardio leggero
* Mobilità articolare (gambe, anche)

# Allenamento:

## Glute Ham Raise Machine (se disponibile) o Back Extension Machine (focus glutei):** 
### 3 serie x 8-10 ripetizioni (Recupero: 2-3 minuti)

```dataviewjs
const exercise = "Glute Ham Raise";
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
## *Leg Curl Sdraiato:
### 3 serie x 10-12 ripetizioni (Recupero: 60 secondi)

```dataviewjs
const exercise = "Leg Curl Sdraiato";
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
## Hip Thrust Machine:
### **3 serie x 8-10 ripetizioni (Recupero: 90 secondi)

```dataviewjs
const exercise = "Hip Trust";
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
## Standing Leg Curl:
### 3 serie x 10-12 ripetizioni (Recupero: 90 secondi)

```dataviewjs
const exercise = "Standing Leg Curl";
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
## Glute Bridge (con sovraccarico):
### 2 serie x 12-15 (Recupero:60 Secondi)

```dataviewjs
const exercise = "Glute Bridge";
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
## Biceps Curl Machine:
### 3 serie x 8-10 ripetizioni (Recupero: 90 secondi)

```dataviewjs
const exercise = "Biceps Curl Machine";
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
## Hammer Curl:
### 2 serie x 10-12 ripetizioni (Recupero: 60 secondi)
```dataviewjs
const exercise = "Hammer Curl";
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
    * Slanci Posteriori (a terra in quadrupedia o alla Glute Machine): 15 ripetizioni per gamba
    * Riposo: 60 secondi
    * Ripetere il circuito 3-4 volte.

* **Circuito Total Body:**
    * Single Leg Glute Bridge (ponte glutei monopodalico): 10-15 ripetizioni per gamba
    * Hip Thrust (piedi a terra o rialzati):15-20 ripetizioni
    * Push-up (anche sulle ginocchia): massime ripetizioni
    * Nordic Ham Curl: massime ripetizioni
    * Riposo: 60 secondi
    * Ripetere il circuito 3-4 volte.

**Defaticamento:**
* 5-10 minuti stretching statico (femorali, glutei, quadricipiti, polpacci, bicipiti)