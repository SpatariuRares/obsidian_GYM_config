---
nome_esercizio: Glute Ham Raise
tags:
---
# Descrizione
Il Glute Ham Raise (GHR) è un esercizio avanzato focalizzato sullo sviluppo della catena posteriore, in particolare dei muscoli ischio-crurali (hamstring) e dei glutei. Eseguito su una specifica panca GHR o su un'attrezzatura modificata, questo movimento è considerato uno dei più efficaci per il rinforzo funzionale degli hamstring. A differenza del leg curl alla macchina, il GHR coinvolge gli hamstring sia nella loro funzione di flessione del ginocchio che di estensione dell'anca, lavorando contemporaneamente sul rinforzo della zona lombare. Questa natura completa lo rende particolarmente prezioso per atleti di forza, velocisti e sportivi che necessitano di potenza esplosiva negli sprint e nei salti. Il GHR è anche eccellente per la prevenzione degli infortuni agli ischio-crurali, una problematica comune in molti sport ad alta intensità.

# Tecnica di Esecuzione
1. **Posizione iniziale**:
   - Posizionati sulla panca GHR con i piedi bloccati sotto i cuscinetti posteriori
   - Le ginocchia dovrebbero essere appoggiate sul cuscinetto principale, leggermente dietro l'articolazione
   - Il corpo dovrebbe formare una linea retta dalla testa alle ginocchia
   - Incrocia le braccia sul petto o tienile distese davanti per maggiore stabilità
   - Mantieni il core attivato e la colonna vertebrale in posizione neutra

2. **Fase di discesa (eccentrica)**:
   - Partendo dalla posizione eretta, inizia a piegarti in avanti dall'anca
   - Mantieni la schiena completamente dritta durante tutto il movimento
   - Abbassa il busto lentamente e con controllo
   - Continua la discesa fino a quando il busto è quasi parallelo al pavimento o fino al punto in cui riesci a mantenere il controllo
   - Durante questa fase, gli hamstring vengono allungati sotto carico

3. **Fase di risalita (concentrica)**:
   - Contrai fortemente hamstring e glutei per iniziare a risalire
   - Mantieni le anche estese e la schiena dritta durante tutto il movimento
   - Solleva il busto fino a tornare alla posizione iniziale verticale
   - Esegui una contrazione isometrica di hamstring e glutei nel punto più alto

4. **Varianti di esecuzione**:
   - Versione assistita: utilizzo delle braccia o di una banda elastica per aiutare la risalita
   - Versione appesantita: tenere un disco o kettlebell al petto per aumentare la resistenza
   - Nordic Hamstring Curl: variante che enfatizza maggiormente la fase eccentrica
   - GHR con twist: aggiungere una rotazione nella fase di risalita per coinvolgere gli obliqui

# Note di Sicurezza
- Se sei alle prime armi con questo esercizio, inizia con la versione assistita utilizzando le braccia per aiutarti
- Assicurati che i cuscinetti della panca siano regolati correttamente per la tua altezza
- Verifica che i piedi siano saldamente bloccati prima di iniziare l'esercizio
- Mantieni sempre la colonna vertebrale in posizione neutra, evitando di inarcarne la parte lombare
- Non tentare di scendere oltre il punto in cui puoi mantenere il controllo del movimento
- Se avverti tensione o dolore nella zona lombare, interrompi immediatamente l'esercizio
- Inizia con un numero ridotto di ripetizioni (3-5) per le prime sessioni, anche se ti sembra facile
- Gli hamstring possono essere soggetti a DOMS (dolori muscolari post-allenamento) intensi; introduci gradualmente questo esercizio nella tua routine
- Esegui sempre un adeguato riscaldamento, includendo esercizi di mobilità per anche e ginocchia
- È consigliabile avere un assistente nelle prime fasi di apprendimento dell'esercizio
# Log delle Performance
```dataviewjs
// Utilizzo corretto per Leg Press
await dv.view("theGYM/Scripts/ExerciseLogTable", {
    input: {
        exercise: dv.current().nome_esercizio,
        limit: 50,
        searchByName: true,
        debug: true
    }
});
```
### grafico
```dataviewjs
// Definisci i parametri (opzionali)
const input = {
    // title: "Trend Volume Esercizio",
    // height: "250px",
    // showTrend: true,
    // showStats: true,
    // exercisePath: "theGYM/Esercizi/Panca Piana.md" // Solo se vuoi visualizzare un esercizio diverso
};

// Passa il container esplicitamente quando usi dv.view
await dv.view("theGYM/Scripts/VolumeChartTemplate", {
    input: input
});
```